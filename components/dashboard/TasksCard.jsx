"use client";

import React, { useEffect, useState } from "react";

export default function TasksCard({ onMarkDone = () => {} }) {
  const tasks = [
    { key: "review_vocab", label: "Review vocabulary (10m)", xp: 10 },
    { key: "practice_kana", label: "Practice kana (10m)", xp: 10 },
    { key: "conversation", label: "1 conversation exercise", xp: 15 },
  ];

  const [state, setState] = useState({});

  useEffect(() => {
    const todayKey = `skilldojo.dailyTasks.${new Date().toISOString().slice(0,10)}`;
    try {
      const raw = window.localStorage.getItem(todayKey);
      setState(raw ? JSON.parse(raw) : {});
    } catch {
      setState({});
    }
  }, []);

  function markDone(task) {
    try {
      const todayKey = `skilldojo.dailyTasks.${new Date().toISOString().slice(0,10)}`;
      const next = { ...(state || {}) };
      next[task.key] = true;
      window.localStorage.setItem(todayKey, JSON.stringify(next));
      setState(next);
      onMarkDone(task.xp, task.key);
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Today's Tasks</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Complete these to keep your streak</div>
        </div>
      </div>

      <ul className="mt-4 space-y-3">
        {tasks.map((t) => {
          const done = Boolean(state?.[t.key]);
          return (
            <li key={t.key} className="flex items-center justify-between rounded-lg p-2">
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 flex items-center justify-center rounded ${done ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"}`}>
                  {done ? "✓" : "○"}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{t.xp} XP</div>
                </div>
              </div>
              <div>
                <button
                  onClick={() => markDone(t)}
                  disabled={done}
                  className={`rounded-md px-3 py-1 text-sm font-semibold ${done ? "bg-gray-200 text-gray-500" : "bg-emerald-500 text-white hover:bg-emerald-600"}`}
                >
                  {done ? "Done" : "Mark done"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
