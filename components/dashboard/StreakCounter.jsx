"use client";

import React from "react";

export default function StreakCounter({ streak = 0 }) {
  const days = Array.from({ length: Math.min(7, Math.max(1, streak)) });
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-orange-50 p-3 text-orange-600">🔥</div>
        <div>
          <div className="text-sm font-semibold">Daily Streak</div>
          <div className="text-2xl font-bold">{streak} days</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">Last 7 days</div>
        <div className="mt-2 flex gap-1">
          {Array.from({ length: 7 }).map((_, i) => {
            const filled = i < Math.min(7, streak);
            return (
              <div
                key={i}
                className={`h-2 w-8 rounded-full ${filled ? "bg-orange-400" : "bg-gray-200 dark:bg-gray-700"}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
