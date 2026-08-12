import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreBadges } from "../../components/AppStoreBadges";
import styles from "../post.module.css";

export const metadata: Metadata = {
  title: "Why We Cut After You Order | SABXI",
  description: "The reason SABXI Studio in Kurla cuts vegetables only after you order, not before. Why freshness-at-speed beats pre-cut convenience. A note from the founder.",
};

export default function WhyWeCutAfterYouOrderPage() {
  return (
    <div className={styles.ip}>
      <main className={styles.wrap}>
        <span className={styles.label}>Brand</span>
        <h1>Why we cut after you order (and not before)</h1>
        <p className={styles.meta}>Published 11 Aug 2026 · Syed Irfan Raza, Founder</p>
        <p className={styles.lead}>
          A short note from the founder on the one decision that defines SABXI: we cut your
          vegetables only after you tap the order button. Here&apos;s why that matters and what it
          costs us.
        </p>

        <h2>The default in quick commerce is to cut first, ship fast</h2>
        <p>
          Most fresh-cut apps in India buy produce in bulk at 5am, cut it in a central kitchen
          between 6am and 9am, pack it in plastic, store it in a cold room, and ship it from
          a dark store to your door in 15 minutes. The promise is speed. The reality is that
          your vegetables were cut 4-8 hours before you ordered them.
        </p>
        <p>
          This is not a moral failing. It&apos;s the only way the unit economics work at the scale
          these apps operate. Cutting is labor-intensive. Pre-cutting lets you pay one
          full-time knife-wielder instead of scaling staff with order volume. It&apos;s cheaper,
          faster, and looks identical on the app.
        </p>

        <h2>Why we chose differently</h2>
        <p>
          When we opened SABXI Studio, the question was: do we want to be the cheapest
          fresh-cut option in Chembur, or the freshest? We chose the second one. We knew it
          would mean a smaller market, a higher price per kg, and a longer delivery time.
          We chose it anyway.
        </p>
        <p>
          The decision is that the knife moves <strong>after</strong> your tap. Not before.
          You order at 7:15pm. The studio sees the order at 7:15pm and 30 seconds. The rider
          picks your specific produce (not a pre-cut batch) at 7:17pm. The knife moves at
          7:18pm. The packing is done at 7:23pm. The rider is at your door by 7:42pm. You eat
          by 8pm. The vegetables were cut 25 minutes before you ate them.
        </p>

        <h2>What this costs us (and what it costs you)</h2>
        <p>
          Cutting after the order means our studio needs knife staff available from 7am to 9pm,
          which is a 14-hour shift with rotating breaks. We pay for that. We also pay for
          produce that we cut for orders that don&apos;t come in (because we had to buy for the
          day). That waste is a real cost. We absorb it. Our margin is lower than the
          pre-cut competitors. We don&apos;t apologize for that.
        </p>
        <p>
          For you, the difference is that your diced onion is sharp, your chopped palak is
          green (not the grey-green it goes after 12 hours in a bag), your tomato is firm,
          and your juice is pressed in the last 30 minutes. If you can&apos;t tell the difference
          from a pre-cut option, the price premium is real and you shouldn&apos;t pay it. If you
          can tell, the price premium is worth it.
        </p>

        <h2>What we will never do</h2>
        <p>
          We will never pre-cut and hold. We will never have a &quot;this morning&apos;s batch&quot; cooler.
          We will never accept an order we cannot fulfill in under 30 minutes by cutting
          fresh. The promise is the promise.
        </p>
        <p>
          If you order at 8:55pm and we&apos;re already winding down for the day, the app will
          show you the next available slot, not pretend we can serve you. Honesty about
          constraints is part of the deal.
        </p>

        <h2>Why I&apos;m writing this</h2>
        <p>
          Because the founder of a 2-person company should explain the one decision that
          defines them. Mine is: cut after the order, not before. Everything else flows from
          that. The price, the menu, the hours, the staff model. If you get that, you get
          SABXI.
        </p>
        <p>
          Thanks for reading. Order some cut sabzi tonight. We promise the knife moved for
          you.
        </p>
        <p>
          — Syed Irfan Raza, Founder
        </p>

        <div className={styles.ctaBox}>
          <p>Order tonight. See the difference freshness makes.</p>
          <AppStoreBadges className={styles.ctaBadges} />
          <p className={styles.ctaLinks}>
            <Link href="/blog/">← All posts</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
