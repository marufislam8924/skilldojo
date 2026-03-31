import styles from "./Confetti.module.css";

export default function Confetti({ show }) {
  if (!show) return null;

  const pieces = Array.from({ length: 50 }, (_, i) => {
    const duration = 2 + Math.random() * 1;
    const delay = Math.random() * 0.6;
    const left = Math.random() * 100;

    return (
      <div
        key={i}
        className={styles.piece}
        style={{
          left: `${left}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      />
    );
  });

  return <div className={styles.container}>{pieces}</div>;
}
