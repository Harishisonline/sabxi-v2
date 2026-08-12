import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreBadges } from "../components/AppStoreBadges";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "SABXI Blog — Fresh Food Tips, Cut Produce & Quick Commerce",
  description:
    "Practical guides on cut-to-order produce, quick meals from Chembur, and why freshness at speed beats dark-store grocery.",
};

const posts = [
  {
    href: "/blog/best-cut-veg-chembur/",
    label: "Chembur",
    title: "Best cut vegetables near Chembur",
    desc: "What “best cut veg” should mean in Mumbai — and how cut-to-order from SABXI Studio beats pre-cut packs.",
  },
  {
    href: "/blog/mumbai-meal-prep-guide/",
    label: "Guide",
    title: "Mumbai meal-prep guide",
    desc: "A lighter prep system: plan dinners, stock pantry staples, order fresh cuts the day you cook.",
  },
  {
    href: "/blog/fresh-juice-delivery-chembur/",
    label: "Chembur",
    title: "Fresh juice delivery in Chembur",
    desc: "Cold-pressed after you order — not bottled days ahead. How to get juice from SABXI Studio.",
  },
  {
    href: "/blog/cut-veg-vs-whole/",
    label: "Guide",
    title: "Cut veg vs whole: which should you order?",
    desc: "When pre-cut saves time, when whole is better, and how SABXI does both without compromising freshness.",
  },
  {
    href: "/blog/chembur-30-min-meal-kits/",
    label: "Chembur",
    title: "30-minute meal kits from Chembur",
    desc: "Weeknight dinner ideas using SABXI cut veggies, Mixed Packs, and juices — delivered in under 30 minutes.",
  },
  {
    href: "/blog/why-we-cut-after-you-order/",
    label: "Brand",
    title: "Why we cut after you order",
    desc: "The SABXI difference vs dark-store quick commerce: freshness at speed, not pre-cut sitting in a fridge.",
  },
];

export default function BlogIndexPage() {
  return (
    <div className={styles.ip}>
      <main className={styles.wrapWide}>
        <span className={styles.label}>SABXI Blog</span>
        <h1>Fresh thinking for busy kitchens</h1>
        <p className={styles.lead}>
          Practical guides on cut-to-order produce, quick meals from Chembur, and why freshness at
          speed beats dark-store grocery.
        </p>
        <div className={styles.cardGrid}>
          {posts.map((post) => (
            <Link key={post.href} className={styles.card} href={post.href}>
              <span className={styles.cardLabel}>{post.label}</span>
              <h3>{post.title}</h3>
              <p>{post.desc}</p>
              <span className={styles.more}>Read article →</span>
            </Link>
          ))}
        </div>
        <div className={styles.ctaBox}>
          <h2>Order fresh from SABXI Studio — Kurla</h2>
          <p>Cut to order. Delivered in under 30 minutes.</p>
          <AppStoreBadges className={styles.ctaBadges} />
        </div>
      </main>
    </div>
  );
}
