"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import styles from "./StickyDownloadBar.module.css";

const STORAGE_KEY = "sabxiStickyDismissed";

const dismissListeners = new Set<() => void>();

function subscribeDismissed(onStoreChange: () => void) {
  dismissListeners.add(onStoreChange);
  return () => {
    dismissListeners.delete(onStoreChange);
  };
}

function getDismissedSnapshot() {
  return sessionStorage.getItem(STORAGE_KEY) === "1";
}

function getServerDismissedSnapshot() {
  return true;
}

function markDismissed() {
  sessionStorage.setItem(STORAGE_KEY, "1");
  dismissListeners.forEach((cb) => cb());
}

export function StickyDownloadBar() {
  const dismissed = useSyncExternalStore(
    subscribeDismissed,
    getDismissedSnapshot,
    getServerDismissedSnapshot,
  );
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.55;
      const nearCta = document.getElementById("notify");
      let hideNearCta = false;
      if (nearCta) {
        const r = nearCta.getBoundingClientRect();
        hideNearCta = r.top < window.innerHeight && r.bottom > 0;
      }
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      setShow(pastHero && !hideNearCta && mobile);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [dismissed]);

  function handleDismiss() {
    markDismissed();
    setShow(false);
  }

  if (dismissed) return null;

  return (
    <aside
      className={`${styles.appSticky} ${show ? styles.show : ""}`}
      id="appSticky"
      aria-label="Download SABXI app"
    >
      <div className={styles.appStickyInner}>
        <div className={styles.appStickyCopy}>
          <strong>Order fresh in the app</strong>
          <span>Cut to order · Under 30 min</span>
        </div>
        <a className={styles.appStickyCta} href="#notify">
          Download
        </a>
        <button
          type="button"
          className={styles.appStickyClose}
          aria-label="Dismiss"
          onClick={handleDismiss}
        >
          ×
        </button>
      </div>
    </aside>
  );
}
