"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { jlptN5Course } from "../../../data/jlptN5Course";
import styles from "./n5.module.css";
import StudentNavAction from "../../components/StudentNavAction";

const skillClass: Record<string, string> = {
  vocabulary: styles.skillVocabulary,
  grammar: styles.skillGrammar,
  reading: styles.skillReading,
  listening: styles.skillListening,
};

export default function N5CoursePage() {
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

      <div className={styles.header}>
        <div className={styles.headerTag}>JLPT N5 Prep</div>
        <h1 className={styles.headerTitle}>JLPT N5 Course</h1>
        <p className={styles.headerDesc}>
          {jlptN5Course.length} lessons covering vocabulary, grammar, reading,
          and listening — everything you need to pass the JLPT N5.
        </p>
      </div>

      <div className={styles.grid}>
        {jlptN5Course.map((lesson) => (
          <div key={lesson.id} className={styles.lessonCard}>
            <div className={styles.lessonNum}>Lesson {lesson.id}</div>
            <div className={styles.lessonTitle}>{lesson.title}</div>
            <div className={styles.lessonJapanese}>{lesson.titleJapanese}</div>
            <span className={`${styles.skillBadge} ${skillClass[lesson.skill] || ""}`}>
              {lesson.skill}
            </span>
            <Link href={`/courses/n5/${lesson.id}`} className={styles.startBtn}>
              Start Lesson →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
