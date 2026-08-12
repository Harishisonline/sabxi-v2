import type { Metadata } from "next";
import { AppStoreBadges } from "../components/AppStoreBadges";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "SABXI Delivery Areas — Chembur & Mumbai | Service Map",
  description:
    "Find SABXI delivery areas in Mumbai. We start where freshness is fastest: Chembur. Enter your address in the app to confirm delivery.",
};

export default function AreasPage() {
  return (
    <div className={styles.ip}>
      <main className={styles.wrap}>
        <span className={styles.label}>Delivery</span>
        <h1>Service areas</h1>
        <p className={styles.lead}>
          We start where freshness is fastest: Chembur and nearby. Enter your address in the app to
          confirm delivery.
        </p>

        <p className={styles.meta}>Updated 28 July 2026 · Check the app for live serviceability</p>

        <h2>Where we deliver today</h2>
        <p>
          Orders are prepared at <strong>SABXI Studio, Kurla</strong> and delivered within a local
          radius — typically targeting <strong>under 30 minutes</strong> depending on distance,
          traffic, and order load.
        </p>

        <div className={styles.areaGrid}>
          <div className={styles.areaCard}>
            <span className={`${styles.badge} ${styles.badgeLive}`}>Live</span>
            <h3>Chembur</h3>
            <p>Core studio neighbourhood — fastest slot priority.</p>
          </div>
          <div className={styles.areaCard}>
            <span className={`${styles.badge} ${styles.badgeLive}`}>Live*</span>
            <h3>Nearby Chembur</h3>
            <p>Select pin codes around the studio when the app shows green.</p>
          </div>
          <div className={styles.areaCard}>
            <span className={`${styles.badge} ${styles.badgeSoon}`}>Next</span>
            <h3>Wider Mumbai</h3>
            <p>More studios &amp; zones as we expand — join the app to be ready.</p>
          </div>
        </div>

        <div className={styles.callout}>
          <p>
            <strong>*</strong> Exact buildings and pin codes change with rider capacity. Enter your
            address in the{" "}
            <a
              href="https://apps.apple.com/in/app/sabxi/id6783602290"
              target="_blank"
              rel="noopener"
            >
              SABXI app
            </a>{" "}
            for a definitive yes/no. Studio Maps:{" "}
            <a href="https://share.google/Be6ad2LS0plYCVRL5" target="_blank" rel="noopener">
              Google Maps
            </a>
            .
          </p>
        </div>

        <h2>How to check your address</h2>
        <ol className={styles.steps}>
          <li>Download SABXI on iOS</li>
          <li>Create an account and add your delivery address</li>
          <li>If serviceable, browse cut veggies, fruits, juices, and Mixed Packs</li>
          <li>Place the order — we prep live, then a rider brings it to you</li>
        </ol>

        <h2>Expanding beyond Chembur</h2>
        <p>
          This page will list new neighbourhoods as studios open. Want SABXI in your society or
          office park? Email <a href="mailto:info@sabxi.com">info@sabxi.com</a> with your location —
          demand helps us prioritise.
        </p>

        <div className={styles.ctaBox}>
          <p>See if we reach your kitchen</p>
          <AppStoreBadges className={styles.ctaBadges} />
        </div>
      </main>
    </div>
  );
}
