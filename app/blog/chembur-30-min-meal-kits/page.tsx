import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreBadges } from "../../components/AppStoreBadges";
import styles from "../post.module.css";

export const metadata: Metadata = {
  title: "30-Minute Meal Kits from Chembur | SABXI",
  description: "Weeknight dinner ideas using SABXI cut veggies, Mixed Packs, and juices. Dinner in 30 minutes or less. From the SABXI Studio team in Kurla.",
};

export default function Chembur30MinMealKitsPage() {
  return (
    <div className={styles.ip}>
      <main className={styles.wrap}>
        <span className={styles.label}>Chembur</span>
        <h1>30-minute meal kits from Chembur: dinner without the chopping</h1>
        <p className={styles.meta}>Published 11 Aug 2026 · Sabxi Private Limited</p>
        <p className={styles.lead}>
          Five weeknight dinners that take 30 minutes active time, because the chopping and
          washing is already done. All use cut-to-order produce from SABXI Studio, delivered
          in under 30 minutes. Cook from 7:30pm, eat by 8pm. Here is the week&apos;s plan.
        </p>

        <h2>Monday: palak paneer (the one you already know)</h2>
        <p>
          Order: 500g paneer (from your local dairy, not us), 300g chopped palak, 1 diced
          onion, 2 diced tomatoes, ginger-garlic paste, green chilli, garam masala, salt,
          butter. Delivery arrives 7pm. Cook 7:15-7:45pm.
        </p>
        <p>
          Method: heat butter, add the diced onion, brown 5 minutes, add ginger-garlic paste
          and green chilli, 1 minute, add the diced tomatoes and cook down 5 minutes, add
          the palak and ½ cup water, simmer 5 minutes, add cubed paneer and garam masala,
          warm through 2 minutes. Eat with rotis.
        </p>
        <p>
          Active time: 20 minutes. Serves 3.
        </p>

        <h2>Tuesday: Mixed Pack rajma</h2>
        <p>
          Order: 1 SABXI Mixed Pack (rajma). Comes with pre-soaked rajma, diced onion, ginger-garlic,
          tomato puree, whole spices, salt. Delivery 7pm. Cook 7:15-7:50pm.
        </p>
        <p>
          Method: heat oil, add the spice sachet (provided), bloom 30 seconds, add the
          onion-tomato puree from the pack, cook 5 minutes, add the soaked rajma + 2 cups
          water, pressure cook 20 minutes (or simmer 40 minutes in a pot). Done.
        </p>
        <p>
          Active time: 15 minutes. Serves 4.
        </p>

        <h2>Wednesday: chole (chana) + rice</h2>
        <p>
          Order: 1 SABXI Mixed Pack (chana) + 1kg rice (from your kirana). The pack has
          pre-soaked chana, the whole spice mix, the masala base. Cook rice in your rice
          cooker. Cook the chole per the pack instructions.
        </p>
        <p>
          Active time: 10 minutes (the pack does most of the work). Serves 4.
        </p>

        <h2>Thursday: stir-fry vegetables + rice + dal</h2>
        <p>
          Order: SABXI stir-fry mix (diced carrots, beans, capsicum, baby corn, mushroom),
          plus 1kg rice, plus your preferred dal (we have toor dal packs). Cook dal in
          pressure cooker, cook rice, stir-fry the veg in 3 tablespoons oil + soy sauce +
          garlic + ginger for 8 minutes.
        </p>
        <p>
          Active time: 25 minutes. Serves 3-4.
        </p>

        <h2>Friday: treat yourself (order out)</h2>
        <p>
          Friday is not the day to be cooking. Order out. Don&apos;t feel guilty. The point of
          meal-prep is to give you Fridays back, not to chain you to the stove every night
          of the week.
        </p>

        <h2>How the kit actually saves you time</h2>
        <p>
          The cutting is 15-20 minutes of your evening that you don&apos;t have to do. Dicing
          3 onions, slicing 4 tomatoes, mincing 6 cloves garlic, julienning ginger, chopping
          500g palak — that&apos;s the work that the app saves you. Everything else (the actual
          cooking) is still you, and still takes the same time. But &quot;dinner in 30 minutes
          including all the prep&quot; is the difference between cooking and ordering out.
        </p>

        <h2>Try one this week</h2>
        <p>
          Order the Monday palak paneer kit. See if the 30 minutes works for your household.
          If yes, you&apos;ll have figured out a system. If no, you&apos;ve lost an evening and a small
          amount of money, which is the entire point of testing before committing.
        </p>
        <p>
          More from us: <Link href="/blog/mumbai-meal-prep-guide/">Mumbai meal-prep guide</Link>{" "}
          and <Link href="/blog/best-cut-veg-chembur/">Best cut vegetables near Chembur</Link>.
        </p>

        <div className={styles.ctaBox}>
          <p>30 minutes, including prep. Order tonight&apos;s cut veg.</p>
          <AppStoreBadges className={styles.ctaBadges} />
          <p className={styles.ctaLinks}>
            <Link href="/blog/">← All posts</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
