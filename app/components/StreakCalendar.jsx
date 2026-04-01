"use client";

import { useMemo } from "react";
import styles from "./StreakCalendar.module.css";

/**
 * Shows a 5-week heatmap of daily activity.
 * @param {{ activityDates: string[] }} props - Array of ISO date strings (YYYY-MM-DD) when user was active
 */
export default function StreakCalendar({ activityDates = [] }) {
  const { weeks, monthLabels } = useMemo(() => {
    const today = new Date();
    const dateSet = new Set(activityDates.map((d) => d.slice(0, 10)));

    // Build 35 days (5 weeks) ending today
    const days = [];
    for (let i = 34; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const iso = date.toISOString().slice(0, 10);
      days.push({
        date: iso,
        active: dateSet.has(iso),
        dayOfWeek: date.getDay(),
        dayOfMonth: date.getDate(),
        month: date.toLocaleString("en", { month: "short" }),
      });
    }

    // Group into weeks (columns)
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    // Month labels for top row
    const seen = new Set();
    const monthLabels = weeks.map((week) => {
      const first = week[0];
      if (!seen.has(first.month)) {
        seen.add(first.month);
        return first.month;
      }
      return "";
    });

    return { weeks, monthLabels };
  }, [activityDates]);

  const totalActive = activityDates.length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.icon}>📅</span>
        <h3 className={styles.title}>Activity</h3>
        <span className={styles.count}>{totalActive} active day{totalActive !== 1 ? "s" : ""}</span>
      </div>

      <div className={styles.grid}>
        {/* Day labels */}
        <div className={styles.dayLabels}>
          <span>S</span>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
        </div>

        {/* Weeks */}
        <div className={styles.weeks}>
          {/* Month labels */}
          <div className={styles.monthRow}>
            {monthLabels.map((label, i) => (
              <span key={i} className={styles.monthLabel}>{label}</span>
            ))}
          </div>

          <div className={styles.cells}>
            {weeks.map((week, wi) => (
              <div key={wi} className={styles.weekCol}>
                {week.map((day) => (
                  <div
                    key={day.date}
                    className={`${styles.cell} ${day.active ? styles.cellActive : ""}`}
                    title={`${day.date}${day.active ? " ✓" : ""}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.legend}>
        <span className={styles.legendLabel}>Less</span>
        <span className={`${styles.cell}`} />
        <span className={`${styles.cell} ${styles.cellActive}`} />
        <span className={styles.legendLabel}>More</span>
      </div>
    </div>
  );
}
