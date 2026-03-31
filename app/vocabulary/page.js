"use client";
import Link from "next/link";
import { vocabularyLessons } from "../../data/vocabularyLessons";
import styles from "./vocabulary.module.css";
import StudentNavAction from "../components/StudentNavAction";

export default function VocabularyPage() {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <span className={styles.logo}>
          Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場
        </span>
        <div className={styles.navActions}>
          <StudentNavAction className={styles.navLink} dashboardLabel="My Progress" />
          <Link className={styles.backBtn} href="/">
            ← Back
          </Link>
        </div>
      </nav>

      <div className={styles.header}>
        <div className={styles.headerTag}>Course</div>
        <h1 className={styles.headerTitle}>Japanese Vocabulary Lessons</h1>
        <p className={styles.headerDesc}>
          Master 1,000 essential Japanese words across {vocabularyLessons.length}{" "}
          interactive lessons with flashcards and pronunciation.
        </p>
      </div>

      <div className={styles.grid}>
        {vocabularyLessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/vocabulary/${lesson.id}`}
            className={styles.lessonCard}
          >
            <div className={styles.lessonTopRow}>
              <div className={styles.lessonNum}>Lesson {lesson.id}</div>
              <div className={styles.lessonCount}>{lesson.words.length} words</div>
            </div>
            <div className={styles.lessonKana}>{lesson.category}</div>
            <div className={styles.lessonName}>{lesson.title}</div>
            <div className={styles.lessonChars}>
              {lesson.words
                .slice(0, 3)
                .map((w) => w.japanese)
                .join(" · ")}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
