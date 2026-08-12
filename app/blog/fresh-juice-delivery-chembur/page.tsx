import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreBadges } from "../../components/AppStoreBadges";
import styles from "../[slug]/page.module.css";

export const metadata: Metadata = {
  title: "Fresh Juice Delivery in Chembur | SABXI",
  description: "Cold-pressed juice delivered in under 30 minutes in Chembur and nearby. Pressed after you order, not bottled days ahead. From the SABXI Studio team in Kurla.",
};

export default function FreshJuiceDeliveryChemburPage() {
  return (
    <div className={styles.ip}>
      <main className={styles.wrap}>
        <span className={styles.label}>Chembur</span>
        <h1>Fresh juice delivery in Chembur: why we cold-press after you order</h1>
        <p className={styles.meta}>Published 11 Aug 2026 · Sabxi Private Limited</p>
        <p className={styles.lead}>
          There is a difference between &quot;fresh juice&quot; and &quot;freshly pressed juice&quot;. One is bottled
          in a factory on Tuesday, sits in a cold chain for 5 days, and arrives at your door
          already 5 days older than the day it was pressed. The other is pressed after you tap
          the button on the app. Here is why we do the second one.
        </p>

        <h2>What happens to juice after it&apos;s pressed</h2>
        <p>
          Once you press a fruit or vegetable, the enzymes inside it start breaking down the
          cell walls. That is why fresh orange juice tastes different at the source vs an hour
          later vs a day later. The vitamin C content drops measurably within 24 hours, even
          refrigerated. The colour darkens. The flavour flattens. The nutrients don&apos;t
          disappear, but the bioactive forms that your body absorbs easily do.
        </p>
        <p>
          This is true for every cold-pressed juice on the market. It does not matter how fancy
          the bottle is or how organic the produce was. Time is the enemy. The only way to
          deliver juice at peak nutrition is to press it close to the moment of consumption.
        </p>

        <h2>Why we press after you order, not before</h2>
        <p>
          SABXI Studio opens at 7am. From 7am to 9pm every day, we press juice on demand. The
          workflow looks like this: your order comes in, the rider picks the produce from
          cold storage, the press runs, the juice is bottled and sealed, the rider takes it
          to you. Total time from &quot;I want juice&quot; to &quot;I&apos;m drinking juice&quot; is under 30 minutes.
        </p>
        <p>
          We do not pre-bottle. We do not hold inventory. We do not have a &quot;batch pressed this
          morning&quot; cooler. The only juice that exists is the juice you ordered, pressed for you.
        </p>

        <h2>What we press</h2>
        <ul>
          <li><strong>Orange (navel, from Nashik)</strong> — the standard. Sweet, balanced, never bitter.</li>
          <li><strong>Mosambi</strong> — lighter, more floral. Pairs well with chaat masala on the rim.</li>
          <li><strong>Watermelon (summer only)</strong> — water-heavy, but cold-pressed gives a real fruit flavor that bottled watermelon juice never has.</li>
          <li><strong>Mix-fruit (seasonal)</strong> — whatever&apos;s ripe. Currently orange + pomegranate + a touch of ginger.</li>
          <li><strong>Green detox</strong> — palak, cucumber, celery, apple, lemon. Tastes like health, which is a flavor some people genuinely like.</li>
        </ul>

        <h2>What we don&apos;t do (and why)</h2>
        <p>
          We don&apos;t add sugar, preservatives, &quot;natural flavors&quot;, or water. The bottle you get is
          the produce you see in the app, pressed, nothing else. If you want a sweeter juice,
          we mix in a sweeter fruit. If you want it diluted, you do that at home.
        </p>
        <p>
          We don&apos;t sell &quot;3-day cleanse&quot; packs or &quot;7-day detox&quot; programs. Drink juice because you
          want a juice, not because a marketing email scared you. That&apos;s not a moral position,
          it&apos;s just that we don&apos;t have the supply chain for cleanses and don&apos;t want to build one.
        </p>

        <h2>How to order juice in Chembur</h2>
        <ol>
          <li>Open the SABXI app, set your Chembur address</li>
          <li>Tap the juice you want</li>
          <li>Watch the rider route in the app — &quot;pressed&quot;, &quot;bottled&quot;, &quot;en route&quot;, &quot;delivered&quot;</li>
          <li>Drink it within 30 minutes for peak taste and nutrition</li>
        </ol>
        <p>
          Each bottle is 350ml. The press gives you 250-300ml depending on the produce. We
          charge for the press, not the water.
        </p>

        <h2>Try it once</h2>
        <p>
          One bottle. Any flavor. If you don&apos;t notice the difference from bottled juice, you&apos;ve
          lost ₹120. If you do, you&apos;ve stopped buying the bottled stuff forever.
        </p>
        <p>
          More from us: <Link href="/blog/why-we-cut-after-you-order/">Why we cut after you order</Link>.
        </p>

        <div className={styles.ctaBox}>
          <p>Pressed for you, not pressed for inventory.</p>
          <AppStoreBadges className={styles.ctaBadges} />
          <p className={styles.ctaLinks}>
            <Link href="/blog/">← All posts</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
