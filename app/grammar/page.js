import Link from "next/link";
import {
  getDailyGrammarLesson,
  grammarLessons,
  totalGrammarPatterns,
} from "../grammarData";
import styles from "./grammar.module.css";
import StudentNavAction from "../components/StudentNavAction";

export default function GrammarPage() {
  const dailyLesson = getDailyGrammarLesson();

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
        <div className={styles.headerTag}>JLPT N5 Course</div>
        <h1 className={styles.headerTitle}>Japanese N5 Grammar Explained Easy</h1>
        <p className={styles.headerDesc}>
          {totalGrammarPatterns} core grammar patterns across {grammarLessons.length} lessons with
          reveal-based flashcards, examples, and AI voice support.
        </p>
      </div>

      <section className={styles.dailyCard}>
        <div className={styles.dailyMeta}>Recommended for today</div>
        <div className={styles.dailyTop}>
          <div>
            <div className={styles.dailyLessonNum}>Lesson {dailyLesson.id}</div>
            <h2 className={styles.dailyTitle}>{dailyLesson.name}</h2>
            <p className={styles.dailyDesc}>
              Build grammar speed with quick reveal cards and practical sentence examples.
            </p>
          </div>
          <Link className={styles.dailyBtn} href={`/grammar/${dailyLesson.id}`}>
            Start Today →
          </Link>
        </div>
        <div className={styles.dailyWords}>
          {dailyLesson.chars.slice(0, 6).map((item) => (
            <div key={item.k} className={styles.dailyWordChip}>
              <span className={styles.dailyWord}>{item.k}</span>
              <span className={styles.dailyReading}>{item.reading}</span>
              <span className={styles.dailyMeaning}>{item.meaning}</span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.grid}>
        {grammarLessons.map((lesson) => (
          <Link key={lesson.id} href={`/grammar/${lesson.id}`} className={styles.lessonCard}>
            <div className={styles.lessonTopRow}>
              <div className={styles.lessonNum}>Lesson {lesson.id}</div>
              <div className={styles.lessonCount}>{lesson.chars.length} patterns</div>
            </div>
            <div className={styles.lessonKana}>{lesson.kana}</div>
            <div className={styles.lessonName}>{lesson.name}</div>
            <div className={styles.lessonChars}>
              {lesson.chars
                .slice(0, 3)
                .map((item) => item.k)
                .join(" · ")}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
