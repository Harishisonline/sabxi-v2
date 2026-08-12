import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — SABXI",
  description:
    "SABXI Privacy Policy — how we collect, use, disclose, and safeguard your information when you use sabxi.com and the SABXI mobile application.",
};

export default function PrivacyPage() {
  return (
    <div className={styles.ip}>
      <main className={styles.wrap}>
        <p className={styles.label}>Legal</p>
        <h1>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: 22 June 2026</p>

        <p className={styles.intro}>
          SABXI (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website at{" "}
          <a href="https://sabxi.com">sabxi.com</a> and the SABXI mobile application (collectively,
          the &quot;Service&quot;). This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you use our Service.
        </p>

        <h2>Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>
            <strong>SABXI app account information</strong> — name, phone number, email address, and
            delivery address when you create an account in the SABXI mobile app.
          </li>
          <li>
            <strong>Order information</strong> — products ordered, payment method, delivery
            preferences, and order history.
          </li>
          <li>
            <strong>Location data</strong> — delivery address and, with your permission, live
            location to track orders and improve delivery accuracy.
          </li>
          <li>
            <strong>Device information</strong> — device type, operating system, browser type, IP
            address, and app usage data.
          </li>
          <li>
            <strong>Communications</strong> — messages you send to our support team and feedback you
            provide.
          </li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process and deliver your orders from SABXI Studio.</li>
          <li>Provide live order tracking and delivery updates.</li>
          <li>Manage your account, subscriptions, and payment processing in the SABXI app.</li>
          <li>
            Send order confirmations, service notifications, and promotional offers (you can opt out
            of marketing at any time).
          </li>
          <li>Improve our products, app experience, and delivery operations.</li>
          <li>Comply with applicable laws and resolve disputes.</li>
        </ul>

        <h2>Sharing Your Information</h2>
        <p>We do not sell your personal information. We may share data with:</p>
        <ul>
          <li>
            <strong>Delivery partners</strong> — to fulfil and deliver your orders.
          </li>
          <li>
            <strong>Payment processors</strong> — to securely process transactions.
          </li>
          <li>
            <strong>Service providers</strong> — who help us operate the app, website, analytics, and
            customer support.
          </li>
          <li>
            <strong>Legal authorities</strong> — when required by law or to protect our rights and
            safety.
          </li>
        </ul>

        <h2>Data Retention</h2>
        <p>
          We retain your personal information for as long as your SABXI app account is active or
          as needed to provide the Service, comply with legal obligations, resolve disputes, and
          enforce our agreements.
        </p>

        <h2>Data Security</h2>
        <p>
          We implement appropriate technical and organisational measures to protect your personal
          information. However, no method of transmission over the internet is 100% secure, and we
          cannot guarantee absolute security.
        </p>

        <h2>Your Rights</h2>
        <p>Depending on applicable law, you may have the right to:</p>
        <ul>
          <li>Access, correct, or delete your personal data.</li>
          <li>Withdraw consent for location tracking or marketing communications.</li>
          <li>Request a copy of the data we hold about you.</li>
          <li>Lodge a complaint with a relevant data protection authority.</li>
        </ul>
        <p>
          To exercise these rights, contact us at{" "}
          <a href="mailto:info@sabxi.com">info@sabxi.com</a>.
        </p>

        <h2>Cookies &amp; Analytics</h2>
        <p>
          Our website may use cookies and similar technologies to improve your browsing experience
          and understand how visitors use our site. You can control cookies through your browser
          settings.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our Service is not directed to children under 18. We do not knowingly collect personal
          information from children. If you believe we have collected such data, please contact us
          and we will delete it promptly.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will post the revised policy on
          this page and update the &quot;Last updated&quot; date. Continued use of the Service after
          changes constitutes acceptance of the updated policy.
        </p>

        <div className={styles.contactBox}>
          <h2>Contact Us</h2>
          <p>If you have questions about this Privacy Policy or our data practices, reach us at:</p>
          <p>
            <strong>Sabxi Private Limited</strong>
            <br />
            Brand: SABXI
            <br />
            CIN: U46301MH2026PTC473853
            <br />
            GSTIN: 27ABUCS4728H1ZP
            <br />
            Incorporated: 23 July 2026 · RoC-Mumbai
            <br />
            Registered office: 501, Plot No. 32 Emerald, Union Park CHS Ltd, Mumbai, Maharashtra
            400071
            <br />
            Studio / operations: Kurla, Mumbai
            <br />
            Email: <a href="mailto:info@sabxi.com">info@sabxi.com</a>
            <br />
            Website: <a href="https://sabxi.com">sabxi.com</a>
            <br />
            App Store:{" "}
            <a href="https://apps.apple.com/in/app/sabxi/id6783602290">Download on App Store</a>
            <br />
            Google Play:{" "}
            <a href="https://play.google.com/store/apps/details?id=com.sabxi.sabxi">
              Download on Google Play
            </a>
            <br />
            Studio Maps: <a href="https://share.google/Be6ad2LS0plYCVRL5">Google Maps</a>
            <br />
            Company profile:{" "}
            <a
              href="https://www.falconebiz.com/company/SABXI-PRIVATE-LIMITED-U46301MH2026PTC473853"
              target="_blank"
              rel="noopener noreferrer"
            >
              Falcon eBiz / MCA
            </a>
          </p>
        </div>

        <p className={styles.legalNav}>
          <Link href="/">Home</Link> · <Link href="/terms/">Terms</Link> ·{" "}
          <Link href="/refund/">Refunds</Link> · <Link href="/privacy/">Privacy Policy</Link>
        </p>
      </main>
    </div>
  );
}
