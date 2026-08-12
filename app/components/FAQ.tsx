import Link from "next/link";
import { AppStoreBadges } from "./AppStoreBadges";
import styles from "./FAQ.module.css";

export function FAQ() {
  return (
    <section className={styles.faq} id="faq">
      <span className={`${styles.sectionFloat} ${styles.left}`} aria-hidden="true">
        🥝
      </span>
      <span className={`${styles.sectionFloat} ${styles.right}`} aria-hidden="true">
        🍇
      </span>
      <div className={styles.sectionInner}>
        <span className={`${styles.sectionLabel} ${styles.centered}`}>FAQ</span>
        <h2 className={`${styles.sectionTitle} ${styles.centered}`}>
          Everything People Ask Us
        </h2>
        <div className={styles.langWrap}>
          <div className={styles.faqLang}>
            <a className={styles.active} href="#faq">
              English
            </a>
            <Link href="/hi/">हिंदी</Link>
          </div>
        </div>
        <div className={styles.faqList}>
          <details className={styles.faqItem}>
            <summary>What is SABXI?</summary>
            <p>
              SABXI is a direct-to-consumer (D2C) fresh food brand on a mission to
              change how the world eats. We deliver freshly cut vegetables, cut
              fruits, cold-pressed juices, whole produce, and smoothies — all
              prepared live at SABXI Studio the moment you order, and delivered to
              your door in under 30 minutes.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary>How fast does SABXI deliver?</summary>
            <p>
              Under 30 minutes. Orders travel from our cutting board to your
              doorstep with live tracking, between 7 AM and 9 PM every day.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary>
              How is SABXI different from other quick commerce apps like Zepto or
              Blinkit?
            </summary>
            <p>
              Quick commerce apps deliver packaged inventory from dark stores.
              SABXI is a freshness-first D2C brand: nothing is pre-made or stored.
              Vegetables and fruits are cut, juices pressed, and smoothies blended
              live at SABXI Studio only after your order lands — then delivered in
              under 30 minutes. It&apos;s the future of quick commerce for fresh
              food.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary>When are the vegetables and fruits cut?</summary>
            <p>
              Only after you order. SABXI never pre-cuts or stores produce. Every
              order is washed, cut to your spec — diced, sliced, or julienned —
              and sealed at SABXI Studio minutes before delivery.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary>What products does SABXI sell?</summary>
            <p>
              Six fresh lines: freshly cut veggies, freshly cut fruits,
              cold-pressed juices, raw whole vegetables, raw whole fruits, and
              blended smoothies — all sourced fresh from the mandi every morning at
              market prices.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary>What is SABXI Studio?</summary>
            <p>
              SABXI Studio is our compact, glass-front micro-store where every
              order is prepared. The first studio is in{" "}
              <strong>Kurla, Mumbai</strong>. It&apos;s built for speed, hygiene,
              and transparency — you can watch your produce being cut, pressed, and
              packed live.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary>Does SABXI offer a daily subscription?</summary>
            <p>
              Yes. Set your daily basket — palak, tomatoes, juice, fruit bowls —
              and SABXI auto-delivers it fresh every morning, always at a discount.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary>Where does SABXI source its produce?</summary>
            <p>
              Direct from local mandis every morning. No middlemen, no markup, no
              cold storage — what you&apos;d pay at the market is what you pay on
              SABXI.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary>Where does SABXI deliver?</summary>
            <p>
              We currently deliver from our first studio in{" "}
              <strong>Kurla, Mumbai</strong>, within a fast 30-minute radius. Enter
              your address in the SABXI app to confirm if we serve your pin code.
              More studios and cities are coming soon.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary>How do I download the SABXI app?</summary>
            <p>Download SABXI free on:</p>
            <AppStoreBadges className={styles.faqBadges} />
          </details>
          <details className={styles.faqItem}>
            <summary>Can I choose how my vegetables are cut?</summary>
            <p>
              Yes. In the app you can add cooking notes and cut preferences —
              diced, sliced, julienned, or whole — so produce is prepped exactly
              how you cook.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary>What are Mixed Packs?</summary>
            <p>
              Mixed Packs are prepped vegetable and fruit combos for busy kitchens
              — moong dal, chickpea, chana, rajma mixes and more — washed and
              portioned so you skip the prep and start cooking.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary>What if I&apos;m not happy with my order?</summary>
            <p>
              Contact us in the app or email{" "}
              <a href="mailto:info@sabxi.com">info@sabxi.com</a>. If something
              arrives damaged, incorrect, or not fresh, we&apos;ll make it right
              with a replacement or refund as applicable. Full details:{" "}
              <Link href="/refund/">Refund & Cancellation Policy</Link>.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
