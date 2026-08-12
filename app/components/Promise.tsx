import styles from "./Promise.module.css";

export function Promise() {
  return (
    <section className={`${styles.promise} ${styles.visible}`} id="promise">
      <div className={styles.sectionInner}>
        <span className={styles.sectionLabel}>The SABXI Promise</span>
        <h2 className={styles.sectionTitle}>Fresh. Fast. Effortless.</h2>
        <p className={styles.sectionDesc}>
          Three things we obsess over, so you never have to think about them.
        </p>
        <div className={styles.promiseGrid}>
          <div className={styles.promiseCard}>
            <div className={styles.promiseVisual}>
              <div className={styles.freshRing}>
                <div
                  className={`${styles.freshRingWave} ${styles.freshRingWave1}`}
                />
                <div
                  className={`${styles.freshRingWave} ${styles.freshRingWave2}`}
                />
                <div className={styles.freshRingCore}>🥬</div>
                <span
                  className={`${styles.freshSparkle} ${styles.freshSparkle1}`}
                >
                  ✨
                </span>
                <span
                  className={`${styles.freshSparkle} ${styles.freshSparkle2}`}
                >
                  ✨
                </span>
                <span
                  className={`${styles.freshSparkle} ${styles.freshSparkle3}`}
                >
                  ✨
                </span>
              </div>
            </div>
            <h3>Freshness You Can See</h3>
            <p>
              Mandi-fresh every morning, cut only after you order. Nothing sits,
              nothing wilts.
            </p>
            <div className={styles.promiseMetric}>
              Cut after you order · Never before
            </div>
          </div>

          <div className={styles.promiseCard}>
            <div className={styles.promiseVisual}>
              <div className={styles.speedLane}>
                <span className={`${styles.speedLine} ${styles.speedLine1}`} />
                <span className={`${styles.speedLine} ${styles.speedLine2}`} />
                <span className={`${styles.speedLine} ${styles.speedLine3}`} />
                <div className={styles.speedScooter}>🛵</div>
                <div className={styles.speedPin}>📍</div>
                <div className={styles.speedRoad} />
              </div>
            </div>
            <h3>Speed That Surprises</h3>
            <p>
              From cutting board to your doorstep in under 30 minutes, tracked
              live all the way.
            </p>
            <div className={styles.promiseMetric}>
              Under 30 minutes · Live tracked
            </div>
          </div>

          <div className={styles.promiseCard}>
            <div className={styles.promiseVisual}>
              <div className={styles.tapPhone}>
                <div className={styles.tapCheck}>✓</div>
                <div className={styles.tapPhoneScreen}>
                  <div className={styles.tapBtn}>+</div>
                </div>
                <div className={`${styles.tapRipple} ${styles.tapRipple1}`} />
                <div className={`${styles.tapRipple} ${styles.tapRipple2}`} />
                <div className={styles.tapBag}>🛍️</div>
              </div>
            </div>
            <h3>Convenience, Built In</h3>
            <p>
              One tap to order, daily subscriptions on autopilot, zero washing or
              chopping at home.
            </p>
            <div className={styles.promiseMetric}>
              One tap · Daily subscription
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
