"use client";

import { useEffect, useRef } from "react";
import styles from "./StudioShowcase.module.css";

export function StudioShowcase() {
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = showcaseRef.current;
    if (!el) return;
    if (reducedMotion) {
      el.classList.add(styles.studioLive);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle(styles.studioLive, entry.isIntersecting);
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.studio} id="studio">
      <div className={styles.studioHero}>
        <div className={styles.studioHeroHeader}>
          <span className={styles.sectionLabel}>Our Store</span>
          <h2 className={styles.sectionTitle}>SABXI Studio</h2>
        </div>
        <div className={styles.studioShowcase} id="studioShowcase" ref={showcaseRef}>
          <div className={styles.studioGlow} aria-hidden="true" />
          <div className={styles.studioShowcaseVisual}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/sabxi-studio.png"
              alt="SABXI Studio storefront — cut veggies, cut fruits, fresh juices, vegetables, fruits, smoothies"
              className={styles.studioShowcaseImg}
              width={819}
              height={1024}
            />
            <div className={styles.studioShimmer} aria-hidden="true" />
            <div className={styles.studioBadge} aria-hidden="true">
              <span className={styles.studioBadgeDot} />
              Prep live
            </div>
          </div>
        </div>
      </div>

      <div className={styles.studioDetails}>
        <div className={styles.sectionInner}>
          <div className={styles.studioShowcaseCaption}>
            <h3>sabxi studio</h3>
            <p>
              Freshly cut, quickly delivered — cut veggies · cut fruits · fresh juices · vegetables
              · fruits · smoothies
            </p>
            <p className={styles.address}>
              📍 Shop No. 4, Sai Life, Yashwanth Nagar, Kurla · Mumbai 400071 · Open 7 AM – 9 PM
              daily
            </p>
            <a
              className={styles.studioMapLink}
              href="https://share.google/Be6ad2LS0plYCVRL5"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </a>
          </div>
          <div className={styles.studioMapWrap}>
            <iframe
              title="SABXI Studio location on Google Maps — Sai Life, Yashwanth Nagar, Kurla, Mumbai"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Sabxi+Studio,+Sai+Life,+Yashwanth+Nagar,+Kurla,+Mumbai&ll=19.0615052,72.8926702&z=17&output=embed"
              allowFullScreen
            />
            <div className={styles.studioMapMeta}>
              <div>
                <strong>SABXI Studio — Kurla</strong>
                <span>
                  Shop No. 4, Sai Life, Yashwanth Nagar, Kurla, Mumbai 400071 · Fresh cut &amp;
                  delivered 7 AM – 9 PM
                </span>
              </div>
              <a
                href="https://share.google/Be6ad2LS0plYCVRL5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
