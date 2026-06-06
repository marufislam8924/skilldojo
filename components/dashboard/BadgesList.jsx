"use client";

import React from "react";

const BADGE_MAP = {
  first_lesson: { title: "First Lesson", color: "bg-amber-100 text-amber-600" },
  three_day_streak: { title: "3 Day Streak", color: "bg-orange-100 text-orange-600" },
  xp_50: { title: "50 XP", color: "bg-emerald-100 text-emerald-600" },
};

export default function BadgesList({ badges = [] }) {
  const last = (badges || []).slice(-3).reverse();
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="text-sm font-semibold">Recent Badges</div>
      <div className="mt-3 space-y-2">
        {last.length === 0 ? (
          <div className="text-sm text-gray-500 dark:text-gray-400">No badges yet — earn some by completing lessons!</div>
        ) : (
          last.map((b, i) => {
            const meta = BADGE_MAP[b] || { title: b, color: "bg-gray-100 text-gray-700" };
            return (
              <div key={i} className="flex items-center gap-3 rounded-md border p-2">
                <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center ${meta.color}`}>🏅</div>
                <div>
                  <div className="text-sm font-medium">{meta.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{b}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
