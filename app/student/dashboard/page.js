"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getDashboardData,
  isCloudSyncEnabled,
  getStudentSession,
  signOutStudent,
  syncProgressFromCloud,
} from "../../lib/studentProgress";
import styles from "./dashboard.module.css";

export default function StudentDashboardPage() {
  const router = useRouter();
  const cloudReady = isCloudSyncEnabled();
  const [student, setStudent] = useState(null);
  const [dashboardData, setDashboardData] = useState(() => ({
    courses: [],
    overall: { completedLessons: 0, totalLessons: 0, completedPercent: 0 },
    recentActivity: [],
  }));

  useEffect(() => {
    const session = getStudentSession();
    if (!session) {
      router.replace("/student/signin");
      return;
    }

    const refresh = () => {
      setStudent(getStudentSession());
      setDashboardData(getDashboardData());
    };

    refresh();

    if (session?.uid && cloudReady) {
      syncProgressFromCloud(session.uid)
        .then(() => refresh())
        .catch(() => {
          // Continue rendering local data when cloud fetch fails.
        });
    }

    window.addEventListener("storage", refresh);
    window.addEventListener("skilldojo-auth-changed", refresh);
    window.addEventListener("skilldojo-progress-changed", refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("skilldojo-auth-changed", refresh);
      window.removeEventListener("skilldojo-progress-changed", refresh);
    };
  }, [cloudReady, router]);

  if (!student) {
    return null;
  }

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.backLink}>
          ← Home
        </Link>
        <button
          className={styles.signOutBtn}
          onClick={() => {
            signOutStudent();
            router.push("/student/signin");
          }}
        >
          Sign Out
        </button>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroTag}>Student Dashboard</div>
        <h1 className={styles.title}>Welcome, {student.name}</h1>
        <p className={styles.subtitle}>
          Track your completed lessons and continue where you left off.
        </p>
        <p className={styles.syncLabel}>
          Sync: {student.provider === "google" && cloudReady ? "Cloud" : "Local device"}
        </p>

        <div className={styles.overallBox}>
          <div className={styles.overallHead}>
            <span>Overall Progress</span>
            <strong>{dashboardData.overall.completedPercent}%</strong>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${dashboardData.overall.completedPercent}%` }}
            />
          </div>
          <div className={styles.overallMeta}>
            {dashboardData.overall.completedLessons} of {dashboardData.overall.totalLessons} lessons complete
          </div>
        </div>
      </section>

      <section className={styles.courseGrid}>
        {dashboardData.courses.map((course) => (
          <article className={styles.courseCard} key={course.slug}>
            <div className={styles.courseTop}>
              <h2>{course.label}</h2>
              <span>{course.completedPercent}%</span>
            </div>
            <div className={styles.progressBarSmall}>
              <div
                className={styles.progressFill}
                style={{ width: `${course.completedPercent}%` }}
              />
            </div>
            <p className={styles.courseMeta}>
              {course.completedCount} / {course.totalLessons} lessons complete
            </p>
            <div className={styles.cardActions}>
              <Link href={`/${course.slug}`} className={styles.actionLink}>
                Open Course
              </Link>
              <Link href={`/${course.slug}/${course.nextLesson}`} className={styles.actionLinkAlt}>
                Continue
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.recentWrap}>
        <h3 className={styles.recentTitle}>Recent Activity</h3>
        {dashboardData.recentActivity.length === 0 ? (
          <p className={styles.emptyText}>
            No completed lessons yet. Start a lesson and your activity will appear here.
          </p>
        ) : (
          <ul className={styles.activityList}>
            {dashboardData.recentActivity.map((item) => (
              <li key={`${item.courseSlug}-${item.lessonId}`} className={styles.activityItem}>
                <div>
                  <strong>{item.courseLabel}</strong> Lesson {item.lessonId}
                  <div className={styles.activityTime}>
                    {item.completedAt
                      ? new Date(item.completedAt).toLocaleString()
                      : "Completed"}
                  </div>
                </div>
                <div className={styles.activityScore}>
                  {item.score}/{item.total}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
