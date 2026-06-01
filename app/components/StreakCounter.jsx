import styles from "./StreakCounter.module.css";

export default function StreakCounter({ currentStreak, longestStreak }) {
  if (!currentStreak || currentStreak <= 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.streakBox}>
        <div className={styles.flame}>🔥</div>
        <div className={styles.streakContent}>
          <div className={styles.label}>Current Streak</div>
          <div className={styles.count}>{currentStreak}</div>
        </div>
      </div>
      {longestStreak > 0 && (
        <div className={styles.maxBox}>
          <span className={styles.maxLabel}>Best:</span>
          <span className={styles.maxCount}>{longestStreak}</span>
        </div>
      )}
    </div>
  );
}
