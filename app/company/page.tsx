import type { Metadata } from "next";
import { AppStoreBadges } from "../components/AppStoreBadges";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sabxi Private Limited — Company Info | SABXI",
  description:
    "Official company information for Sabxi Private Limited, the legal entity behind SABXI. CIN, GSTIN, directors, registered office, MCA records.",
};

export default function CompanyPage() {
  return (
    <div className={styles.ip}>
      <main className={styles.wrap}>
        <span className={styles.label}>Legal entity</span>
        <h1>Sabxi Private Limited</h1>
        <p className={styles.lead}>
          Official company information for the legal entity behind the SABXI brand. Source: MCA
          records via{" "}
          <a
            href="https://www.falconebiz.com/company/SABXI-PRIVATE-LIMITED-U46301MH2026PTC473853"
            target="_blank"
            rel="noopener noreferrer"
          >
            Falcon eBiz
          </a>
          .
        </p>

        <table className={styles.infoTable}>
          <tbody>
            <tr>
              <th>Company name</th>
              <td>SABXI PRIVATE LIMITED</td>
            </tr>
            <tr>
              <th>CIN</th>
              <td>U46301MH2026PTC473853</td>
            </tr>
            <tr>
              <th>GSTIN</th>
              <td>27ABUCS4728H1ZP</td>
            </tr>
            <tr>
              <th>Registration number</th>
              <td>473853</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>Active</td>
            </tr>
            <tr>
              <th>Date of incorporation</th>
              <td>23 July 2026</td>
            </tr>
            <tr>
              <th>RoC</th>
              <td>RoC-Mumbai I</td>
            </tr>
            <tr>
              <th>Class</th>
              <td>Private company</td>
            </tr>
            <tr>
              <th>Category</th>
              <td>Company limited by shares · Non-government company</td>
            </tr>
            <tr>
              <th>Listing status</th>
              <td>Unlisted</td>
            </tr>
            <tr>
              <th>Authorized capital</th>
              <td>₹15,00,000</td>
            </tr>
            <tr>
              <th>Paid-up capital</th>
              <td>₹1,00,000</td>
            </tr>
            <tr>
              <th>Activity (MCA)</th>
              <td>Wholesale of fruits &amp; vegetables</td>
            </tr>
            <tr>
              <th>Registered office</th>
              <td>
                501, Plot No. 32 Emerald, Union Park CHS Ltd, Mumbai, Maharashtra, India, 400071
              </td>
            </tr>
            <tr>
              <th>Directors</th>
              <td>
                Syed Irfan Raza (from 23 July 2026)
                <br />
                Ragini Mishra (from 23 July 2026)
              </td>
            </tr>
            <tr>
              <th>Brand</th>
              <td>SABXI — Freshly Cut, Quickly Delivered</td>
            </tr>
            <tr>
              <th>Operating studio</th>
              <td>
                SABXI Studio, Kurla, Mumbai ·{" "}
                <a
                  href="https://share.google/Be6ad2LS0plYCVRL5"
                  target="_blank"
                  rel="noopener"
                >
                  Google Maps
                </a>
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>
                <a href="mailto:info@sabxi.com">info@sabxi.com</a>
              </td>
            </tr>
            <tr>
              <th>Website</th>
              <td>
                <a href="https://sabxi.com/">sabxi.com</a>
              </td>
            </tr>
            <tr>
              <th>App</th>
              <td>
                <AppStoreBadges className={styles.infoBadges} />
              </td>
            </tr>
            <tr>
              <th>Public company profile</th>
              <td>
                <a
                  href="https://www.falconebiz.com/company/SABXI-PRIVATE-LIMITED-U46301MH2026PTC473853"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  falconebiz.com listing
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <div className={styles.callout}>
          <p>
            <strong>Note:</strong> The registered office (Union Park, Mumbai 400071) is the MCA
            address of the company. Day-to-day fresh food prep and delivery operate from{" "}
            <strong>SABXI Studio, Kurla</strong>.
          </p>
        </div>

        <div className={styles.ctaBox}>
          <p>Order fresh from the SABXI app</p>
          <AppStoreBadges className={styles.ctaBadges} />
        </div>
      </main>
    </div>
  );
}
