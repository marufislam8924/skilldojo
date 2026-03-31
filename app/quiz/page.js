import Link from "next/link";
import { quizCategories } from "../../data/quizData";
import styles from "./quiz.module.css";
import StudentNavAction from "../components/StudentNavAction";

export default function QuizPage() {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場
        </Link>
        <div className={styles.navActions}>
          <StudentNavAction className={styles.navLink} dashboardLabel="My Progress" />
          <Link className={styles.backBtn} href="/">
            ← Back
          </Link>
        </div>
      </nav>

      <div className={styles.header}>
        <div className={styles.headerTag}>Quiz Mode</div>
        <h1 className={styles.headerTitle}>Test Your Japanese Knowledge</h1>
        <p className={styles.headerDesc}>
          Pick a category and challenge yourself with {quizCategories.length} quiz types.
          Earn XP for every correct answer and track your progress.
        </p>
      </div>

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
