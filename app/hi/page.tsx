import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreBadges } from "../components/AppStoreBadges";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "SABXI हिंदी — चेम्बूर मुंबई से ताज़ी कटी सब्ज़ी 30 मिनट में",
  description:
    "SABXI हिंदी FAQ: चेम्बूर मुंबई स्टूडियो से कट-टू-ऑर्डर सब्ज़ी, फल, जूस। ऑर्डर के बाद कट, 30 मिनट डिलीवरी।",
};

export default function HindiPage() {
  return (
    <div className={styles.ip}>
      <main className={styles.wrap}>
        <div className={styles.langSwitch}>
          <Link href="/">English</Link>
          <Link className={styles.active} href="/hi/">
            हिंदी
          </Link>
        </div>
        <span className={styles.label}>SABXI हिंदी</span>
        <h1>ताज़ा काटो, जल्दी पहुँचाओ</h1>
        <p className={styles.lead}>
          SABXI एक D2C फ्रेश फूड ब्रांड है — सब्ज़ियाँ और फल आपके ऑर्डर के <strong>बाद</strong> काटे
          जाते हैं, चेम्बूर (मुंबई) स्टूडियो से 30 मिनट में डिलीवर।
        </p>

        <h2>SABXI क्या है?</h2>
        <p>
          Sabxi Private Limited का ब्रांड SABXI चेम्बूर, मुंबई में SABXI Studio चलाता है। कट वेज, कट
          फ्रूट, जूस, होल प्रोड्यूस, स्मूदी और मिक्स्ड पैक्स — सब लाइव तैयार, ऐप से ऑर्डर।
        </p>

        <h2>अक्सर पूछे जाने वाले सवाल (FAQ)</h2>

        <details className={styles.faqItem} open>
          <summary>SABXI क्या है?</summary>
          <p>
            SABXI एक डायरेक्ट-टू-कंज्यूमर (D2C) फ्रेश फूड ब्रांड है। हम ताज़ी कटी सब्ज़ियाँ, फल,
            कोल्ड-प्रेस्ड जूस, होल प्रोड्यूस और स्मूदी SABXI Studio में आपके ऑर्डर के तुरंत बाद तैयार
            करके 30 मिनट से कम में घर पहुँचाते हैं।
          </p>
        </details>
        <details className={styles.faqItem}>
          <summary>डिलीवरी कितनी तेज़ है?</summary>
          <p>30 मिनट से कम। सुबह 7 बजे से रात 9 बजे तक, लाइव ट्रैकिंग के साथ।</p>
        </details>
        <details className={styles.faqItem}>
          <summary>Zepto या Blinkit से SABXI अलग कैसे है?</summary>
          <p>
            क्विक कॉमर्स ऐप्स डार्क स्टोर से पैक्ड सामान भेजते हैं। SABXI में कुछ भी पहले से नहीं काटा
            जाता — ऑर्डर लगने के बाद चेम्बूर स्टूडियो में कट/प्रेस/पैक होता है। यह फ्रेशनेस-एट-स्पीड
            है।
          </p>
        </details>
        <details className={styles.faqItem}>
          <summary>सब्ज़ियाँ कब कट होती हैं?</summary>
          <p>
            सिर्फ आपके ऑर्डर के बाद। डाइस, स्लाइस या जूलियन — ऐप में कट प्रेफरेंस लिख सकते हैं।
          </p>
        </details>
        <details className={styles.faqItem}>
          <summary>क्या-क्या मिलता है?</summary>
          <p>
            कट वेज, कट फ्रूट, फ्रेश जूस, होल वेजिटेबल्स, होल फ्रूट्स, स्मूदी और मिक्स्ड पैक्स (मूंग,
            चना, राजमा आदि)।
          </p>
        </details>
        <details className={styles.faqItem}>
          <summary>SABXI Studio कहाँ है?</summary>
          <p>
            पहला स्टूडियो <strong>चेम्बूर, मुंबई</strong> में है — काँच वाला माइक्रो-किचन, जहाँ ऑर्डर
            लाइव तैयार होता है।{" "}
            <a href="https://share.google/Be6ad2LS0plYCVRL5" target="_blank" rel="noopener">
              Google Maps
            </a>
          </p>
        </details>
        <details className={styles.faqItem}>
          <summary>कहाँ डिलीवरी होती है?</summary>
          <p>
            अभी चेम्बूर स्टूडियो से मुंबई के 30-मिनट रेडियस में। ऐप में पता डालकर चेक करें। जल्द और
            इलाके।
          </p>
        </details>
        <details className={styles.faqItem}>
          <summary>ऐप कैसे डाउनलोड करें?</summary>
          <p>मुफ्त डाउनलोड करें:</p>
          <AppStoreBadges className={styles.faqBadges} />
        </details>
        <details className={styles.faqItem}>
          <summary>कट स्टाइल चुन सकते हैं?</summary>
          <p>हाँ — ऐप में कुकिंग नोट्स / कट प्रेफरेंस: डाइस्ड, स्लाइस्ड, जूलिएन्ड या होल।</p>
        </details>
        <details className={styles.faqItem}>
          <summary>मिक्स्ड पैक्स क्या हैं?</summary>
          <p>
            व्यस्त किचन के लिए तैयार मिक्स — मूंग दाल, चना, राजमा आदि — धोकर पोर्शन में, ताकि आप सीधे
            पकाना शुरू करें।
          </p>
        </details>
        <details className={styles.faqItem}>
          <summary>रोज़ाना सब्सक्रिप्शन?</summary>
          <p>
            हाँ — रोज़ का बास्केट सेट करें (पालक, टमाटर, जूस…) और सुबह ऑटो-डिलीवरी छूट के साथ।
          </p>
        </details>
        <details className={styles.faqItem}>
          <summary>प्रोड्यूस कहाँ से आता है?</summary>
          <p>हर सुबह लोकल मंडी से — बिना बिचौलिये, मार्केट प्राइस।</p>
        </details>
        <details className={styles.faqItem}>
          <summary>ऑर्डर से समस्या हो तो?</summary>
          <p>
            ऐप में संपर्क करें या <a href="mailto:info@sabxi.com">info@sabxi.com</a> पर लिखें —
            रिप्लेसमेंट या रिफंड नीति के अनुसार।
          </p>
        </details>

        <div className={styles.ctaBox}>
          <p>आज ही ताज़ा ऑर्डर करें</p>
          <AppStoreBadges className={styles.ctaBadges} />
          <p className={styles.ctaLinks}>
            <Link href="/blog/">English Blog →</Link> · <Link href="/#faq">English FAQ →</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
