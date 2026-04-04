"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { curriculum } from "../../../data/japaneseIn30Days";
import { getCourseUnlockState } from "../../lib/studentProgress";
import styles from "./thirtyDays.module.css";

const focusClass: Record<string, string> = {
  hiragana: styles.focusHiragana,
  katakana: styles.focusKatakana,
  vocabulary: styles.focusVocabulary,
  grammar: styles.focusGrammar,
  n5: styles.focusN5,
  quiz: styles.focusQuiz,
  conversation: styles.focusConversation,
};

const badgeClass: Record<string, string> = {
  Hiragana: styles.badgeHiragana,
  Katakana: styles.badgeKatakana,
  Vocabulary: styles.badgeVocabulary,
  Grammar: styles.badgeGrammar,
  Conversation: styles.badgeConversation,
  "JLPT N5": styles.badgeJLPTN5,
  Quiz: styles.badgeQuiz,
};

function getWeek(day: number) {
  if (day <= 7) return 1;
  if (day <= 14) return 2;
  if (day <= 21) return 3;
  return 4;
}

const weekTitles: Record<number, string> = {
  1: "Week 1 — Hiragana Foundation",
  2: "Week 2 — Katakana + Core Vocabulary",
  3: "Week 3 — Grammar + Vocabulary Expansion",
  4: "Week 4 — JLPT N5 Prep + Review",
};

export default function ThirtyDaysPage() {
  const [unlockState, setUnlockState] = useState(() => getCourseUnlockState("thirtyDays", 30));

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
  }, []);

  const progress = Math.round((unlockState.completedCount / 30) * 100);
  let currentWeek = 0;

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.headerTag}>30-Day Challenge</div>
        <h1 className={styles.headerTitle}>Japanese in 30 Days</h1>
        <p className={styles.headerDesc}>
          A structured daily plan that takes you from zero to JLPT N5 foundations.
          Hiragana, Katakana, vocabulary, grammar, conversation, and quizzes — all in one month.
        </p>
      </div>

      <div className={styles.progressWrap}>
        <div className={styles.progressOuter}>
          <div className={styles.progressInner} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.progressText}>
          {unlockState.completedCount} / 30 days completed ({progress}%)
        </div>
      </div>

      <h2 className={styles.weekLabel}>Daily Study Plan</h2>

      {curriculum.map((day) => {
        const week = getWeek(day.day);
        const showWeek = week !== currentWeek;
        if (showWeek) currentWeek = week;

        const isCompleted = unlockState.completedSet.has(day.day);
        const isLocked =
          !isCompleted &&
          unlockState.nextUnlockedLesson !== null &&
          day.day > unlockState.nextUnlockedLesson;

        return (
          <div key={day.day}>
            {showWeek && <div className={styles.weekLabel}>{weekTitles[week]}</div>}
            <div className={`${styles.grid} grid-cols-1`}>
              {isLocked ? (
                <div className={`${styles.dayCard} ${styles.locked}`}>
                  <div className={`${styles.dayNum} ${styles.dayNumLocked}`}>🔒</div>
                  <div className={styles.dayInfo}>
                    <div className={styles.dayTitle}>{day.title}</div>
                    <div className={styles.daySubtitle}>Locked until you complete previous day</div>
                    <div className={styles.dayTasks}>
                      {day.tasks.map((t, i) => (
                        <span key={i} className={`${styles.taskBadge} ${badgeClass[t.label] || ""}`}>
                          {t.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={styles.dayArrow}>🔒</span>
                </div>
              ) : (
                <Link
                  href={`/courses/30-days/${day.day}`}
                  className={`${styles.dayCard} ${isCompleted ? styles.completed : ""}`}
                >
                  <div className={`${styles.dayNum} ${focusClass[day.focus] || ""}`}>
                    {isCompleted ? "✓" : day.day}
                  </div>
                  <div className={styles.dayInfo}>
                    <div className={styles.dayTitle}>{day.title}</div>
                    <div className={styles.daySubtitle}>{day.subtitle}</div>
                    <div className={styles.dayTasks}>
                      {day.tasks.map((t, i) => (
                        <span key={i} className={`${styles.taskBadge} ${badgeClass[t.label] || ""}`}>
                          {t.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={styles.dayArrow}>{isCompleted ? "✓" : "→"}</span>
                </Link>
              )}
            </div>
          </div>
        );
      })}

      <div className={styles.footer}>
        <p className={styles.footerText}>
          Spend 30–60 minutes per day. Consistency beats intensity —
          showing up every day matters more than studying for hours once a week.
        </p>
      </div>
    </main>
  );
}
