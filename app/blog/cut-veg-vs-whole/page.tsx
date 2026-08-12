import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreBadges } from "../../components/AppStoreBadges";
import styles from "../post.module.css";

export const metadata: Metadata = {
  title: "Cut Veg vs Whole: Which Should You Order? | SABXI",
  description: "When pre-cut saves you time, when whole is better, and how SABXI does both without compromising freshness. Practical guide from the SABXI Studio team in Kurla.",
};

export default function CutVegVsWholePage() {
  return (
    <div className={styles.ip}>
      <main className={styles.wrap}>
        <span className={styles.label}>Guide</span>
        <h1>Cut veg vs whole: which should you order?</h1>
        <p className={styles.meta}>Published 11 Aug 2026 · Sabxi Private Limited</p>
        <p className={styles.lead}>
          The &quot;fresh-cut convenience&quot; question is not actually a binary. There are vegetables
          that should always be cut to order, vegetables where it doesn&apos;t matter, and a few
          where whole is genuinely better. Here is the practical guide.
        </p>

        <h2>The real question is: how long until you cook it?</h2>
        <p>
          Cut produce is more perishable than whole because cutting breaks the skin and exposes
          the inside to oxygen. The rate of deterioration depends on the vegetable and the
          time. So the question is not &quot;whole vs cut&quot; but &quot;how much time between buying and
          cooking&quot;.
        </p>
        <ul>
          <li><strong>Under 2 hours:</strong> cut is fine. The exposed surface hasn&apos;t started breaking down significantly.</li>
          <li><strong>2-6 hours:</strong> cut is fine for most vegetables, but tomatoes and cucumber start to go limp. Onion stays sharp.</li>
          <li><strong>6-24 hours:</strong> cut is fine for onion, garlic, ginger, potato, carrot, beet. Cut tomato, cucumber, leafy greens start to lose quality.</li>
          <li><strong>Over 24 hours:</strong> buy whole. Cut at home the morning of cooking. Tomatoes, leafy greens, cucumber, capsicum, broccoli all benefit from being whole in the fridge.</li>
        </ul>

        <h2>What we cut for you (the default)</h2>
        <p>
          For most orders, we cut to your spec. You tap the app, you select dicing or slicing
          or julienning, you add a cooking note (&quot;thick slices for sandwich&quot;, &quot;fine dice for
          gravy&quot;), we cut and deliver. The knife moves after your tap. That&apos;s the default.
        </p>
        <p>
          This is right for: weekday dinners, tiffin service, batch cooking, anyone short on
          time. If you&apos;re cooking within 6 hours, cut to order gives you a fresher product
          than anything you could have cut in the morning.
        </p>

        <h2>What we recommend you buy whole</h2>
        <p>
          For produce you&apos;re not cooking today, buy whole. We stock the same mandi-fresh
          tomatoes, palak, bhindi, gajar, kheera — and they&apos;re a little cheaper because we
          don&apos;t cut them. Examples:
        </p>
        <ul>
          <li><strong>Tomatoes for Friday&apos;s curry</strong> — buy Wednesday, leave on the counter, cook Friday. They&apos;ll be riper and more flavorful than anything we cut today and refrigerate.</li>
          <li><strong>Palak for a weekend special</strong> — same. Buy Thursday, store in the fridge, cook Saturday. Whole palak holds better than cut.</li>
          <li><strong>Cucumber for raita on Sunday</strong> — buy Saturday, store whole, cut at home Sunday morning. The cut cucumber in your raita will be crisper than anything we delivered on Friday.</li>
          <li><strong>Mangoes, bananas, papayas</strong> — always whole. Cutting accelerates ripening. If you&apos;re going to cut, cut just before eating.</li>
        </ul>

        <h2>The hybrid pattern that actually works</h2>
        <p>
          Most of our regular customers do a mix: today&apos;s cooking ingredients cut-to-order
          from us, tomorrow&apos;s and beyond bought whole from us. The app lets you do both in a
          single order. You add diced tomatoes for tonight&apos;s dinner (cut, delivered in 30
          minutes) and whole tomatoes and a cucumber for the rest of the week (no prep, in the
          fridge by evening).
        </p>
        <p>
          That&apos;s the answer to &quot;cut or whole&quot; — it depends on the day, the dish, and your
          schedule. SABXI does both. Pick what you need.
        </p>

        <h2>What we never do</h2>
        <p>
          We never pre-cut and hold. There is no &quot;cut this morning, in your fridge by afternoon&quot;
          inventory in our studio. The cut-to-order promise is the whole point. If we cut
          something and you don&apos;t order it, it goes to the rider team for lunch. We&apos;re
          committed to the model.
        </p>
        <p>
          More from us: <Link href="/blog/why-we-cut-after-you-order/">Why we cut after you order</Link>{" "}
          and <Link href="/blog/best-cut-veg-chembur/">Best cut vegetables near Chembur</Link>.
        </p>

        <div className={styles.ctaBox}>
          <p>Order cut for tonight. Whole for the week. One order, both.</p>
          <AppStoreBadges className={styles.ctaBadges} />
          <p className={styles.ctaLinks}>
            <Link href="/blog/">← All posts</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
