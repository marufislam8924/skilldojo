"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./UserProgressBanner.module.css";
import { getStudentSession, getGamificationStats, getDashboardData } from "../lib/studentProgress";
import XPBadge from "./XPBadge";
import StreakCounter from "./StreakCounter";

export default function UserProgressBanner() {
  const [student, setStudent] = useState(null);
  const [gamifStats, setGamifStats] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const session = getStudentSession();
    if (session) {
      setStudent(session);
      setGamifStats(getGamificationStats());
      setDashboardData(getDashboardData());
    }

    const handleProgressChange = () => {
      const session = getStudentSession();
      if (session) {
        setStudent(session);
        setGamifStats(getGamificationStats());
        setDashboardData(getDashboardData());
      }
    };

    window.addEventListener("skilldojo-progress-changed", handleProgressChange);
    window.addEventListener("skilldojo-auth-changed", handleProgressChange);

    return () => {
      window.removeEventListener("skilldojo-progress-changed", handleProgressChange);
      window.removeEventListener("skilldojo-auth-changed", handleProgressChange);
    };
  }, []);

  if (!mounted || !student || !gamifStats) {
    return null;
  }

  // Find last lesson started
  const lastLessonInfo = dashboardData?.courses.find(
    (c) => c.nextLesson > 1
  ) || dashboardData?.courses[0];

  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <div className={styles.greeting}>
          <h2 className={styles.welcomeText}>Welcome back, {student.name}!</h2>
          <p className={styles.subtitle}>Keep your streak alive 🔥</p>
        </div>

        <div className={styles.statsRow}>
          <XPBadge xp={gamifStats.totalXP} level={gamifStats.level} />
          <StreakCounter
            currentStreak={gamifStats.currentStreak}
            longestStreak={gamifStats.longestStreak}
          />
        </div>

        {lastLessonInfo && lastLessonInfo.nextLesson <= lastLessonInfo.totalLessons && (
          <Link
            href={`/${lastLessonInfo.slug}/${lastLessonInfo.nextLesson}`}
            className={styles.resumeBtn}
          >
            <span className={styles.resumeIcon}>▶</span>
            <span className={styles.resumeText}>
              Resume {lastLessonInfo.label} Lesson {lastLessonInfo.nextLesson}
            </span>
            <span className={styles.resumeArrow}>→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
