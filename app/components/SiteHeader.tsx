"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { SideNav } from "./SideNav";
import { AuthControl } from "./AuthControl";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
        id="site-header"
      >
        <div className={styles.inner}>
          {/* Hamburger — LEFT side, opens the side nav drawer */}
          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setNavOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={navOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Logo */}
          <Link href="/" className={styles.logoLink} aria-label="SABXI — Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-trans.png" alt="SABXI" className={styles.logo} />
          </Link>

          {/* Inline nav — visible on desktop, hidden on mobile */}
          <nav className={styles.desktopNav} aria-label="Primary">
            <Link
              href="/"
              className={`${styles.navLink} ${isActive("/") ? styles.navLinkActive : ""}`}
              aria-current={isActive("/") ? "page" : undefined}
            >
              Home
            </Link>
            <Link
              href="/products/"
              className={`${styles.navLink} ${isActive("/products") ? styles.navLinkActive : ""}`}
              aria-current={isActive("/products") ? "page" : undefined}
            >
              Products
            </Link>
            <Link
              href="/reviews/"
              className={`${styles.navLink} ${isActive("/reviews") ? styles.navLinkActive : ""}`}
              aria-current={isActive("/reviews") ? "page" : undefined}
            >
              Reviews
            </Link>
            <Link
              href="/blog/"
              className={`${styles.navLink} ${isActive("/blog") ? styles.navLinkActive : ""}`}
              aria-current={isActive("/blog") ? "page" : undefined}
            >
              Blog
            </Link>
            <Link
              href="/areas/"
              className={`${styles.navLink} ${isActive("/areas") ? styles.navLinkActive : ""}`}
              aria-current={isActive("/areas") ? "page" : undefined}
            >
              Areas
            </Link>
            <Link
              href="/about/"
              className={`${styles.navLink} ${isActive("/about") ? styles.navLinkActive : ""}`}
              aria-current={isActive("/about") ? "page" : undefined}
            >
              About
            </Link>
          </nav>

          {/* Right cluster */}
          <div className={styles.rightCluster}>
            <div className={styles.themeSlot}>
              <ThemeToggle />
            </div>
            <AuthControl className={styles.authControl} />
            <a
              className={styles.appBadge}
              href="https://apps.apple.com/in/app/sabxi/id6783602290"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download SABXI on the App Store"
            >
              <img
                src="/images/app-store-badge.svg"
                alt="Download on the App Store"
                width={90}
                height={30}
                loading="lazy"
                decoding="async"
              />
            </a>
            <a
              className={styles.appBadge}
              href="https://play.google.com/store/apps/details?id=com.sabxi.sabxi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get SABXI on Google Play"
            >
              <img
                src="/images/google-play-badge.png"
                alt="Get it on Google Play"
                width={90}
                height={27}
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
        </div>
      </header>
      <SideNav open={navOpen} onClose={() => setNavOpen(false)} />
    </>
  );
}
