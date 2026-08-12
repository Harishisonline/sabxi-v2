"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
const DEFAULT_EXPANDED: Record<CategoryId, boolean> = {
  browse: true,
  company: true,
};

const expandedCache: { value: Record<CategoryId, boolean>; version: number } = {
  value: DEFAULT_EXPANDED,
  version: 0,
};

function readFromStorage(): Record<CategoryId, boolean> {
  if (typeof window === "undefined") return DEFAULT_EXPANDED;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_EXPANDED;
    const parsed = JSON.parse(raw);
    return {
      browse: parsed.browse ?? true,
      company: parsed.company ?? true,
    };
  } catch {
    return DEFAULT_EXPANDED;
  }
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      expandedCache.value = readFromStorage();
      expandedCache.version++;
      callback();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}

function getSnapshot(): Record<CategoryId, boolean> {
  return expandedCache.value;
}

function getServerSnapshot(): Record<CategoryId, boolean> {
  return DEFAULT_EXPANDED;
}

function writeToStorage(state: Record<CategoryId, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    expandedCache.value = state;
    expandedCache.version++;
  } catch {
    // localStorage unavailable — sidebar still works in-memory
  }
}

function useExpandedState(): [
  Record<CategoryId, boolean>,
  (id: CategoryId) => void,
] {
  const value = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Lazy hydration from localStorage on first client render. Uses a ref
  // guard so we only hydrate once and don't keep firing the effect.
  const hydratedRef = useRef(false);
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    const stored = readFromStorage();
    if (JSON.stringify(stored) !== JSON.stringify(expandedCache.value)) {
      expandedCache.value = stored;
      expandedCache.version++;
    }
  }, []);

  const toggle = (id: CategoryId) => {
    const next = { ...expandedCache.value, [id]: !expandedCache.value[id] };
    writeToStorage(next);
  };

  return [value, toggle];
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
  const drawerRef = useRef<HTMLElement>(null);
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
    if (open) {
      const t = window.setTimeout(() => closeButtonRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
    return;
  }, [open]);

  // Auto-close on route change. Use a ref to avoid the
  // setState-in-cascading-render lint rule.
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      // Defer to microtask so we don't trigger a cascading render.
      queueMicrotask(onClose);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isActive = (href: string, exact?: boolean) => {
    if (exact || href === "/") return pathname === href;
    const norm = (s: string) => (s.endsWith("/") ? s : s + "/");
    const target = norm(href);
    return pathname === target || pathname.startsWith(target);
  };

  // Close on click outside the drawer. The root container holds both
  // the backdrop and the drawer, so we listen at the root and check
  // whether the click landed on the root itself (i.e. the backdrop area)
  // versus inside the drawer.
  const handleRootClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Defensive: also close on any click on the backdrop element directly.
  // Some browsers route the event target differently when the backdrop
  // has its own absolute positioning.
  const handleBackdropClick = () => onClose();

  return (
    <div
      className={`${styles.root} ${open ? styles.rootOpen : ""}`}
      onClick={handleRootClick}
      aria-hidden={!open}
    >
      <div className={styles.backdrop} onClick={handleBackdropClick} aria-hidden="true" />
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
                {isOpen && (
                  <p className={styles.catBlurb}>{cat.blurb}</p>
                )}
                <ul
                  id={`sidenav-cat-${cat.id}`}
                  className={`${styles.linkList} ${isOpen ? styles.linkListOpen : ""}`}
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
          <p className={styles.footLegal}>
            © 2026 Sabxi Private Limited · CIN U46301MH2026PTC473853
          </p>
        </div>
      </aside>
    </div>
  );
}
