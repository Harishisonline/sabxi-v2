import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy — SABXI",
  description:
    "SABXI Refund & Cancellation Policy — how order changes, cancellations, replacements, and refunds work for perishable cut-to-order fresh food.",
};

export default function RefundPage() {
  return (
    <div className={styles.ip}>
      <main className={styles.wrap}>
        <p className={styles.label}>Legal</p>
        <h1>Refund &amp; Cancellation Policy</h1>
        <p className={styles.updated}>Last updated: 28 July 2026</p>

        <p className={styles.intro}>
          This Refund &amp; Cancellation Policy explains how Sabxi Private Limited (“SABXI”) handles
          order changes, cancellations, replacements, and refunds for the SABXI app and related
          services. It forms part of our <Link href="/terms/">Terms of Service</Link>.
        </p>

        <h2>1. Perishable products</h2>
        <p>
          SABXI prepares cut vegetables, cut fruits, juices, smoothies, Mixed Packs, and whole
          produce <strong>after you order</strong>. Because items are fresh and made to order,
          cancellation and refund windows are shorter than for packaged retail goods.
        </p>

        <h2>2. Cancelling an order</h2>
        <ul>
          <li>
            <strong>Before prep starts:</strong> You may cancel in the app (or via support) while the
            order is still in a cancellable status. A full refund of the order amount (excluding
            non-refundable fees if any were disclosed) will be issued to the original payment method.
          </li>
          <li>
            <strong>After prep or dispatch:</strong> Cancellation is generally not available once
            cutting, pressing, packing, or rider assignment has begun, because the product is
            perishable and made for you.
          </li>
          <li>
            If the app does not allow cancel, contact support immediately at{" "}
            <a href="mailto:info@sabxi.com">info@sabxi.com</a> or in-app chat — we will confirm
            whether cancellation is still possible.
          </li>
        </ul>

        <h2>3. When we may cancel</h2>
        <p>
          We may cancel if your address is outside the delivery zone, payment fails, an item is
          unavailable, studio capacity is exceeded, or we suspect fraud. You will receive a full
          refund for amounts paid for that order.
        </p>

        <h2>4. Issues after delivery</h2>
        <p>
          Contact us <strong>as soon as possible</strong> (ideally within a few hours of delivery)
          if:
        </p>
        <ul>
          <li>Items are missing, wrong, or incomplete</li>
          <li>Packaging is damaged and product quality is affected</li>
          <li>Produce arrives spoiled, wilted, or clearly not fresh</li>
          <li>You received someone else’s order</li>
        </ul>
        <p>
          Please share your order ID and photos when relevant — this helps us fix the issue faster
          and improve our studio.
        </p>

        <h2>5. Replacements and refunds</h2>
        <p>
          Where we confirm a quality or fulfilment issue attributable to SABXI, we will typically
          offer (at our discretion, based on the case):
        </p>
        <ul>
          <li>
            A <strong>replacement</strong> of the affected item(s) on the next available slot, or
          </li>
          <li>
            A <strong>partial or full refund</strong> for the affected item(s) or order, or
          </li>
          <li>App credit of equivalent value</li>
        </ul>
        <p>
          Refunds are processed to the original payment method. Bank or wallet timelines (often 5–10
          business days) are controlled by your payment provider.
        </p>

        <h2>6. What is generally not refundable</h2>
        <ul>
          <li>Change of mind after prep or dispatch has started</li>
          <li>Incorrect address or phone number provided by you</li>
          <li>
            Inability to receive the order when the rider arrives (unless we failed to attempt
            delivery as shown in tracking)
          </li>
          <li>
            Taste or cut-style preference disputes where the order matched what you selected (we will
            still listen — contact support)
          </li>
          <li>
            Delays caused by traffic, weather, building access, or force majeure, unless we cancel
            the order ourselves
          </li>
        </ul>

        <h2>7. Subscriptions</h2>
        <p>
          You can pause or cancel a subscription for future deliveries from the app. Charges already
          processed for a delivery that was prepared or completed follow the same rules as one-time
          orders. Cancel before the cutoff shown in the app to avoid the next day’s charge.
        </p>

        <h2>8. How to request help</h2>
        <ol>
          <li>Open the SABXI app → your order → support, or</li>
          <li>
            Email <a href="mailto:info@sabxi.com">info@sabxi.com</a> with order ID, issue, and photos
          </li>
        </ol>
        <p>We aim to respond within one business day.</p>

        <h2>9. Consumer rights</h2>
        <p>
          Nothing in this policy limits rights you may have under applicable Indian consumer
          protection law.
        </p>

        <div className={styles.contactBox}>
          <h2>Contact</h2>
          <p>
            <strong>Sabxi Private Limited</strong> (brand: SABXI)
            <br />
            CIN: U46301MH2026PTC473853
            <br />
            GSTIN: 27ABUCS4728H1ZP
            <br />
            Email: <a href="mailto:info@sabxi.com">info@sabxi.com</a>
            <br />
            Studio: Kurla, Mumbai ·{" "}
            <a href="https://share.google/Be6ad2LS0plYCVRL5" target="_blank" rel="noopener">
              Maps
            </a>
            <br />
            Also see: <Link href="/privacy/">Privacy</Link> · <Link href="/terms/">Terms</Link> ·{" "}
            <Link href="/refund/">Refunds</Link> · <Link href="/company/">Company</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
