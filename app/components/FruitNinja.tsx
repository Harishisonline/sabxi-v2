"use client";

import { useEffect, useState, useCallback, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import styles from "./FruitNinja.module.css";

/**
 * Page-wide falling produce for the home page.
 *
 * 6 emoji spawn from the top of the viewport, drift down with gravity +
 * slight rotation, and float on the left/right edges of the page
 * (matching the clone's sg-l1..3 / sg-r1..3 pattern). The user can
 * click/tap a falling produce to slice it — a centered product card
 * overlay reveals which SABXI product line that produce represents.
 *
 * Implementation: state-driven. rAF updates positions in refs, then
 * commits to state at ~20fps (every 3rd frame). This keeps the
 * animation smooth while avoiding the "60 React renders per second"
 * performance trap.
 */

const PRODUCTS = [
  { slug: "cut-veggies", name: "Cut Veggies", desc: "Diced, sliced, or julienned.", emoji: "🥕" },
  { slug: "cut-fruits", name: "Cut Fruits", desc: "Wedged and packed while you watch.", emoji: "🍉" },
  { slug: "fresh-juices", name: "Fresh Juices", desc: "Cold-pressed after you order.", emoji: "🍅" },
  { slug: "mixed-packs", name: "Mixed Packs", desc: "Ready-to-cook combos.", emoji: "🧅" },
  { slug: "smoothies", name: "Smoothies", desc: "Layered fresh in every cup.", emoji: "🥭" },
  { slug: "whole-produce", name: "Whole Produce", desc: "Mandi-fresh, market prices.", emoji: "🥬" },
] as const;

const SPAWN_CONFIG = [
  { type: 0, side: "left", xPct: 0.05, size: 1.0 },
  { type: 3, side: "left", xPct: 0.08, size: 0.9 },
  { type: 5, side: "left", xPct: 0.04, size: 1.1 },
  { type: 2, side: "right", xPct: 0.95, size: 0.95 },
  { type: 1, side: "right", xPct: 0.92, size: 1.0 },
  { type: 4, side: "right", xPct: 0.96, size: 0.9 },
] as const;

const SPAWN_INTERVAL_MS = 1200;
const PRODUCE_LIFETIME_MS = 14000;
const REVEAL_DURATION_MS = 2200;
const MAX_PRODUCE = 18;
const MAX_PARTICLES = 80;
const RENDER_EVERY_N_FRAMES = 3; // ~20fps render, 60fps physics

type Produce = {
  id: number;
  type: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  spawnedAt: number;
  sliced: boolean;
};

type Particle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
};

function getCanAnimate(): boolean {
  if (typeof window === "undefined") return false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth < 600;
  const saveData =
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  return !reducedMotion && !isMobile && !saveData;
}

function getShouldShow(): boolean {
  if (typeof window === "undefined") return false;
  const isMobile = window.innerWidth < 600;
  const saveData =
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  return !isMobile && !saveData;
}

function subscribeNever() {
  return () => {};
}

