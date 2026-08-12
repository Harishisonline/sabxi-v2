import Link from "next/link";
import { AppStoreBadges } from "./AppStoreBadges";
import styles from "./Reviews.module.css";

export function Reviews() {
  return (
    <section className={styles.reviews} id="reviews">
      <div className={styles.inner}>
        <span className={styles.label}>Reviews</span>
        <h2 className={styles.title}>Fresh, fast, effortless</h2>
        <p className={styles.desc}>
          Our customers say it best. We&apos;re collecting real reviews from real Chembur kitchens.
        </p>
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>
            No reviews yet. Be the first to order and tell us what you think.
          </p>
          <AppStoreBadges className={styles.appBadges} />
          <p className={styles.seeAll}>
            <Link href="/reviews/">See all reviews →</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
