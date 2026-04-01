"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { jlptN5Course } from "../../../data/jlptN5Course";
import styles from "./n5.module.css";

const skillClass: Record<string, string> = {
  vocabulary: styles.skillVocabulary,
  grammar: styles.skillGrammar,
  reading: styles.skillReading,
  listening: styles.skillListening,
};

export default function N5CoursePage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className={styles.main}>

      <div className={styles.header}>
        <div className={styles.headerTag}>JLPT N5 Prep</div>
        <h1 className={styles.headerTitle}>JLPT N5 Course</h1>
        <p className={styles.headerDesc}>
          {jlptN5Course.length} lessons covering vocabulary, grammar, reading,
          and listening — everything you need to pass the JLPT N5.
        </p>
      </div>

      <div className={`${styles.grid} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
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
