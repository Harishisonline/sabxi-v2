import styles from "./Features.module.css";

export function Features() {
  return (
    <section className={styles.features} id="features">
      <div className={styles.featuresInner}>
        <div className={styles.featuresHead}>
          <span className={styles.featuresTag}>Why SABXI</span>
          <h2 className={styles.featuresTitle}>
            <span className={styles.strike}>Fresh food.</span>
            <span className={styles.pop}>Zero hassle.</span>
          </h2>
          <p className={styles.featuresBlurb}>
            Six lines. One app. <strong>30 minutes</strong> to your door — cut, pressed, and packed
            live.
          </p>
        </div>
        <div className={styles.featuresGrid}>
          <article className={styles.featItem} style={{ transitionDelay: "0s" }}>
            <span className={styles.featNum}>01</span>
            <div className={`${styles.featGlyph} ${styles.featGlyphCut}`} aria-hidden="true">
              <svg viewBox="0 0 36 36">
                <line className={styles.blade} x1="8" y1="28" x2="28" y2="8" />
                <line x1="22" y1="6" x2="30" y2="14" />
              </svg>
            </div>
            <h4>Cut to spec</h4>
            <p>Diced, sliced, julienned — exactly how you want it.</p>
            <span className={styles.featAccent} />
          </article>
          <article className={styles.featItem} style={{ transitionDelay: "0.08s" }}>
            <span className={styles.featNum}>02</span>
            <div className={`${styles.featGlyph} ${styles.featGlyphBolt}`} aria-hidden="true">
              <svg viewBox="0 0 36 36">
                <polygon
                  points="20,4 10,20 17,20 14,32 26,14 19,14"
                  fill="var(--color-orange-500)"
                  stroke="none"
                />
              </svg>
            </div>
            <h4>30-min drop</h4>
            <p>From studio to doorstep. Under half an hour.</p>
            <span className={styles.featAccent} />
          </article>
          <article className={styles.featItem} style={{ transitionDelay: "0.16s" }}>
            <span className={styles.featNum}>03</span>
            <div className={`${styles.featGlyph} ${styles.featGlyphJuice}`} aria-hidden="true">
              <svg viewBox="0 0 36 36">
                <rect x="12" y="10" width="12" height="22" rx="2" />
                <rect
                  className={styles.level}
                  x="14"
                  y="18"
                  width="8"
                  height="12"
                  rx="1"
                  fill="var(--color-orange-500)"
                  stroke="none"
                />
              </svg>
            </div>
            <h4>Juice &amp; smoothie</h4>
            <p>Cold-pressed and layered fresh. Never from concentrate.</p>
            <span className={styles.featAccent} />
          </article>
          <article className={styles.featItem} style={{ transitionDelay: "0.24s" }}>
            <span className={styles.featNum}>04</span>
            <div className={`${styles.featGlyph} ${styles.featGlyphTrack}`} aria-hidden="true">
              <svg viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="4" fill="var(--color-green-500)" />
                <circle
                  className={styles.pulse}
                  cx="18"
                  cy="18"
                  r="4"
                  fill="none"
                  stroke="var(--color-green-500)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <h4>Live tracking</h4>
            <p>Watch your order roll from studio to door.</p>
            <span className={styles.featAccent} />
          </article>
          <article className={styles.featItem} style={{ transitionDelay: "0.32s" }}>
            <span className={styles.featNum}>05</span>
            <div className={`${styles.featGlyph} ${styles.featGlyphSub}`} aria-hidden="true">
              <svg viewBox="0 0 36 36">
                <path className={styles.arc} d="M18 8 A10 10 0 1 1 17.9 8" fill="none" />
                <polygon
                  points="18,6 21,12 15,12"
                  fill="var(--color-orange-500)"
                  stroke="none"
                />
              </svg>
            </div>
            <h4>Daily sub</h4>
            <p>Palak, tomatoes, juice — auto-delivered every AM.</p>
            <span className={styles.featAccent} />
          </article>
        </div>
      </div>
    </section>
  );
}
