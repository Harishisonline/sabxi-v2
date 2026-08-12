import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreBadges } from "../../components/AppStoreBadges";
import styles from "../[slug]/page.module.css";

export const metadata: Metadata = {
  title: "Mumbai Meal-Prep Guide | SABXI",
  description: "A lighter way to meal-prep in Mumbai: plan dinners, stock pantry staples, order fresh cuts the day you cook. From the SABXI Studio team in Kurla.",
};

export default function MumbaiMealPrepGuidePage() {
  return (
    <div className={styles.ip}>
      <main className={styles.wrap}>
        <span className={styles.label}>Guide</span>
        <h1>Mumbai meal-prep guide: how to use cut-to-order produce without waste</h1>
        <p className={styles.meta}>Published 11 Aug 2026 · Sabxi Private Limited</p>
        <p className={styles.lead}>
          Most meal-prep guides assume you have a Sunday, a fridge big enough for 12 containers,
          and a tolerance for soggy Wednesday veg. None of those are realistic for a Mumbai
          kitchen. Here is the lighter version that works in a flat in Chembur with a
          single-shelf fridge and a 7-minute attention span.
        </p>

        <h2>Why Sunday-prep is overrated here</h2>
        <p>
          The traditional meal-prep model works in colder cities. You cook on Sunday, the food
          holds for 5 days, and by Friday it is still safe to eat. Mumbai humidity does not
          cooperate. Rice goes hard in the fridge. Palak goes grey. Cooked sabzi develops a smell
          that no amount of reheating fixes. So we throw away half of what we prepped.
        </p>
        <p>
          The actual goal of meal-prep is not &quot;cook everything on Sunday&quot;. The actual goal is
          <strong>decide what to cook before you are hungry</strong>. Hunger is what makes you
          order Maggi at 9pm. Decision is what makes you cook at 8pm. So the prep work that
          actually matters is the thinking, not the cooking.
        </p>

        <h2>The 3-step plan that actually saves time</h2>
        <ol>
          <li>
            <strong>Sunday night: pick 3 dinners for the week.</strong> Don&apos;t plan 7 — that&apos;s
            exhausting. Pick 3 dishes that use overlapping ingredients. Example: Monday palak
            paneer, Wednesday chana masala, Friday rajma. All three use onion, tomato, ginger,
            garlic. You buy one set of base ingredients.
          </li>
          <li>
            <strong>Sunday night: order the perishable stuff.</strong> Fresh palak for Monday,
            chana already soaked (we can do this for you), tomatoes, ginger, garlic. Total cost
            is around what one Chembur dinner delivery would be. It arrives Monday morning cut
            to your spec.
          </li>
          <li>
            <strong>Weeknight: 20 minutes active time per meal.</strong> Because the prep is
            done, the actual cooking is just: open SABXI app, tap the recipe, heat the pan,
            add the cut veg, cook the protein, eat. The thinking happened Sunday night when you
            were still full from dinner.
          </li>
        </ol>

        <h2>What to order from SABXI (and when)</h2>
        <p>
          We split the order into two deliveries because not everything stays fresh for the
          full week.
        </p>
        <ul>
          <li>
            <strong>Monday morning:</strong> diced tomatoes, sliced onions, julienned ginger
            and garlic, chopped palak (for Monday&apos;s dish), chopped spinach or fenugreek (for
            Wednesday). All cut to your spec.
          </li>
          <li>
            <strong>Wednesday morning:</strong> whole soaked chana, diced onion for chana
            masala, sliced onion for rajma, chopped coriander. The dry stuff (chana, rajma,
            rice, atta) you bought on Sunday and kept in the cupboard.
          </li>
        </ul>
        <p>
          That&apos;s it. Two orders, two mornings, both delivered to your door in under 30 minutes.
          Total cost of the cut-veg portion across 3 dinners is around ₹200-300. Less than one
          delivery dinner.
        </p>

        <h2>What NOT to prep ahead</h2>
        <p>
          Don&apos;t cut cucumber, onion, or tomato ahead of time. The onion goes sharp and the
          tomato goes mushy. If you need sliced onion for two days of cooking, store it in
          water in the fridge — it stays crisp for 24 hours. Beyond that, order fresh.
        </p>
        <p>
          Don&apos;t pre-cook palak or methi. They lose both colour and nutrition within 24 hours.
          The point of SABXI is that we cut it fresh on the morning you cook it. Use that.
        </p>

        <h2>What about Mixed Packs?</h2>
        <p>
          For weeks when even 3 dinners of decision-making feels like too much: our Mixed Packs
          (rajma mix, chana mix, moong dal mix) come pre-soaked, pre-washed, pre-portioned.
          You skip the Sunday prep entirely. The thinking is already done for you — the pack is
          your decision. Heat oil, add the pack, 20 minutes later: dinner.
        </p>

        <h2>Try it this week</h2>
        <p>
          Pick 3 dinners. Order Monday&apos;s ingredients from us. See if the week goes smoother.
          If it does, you have a system. If it doesn&apos;t, you&apos;ve spent one bad week and a small
          amount of money, which is the entire point of testing before committing.
        </p>
        <p>
          More from us: <Link href="/blog/best-cut-veg-chembur/">Best cut vegetables near Chembur</Link>{" "}
          and <Link href="/blog/cut-veg-vs-whole/">Cut veg vs whole: which should you order?</Link>.
        </p>

        <div className={styles.ctaBox}>
          <p>Try the lighter meal-prep. Order fresh cuts for Monday.</p>
          <AppStoreBadges className={styles.ctaBadges} />
          <p className={styles.ctaLinks}>
            <Link href="/blog/">← All posts</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
