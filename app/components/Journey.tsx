import styles from "./Journey.module.css";

export function Journey() {
  return (
    <section className={`${styles.journey} ${styles.visible}`} id="journey">
      <div className={styles.journeyInner}>
        <span
          className={styles.sectionLabel}
          style={{ textAlign: "center", display: "block" }}
        >
          How Fresh Gets to You
        </span>
        <h2 className={styles.sectionTitle} style={{ textAlign: "center" }}>
          Chop. Pack. Deliver.
        </h2>
        <p
          className={styles.sectionDesc}
          style={{
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Three steps. Zero waiting on wilted produce.
        </p>
        <div className={styles.journeyTrack}>
          <div className={styles.journeyStep}>
            <div className={styles.journeyIcon}>🔪</div>
            <h4>Chop</h4>
            <p>Cut to your spec the moment you order — never before.</p>
          </div>
          <div className={styles.journeyArrow} aria-hidden="true">
            →
          </div>
          <div className={styles.journeyStep}>
            <div className={styles.journeyIcon}>📦</div>
            <h4>Pack</h4>
            <p>Sealed fresh at SABXI Studio in clean branded trays.</p>
          </div>
          <div className={styles.journeyArrow} aria-hidden="true">
            →
          </div>
          <div className={styles.journeyStep}>
            <div className={styles.journeyIcon}>🛵</div>
            <h4>Deliver</h4>
            <p>At your door in under 30 minutes, live tracked.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
