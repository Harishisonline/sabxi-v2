import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreBadges } from "../../components/AppStoreBadges";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Best Cut Vegetables Near Chembur, Mumbai | SABXI",
  description:
    "Cut vegetables from SABXI Studio Kurla — diced, sliced, julienned. Cut only after you order, delivered in under 30 minutes.",
};

export default function BestCutVegChemburPage() {
  return (
    <div className={styles.ip}>
      <main className={styles.wrap}>
        <span className={styles.label}>Chembur · Local guide</span>
        <h1>Best cut vegetables near Chembur</h1>
        <p className={styles.meta}>Published 28 Jul 2026 · Sabxi Private Limited</p>
        <p className={styles.lead}>
          If you live or work around Chembur and want cut sabzi without the wilted pre-pack problem,
          here is what “best” should mean — and how SABXI delivers it.
        </p>

        <h2>What “best cut veg” actually means</h2>
        <p>
          In Mumbai, “cut vegetables near me” usually means either a local vendor chopping in advance
          or a quick-commerce pack that was cut hours earlier. The best option for taste and
          nutrition is different: <strong>cut only after you order</strong>, from produce sourced
          the same morning.
        </p>

        <h2>Why Kurla is our first studio</h2>
        <p>
          <strong>SABXI Studio in Kurla</strong> sits close to the neighbourhoods we serve first.
          Short rider hops keep the under-30-minute promise realistic. Find the studio on{" "}
          <a href="https://share.google/Be6ad2LS0plYCVRL5" target="_blank" rel="noopener">
            Google Maps
          </a>{" "}
          and check <Link href="/areas/">service areas</Link> for delivery.
        </p>

        <h2>What you can order</h2>
        <ul>
          <li>
            <strong>Cut veggies</strong> — diced, sliced, or julienned (tomatoes, onions, palak,
            carrots, stir-fry mixes, salad cuts)
          </li>
          <li>
            <strong>Mixed Packs</strong> — ready-to-cook combos so dinner starts at the kadhai, not
            the chopping board
          </li>
          <li>
            <strong>Whole veggies</strong> — if you still want to cut yourself, same mandi-fresh
            sourcing
          </li>
        </ul>

        <div className={styles.callout}>
          <p>
            Add cooking notes in the app (e.g. “fine dice for gravy”, “thick slices for sandwich”).
            Your board, your rules — we just skip the wait.
          </p>
        </div>

        <h2>How it compares to dark-store cut packs</h2>
        <p>
          Apps that ship pre-cut inventory optimise for speed of whatever is already bagged. SABXI
          optimises for <strong>freshness at speed</strong>: the knife moves after your tap. That is
          the difference between convenience and compromise.
        </p>

        <h2>How to get cut veg in Chembur tonight</h2>
        <ol>
          <li>
            Download the{" "}
            <a
              href="https://apps.apple.com/in/app/sabxi/id6783602290"
              target="_blank"
              rel="noopener"
            >
              SABXI app
            </a>
          </li>
          <li>Set your Chembur (or nearby) address</li>
          <li>Pick cuts + notes → place order → we prep live at the studio</li>
        </ol>
        <p>
          More meal ideas:{" "}
          <Link href="/blog/chembur-30-min-meal-kits/">30-minute meal kits from Chembur</Link>.
        </p>

        <div className={styles.ctaBox}>
          <p>Order cut-to-order from SABXI Studio Kurla</p>
          <AppStoreBadges className={styles.ctaBadges} />
          <p className={styles.ctaLinks}>
            <Link href="/blog/">← All posts</Link> · <Link href="/areas/">Service areas</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
