"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppStoreBadges } from "./AppStoreBadges";
import styles from "./SideNav.module.css";

type CategoryId = "products" | "read" | "legal";

type NavLink = { href: string; label: string; exact?: boolean };

type Category = {
  id: CategoryId;
  label: string;
  icon: string;
  links: NavLink[];
};

const CATEGORIES: Category[] = [
  {
    id: "products",
    label: "Products",
    icon: "🥕",
    links: [
      { href: "/products/", label: "All Products" },
      { href: "/products/#lines", label: "Mixed Packs" },
    ],
  },
  {
    id: "read",
    label: "Read",
    icon: "📖",
    links: [
      { href: "/blog/", label: "Blog" },
      { href: "/reviews/", label: "Reviews" },
      { href: "/about/", label: "About" },
      { href: "/studio/", label: "Studio" },
      { href: "/areas/", label: "Service Areas" },
      { href: "/hi/", label: "हिंदी" },
    ],
  },
  {
    id: "legal",
    label: "Legal & Info",
    icon: "📋",
    links: [
      { href: "/privacy/", label: "Privacy Policy" },
      { href: "/terms/", label: "Terms of Service" },
      { href: "/refund/", label: "Refunds & Cancellations" },
      { href: "/company/", label: "Company Info" },
    ],
  },
];

const STORAGE_KEY = "sabxi-sidenav-expanded";
const DEFAULT_EXPANDED: Record<CategoryId, boolean> = {
  products: true,
  read: true,
  legal: false,
};

// Single in-memory cache so useSyncExternalStore doesn't re-read localStorage
// on every render. Keyed by storage-version so future schema changes can
// invalidate without manual cleanup.
const expandedCache: { value: Record<CategoryId, boolean>; version: number } = {
  value: DEFAULT_EXPANDED,
  version: 0,
};

function readExpandedFromStorage(): Record<CategoryId, boolean> {
  if (typeof window === "undefined") return DEFAULT_EXPANDED;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_EXPANDED;
    const parsed = JSON.parse(raw);
    return {
      products: parsed.products ?? true,
      read: parsed.read ?? true,
      legal: parsed.legal ?? false,
    };
  } catch {
    return DEFAULT_EXPANDED;
  }
}

function subscribeToExpanded(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      expandedCache.value = readExpandedFromStorage();
      expandedCache.version++;
      callback();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}

function getExpandedSnapshot(): Record<CategoryId, boolean> {
  return expandedCache.value;
}

function getExpandedServerSnapshot(): Record<CategoryId, boolean> {
  return DEFAULT_EXPANDED;
}

function writeExpandedToStorage(state: Record<CategoryId, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    expandedCache.value = state;
    expandedCache.version++;
  } catch {
    // localStorage unavailable — fail silently, sidebar still works in-memory
  }
}

/**
 * useExpandedState — bridge localStorage into React state without triggering
 * the React 19 "no setState in effect" warning. The "server" snapshot returns
 * the default (no localStorage available during SSR); the client snapshot
 * returns the live in-memory cache, which is hydrated from localStorage on
 * first client render via `useEffect` below.
 */
function useExpandedState(): [
  Record<CategoryId, boolean>,
  (updater: (prev: Record<CategoryId, boolean>) => Record<CategoryId, boolean>) => void,
] {
  const value = useSyncExternalStore(
    subscribeToExpanded,
    getExpandedSnapshot,
    getExpandedServerSnapshot,
  );

  // Lazy hydration: on first client render, pull the live value from
  // localStorage so the server-default state is replaced with the user's
  // actual saved preferences. Only runs once.
  const hydratedRef = useRef(false);
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    const stored = readExpandedFromStorage();
    if (JSON.stringify(stored) !== JSON.stringify(expandedCache.value)) {
      expandedCache.value = stored;
      expandedCache.version++;
    }
  }, []);

  const setValue = useCallback(
    (updater: (prev: Record<CategoryId, boolean>) => Record<CategoryId, boolean>) => {
      const next = updater(expandedCache.value);
      writeExpandedToStorage(next);
    },
    [],
  );

  return [value, setValue];
}

export function SideNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Initialise expanded state from localStorage using useSyncExternalStore
  // so SSR returns the default state and client hydrates from storage
  // without triggering React 19's "no setState in effect" warning.
  const [expanded, setExpanded] = useExpandedState();

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

  // Move focus into the drawer when it opens, restore on close.
  useEffect(() => {
    if (open) {
      // Defer to next tick so the element is in the DOM and animating in.
      const t = window.setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
    return;
  }, [open]);

  // Auto-close on route change so navigating from inside the drawer doesn't
  // leave it open on the new page. Compare against the previous pathname
  // via a ref so we only fire onClose when it actually changes — and defer
  // the call to a microtask so we don't trigger a cascading render inside
  // the same effect that observed the change.
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      queueMicrotask(onClose);
    }
    // Only depends on pathname so we don't reopen on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isActive = (href: string, exact?: boolean) => {
    if (exact || href === "/") return pathname === href;
    // Strip trailing slash for comparison, then check both with and without.
    const norm = (s: string) => (s.endsWith("/") ? s : s + "/");
    const target = norm(href);
    return pathname === target || pathname.startsWith(target);
  };

  const toggleCategory = (id: CategoryId) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Close when clicking the backdrop (the area outside the drawer).
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`${styles.root} ${open ? styles.rootOpen : ""}`}
      onClick={handleBackdropClick}
      aria-hidden={!open}
    >
      <div className={styles.backdrop} aria-hidden="true" />
      <aside
        ref={drawerRef}
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

        <nav className={styles.nav} aria-label="Site navigation links">
          <Link
            href="/"
            className={`${styles.homeLink} ${isActive("/", true) ? styles.homeLinkActive : ""}`}
            onClick={onClose}
          >
            <span className={styles.homeIcon} aria-hidden="true">🏠</span>
            <span>Home</span>
          </Link>

          <div className={styles.divider} role="separator" aria-hidden="true" />

          {CATEGORIES.map((cat) => {
            const isOpen = expanded[cat.id];
            return (
              <div key={cat.id} className={styles.category}>
                <button
                  type="button"
                  className={`${styles.categoryHeader} ${isOpen ? styles.categoryHeaderOpen : ""}`}
                  onClick={() => toggleCategory(cat.id)}
                  aria-expanded={isOpen}
                  aria-controls={`sidenav-cat-${cat.id}`}
                >
                  <span className={styles.categoryIcon} aria-hidden="true">{cat.icon}</span>
                  <span className={styles.categoryLabel}>{cat.label}</span>
                  <span
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </button>
                <div
                  id={`sidenav-cat-${cat.id}`}
                  className={`${styles.categoryBody} ${isOpen ? styles.categoryBodyOpen : ""}`}
                  role="region"
                  aria-label={cat.label}
                >
                  <ul className={styles.linkList}>
                    {cat.links.map((link) => (
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
                </div>
              </div>
            );
          })}
        </nav>

        <div className={styles.footer}>
          <a className={styles.email} href="mailto:info@sabxi.com">
            ✉ info@sabxi.com
          </a>
          <AppStoreBadges className={styles.badges} />
          <p className={styles.legal}>
            © 2026 Sabxi Private Limited
            <br />
            CIN U46301MH2026PTC473853
          </p>
        </div>
      </aside>
    </div>
  );
}
