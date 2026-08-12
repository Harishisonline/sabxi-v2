import type { Metadata } from "next";
import { ReviewForm } from "./ReviewForm";
import { TopReviews } from "./TopReviews";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read reviews from SABXI customers in Chembur and Kurla, Mumbai. Order freshly cut vegetables, fruits, and juices — share your experience.",
};

export default function ReviewsPage() {
  return (
    <main className={styles.wrap}>
      <section className={styles.hero}>
        <span className={styles.label}>Reviews</span>
        <h1 className={styles.title}>Fresh, fast, effortless</h1>
        <p className={styles.desc}>
          Our customers say it best. Read what SABXI customers in Chembur and Kurla
          have to say, then share your own experience after your next order.
        </p>
      </section>

      <TopReviews />

      <section className={styles.formSection} id="write-review">
        <div className={styles.formInner}>
          <span className={styles.label}>Write a review</span>
          <h2 className={styles.formTitle}>Tell us about your order</h2>
          <p className={styles.formDesc}>
            Your review helps other Chembur and Kurla households decide. We publish
            reviews after a quick moderation check.
          </p>
          <ReviewForm />
        </div>
      </section>
    </main>
  );
}
