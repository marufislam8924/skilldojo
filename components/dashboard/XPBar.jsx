"use client";

import React from "react";

function getLevelInfo(xp = 0) {
  const level = Math.min(50, 1 + Math.floor((xp || 0) / 100));
  const currentLevelXP = (level - 1) * 100;
  const nextLevelXP = level * 100;
  const progressToNext = Math.min(100, Math.round(((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100));

  let tier = "Beginner";
  if (level <= 5) tier = "Beginner";
  else if (level <= 15) tier = "Elementary";
  else tier = "Intermediate";

  return { level, progressToNext, currentLevelXP, nextLevelXP, tier };
}

export default function XPBar({ xp = 0 }) {
  const { level, progressToNext, currentLevelXP, nextLevelXP, tier } = getLevelInfo(xp);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">XP Progress</div>
          <div className="text-lg font-bold">{tier} • Level {level}</div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {xp} XP
        </div>
      </div>

      <div className="mt-4">
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-3 rounded-full bg-emerald-400 transition-all duration-300"
            style={{ width: `${progressToNext}%` }}
            role="progressbar"
            aria-valuenow={progressToNext}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div>{currentLevelXP} XP</div>
          <div>{progressToNext}% to next</div>
          <div>{nextLevelXP} XP</div>
        </div>
      </div>
    </div>
  );
}
