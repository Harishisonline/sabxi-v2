import Link from "next/link";
import styles from "./BlogTeaser.module.css";

export function BlogTeaser() {
  return (
    <section className={styles.blogTeaser} id="blog">
      <div className={styles.sectionInner}>
        <span className={styles.sectionLabel}>From the Blog</span>
        <h2 className={styles.sectionTitle}>Fresh thinking for busy kitchens</h2>
        <p className={styles.sectionDesc}>
          Guides on cut-to-order produce, Chembur meal kits, and why we never chop
          before you order.
        </p>
        <div className={styles.blogTeaserGrid}>
          <Link
            className={styles.blogTeaserCard}
            href="/blog/best-cut-veg-chembur/"
            style={{ transitionDelay: "0s" }}
          >
            <span className={styles.label}>Chembur</span>
            <h3>Best cut vegetables near Chembur</h3>
            <p>
              What “best cut veg” means in Mumbai — cut to order from SABXI Studio,
              not wilted pre-packs.
            </p>
            <span className={styles.more}>Read article →</span>
          </Link>
          <Link
            className={styles.blogTeaserCard}
            href="/blog/mumbai-meal-prep-guide/"
            style={{ transitionDelay: "0.08s" }}
          >
            <span className={styles.label}>Guide</span>
            <h3>Mumbai meal-prep guide</h3>
            <p>
              Plan dinners, stock the pantry, order fresh cuts the day you cook —
              less Sunday slog.
            </p>
            <span className={styles.more}>Read article →</span>
          </Link>
          <Link
            className={styles.blogTeaserCard}
            href="/blog/fresh-juice-delivery-chembur/"
            style={{ transitionDelay: "0.16s" }}
          >
            <span className={styles.label}>Chembur</span>
            <h3>Fresh juice delivery in Chembur</h3>
            <p>
              Cold-pressed after you order from SABXI Studio — track it to your
              door.
            </p>
            <span className={styles.more}>Read article →</span>
          </Link>
        </div>
        <p className={styles.viewAll}>
          <Link href="/blog/">View all posts →</Link>
        </p>
      </div>
    </section>
  );
}
