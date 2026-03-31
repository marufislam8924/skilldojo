"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { hiraganaLessons } from "../data";
import styles from "./hiragana.module.css";
import StudentNavAction from "../components/StudentNavAction";

export default function HiraganaPage() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <span className={styles.logo}>
          Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場
        </span>
        <div className={styles.navActions}>
          <StudentNavAction className={styles.navLink} dashboardLabel="My Progress" />
          <button className={styles.backBtn} onClick={() => router.push("/")}>
            ← Back
          </button>
        </div>
      </nav>

      <div className={styles.menu}>
        <div className={styles.menuLinks}>
          <Link href="/hiragana" className={`${styles.menuLink} ${styles.menuLinkActive}`}>Hiragana</Link>
          <Link href="/katakana" className={styles.menuLink}>Katakana</Link>
          <Link href="/vocab" className={styles.menuLink}>Vocabulary</Link>
          <Link href="/grammar" className={styles.menuLink}>Grammar</Link>
          <Link href="/conversation" className={styles.menuLink}>Conversation</Link>
          <Link href="/quiz" className={styles.menuLink}>Quiz</Link>
        </div>
        <div className={styles.headerTag}>Course</div>
        <h1 className={styles.headerTitle}>Hiragana and Katakana Full Course</h1>
        <p className={styles.headerDesc}>
          Start Japanese language basics with 21 hiragana lessons and interactive flashcards.
        </p>
      </div>

      <div className={styles.grid}>
        {hiraganaLessons.map((lesson) => (
          <div
            key={lesson.id}
            className={styles.lessonCard}
            onClick={() => router.push(`/hiragana/${lesson.id}`)}
          >
            <div className={styles.lessonNum}>Lesson {lesson.id}</div>
            <div className={styles.lessonKana}>{lesson.kana}</div>
            <div className={styles.lessonName}>{lesson.name}</div>
            <div className={styles.lessonChars}>
              {lesson.chars.map((c) => c.r).join(" · ")}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
