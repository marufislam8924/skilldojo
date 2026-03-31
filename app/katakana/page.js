"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { katakanaLessons } from "../data";
import styles from "../hiragana/hiragana.module.css";
import StudentNavAction from "../components/StudentNavAction";

export default function KatakanaPage() {
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

      <div className={styles.grid}>
        {katakanaLessons.map((lesson) => (
          <div
            key={lesson.id}
            className={styles.lessonCard}
            onClick={() => router.push(`/katakana/${lesson.id}`)}
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
