"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { jlptN5Course } from "../../../data/jlptN5Course";
import { getCourseUnlockState } from "../../lib/studentProgress";
import styles from "./n5.module.css";

const skillClass: Record<string, string> = {
  vocabulary: styles.skillVocabulary,
  grammar: styles.skillGrammar,
  reading: styles.skillReading,
  listening: styles.skillListening,
};

export default function N5CoursePage() {
  const [unlockState, setUnlockState] = useState(() =>
    getCourseUnlockState("n5", jlptN5Course.length)
  );

  useEffect(() => {
    const refresh = () => {
      setUnlockState(getCourseUnlockState("n5", jlptN5Course.length));
    };

    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("skilldojo-progress-changed", refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("skilldojo-progress-changed", refresh);
    };
  }, []);

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

      <h2 className={styles.headerTag}>All JLPT N5 Lessons</h2>

      <div className={`${styles.grid} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
        {jlptN5Course.map((lesson) => {
          const isCompleted = unlockState.completedSet.has(lesson.id);
          const isLocked =
            !isCompleted &&
            unlockState.nextUnlockedLesson !== null &&
            lesson.id > unlockState.nextUnlockedLesson;

          return (
            <div
              key={lesson.id}
              className={`${styles.lessonCard} ${isCompleted ? styles.lessonCardCompleted : ""} ${
                isLocked ? styles.lessonCardLocked : ""
              }`}
            >
              <div className={styles.lessonHead}>
                <div className={styles.lessonNum}>Lesson {lesson.id}</div>
                <span className={styles.lessonStatusIcon} aria-label={isCompleted ? "Completed" : isLocked ? "Locked" : "Unlocked"}>
                  {isCompleted ? "✓" : isLocked ? "🔒" : "▶"}
                </span>
              </div>
              <div className={styles.lessonTitle}>{lesson.title}</div>
              <div className={styles.lessonJapanese}>{lesson.titleJapanese}</div>
              <span className={`${styles.skillBadge} ${skillClass[lesson.skill] || ""}`}>
                {lesson.skill}
              </span>

              {isLocked ? (
                <span className={`${styles.startBtn} ${styles.startBtnLocked}`}>Locked</span>
              ) : (
                <Link href={`/courses/n5/${lesson.id}`} className={styles.startBtn}>
                  {isCompleted ? "Review Lesson" : "Start Lesson →"}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
