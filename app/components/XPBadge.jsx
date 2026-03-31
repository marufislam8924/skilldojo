import styles from "./XPBadge.module.css";

export default function XPBadge({ xp, level }) {
  return (
    <div className={styles.badge}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>⭐</span>
      </div>
      <div className={styles.content}>
        <div className={styles.level}>Level {level}</div>
        <div className={styles.xp}>{xp.toLocaleString()} XP</div>
      </div>
    </div>
  );
}
