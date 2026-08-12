import styles from "./FinalCTA.module.css";

export function FinalCTA() {
  return (
    <section className={styles.cta} id="notify">
      <div className={styles.sectionInner}>
        <span className={styles.sectionLabel}>Order Now</span>
        <h2 className={styles.sectionTitle}>Freshly Cut, Quickly Delivered</h2>
        <p className={styles.sectionDesc}>
          Cut veggies, cut fruits, juices, whole produce, and smoothies — from
          SABXI Studio to your door. Download the app and order fresh today.
        </p>
        <div className={styles.storeBadges}>
          <a
            href="https://apps.apple.com/in/app/sabxi/id6783602290"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download SABXI on the App Store"
          >
            <img src="/images/app-store-badge.svg" alt="Download on the App Store" width={135} height={45} />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.sabxi.sabxi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get SABXI on Google Play"
          >
            <img src="/images/google-play-badge.png" alt="Get it on Google Play" width={135} height={40} />
          </a>
        </div>
      </div>
    </section>
  );
}
