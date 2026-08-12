import styles from "./ProductShowcase.module.css";

export function ProductShowcase() {
  return (
    <section className={styles.features} id="lines">
      <div className={styles.sectionInner}>
        <span className={styles.sectionLabel}>Our Packaging</span>
        <h2 className={styles.sectionTitle}>Fresh. Branded. Ready to Eat.</h2>
        <p className={styles.sectionDesc}>
          Every SABXI product comes in clean, labelled packaging — washed, cut, and sealed at our
          studio.
        </p>
        <div className={styles.productShowcase}>
          <div className={styles.productShot} style={{ transitionDelay: "0s" }}>
            <div className={styles.productShotImg}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/products/cut-veggies-pack.png" alt="SABXI Cut Veggies pack" />
            </div>
            <div className={styles.productShotInfo}>
              <div
                className={`${styles.prepTime} ${styles.prepared} ${styles.prepTimeEmpty}`}
                data-product="cut-veg"
              >
                <span className={styles.prepTimeLabel}>Prep</span>{" "}
                <span className={styles.prepTimeVal}>—</span> min
              </div>
              <h4>Cut Veggies</h4>
              <p>Compartment tray · Ready to cook</p>
            </div>
          </div>
          <div className={styles.productShot} style={{ transitionDelay: "0.08s" }}>
            <div className={styles.productShotImg}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/products/cut-fruits-pack.png" alt="SABXI Cut Fruits pack" />
            </div>
            <div className={styles.productShotInfo}>
              <div
                className={`${styles.prepTime} ${styles.prepared} ${styles.prepTimeEmpty}`}
                data-product="cut-fruit"
              >
                <span className={styles.prepTimeLabel}>Prep</span>{" "}
                <span className={styles.prepTimeVal}>—</span> min
              </div>
              <h4>Cut Fruits</h4>
              <p>Mixed fruit pack · No preservatives</p>
            </div>
          </div>
          <div className={styles.productShot} style={{ transitionDelay: "0.16s" }}>
            <div className={styles.productShotImg}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/products/fresh-juice-bottle.png" alt="SABXI Fresh Juice bottle" />
            </div>
            <div className={styles.productShotInfo}>
              <div
                className={`${styles.prepTime} ${styles.prepared} ${styles.prepTimeEmpty}`}
                data-product="juice"
              >
                <span className={styles.prepTimeLabel}>Prep</span>{" "}
                <span className={styles.prepTimeVal}>—</span> min
              </div>
              <h4>Fresh Juice</h4>
              <p>Cold-pressed · Chilled bottle</p>
            </div>
          </div>
          <div className={styles.productShot} style={{ transitionDelay: "0.24s" }}>
            <div className={styles.productShotImg}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/products/mixed-packs.png" alt="SABXI Mixed Pack — rajma" />
            </div>
            <div className={styles.productShotInfo}>
              <div className={`${styles.prepTime} ${styles.prepared}`}>
                <span className={styles.prepTimeLabel}>Prep</span>{" "}
                <span className={styles.prepTimeVal}>—</span> min
              </div>
              <h4>Mixed Packs</h4>
              <p>Rajma &amp; more · Ready to cook</p>
            </div>
          </div>
          <div className={styles.productShot} style={{ transitionDelay: "0.32s" }}>
            <div className={styles.productShotImg}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/products/fruit-smoothie.png" alt="SABXI Mixed Fruit Smoothie" />
            </div>
            <div className={styles.productShotInfo}>
              <div
                className={`${styles.prepTime} ${styles.whole} ${styles.prepTimeEmpty}`}
                data-product="smoothie"
              >
                <span className={styles.prepTimeLabel}>Prep</span>{" "}
                <span className={styles.prepTimeVal}>—</span> min
              </div>
              <h4>Mixed Fruit Smoothie</h4>
              <p>Smoothies · Layered fresh fruit</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
