import Link from "next/link";
import { AppStoreBadges } from "./AppStoreBadges";
import styles from "./SiteFooter.module.css";

/**
 * SiteFooter — matches sabxiharish/app/globals.css footer design.
 *
 * Structure (4-column grid + brand + legal + copy):
 *   Row 1: Brand (logo + blurb + tagline) | Product | Contact | Legal
 *   Row 2: Legal line (CIN, GSTIN, registered office, MCA link)
 *   Row 3: Copyright + Privacy / Terms / Refunds / Company / About
 *
 * The only difference from sabxiharish:
 *   - App Store / Google Play in Contact column use the official SVG/PNG
 *     badges via <AppStoreBadges> instead of text links. All other
 *     routing is to MY project's pages, not sabxiharish's.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-trans.png" alt="SABXI" />
          <p>
            SABXI is a D2C fresh food brand by <strong>Sabxi Private Limited</strong> — changing
            how the world eats with freshly cut veggies, cut fruits, cold-pressed juices, whole
            produce, and smoothies, prepared live at SABXI Studio and delivered in under 30
            minutes.
          </p>
          <div className={styles.tag}>Freshly Cut, Quickly Delivered.</div>
        </div>

        <div className={styles.col}>
          <h5>Product</h5>
          <ul>
            <li>
              <Link href="/products/">Products</Link>
            </li>
            <li>
              <Link href="/reviews/">Reviews</Link>
            </li>
            <li>
              <Link href="/#studio">Studio</Link>
            </li>
            <li>
              <Link href="/#mission">Our Mission</Link>
            </li>
            <li>
              <Link href="/#faq">FAQ</Link>
            </li>
            <li>
              <Link href="/about/">About</Link>
            </li>
            <li>
              <Link href="/blog/">Blog</Link>
            </li>
            <li>
              <Link href="/areas/">Service Areas</Link>
            </li>
            <li>
              <Link href="/hi/">हिंदी</Link>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <h5>Contact</h5>
          <ul>
            <li>
              <Link href="/#notify">Order Now</Link>
            </li>
            <li>
              <a href="mailto:info@sabxi.com">info@sabxi.com</a>
            </li>
            <li className={styles.appBadges}>
              <AppStoreBadges />
            </li>
            <li>
              <a
                href="https://share.google/Be6ad2LS0plYCVRL5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Studio on Maps
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <h5>Legal</h5>
          <ul>
            <li>
              <Link href="/company/">Company Info</Link>
            </li>
            <li>
              <Link href="/privacy/">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms/">Terms of Service</Link>
            </li>
            <li>
              <Link href="/refund/">Refunds & Cancellations</Link>
            </li>
            <li>Sabxi Private Limited</li>
          </ul>
        </div>
      </div>

      <div className={styles.legal}>
        <strong>Sabxi Private Limited</strong> · CIN: U46301MH2026PTC473853 · GSTIN: 27ABUCS4728H1ZP
        · Incorporated 23 July 2026 · RoC-Mumbai · Registered office: 501, Plot No. 32 Emerald,
        Union Park CHS Ltd, Mumbai, Maharashtra 400071 · Activity: Wholesale of fruits &
        vegetables ·{" "}
        <a
          href="https://www.falconebiz.com/company/SABXI-PRIVATE-LIMITED-U46301MH2026PTC473853"
          target="_blank"
          rel="noopener noreferrer"
        >
          MCA / Falcon eBiz profile
        </a>
      </div>

      <p className={styles.copy}>
        © 2026 Sabxi Private Limited. All rights reserved. ·{" "}
        <Link href="/privacy/">Privacy</Link> · <Link href="/terms/">Terms</Link> ·{" "}
        <Link href="/refund/">Refunds</Link> · <Link href="/company/">Company</Link> ·{" "}
        <Link href="/about/">About</Link>
      </p>
    </footer>
  );
}
