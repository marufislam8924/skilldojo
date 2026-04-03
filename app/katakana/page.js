"use client";
import Link from "next/link";
import { katakanaLessons } from "../data";
import CourseProgressPanel from "../components/CourseProgressPanel";
import styles from "../hiragana/hiragana.module.css";

export default function KatakanaPage() {
  return (
    <main className={styles.main}>

      <div className={styles.menu}>
        <div className={styles.menuLinks}>
          <Link href="/hiragana" className={styles.menuLink}>Hiragana</Link>
          <Link href="/katakana" className={`${styles.menuLink} ${styles.menuLinkActive}`}>Katakana</Link>
          <Link href="/vocab" className={styles.menuLink}>Vocabulary</Link>
          <Link href="/grammar" className={styles.menuLink}>Grammar</Link>
          <Link href="/conversation" className={styles.menuLink}>Conversation</Link>
          <Link href="/quiz" className={styles.menuLink}>Quiz</Link>
        </div>
        <div className={styles.headerTag}>Course</div>
        <h1 className={styles.headerTitle}>Katakana Complete for JLPT N5</h1>
        <p className={styles.headerDesc}>
          Build Japanese beginner course confidence with 21 katakana lessons and AI voice.
        </p>
      </div>

      <CourseProgressPanel
        courseSlug="katakana"
        totalLessons={katakanaLessons.length}
        courseLabel="Katakana"
        courseHref="/katakana"
      />

      <h2 className={styles.headerTag}>All Katakana Lessons</h2>

      <div className={styles.grid}>
        {katakanaLessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/katakana/${lesson.id}`}
            className={`${styles.lessonCard} flex items-center gap-4 p-4 min-h-[64px] rounded-xl border hover:bg-gray-50 active:bg-gray-100`}
          >
            <div>
              <div className={styles.lessonNum}>Lesson {lesson.id}</div>
              <div className={`${styles.lessonKana} text-5xl`}>{lesson.kana}</div>
            </div>
            <div>
              <div className={styles.lessonName}>{lesson.name}</div>
              <div className={styles.lessonChars}>
                {lesson.chars.map((c) => c.r).join(" · ")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
