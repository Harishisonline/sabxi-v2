"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppStoreBadges } from "./AppStoreBadges";
import styles from "./Hero.module.css";

const SLIDES = [
  {
    src: "/images/app/home.png",
    alt: "SABXI app home — deliver in 18 minutes",
    label: "Home",
  },
  {
    src: "/images/app/categories.png",
    alt: "SABXI app categories — vegetables and fruits",
    label: "Categories",
  },
  {
    src: "/images/app/mixes.png",
    alt: "SABXI app Mixed Packs — prepped veg and fruit combos",
    label: "Mixes",
  },
  {
    src: "/images/app/cart.png",
    alt: "SABXI app cart — cut and packed fresh after you order",
    label: "Cart",
  },
] as const;

const MARQUEE_ITEMS = [
  "Freshly Cut",
  "Quickly Delivered",
  "Cut Veggies",
  "Cut Fruits",
  "Fresh Juices",
  "Vegetables",
  "Fruits",
  "Smoothies",
] as const;

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <section className={styles.hero} id="top">
        <div className={styles.heroOrbs} aria-hidden="true">
          <div className={`${styles.heroOrb} ${styles.heroOrb1}`} />
          <div className={`${styles.heroOrb} ${styles.heroOrb2}`} />
        </div>
        <div className={styles.heroProduce} aria-hidden="true">
          <span>🥕</span>
          <span>🍅</span>
          <span>🥬</span>
          <span>🍉</span>
          <span>🍊</span>
          <span>🥒</span>
          <span>🍓</span>
          <span>🍎</span>
        </div>
        <div className={styles.heroBg}>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=1600&h=900&fit=crop"
          >
            <source
              src="https://assets.mixkit.co/videos/6272/6272-720.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-trans.png"
              alt="SABXI logo"
              className={styles.heroLogo}
            />
            <div className={styles.heroBadge}>Freshly cut · Quickly delivered</div>
            <h1>
              <span className={styles.o}>Freshly Cut</span>
              <br />
              <span className={styles.g}>and Quickly Delivered.</span>
            </h1>
            <p className={styles.heroSub}>
              Cut veggies, cut fruits, fresh juices, whole vegetables, fruits, and
              smoothies — all from SABXI Studio, delivered to your door in under 30
              minutes.
            </p>
            <div className={styles.heroActions}>
              <AppStoreBadges className={styles.heroBadges} />
              <Link href="#lines" className={`${styles.btn} ${styles.btnGhost}`}>
                Browse Products
              </Link>
            </div>
            <div className={styles.heroTrust}>
              <div>
                <strong>6</strong>
                <span>Product lines</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Cut to order</span>
              </div>
              <div>
                <strong>30 min</strong>
                <span>Delivery</span>
              </div>
            </div>
          </div>
          <div className={styles.phoneWrap}>
            <div className={`${styles.phoneFloat} ${styles.phoneFloat1}`}>
              🛵 Delivery 18 min
            </div>
            <div className={styles.phone}>
              <div className={styles.phoneScreen}>
                <div className={styles.phoneSlides}>
                  {SLIDES.map((slide, i) => (
                    <div
                      key={slide.src}
                      className={`${styles.phoneSlide}${i === active ? ` ${styles.active}` : ""}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        width={460}
                        height={1024}
                        loading={i === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.phoneDots} role="tablist" aria-label="App screens">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.label}
                  type="button"
                  className={`${styles.phoneDot}${i === active ? ` ${styles.active}` : ""}`}
                  aria-label={slide.label}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
            <div className={`${styles.phoneFloat} ${styles.phoneFloat2}`}>
              💳 Pay · ₹76
            </div>
          </div>
        </div>
      </section>

      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>
    </>
  );
}
