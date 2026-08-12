"use client";

import { useEffect, useRef } from "react";
import styles from "./PageLoader.module.css";

/**
 * PageLoader — SABXI Studio intro animation.
 * Renders on the server for first paint; client effect runs the sequence.
 */
export function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pageLoader = loaderRef.current;
    if (!pageLoader) return;

    document.body.classList.add("loading");

    const loaderLogo = document.getElementById("loaderLogo") as HTMLImageElement | null;
    const loaderStudio = document.getElementById("loaderStudio") as HTMLImageElement | null;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function preloadImage(img: HTMLImageElement | null) {
      return new Promise<void>((resolve) => {
        if (!img) {
          resolve();
          return;
        }
        if (img.complete && img.naturalWidth) resolve();
        else {
          img.onload = img.onerror = () => resolve();
        }
      });
    }

    function finishLoader() {
      document.body.classList.remove("loading");
      document.body.classList.add("motion-ready");
      pageLoader?.classList.add(styles.done);
    }

    function runLoader() {
      if (reducedMotion) {
        finishLoader();
        return;
      }
      const safety = setTimeout(finishLoader, 2500);
      Promise.all([preloadImage(loaderLogo), preloadImage(loaderStudio)]).then(() => {
        requestAnimationFrame(() => pageLoader?.classList.add(styles.loaderRun));
        setTimeout(() => pageLoader?.classList.add(styles.loaderExit), 1100);
        setTimeout(() => {
          clearTimeout(safety);
          finishLoader();
        }, 1500);
      });
    }

    if (document.readyState === "complete") runLoader();
    else window.addEventListener("load", runLoader);

    return () => {
      window.removeEventListener("load", runLoader);
      document.body.classList.remove("loading");
    };
  }, []);

  return (
    <div className={styles.pageLoader} id="pageLoader" ref={loaderRef} aria-hidden="true">
      <div className={styles.loaderInner}>
        <div className={styles.loaderLogoBlock}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-trans.png"
            alt="SABXI"
            className={styles.loaderLogo}
            id="loaderLogo"
            width={148}
            height={148}
          />
          <span className={styles.loaderLogoWord}>SABXI</span>
        </div>
        <div className={styles.loaderStudioBlock}>
          <div className={styles.loaderStudioFrame}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/sabxi-studio.png"
              alt="SABXI Studio"
              id="loaderStudio"
              width={819}
              height={1024}
            />
            <span className={styles.loaderStudioShine} aria-hidden="true" />
          </div>
          <span className={styles.loaderStudioLabel}>SABXI Studio</span>
          <span className={styles.loaderStudioTag}>Freshly cut · Quickly delivered</span>
        </div>
      </div>
      <div className={styles.loaderProgress} aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
