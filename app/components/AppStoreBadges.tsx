import styles from "./AppStoreBadges.module.css";

type Variant = "dark" | "light";

/**
 * AppStoreBadges — the official Apple App Store + Google Play badges.
 * Apple: SVG, transparent background, dark style by default.
 * Google: PNG, dark style.
 *
 * Per Apple's iOS Marketing Guidelines and Google's Play Store brand
 * guidelines, the official badges must be used when linking to the app
 * stores. Text links ("App Store" / "Google Play") are not compliant.
 */
export function AppStoreBadges({
  variant = "dark",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <div className={`${styles.badges} ${className ?? ""}`}>
      <a
        href="https://apps.apple.com/in/app/sabxi/id6783602290"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download SABXI on the App Store"
      >
        <img
          src="/images/app-store-badge.svg"
          alt="Download on the App Store"
          width={135}
          height={45}
        />
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.sabxi.sabxi"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get SABXI on Google Play"
      >
        <img
          src="/images/google-play-badge.png"
          alt="Get it on Google Play"
          width={135}
          height={40}
        />
      </a>
    </div>
  );
}
