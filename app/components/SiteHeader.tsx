"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { SideNav } from "./SideNav";
import { AuthControl } from "./AuthControl";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
        id="site-header"
      >
        <div className={styles.inner}>
          <Link href="/" className={styles.logoLink} aria-label="SABXI — Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-trans.png" alt="SABXI" className={styles.logo} />
          </Link>
          <div className={styles.rightCluster}>
            <ThemeToggle />
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
          </div>
        </div>
      </header>
      <SideNav open={navOpen} onClose={() => setNavOpen(false)} />
    </>
  );
}
