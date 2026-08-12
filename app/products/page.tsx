import type { Metadata } from "next";
import { AppStoreBadges } from "../components/AppStoreBadges";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Products — SABXI",
  description:
    "Six fresh product lines from SABXI Studio: cut veggies, cut fruits, cold-pressed juices, whole produce, smoothies, and Mixed Packs.",
};

const lines = [
  {
    type: "prepared",
    emoji: "🥕",
    title: "Cut Veggies",
    desc: "Diced, sliced, or julienned — tomatoes, onions, palak, carrots, stir-fry mixes, salad cuts. Cut only after you order.",
    items: [
      "Diced tomatoes",
      "Sliced onions",
      "Julienned carrots",
      "Palak (washed & chopped)",
      "Stir-fry mix",
      "Salad cuts",
    ],
  },
  {
    type: "prepared",
    emoji: "🍉",
    title: "Cut Fruits",
    desc: "Watermelon to fruit bowls — wedged and packed while you watch. No preservatives, no cold storage.",
    items: [
      "Watermelon wedges",
      "Mixed fruit bowl",
      "Pineapple chunks",
      "Muskmelon",
      "Seasonal specials",
    ],
  },
  {
    type: "prepared",
    emoji: "🧃",
    title: "Fresh Juices",
    desc: "Cold-pressed and bottled after you order. Zero concentrate, zero preservatives. Just squeezed.",
    items: ["Orange", "Mosambi", "Watermelon", "Mixed fruit", "Green detox"],
  },
  {
    type: "prepared",
    emoji: "🥣",
    title: "Mixed Packs",
    desc: "Ready-to-cook combos: moong dal, chickpea, rajma, chana — washed and portioned so dinner starts at the kadhai.",
    items: ["Rajma mix", "Chana mix", "Moong dal", "Chickpea mix", "Custom combos"],
  },
  {
    type: "whole",
    emoji: "🥬",
    title: "Whole Vegetables",
    desc: "Mandi-fresh every morning. No middlemen. Market prices. If you still want to cut yourself, we source the best.",
    items: ["Tomatoes", "Onions", "Potatoes", "Palak", "Bhindi", "Gajar"],
  },
  {
    type: "whole",
    emoji: "🍎",
    title: "Whole Fruits",
    desc: "Seasonal fruits sourced direct from the mandi. Apples to bananas, mangoes to papaya — fresh daily.",
    items: [
      "Mangoes (seasonal)",
      "Apples",
      "Bananas",
      "Papaya",
      "Pineapple",
      "Seasonal specials",
    ],
  },
  {
    type: "prepared",
    emoji: "🥤",
    title: "Smoothies",
    desc: "Berry, mango, banana — layered fresh in every cup. Blended after you order, never from concentrate.",
    items: [
      "Mango smoothie",
      "Mixed berry",
      "Banana peanut butter",
      "Tropical mix",
      "Green smoothie",
    ],
  },
];

export default function ProductsPage() {
  return (
    <div className={styles.ip}>
      <main className={styles.wrapWide}>
        <span className={styles.label}>Our Products</span>
        <h1>Six Fresh Lines</h1>
        <p className={styles.lead}>
          Everything sourced mandi-fresh every morning. Cut, pressed, and packed only after you
          order — from SABXI Studio to your door in under 30 minutes.
        </p>

        <div className={styles.cardGrid}>
          {lines.map((line) => (
            <div
              key={line.title}
              className={styles.card}
              style={{
                borderTop: `3px solid ${
                  line.type === "prepared" ? "var(--color-orange-500)" : "var(--color-green-500)"
                }`,
              }}
            >
              <div className={styles.emoji}>{line.emoji}</div>
              <h3>{line.title}</h3>
              <p>{line.desc}</p>
              <ul>
                {line.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.ctaBox}>
          <p>Order any of these fresh — delivered in under 30 minutes</p>
          <AppStoreBadges className={styles.ctaBadges} />
        </div>
      </main>
    </div>
  );
}
