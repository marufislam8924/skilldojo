"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getGamificationStats, getStudentProgress } from "../lib/studentProgress";
import styles from "./CourseProgressPanel.module.css";

export default function CourseProgressPanel({
  courseSlug,
  totalLessons,
  courseLabel,
  courseHref,
}) {
  const [completedCount, setCompletedCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    const loadProgress = () => {
      const progress = getStudentProgress();
      const completed = progress?.[courseSlug]?.completedLessons || [];
      setCompletedCount(completed.length);

      const gamif = getGamificationStats();
      setCurrentStreak(gamif.currentStreak || 0);
    };

    loadProgress();
    window.addEventListener("skilldojo-progress-changed", loadProgress);
    return () => window.removeEventListener("skilldojo-progress-changed", loadProgress);
  }, [courseSlug]);

  const progressPercent = useMemo(() => {
    if (!totalLessons) return 0;
    return Math.min(100, Math.round((completedCount / totalLessons) * 100));
  }, [completedCount, totalLessons]);

  const nextLesson = useMemo(() => {
    if (completedCount >= totalLessons) return totalLessons;
    return completedCount + 1;
  }, [completedCount, totalLessons]);

  const ctaHref = completedCount > 0 ? `${courseHref}/${nextLesson}` : `${courseHref}/1`;
  const ctaLabel = completedCount > 0 ? "Continue" : "Start";

  return (
    <section className={styles.panel} aria-label={`${courseLabel} progress`}>
      <div className={styles.topRow}>
        <div>
          <p className={styles.kicker}>{courseLabel} Progress</p>
          <h2 className={styles.title}>{progressPercent}% completed</h2>
        </div>
        <div className={styles.streakChip}>
          <span className={styles.flame}>🔥</span>
          <span>{currentStreak} day streak</span>
        </div>
      </div>

      <div className={styles.barTrack}>
        <div className={styles.barFill} style={{ width: `${progressPercent}%` }} />
      </div>

      <div className={styles.metaRow}>
        <span>
          {completedCount} / {totalLessons} lessons complete
        </span>
        <Link href={ctaHref} className={styles.cta}>
          {ctaLabel} Lesson {nextLesson} →
        </Link>
      </div>
    </section>
  );
}
