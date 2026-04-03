import Link from "next/link";
import { quizCategories } from "../../data/quizData";
import styles from "./quiz.module.css";

export default function QuizPage() {
  return (
    <main className={styles.main}>

      <div className={styles.menu}>
        <div className={styles.menuLinks}>
          <Link href="/hiragana" className={styles.menuLink}>Hiragana</Link>
          <Link href="/katakana" className={styles.menuLink}>Katakana</Link>
          <Link href="/vocab" className={styles.menuLink}>Vocabulary</Link>
          <Link href="/grammar" className={styles.menuLink}>Grammar</Link>
          <Link href="/conversation" className={styles.menuLink}>Conversation</Link>
          <Link href="/quiz" className={`${styles.menuLink} ${styles.menuLinkActive}`}>Quiz</Link>
        </div>
        <div className={styles.headerTag}>Quiz Mode</div>
        <h1 className={styles.headerTitle}>Test Your Japanese Knowledge</h1>
        <p className={styles.headerDesc}>
          Pick a category and challenge yourself with {quizCategories.length} quiz types.
          Earn XP for every correct answer and track your progress.
        </p>
      </div>

      <h2 className={styles.headerTag}>Quiz Categories</h2>

      <div className={styles.grid}>
        {quizCategories.map((cat) => (
          <Link key={cat.id} href={`/quiz/${cat.id}`} className={styles.lessonCard}>
            <div className={styles.lessonTopRow}>
              <div className={styles.lessonNum}>{cat.questionCount} Questions</div>
              <div className={styles.lessonCount}>+{cat.questionCount * 10} XP</div>
            </div>
            <div className={styles.lessonIcon}>{cat.icon}</div>
            <div className={styles.lessonName}>{cat.title}</div>
            <div className={styles.lessonDesc}>{cat.description}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