export function FruitNinja() {
  const canAnimate = useSyncExternalStore(subscribeNever, getCanAnimate, () => false);
  const shouldShow = useSyncExternalStore(subscribeNever, getShouldShow, () => false);

  const [produce, setProduce] = useState<Produce[]>(() => {
    if (typeof window === "undefined") return [];
    return initialProduce();
  });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [revealedProduct, setRevealedProduct] = useState<number | null>(null);

  // Refs for rAF state that doesn't drive render
  const produceRef = useRef<Produce[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const nextIdRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const viewportWRef = useRef(0);
  const viewportHRef = useRef(0);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameCountRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  const showReveal = useCallback((type: number) => {
    setRevealedProduct(type);
    if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    revealTimerRef.current = setTimeout(() => {
      setRevealedProduct(null);
      revealTimerRef.current = null;
    }, REVEAL_DURATION_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    };
  }, []);

  // Main rAF loop — throttled state commits
  useEffect(() => {
    if (!canAnimate) return;

    viewportWRef.current = window.innerWidth;
    viewportHRef.current = window.innerHeight;
    lastSpawnRef.current = 0;
    nextIdRef.current = 0;
    frameCountRef.current = 0;

    // Seed
    const initial: Produce[] = [];
    for (let i = 0; i < 4; i++) {
      const cfg = SPAWN_CONFIG[i % SPAWN_CONFIG.length];
      initial.push({
        id: nextIdRef.current++,
        type: cfg.type,
        x: viewportWRef.current * cfg.xPct,
        y: -40 + i * (viewportHRef.current * 0.22),
        vx: (Math.random() - 0.5) * 0.4,
        vy: 0.3 + Math.random() * 0.4,
        rotation: (Math.random() - 0.5) * 30,
        rotationSpeed: (Math.random() - 0.5) * 0.4,
        size: cfg.size,
        spawnedAt: performance.now(),
        sliced: false,
      });
    }
    produceRef.current = initial;

    const spawnProduce = (now: number) => {
      if (produceRef.current.length >= MAX_PRODUCE) return;
      const cfg = SPAWN_CONFIG[Math.floor(Math.random() * SPAWN_CONFIG.length)];
      produceRef.current.push({
        id: nextIdRef.current++,
        type: cfg.type,
        x: viewportWRef.current * cfg.xPct,
        y: -40,
        vx: (Math.random() - 0.5) * 0.4,
        vy: 0.3 + Math.random() * 0.4,
        rotation: (Math.random() - 0.5) * 30,
        rotationSpeed: (Math.random() - 0.5) * 0.4,
        size: cfg.size,
        spawnedAt: now,
        sliced: false,
      });
      lastSpawnRef.current = now;
    };

    const tickFn = (now: number) => {
      if (now - lastSpawnRef.current > SPAWN_INTERVAL_MS) {
        spawnProduce(now);
      }

      const viewportH = window.innerHeight;
      const nextProduce: Produce[] = [];
      for (const p of produceRef.current) {
        if (p.sliced) {
          if (p.y < viewportH + 80) {
            nextProduce.push({
              ...p,
              y: p.y + p.vy + 1.2,
              x: p.x + p.vx,
              rotation: p.rotation + p.rotationSpeed * 4,
              vy: p.vy + 0.4,
            });
          }
          continue;
        }
        if (now - p.spawnedAt > PRODUCE_LIFETIME_MS || p.y > viewportH + 60) {
          continue;
        }
        nextProduce.push({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.05,
          rotation: p.rotation + p.rotationSpeed,
        });
      }
      produceRef.current = nextProduce;

      const nextParticles: Particle[] = particlesRef.current
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.2,
          life: p.life - 0.04,
        }))
        .filter((p) => p.life > 0)
        .slice(-MAX_PARTICLES);
      particlesRef.current = nextParticles;

      // Commit to state every N frames to keep React happy
      frameCountRef.current += 1;
      if (frameCountRef.current >= RENDER_EVERY_N_FRAMES) {
        frameCountRef.current = 0;
        setProduce(nextProduce);
        setParticles(nextParticles);
      }

      rafIdRef.current = requestAnimationFrame(tickFn);
    };

    rafIdRef.current = requestAnimationFrame(tickFn);

    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [canAnimate]);

  // Resize handler
  useEffect(() => {
    if (!canAnimate) return;
    const onResize = () => {
      viewportWRef.current = window.innerWidth;
      viewportHRef.current = window.innerHeight;
      const newProduce = produceRef.current.map((p) => {
        const cfg = SPAWN_CONFIG[p.type];
        return { ...p, x: viewportWRef.current * cfg.xPct };
      });
      produceRef.current = newProduce;
      setProduce(newProduce);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [canAnimate]);

  const handleSlice = useCallback(
    (id: number, e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();
      const p = produceRef.current.find((x) => x.id === id);
      if (!p || p.sliced) return;
      p.sliced = true;
      for (let i = 0; i < 10; i++) {
        particlesRef.current.push({
          id: nextIdRef.current++,
          x: p.x,
          y: p.y,
          vx: (Math.random() - 0.5) * 8,
          vy: -Math.random() * 4 - 1,
          life: 1,
        });
      }
      particlesRef.current = particlesRef.current.slice(-MAX_PARTICLES);
      showReveal(p.type);
      setProduce([...produceRef.current]);
    },
    [showReveal]
  );

  if (!shouldShow) return null;

  return (
    <>
      <div
        className={styles.layer}
        aria-hidden="true"
        data-can-animate={canAnimate ? "true" : "false"}
      >
        {produce.map((p) => {
          const cfg = SPAWN_CONFIG[p.type];
          const product = PRODUCTS[p.type];
          return (
            <button
              key={p.id}
              type="button"
              className={`${styles.produce} ${styles[`side_${cfg.side}`]} ${
                p.sliced ? styles.sliced : ""
              }`}
              style={{
                transform: `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg) scale(${p.size})`,
              }}
              onClick={(e) => handleSlice(p.id, e)}
              onTouchStart={(e) => handleSlice(p.id, e)}
              aria-label={`Slice ${product.name}`}
              tabIndex={-1}
            >
              <span className={styles.emoji}>{product.emoji}</span>
            </button>
          );
        })}

        {particles.map((particle) => (
          <span
            key={particle.id}
            className={styles.particle}
            style={{
              transform: `translate3d(${particle.x}px, ${particle.y}px, 0)`,
              opacity: Math.max(0, particle.life),
            }}
          />
        ))}
      </div>

      {revealedProduct !== null && (
        <div
          className={styles.reveal}
          role="dialog"
          aria-live="polite"
          aria-label={`You sliced ${PRODUCTS[revealedProduct].name}`}
        >
          <div className={styles.revealCard}>
            <span className={styles.revealEmoji} aria-hidden="true">
              {PRODUCTS[revealedProduct].emoji}
            </span>
            <h3 className={styles.revealName}>{PRODUCTS[revealedProduct].name}</h3>
            <p className={styles.revealDesc}>{PRODUCTS[revealedProduct].desc}</p>
            <Link href="/products/" className={styles.revealLink}>
              Try it in the app →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function initialProduce(): Produce[] {
  const out: Produce[] = [];
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  for (let i = 0; i < 4; i++) {
    const cfg = SPAWN_CONFIG[i % SPAWN_CONFIG.length];
    out.push({
      id: i,
      type: cfg.type,
      x: vw * cfg.xPct,
      y: -40 + i * (vh * 0.22),
      vx: 0,
      vy: 0,
      rotation: 0,
      rotationSpeed: 0,
      size: cfg.size,
      spawnedAt: 0,
      sliced: false,
    });
  }
  return out;
}
