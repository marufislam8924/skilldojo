"use client";

import { useState, useEffect } from "react";
import styles from "./DailyGoal.module.css";

const GOAL_OPTIONS = [1, 2, 3, 5];
const STORAGE_KEY = "skilldojo.dailyGoal";

function readGoalData() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveGoalData(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function DailyGoal({ lessonsCompletedToday = 0 }) {
  const [goal, setGoal] = useState(3);
  const [editing, setEditing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = readGoalData();
    if (saved?.goal) setGoal(saved.goal);
  }, []);

  useEffect(() => {
    if (mounted) saveGoalData({ goal });
  }, [goal, mounted]);

  if (!mounted) return null;

  const completed = lessonsCompletedToday;
  const progress = Math.min(100, Math.round((completed / goal) * 100));
  const goalMet = completed >= goal;

  return (
    <div className={`${styles.container} ${goalMet ? styles.goalMet : ""}`}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.icon}>{goalMet ? "🎯" : "📋"}</span>
          <h3 className={styles.title}>Daily Goal</h3>
        </div>
        <button className={styles.editBtn} onClick={() => setEditing(!editing)}>
          {editing ? "Done" : "Edit"}
        </button>
      </div>

      {editing ? (
        <div className={styles.goalOptions}>
          {GOAL_OPTIONS.map((opt) => (
            <button
              key={opt}
              className={`${styles.goalOption} ${opt === goal ? styles.goalActive : ""}`}
              onClick={() => { setGoal(opt); setEditing(false); }}
            >
              {opt} lesson{opt > 1 ? "s" : ""}
            </button>
          ))}
        </div>
      ) : (
        <>
          <div className={styles.progressRow}>
            <span className={styles.progressCount}>
              {completed} / {goal}
            </span>
            <span className={styles.progressPct}>{progress}%</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={`${styles.progressFill} ${goalMet ? styles.progressComplete : ""}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          {goalMet ? (
            <p className={styles.motivationText}>Daily goal complete! 🎉 Keep going!</p>
          ) : (
            <p className={styles.motivationText}>
              {goal - completed} more lesson{goal - completed > 1 ? "s" : ""} to hit your goal today!
            </p>
          )}
        </>
      )}
    </div>
  );
}
