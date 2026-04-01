"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { curriculum } from "../../../../data/japaneseIn30Days";
import styles from "./day.module.css";

const labelClass: Record<string, string> = {
  Hiragana: styles.labelHiragana,
  Katakana: styles.labelKatakana,
  Vocabulary: styles.labelVocabulary,
  Grammar: styles.labelGrammar,
  Conversation: styles.labelConversation,
  "JLPT N5": styles.labelJLPTN5,
  Quiz: styles.labelQuiz,
};

function getTaskHref(course: string, lessonId: number): string {
  switch (course) {
    case "hiragana":     return `/hiragana/${lessonId}`;
    case "katakana":     return `/katakana/${lessonId}`;
    case "vocab":        return `/vocab/${lessonId}`;
    case "grammar":      return `/grammar/${lessonId}`;
    case "conversation": return `/conversation/${lessonId}`;
    case "n5":           return `/courses/n5/${lessonId}`;
    case "quiz":         return `/quiz/${lessonId}`;
    default:             return "/";
  }
}

export default function DayPage() {
  const params = useParams();
  const dayNum = Number(params.day);
  const day = curriculum.find((d) => d.day === dayNum);

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("skilldojo_30days_progress");
      if (saved) {
        const arr: number[] = JSON.parse(saved);
        if (arr.includes(dayNum)) setCompleted(true);
      }
    } catch {}
  }, [dayNum]);

  function toggleComplete() {
    try {
      const saved = localStorage.getItem("skilldojo_30days_progress");
      const arr: number[] = saved ? JSON.parse(saved) : [];
      let next: number[];
      if (arr.includes(dayNum)) {
        next = arr.filter((d) => d !== dayNum);
        setCompleted(false);
      } else {
        next = [...arr, dayNum];
        setCompleted(true);
      }
      localStorage.setItem("skilldojo_30days_progress", JSON.stringify(next));
    } catch {}
  }

  if (!day) {
    return (
      <main className={styles.main}>
        <div className={styles.header}>
          <Link href="/courses/30-days" className={styles.backLink}>← Back to 30-Day Plan</Link>
          <h1 className={styles.dayTitle}>Day not found</h1>
        </div>
      </main>
    );
  }

  const prevDay = dayNum > 1 ? dayNum - 1 : null;
  const nextDay = dayNum < 30 ? dayNum + 1 : null;

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Link href="/courses/30-days" className={styles.backLink}>← Back to 30-Day Plan</Link>
        <div className={styles.dayTag}>Day {day.day} of 30</div>
        <h1 className={styles.dayTitle}>{day.title}</h1>
        <p className={styles.daySubtitle}>{day.subtitle}</p>
      </div>

      <div className={styles.tipCard}>
        <span className={styles.tipIcon}>💡</span>
        <span className={styles.tipText}>{day.tip}</span>
      </div>

      <div className={styles.tasksList}>
        {day.tasks.map((task, i) => (
          <div key={i} className={styles.taskCard}>
            <div className={styles.taskNum}>{i + 1}</div>
            <div className={styles.taskBody}>
              <span className={`${styles.taskLabel} ${labelClass[task.label] || ""}`}>
                {task.label}
              </span>
              <div className={styles.taskTitle}>{task.title}</div>
            </div>
            <Link href={getTaskHref(task.course, task.lessonId)} className={styles.taskLink}>
              Start →
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.completeWrap}>
        <button
          onClick={toggleComplete}
          className={completed ? styles.completedBtn : styles.completeBtn}
        >
          {completed ? "✓ Day Completed" : "Mark Day as Complete"}
        </button>
      </div>

      <div className={styles.navButtons}>
        {prevDay ? (
          <Link href={`/courses/30-days/${prevDay}`} className={styles.navBtn}>
            ← Day {prevDay}
          </Link>
        ) : <span />}
        {nextDay ? (
          <Link href={`/courses/30-days/${nextDay}`} className={styles.navBtn}>
            Day {nextDay} →
          </Link>
        ) : (
          <Link href="/courses/30-days" className={styles.navBtn}>
            Back to Overview
          </Link>
        )}
      </div>
    </main>
  );
}
