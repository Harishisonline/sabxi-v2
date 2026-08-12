import type { Metadata } from "next";
import { AppStoreBadges } from "../components/AppStoreBadges";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About SABXI — Press & Founder Story | Kurla Mumbai",
  description: "SABXI is a D2C fresh food brand built around one idea: Freshly Cut, Quickly Delivered. We are a live micro-kitchen (SABXI Studio) that washes, cuts, presses, and packs only after you order.",
};

export default function AboutPage() {
  return (
    <div className={styles.ip}>
      <main className={styles.wrap}>
        <span className={styles.label}>About · Press</span>
        <h1>The story of SABXI</h1>
        <p className={styles.lead}>
          We built SABXI so busy kitchens in Mumbai could get mandi-fresh produce — cut to order, not sitting pre-chopped in a dark store.
        </p>
        <p className={styles.meta}>Press & brand story · Updated 28 July 2026</p>

        <h2>What SABXI is</h2>
        <p>
          <strong>SABXI</strong> is the consumer brand of <strong>Sabxi Private Limited</strong> — a D2C fresh food company built around one idea: <em>Freshly Cut, Quickly Delivered</em>. We are not a dark-store grocery app. We are a live micro-kitchen (SABXI Studio) that washes, cuts, presses, and packs only after you order, then delivers in under 30 minutes.
        </p>

        <div className={styles.callout}>
          <p>
            <strong>One-liner for press:</strong> SABXI is the fresh food layer of quick commerce — cut-to-order veggies, fruits, juices, and Mixed Packs from a Kurla studio to your door in under 30 minutes.
          </p>
        </div>

        <h2>The problem we saw</h2>
        <p>Quick commerce made packaged inventory fast. Fresh produce was still a compromise: pre-cut packs sitting in cold storage, middlemen markups, and kitchen time nobody has after work. Families in Mumbai either chopped everything themselves or accepted wilted &quot;convenience.&quot;</p>

        <h2>Our answer</h2>
        <ul>
          <li><strong>Cut after you order</strong> — never pre-chopped inventory for cut packs</li>
          <li><strong>Mandi-fresh sourcing</strong> every morning — no middlemen markup model</li>
          <li><strong>App-first ordering</strong> with cut preferences and cooking notes</li>
          <li><strong>Under-30-minute delivery</strong> from a neighbourhood studio</li>
        </ul>

        <h2>First studio</h2>
        <p>
          Our first kitchen is <strong>SABXI Studio, Kurla, Mumbai</strong>. Find us on{" "}
          <a href="https://share.google/Be6ad2LS0plYCVRL5" target="_blank" rel="noopener">
            Google Maps
          </a>
          . From here we serve a local delivery radius; more studios and areas will follow.
        </p>

        <h2>Company</h2>
        <p>
          Sabxi Private Limited was incorporated on <strong>23 July 2026</strong> (CIN <strong>U46301MH2026PTC473853</strong>, GSTIN <strong>27ABUCS4728H1ZP</strong>, RoC-Mumbai). Directors: <strong>Syed Irfan Raza</strong> and <strong>Ragini Mishra</strong>. MCA activity: wholesale of fruits &amp; vegetables. Full legal details: <a href="/company/">Company Info</a> ·{" "}
          <a href="https://www.falconebiz.com/company/SABXI-PRIVATE-LIMITED-U46301MH2026PTC473853" target="_blank" rel="noopener noreferrer">
            Falcon eBiz / MCA
          </a>
          .
        </p>

        <h2>Product lines</h2>
        <p>Cut veggies · Cut fruits · Cold-pressed juices · Whole vegetables &amp; fruits · Smoothies · Mixed Packs (ready-to-cook combos).</p>

        <h2>Press &amp; partnerships</h2>
        <p>For interviews, studio visits, society / office partnerships, or media kits, email <a href="mailto:info@sabxi.com">info@sabxi.com</a> with subject line <strong>Press</strong> or <strong>Partnership</strong>.</p>

        <div className={styles.ctaBox}>
          <p>Order from the SABXI app</p>
          <AppStoreBadges className={styles.ctaBadges} />
        </div>
      </main>
    </div>
  );
}
