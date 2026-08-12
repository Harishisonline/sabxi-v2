"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DrawerAuthControl } from "./DrawerAuthControl";
import styles from "./SideNav.module.css";

type CategoryId = "browse" | "company";

type NavLink = { href: string; label: string; exact?: boolean };

type Category = {
  id: CategoryId;
  label: string;
  blurb: string;
  links: NavLink[];
};

const CATEGORIES: Category[] = [
  {
    id: "browse",
    label: "Browse",
    blurb: "The product, the studio, the customers.",
    links: [
      { href: "/products/", label: "Products" },
      { href: "/studio/", label: "SABXI Studio" },
      { href: "/reviews/", label: "Customer Reviews" },
      { href: "/areas/", label: "Service Areas" },
    ],
  },
  {
    id: "company",
    label: "Company",
    blurb: "The people, the legal, the story.",
    links: [
      { href: "/about/", label: "About" },
      { href: "/blog/", label: "Blog" },
      { href: "/company/", label: "Company Info" },
      { href: "/privacy/", label: "Privacy Policy" },
      { href: "/terms/", label: "Terms of Service" },
      { href: "/refund/", label: "Refunds & Cancellations" },
    ],
  },
];

const STORAGE_KEY = "sabxi-sidenav-expanded";
const SAME_TAB_EVENT = "sabxi-sidenav-expanded";
const DEFAULT_EXPANDED: Record<CategoryId, boolean> = {
  browse: false,
  company: false,
};

/** Snapshot cache — only for referential equality for useSyncExternalStore. */
let snapshotRaw: string | null | undefined = undefined;
let snapshotValue: Record<CategoryId, boolean> = DEFAULT_EXPANDED;

function parseExpanded(raw: string | null): Record<CategoryId, boolean> {
  if (!raw) return DEFAULT_EXPANDED;
  try {
    const parsed = JSON.parse(raw) as Partial<Record<CategoryId, boolean>>;
    return {
      browse: parsed.browse ?? DEFAULT_EXPANDED.browse,
      company: parsed.company ?? DEFAULT_EXPANDED.company,
    };
  } catch {
    return DEFAULT_EXPANDED;
  }
}

function getSnapshot(): Record<CategoryId, boolean> {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === snapshotRaw) return snapshotValue;
  snapshotRaw = raw;
  snapshotValue = parseExpanded(raw);
  return snapshotValue;
}

function getServerSnapshot(): Record<CategoryId, boolean> {
  return DEFAULT_EXPANDED;
}

function subscribe(onStoreChange: () => void): () => void {
  const notify = () => {
    snapshotRaw = undefined; // invalidate so getSnapshot re-reads
    onStoreChange();
  };
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) notify();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(SAME_TAB_EVENT, notify);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(SAME_TAB_EVENT, notify);
  };
}

function writeExpanded(next: Record<CategoryId, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // still update in-memory snapshot if storage is blocked
  }
  snapshotRaw = undefined;
  snapshotValue = next;
  window.dispatchEvent(new Event(SAME_TAB_EVENT));
}

function useExpandedState(): [
  Record<CategoryId, boolean>,
  (id: CategoryId) => void,
] {
  const expanded = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggle = (id: CategoryId) => {
    writeExpanded({ ...expanded, [id]: !expanded[id] });
  };

  return [expanded, toggle];
}

export function SideNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [expanded, toggle] = useExpandedState();

  // Lock body scroll when open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Esc.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Focus the close button when the drawer opens.
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => closeButtonRef.current?.focus(), 60);
    return () => window.clearTimeout(t);
  }, [open]);

  // Auto-close on route change.
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current === pathname) return;
    prevPathnameRef.current = pathname;
    queueMicrotask(onClose);
  }, [pathname, onClose]);

  const isActive = (href: string, exact?: boolean) => {
    if (exact || href === "/") return pathname === href;
    const norm = (s: string) => (s.endsWith("/") ? s : s + "/");
    const target = norm(href);
    return pathname === target || pathname.startsWith(target);
  };

  return (
    <div
      className={`${styles.root} ${open ? styles.rootOpen : ""}`}
      aria-hidden={!open}
    >
      <div
        className={styles.backdrop}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className={styles.head}>
          <Link href="/" className={styles.logoLink} onClick={onClose}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-trans.png" alt="SABXI" className={styles.logo} />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close navigation"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className={styles.intro}>
          <span className={styles.eyebrow}>Navigate</span>
          <p className={styles.lede}>
            Freshly cut. Quickly delivered. <span className={styles.ledeAccent}>From Kurla.</span>
          </p>
        </div>

        <nav className={styles.nav} aria-label="All site pages">
          <Link
            href="/"
            className={`${styles.homeLink} ${isActive("/", true) ? styles.homeLinkActive : ""}`}
            onClick={onClose}
          >
            <span className={styles.homeIndex}>00</span>
            <span className={styles.homeLabel}>Home</span>
            {isActive("/", true) && <span className={styles.activeMark} aria-hidden="true" />}
          </Link>

          {CATEGORIES.map((cat, idx) => {
            const isOpen = expanded[cat.id];
            const groupNumber = String(idx + 1).padStart(2, "0");
            return (
              <section key={cat.id} className={styles.category}>
                <button
                  type="button"
                  className={styles.categoryHeader}
                  onClick={() => toggle(cat.id)}
                  aria-expanded={isOpen}
                  aria-controls={`sidenav-cat-${cat.id}`}
                >
                  <span className={styles.catIndex}>{groupNumber}</span>
                  <span className={styles.catLabel}>{cat.label}</span>
                  <span
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && <p className={styles.catBlurb}>{cat.blurb}</p>}
                <ul
                  id={`sidenav-cat-${cat.id}`}
                  className={styles.linkList}
                  hidden={!isOpen}
                >
                  {isOpen &&
                    cat.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={`${styles.link} ${isActive(link.href, link.exact) ? styles.linkActive : ""}`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </section>
            );
          })}
        </nav>

        <div className={styles.foot}>
          <Link href="/hi/" className={styles.langSwitch} onClick={onClose}>
            <span aria-hidden="true">→</span>
            <span>हिंदी</span>
          </Link>
          <a className={styles.footEmail} href="mailto:info@sabxi.com">
            info@sabxi.com
          </a>
          <DrawerAuthControl />
          <p className={styles.footLegal}>
            © 2026 Sabxi Private Limited · CIN U46301MH2026PTC473853
          </p>
        </div>
      </aside>
    </div>
  );
}
