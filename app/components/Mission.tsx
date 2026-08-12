import styles from "./Mission.module.css";

export function Mission() {
  return (
    <section className={styles.mission} id="mission">
      <div className={styles.sectionInner}>
        <span className={styles.sectionLabel}>Our Mission</span>
        <h2>
          Changing How
          <br />
          the World <em>Eats.</em>
        </h2>
        <p className={styles.missionCopy}>
          SABXI is a <strong>direct-to-consumer (D2C) fresh food brand</strong> built
          for one idea: fresh food should be effortless. Not warehoused, not
          pre-packaged, not sitting in cold storage for days — but{" "}
          <strong>cut, pressed, and packed live</strong>, minutes before it reaches
          your kitchen.
        </p>
        <p className={styles.missionCopy}>
          We believe this is the <strong>future of quick commerce</strong>. Dark
          stores solved speed; SABXI solves <strong>freshness at speed</strong>.
          Every order is prepared on demand at SABXI Studio — a transparent,
          glass-front micro-kitchen — and delivered in{" "}
          <strong>under 30 minutes</strong>. Mandi-fresh sourcing every morning,
          zero middlemen, market prices, and a daily subscription that puts your
          kitchen on autopilot.
        </p>
        <p className={styles.missionCopy}>
          From <strong>freshly cut vegetables and fruits</strong> to{" "}
          <strong>cold-pressed juices and smoothies</strong>, SABXI is building the
          fresh food layer of India&apos;s quick commerce revolution — one chopped
          carrot at a time.
        </p>
        <div className={styles.missionChips}>
          <span className={`${styles.missionChip} ${styles.hot}`}>
            D2C Fresh Food Brand
          </span>
          <span className={`${styles.missionChip} ${styles.hot}`}>
            Future of Quick Commerce
          </span>
          <span className={`${styles.missionChip} ${styles.hot}`}>
            Changing How the World Eats
          </span>
          <span className={styles.missionChip}>Cut to Order</span>
          <span className={styles.missionChip}>Under 30 Minutes</span>
          <span className={styles.missionChip}>Mandi-Fresh Daily</span>
          <span className={styles.missionChip}>Zero Middlemen</span>
          <span className={styles.missionChip}>Freshness at Speed</span>
          <span className={styles.missionChip}>Made in India</span>
        </div>
      </div>
    </section>
  );
}
