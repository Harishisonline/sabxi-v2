"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthControl } from "./AuthControl";
import { AppStoreBadges } from "./AppStoreBadges";
import styles from "./MobileMenu.module.css";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const handleLinkClick = () => onClose();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink} onClick={handleLinkClick}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-trans.png" alt="SABXI" className={styles.logo} />
        </Link>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close menu"
        >
          ×
        </button>
        <nav className={styles.nav} aria-label="Mobile">
          <Link
            href="/"
            onClick={handleLinkClick}
            className={`${styles.navLink} ${isActive("/") ? styles.navLinkActive : ""}`}
          >
            Home
          </Link>
          <Link
            href="/products/"
            onClick={handleLinkClick}
            className={`${styles.navLink} ${isActive("/products") ? styles.navLinkActive : ""}`}
          >
            Products
          </Link>
          <Link
            href="/reviews/"
            onClick={handleLinkClick}
            className={`${styles.navLink} ${isActive("/reviews") ? styles.navLinkActive : ""}`}
          >
            Reviews
          </Link>
          <Link
            href="/blog/"
            onClick={handleLinkClick}
            className={`${styles.navLink} ${isActive("/blog") ? styles.navLinkActive : ""}`}
          >
            Blog
          </Link>
          <Link
            href="/areas/"
            onClick={handleLinkClick}
            className={`${styles.navLink} ${isActive("/areas") ? styles.navLinkActive : ""}`}
          >
            Areas
          </Link>
          <Link
            href="/about/"
            onClick={handleLinkClick}
            className={`${styles.navLink} ${isActive("/about") ? styles.navLinkActive : ""}`}
          >
            About
          </Link>
        </nav>
        <hr className={styles.divider} />
        <div className={styles.appBadges}>
          <AppStoreBadges className={styles.badgesRow} />
        </div>
        <hr className={styles.divider} />
        <div className={styles.authRow}>
          <AuthControl />
        </div>
        <div className={styles.legal}>
          <p>© 2026 Sabxi Private Limited</p>
          <p>CIN U46301MH2026PTC473853</p>
        </div>
      </div>
    </dialog>
  );
}
