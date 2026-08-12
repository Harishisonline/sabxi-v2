"use client";

import { useEffect, useRef } from "react";
import styles from "./PrepAnimations.module.css";

export function PrepAnimations() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const stages = Array.from(section.querySelectorAll<HTMLElement>("[data-prep]"));
    if (!stages.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const restart = (stage: HTMLElement) => {
      stage.classList.remove(styles.prepPlaying);
      void stage.offsetWidth;
      stage.classList.add(styles.prepPlaying);
    };

    if (reducedMotion) {
      stages.forEach((stage) => stage.classList.add(styles.prepPlaying));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const stage = entry.target as HTMLElement;
          if (entry.isIntersecting) restart(stage);
          else stage.classList.remove(styles.prepPlaying);
        });
      },
      { threshold: 0.35 }
    );

    stages.forEach((stage) => observer.observe(stage));

    const intervalId = window.setInterval(() => {
      stages.forEach((stage) => {
        if (stage.classList.contains(styles.prepPlaying)) restart(stage);
      });
    }, 6500);

    return () => {
      observer.disconnect();
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section className={styles.prepSection} id="prep" ref={sectionRef}>
      <div className={styles.sectionInner}>
        <span className={styles.sectionLabel}>Made On Order</span>
        <h2 className={`${styles.sectionTitle} ${styles.sectionTitleDark}`}>
          Watch It Come Together
        </h2>
        <p className={styles.sectionDesc}>
          Nothing is pre-made. Veggies and fruits are cut, juices pressed, and smoothies blended
          live — the moment your order lands.
        </p>
        <div className={styles.prepGrid}>
          <div
            className={`${styles.prepStage} ${styles.prepStageCutveg} ${styles.prepAnim}`}
            data-prep="cutveg"
          >
            <div className={styles.prepStageGlow} />
            <div className={styles.prepStageHead}>
              <span className={styles.prepStageTag}>Cut Veggies</span>
              <h3>Chop. Chop. Sorted.</h3>
              <p>Carrots, onions, palak — sliced to your spec on a live cutting board.</p>
            </div>
            <div className={styles.prepScene}>
              <div className={styles.chopScene}>
                <div className={`${styles.chopKnife} ${styles.chopKnifeVeg}`}>
                  <div className={styles.chopKnifeBlade} />
                  <div className={styles.chopKnifeHandle} />
                </div>
                <div className={`${styles.chopSpark} ${styles.chopSpark1}`} />
                <div className={`${styles.chopSpark} ${styles.chopSpark2}`} />
                <div className={`${styles.chopSpark} ${styles.chopSpark3}`} />
                <div className={styles.chopCarrot}>
                  <div className={styles.carrotTop}>
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className={styles.carrotBody} />
                  <div className={`${styles.carrotSlice} ${styles.carrotSliceC}`} />
                  <div className={`${styles.carrotSlice} ${styles.carrotSliceB}`} />
                  <div className={`${styles.carrotSlice} ${styles.carrotSliceA}`} />
                </div>
                <div className={styles.chopBoard} />
              </div>
            </div>
            <div className={styles.prepStatus}>Cutting fresh</div>
          </div>

          <div
            className={`${styles.prepStage} ${styles.prepStageCutfruit} ${styles.prepAnim}`}
            data-prep="cutfruit"
          >
            <div className={styles.prepStageGlow} />
            <div className={styles.prepStageHead}>
              <span className={styles.prepStageTag}>Cut Fruits</span>
              <h3>Sliced, Not Stored.</h3>
              <p>Watermelon to fruit bowls — wedged and packed while you watch.</p>
            </div>
            <div className={styles.prepScene}>
              <div className={styles.melonScene}>
                <div className={`${styles.chopKnife} ${styles.chopKnifeFruit}`}>
                  <div className={styles.chopKnifeBlade} />
                  <div className={styles.chopKnifeHandle} />
                </div>
                <div className={`${styles.melonDrop} ${styles.melonDrop1}`} />
                <div className={`${styles.melonDrop} ${styles.melonDrop2}`} />
                <div className={`${styles.melonDrop} ${styles.melonDrop3}`} />
                <div className={styles.melon}>
                  <div
                    className={styles.melonWedge}
                    style={{ clipPath: "polygon(0 0, 49% 0, 49% 100%, 0 100%)" }}
                  >
                    <span
                      className={styles.melonSeed}
                      style={{ left: "24%", top: "48%" }}
                    />
                    <span
                      className={styles.melonSeed}
                      style={{ left: "36%", top: "32%", transform: "rotate(20deg)" }}
                    />
                  </div>
                  <div
                    className={`${styles.melonWedge} ${styles.melonWedgeM}`}
                    style={{ clipPath: "polygon(50% 0, 73% 0, 73% 100%, 50% 100%)" }}
                  >
                    <span
                      className={styles.melonSeed}
                      style={{ left: "57%", top: "40%" }}
                    />
                    <span
                      className={styles.melonSeed}
                      style={{ left: "64%", top: "62%", transform: "rotate(20deg)" }}
                    />
                  </div>
                  <div
                    className={`${styles.melonWedge} ${styles.melonWedgeR}`}
                    style={{ clipPath: "polygon(74% 0, 100% 0, 100% 100%, 74% 100%)" }}
                  >
                    <span
                      className={styles.melonSeed}
                      style={{ left: "82%", top: "44%", transform: "rotate(-15deg)" }}
                    />
                    <span
                      className={styles.melonSeed}
                      style={{ left: "88%", top: "66%" }}
                    />
                  </div>
                </div>
                <div className={styles.chopBoard} />
              </div>
            </div>
            <div className={styles.prepStatus}>Slicing now</div>
          </div>

          <div
            className={`${styles.prepStage} ${styles.prepStageJuice} ${styles.prepAnim}`}
            data-prep="juice"
          >
            <div className={styles.prepStageGlow} />
            <div className={styles.prepStageHead}>
              <span className={styles.prepStageTag}>Fresh Juices</span>
              <h3>Cap Off. Pressed Live.</h3>
              <p>Bottle opens, juice pours — zero concentrate, zero waiting.</p>
            </div>
            <div className={styles.prepScene}>
              <div className={styles.juiceScene}>
                <div className={styles.juiceCapWrap}>
                  <div className={styles.juiceCapRing} />
                  <div className={styles.juiceCapBody} />
                </div>
                <div className={styles.juiceNeck} />
                <div className={styles.juiceBottle}>
                  <div className={styles.juiceBrand}>SABXI</div>
                  <div className={styles.juiceLiquid}>
                    <span className={`${styles.juiceBubble} ${styles.juiceBubble1}`} />
                    <span className={`${styles.juiceBubble} ${styles.juiceBubble2}`} />
                    <span className={`${styles.juiceBubble} ${styles.juiceBubble3}`} />
                  </div>
                </div>
                <div className={styles.juiceMist}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
            <div className={styles.prepStatus}>Pressing fresh</div>
          </div>

          <div
            className={`${styles.prepStage} ${styles.prepStageSmoothie} ${styles.prepAnim}`}
            data-prep="smoothie"
          >
            <div className={styles.prepStageGlow} />
            <div className={styles.prepStageHead}>
              <span className={styles.prepStageTag}>Smoothies</span>
              <h3>Pour. Layer. Blend.</h3>
              <p>Berry, mango, banana — stacked fresh in every cup.</p>
            </div>
            <div className={styles.prepScene}>
              <div className={styles.smoothieScene}>
                <div className={styles.smoothiePour} />
                <div className={styles.smoothieCup}>
                  <div className={`${styles.smoothieLayer} ${styles.smoothieLayer1}`} />
                  <div className={`${styles.smoothieLayer} ${styles.smoothieLayer2}`} />
                  <div className={`${styles.smoothieLayer} ${styles.smoothieLayer3}`} />
                  <div className={styles.smoothieFoam} />
                  <span
                    className={`${styles.smoothieFruitBit} ${styles.smoothieFruitBit1}`}
                  />
                  <span
                    className={`${styles.smoothieFruitBit} ${styles.smoothieFruitBit2}`}
                  />
                  <span
                    className={`${styles.smoothieFruitBit} ${styles.smoothieFruitBit3}`}
                  />
                </div>
              </div>
            </div>
            <div className={styles.prepStatus}>Blending now</div>
          </div>
        </div>
      </div>
    </section>
  );
}
