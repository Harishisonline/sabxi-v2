import styles from "./reviews.module.css";

const EMPTY_REVIEWS = true;

const PLACEHOLDER_REVIEWS = [
  {
    name: "Aarti R.",
    area: "Kurla East",
    rating: 5,
    body: "Cut was clean, delivery in 22 minutes. The carrots stayed crisp in the fridge for 3 days.",
  },
  {
    name: "Sameer P.",
    area: "Chembur",
    rating: 5,
    body: "Best cold-pressed juice in the area. No added water, no sugar. Tastes like it should.",
  },
  {
    name: "Nisha K.",
    area: "Yashwanth Nagar",
    rating: 5,
    body: "Ordered a mixed pack on a Wednesday. Kids ate the cut fruit before I could put it away.",
  },
];

export function TopReviews() {
  if (EMPTY_REVIEWS) {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <span className={styles.label}>Top reviews</span>
          <h2 className={styles.title}>No reviews yet</h2>
          <p className={styles.desc}>
            SABXI is new. We’re collecting real reviews from real Chembur and Kurla
            households. Be the first — order, then write a review below.
          </p>
          <div className={styles.gridPlaceholder}>
            <div className={styles.placeholderCard}>
              <div className={styles.placeholderStars} aria-hidden="true">★ ★ ★ ★ ★</div>
              <p className={styles.placeholderText}>
                ”Reviews appear here once customers start sharing their experience.”
              </p>
              <p className={styles.placeholderMeta}>— future SABXI customer</p>
            </div>
            <div className={styles.placeholderCard}>
              <div className={styles.placeholderStars} aria-hidden="true">★ ★ ★ ★ ★</div>
              <p className={styles.placeholderText}>
                ”Real reviews from Chembur and Kurla households. No paid placements, no editing.”
              </p>
              <p className={styles.placeholderMeta}>— SABXI team</p>
            </div>
            <div className={styles.placeholderCard}>
              <div className={styles.placeholderStars} aria-hidden="true">★ ★ ★ ★ ★</div>
              <p className={styles.placeholderText}>
                ”Order the app, write a review, see your name here.”
              </p>
              <p className={styles.placeholderMeta}>— SABXI team</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.label}>Top reviews</span>
        <h2 className={styles.title}>What customers say</h2>
        <div className={styles.grid}>
          {PLACEHOLDER_REVIEWS.map((r, i) => (
            <article key={i} className={styles.card}>
              <div className={styles.stars} aria-label={`${r.rating} out of 5 stars`}>
                {"★".repeat(r.rating)}
              </div>
              <p className={styles.body}>&ldquo;{r.body}&rdquo;</p>
              <p className={styles.meta}>
                <strong>{r.name}</strong> · {r.area}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
