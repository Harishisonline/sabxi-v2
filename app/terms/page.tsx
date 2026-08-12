import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Terms of Service — SABXI",
  description:
    "SABXI Terms of Service — eligibility, ordering, delivery, payment, refunds, and acceptable use of the SABXI app and website.",
};

export default function TermsPage() {
  return (
    <div className={styles.ip}>
      <main className={styles.wrap}>
        <p className={styles.label}>Legal</p>
        <h1>Terms of Service</h1>
        <p className={styles.updated}>Last updated: 28 July 2026</p>

        <p className={styles.intro}>
          These Terms of Service (“Terms”) govern your use of the SABXI mobile application, website
          (sabxi.com), and related services operated by <strong>Sabxi Private Limited</strong>{" "}
          (“SABXI,” “we,” “us”). By creating an account in the SABXI app, placing an order, or
          using our Service, you agree to these Terms.
        </p>

        <h2>1. Who we are</h2>
        <p>
          Sabxi Private Limited (CIN U46301MH2026PTC473853, GSTIN 27ABUCS4728H1ZP) operates the SABXI
          brand: cut-to-order fresh vegetables and fruits, juices, smoothies, whole produce, and
          Mixed Packs prepared at SABXI Studio and delivered for a fee. Registered office: 501, Plot
          No. 32 Emerald, Union Park CHS Ltd, Mumbai, Maharashtra 400071. Operations studio: Kurla,
          Mumbai.
        </p>

        <h2>2. Eligibility</h2>
        <p>
          You must be at least 18 years old and capable of entering a binding contract under Indian
          law. If you create a SABXI app account, you are responsible for keeping your account
          details accurate and your login credentials secure. The web site at sabxi.com does not
          require an account to browse.
        </p>

        <h2>3. The Service</h2>
        <ul>
          <li>
            Orders are placed through the SABXI app (iOS and Android) or channels we expressly
            enable.
          </li>
          <li>
            Produce is washed, cut, pressed, or packed <strong>after</strong> you place an order,
            then delivered within our stated service window where your address is serviceable.
          </li>
          <li>
            Delivery times (including “under 30 minutes”) are estimates based on studio capacity,
            traffic, and address distance — not guaranteed SLAs unless we say otherwise in writing
            for a specific offer.
          </li>
          <li>
            Availability of items, cut styles, and delivery slots may change during the day.
          </li>
        </ul>

        <h2>4. Pricing and payment</h2>
        <p>
          Prices shown in the app include applicable taxes unless stated otherwise. You authorize us
          (and our payment partners) to charge the payment method you provide. Promotional pricing
          and subscriptions may have additional conditions shown at checkout.
        </p>

        <h2>5. Delivery area</h2>
        <p>
          We currently fulfil from <strong>SABXI Studio, Kurla</strong> within a limited radius.
          Serviceability is confirmed in the app when you enter your address. See{" "}
          <Link href="/areas/">Service Areas</Link>. We may refuse or cancel orders outside our
          delivery zone.
        </p>

        <h2>6. Your responsibilities</h2>
        <ul>
          <li>Provide a correct delivery address, phone number, and any access instructions.</li>
          <li>
            Be available to receive perishable orders; unattended delivery risk is yours if you
            request leave-at-door.
          </li>
          <li>
            Do not misuse the Service (fraud, abuse of refunds, scraping, reverse engineering, or
            resale without permission).
          </li>
        </ul>

        <h2>7. Food nature and allergens</h2>
        <p>
          Fresh produce and juices are perishable. Consume promptly and store as appropriate. If you
          have allergies or dietary restrictions, review product details carefully and contact us
          before ordering when unsure. Cross-contact in a live kitchen is possible despite care.
        </p>

        <h2>8. Cancellations, refunds, and replacements</h2>
        <p>
          Rules for cancelling orders, refunds, and replacements are set out in our{" "}
          <Link href="/refund/">Refund &amp; Cancellation Policy</Link>, which forms part of these
          Terms.
        </p>

        <h2>9. Subscriptions</h2>
        <p>
          If you enrol in a daily or recurring basket, you authorize recurring charges until you
          cancel in the app or by contacting support. Changes to subscription items or schedules
          follow the options shown in the app.
        </p>

        <h2>10. Intellectual property</h2>
        <p>
          SABXI name, logo, app, website content, and related marks are owned by Sabxi Private
          Limited or its licensors. You may not copy or use them without prior written consent.
        </p>

        <h2>11. Disclaimers</h2>
        <p>
          The Service is provided on an “as available” basis. To the fullest extent permitted by law,
          we disclaim warranties not expressly stated here. We do not warrant uninterrupted or
          error-free operation of the app or website.
        </p>

        <h2>12. Limitation of liability</h2>
        <p>
          To the fullest extent permitted under Indian law, Sabxi Private Limited’s total liability
          arising from any order or use of the Service is limited to the amount you paid for the
          affected order. We are not liable for indirect, incidental, or consequential losses
          (including lost profits), except where liability cannot be limited by law (e.g. proven
          gross negligence or wilful misconduct).
        </p>

        <h2>13. Indemnity</h2>
        <p>
          You agree to indemnify Sabxi Private Limited against claims arising from your misuse of the
          Service, inaccurate delivery information, or breach of these Terms.
        </p>

        <h2>14. Privacy</h2>
        <p>
          Personal data is handled as described in our <Link href="/privacy/">Privacy Policy</Link>.
        </p>

        <h2>15. Changes</h2>
        <p>
          We may update these Terms from time to time. The “Last updated” date will change; continued
          use after posting constitutes acceptance of the revised Terms for future orders.
        </p>

        <h2>16. Governing law</h2>
        <p>
          These Terms are governed by the laws of India. Courts in Mumbai, Maharashtra shall have
          exclusive jurisdiction, subject to any mandatory consumer protections that apply to you.
        </p>

        <h2>17. Contact</h2>
        <p>
          Questions: <a href="mailto:info@sabxi.com">info@sabxi.com</a> or in-app support.
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
