import AudioButton from "./AudioButton";
import styles from "./ConversationCard.module.css";

export default function ConversationCard({ item, index }) {
  return (
    <article className={styles.card}>
      <div className={styles.body}>
        <span className={styles.lineTag}>Line {index}</span>
        <p className={styles.japanese}>{item.japanese}</p>
        <p className={styles.romaji}>{item.romaji}</p>
        <p className={styles.meaning}>{item.meaning}</p>
      </div>
      <AudioButton audio={item.audio} text={item.japanese} />
    </article>
  );
}