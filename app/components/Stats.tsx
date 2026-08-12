import styles from "./Stats.module.css";

const STATS = [
  { num: "30 min", label: "Home delivery" },
  { num: "6", label: "Fresh product lines" },
  { num: "100%", label: "Cut to order" },
  { num: "Daily", label: "Fresh from mandi" },
] as const;

export function Stats() {
  return (
    <div className={styles.stats}>
      <div className={styles.statsGrid}>
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div className={styles.statNum}>{stat.num}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
