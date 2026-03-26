"use client";
import { useRouter } from "next/navigation";
import {
  getDailyVocabularyLesson,
  totalVocabularyWords,
  vocabularyLessons,
} from "../vocabData";
import styles from "./vocab.module.css";

export default function VocabularyPage() {
  const router = useRouter();
  const dailyLesson = getDailyVocabularyLesson();

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <span className={styles.logo}>
          Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場
        </span>
        <button className={styles.backBtn} onClick={() => router.push("/")}>
          ← Back
        </button>
      </nav>

      <div className={styles.header}>
        <div className={styles.headerTag}>JLPT N5 Course</div>
        <h1 className={styles.headerTitle}>Daily Vocabulary</h1>
        <p className={styles.headerDesc}>
          {totalVocabularyWords}+ essential N5 words across {vocabularyLessons.length} lessons with AI voice flashcards.
        </p>
      </div>

      <section className={styles.dailyCard}>
        <div className={styles.dailyMeta}>Auto-picked for today</div>
        <div className={styles.dailyTop}>
          <div>
            <div className={styles.dailyLessonNum}>Lesson {dailyLesson.id}</div>
            <h2 className={styles.dailyTitle}>{dailyLesson.name}</h2>
            <p className={styles.dailyDesc}>
              Practice 20 high-frequency words with reveal-to-hear flashcards and quick review scoring.
            </p>
          </div>
          <button
            className={styles.dailyBtn}
            onClick={() => router.push(`/vocab/${dailyLesson.id}`)}
          >
            Start Today →
          </button>
        </div>
        <div className={styles.dailyWords}>
          {dailyLesson.chars.slice(0, 6).map((item) => (
            <div key={item.k} className={styles.dailyWordChip}>
              <span className={styles.dailyWord}>{item.k}</span>
              <span className={styles.dailyMeaning}>{item.meaning}</span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.grid}>
        {vocabularyLessons.map((lesson) => (
          <div
            key={lesson.id}
            className={styles.lessonCard}
            onClick={() => router.push(`/vocab/${lesson.id}`)}
          >
            <div className={styles.lessonTopRow}>
              <div className={styles.lessonNum}>Lesson {lesson.id}</div>
              <div className={styles.lessonCount}>{lesson.chars.length} words</div>
            </div>
            <div className={styles.lessonKana}>{lesson.kana}</div>
            <div className={styles.lessonName}>{lesson.name}</div>
            <div className={styles.lessonChars}>
              {lesson.chars.slice(0, 4).map((item) => item.k).join(" · ")}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}