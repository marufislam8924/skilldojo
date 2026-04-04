"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getCourseUnlockState, markLessonComplete } from "../../../lib/studentProgress";
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

const QUIZ_ID_TO_CATEGORY: Record<number, string> = {
  1: "hiragana",
  2: "katakana",
  3: "vocab",
  4: "grammar",
  5: "mixed",
};

function getTaskHref(course: string, lessonId: number): string {
  switch (course) {
    case "hiragana":     return `/hiragana/${lessonId}`;
    case "katakana":     return `/katakana/${lessonId}`;
    case "vocab":        return `/vocab/${lessonId}`;
    case "grammar":      return `/grammar/${lessonId}`;
    case "conversation": return `/conversation/${lessonId}`;
    case "n5":           return `/courses/n5/${lessonId}`;
    case "quiz":         return `/quiz/${QUIZ_ID_TO_CATEGORY[lessonId] || "mixed"}`;
    default:             return "/";
  }
}

export default function DayClient() {
  const params = useParams();
  const dayNum = Number(params.day);
  const day = curriculum.find((d) => d.day === dayNum);

  const [unlockState, setUnlockState] = useState(() => getCourseUnlockState("thirtyDays", 30));
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const refresh = () => {
      setUnlockState(getCourseUnlockState("thirtyDays", 30));
    };

    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("skilldojo-progress-changed", refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("skilldojo-progress-changed", refresh);
    };
  }, [dayNum]);

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

  const isCompleted = unlockState.completedSet.has(dayNum);
  const isLocked =
    !isCompleted &&
    unlockState.nextUnlockedLesson !== null &&
    dayNum > unlockState.nextUnlockedLesson;

  const markComplete = () => {
    if (isCompleted || isLocked || isSaving) return;
    setIsSaving(true);
    try {
      markLessonComplete("thirtyDays", dayNum, day.tasks.length, day.tasks.length);
      setUnlockState(getCourseUnlockState("thirtyDays", 30));
      setFeedback("Day complete. The next day is now unlocked.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLocked) {
    return (
      <main className={styles.main}>
        <div className={styles.header}>
          <Link href="/courses/30-days" className={styles.backLink}>← Back to 30-Day Plan</Link>
          <h1 className={styles.dayTitle}>Day {dayNum} is locked 🔒</h1>
          <p className={styles.daySubtitle}>Complete Day {unlockState.nextUnlockedLesson || 1} to unlock this lesson.</p>
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

      <h2 className={styles.dayTag}>Daily Tasks</h2>

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
          onClick={markComplete}
          className={isCompleted ? styles.completedBtn : styles.completeBtn}
          disabled={isCompleted || isSaving}
        >
          {isCompleted ? "✓ Day Completed" : isSaving ? "Saving..." : "Mark Day as Complete"}
        </button>
      </div>
      {feedback ? <p className={styles.completeFeedback}>{feedback}</p> : null}

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
