import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.wrap} role="status" aria-live="polite" aria-label="Loading page">
      <div className={styles.header}>
        <div className={`${styles.shimmer} ${styles.logo}`} />
        <div className={styles.navRow}>
          <div className={`${styles.shimmer} ${styles.navItem}`} />
          <div className={`${styles.shimmer} ${styles.navItem}`} />
          <div className={`${styles.shimmer} ${styles.navItem}`} />
        </div>
      </div>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={`${styles.shimmer} ${styles.kicker}`} />
          <div className={`${styles.shimmer} ${styles.title}`} />
          <div className={`${styles.shimmer} ${styles.titleShort}`} />
          <div className={`${styles.shimmer} ${styles.line}`} />
          <div className={`${styles.shimmer} ${styles.lineShort}`} />
        </section>

        <section className={styles.grid}>
          <article className={styles.card}>
            <div className={`${styles.shimmer} ${styles.cardTop}`} />
            <div className={`${styles.shimmer} ${styles.cardLine}`} />
            <div className={`${styles.shimmer} ${styles.cardLineShort}`} />
          </article>
          <article className={styles.card}>
            <div className={`${styles.shimmer} ${styles.cardTop}`} />
            <div className={`${styles.shimmer} ${styles.cardLine}`} />
            <div className={`${styles.shimmer} ${styles.cardLineShort}`} />
          </article>
          <article className={styles.card}>
            <div className={`${styles.shimmer} ${styles.cardTop}`} />
            <div className={`${styles.shimmer} ${styles.cardLine}`} />
            <div className={`${styles.shimmer} ${styles.cardLineShort}`} />
          </article>
        </section>
      </main>
    </div>
  );
}
