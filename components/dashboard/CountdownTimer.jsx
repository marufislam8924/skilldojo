"use client";

import React, { useEffect, useState } from "react";

function getNextMockTestDate() {
  // Next Saturday at 12:00 local time
  const now = new Date();
  const day = now.getDay(); // 0 Sun..6 Sat
  const daysUntilSat = (6 - day + 7) % 7 || 7; // always next Saturday (not today)
  const next = new Date(now);
  next.setDate(now.getDate() + daysUntilSat);
  next.setHours(12, 0, 0, 0);
  return next;
}

export default function CountdownTimer() {
  const [target] = useState(getNextMockTestDate);
  const [remaining, setRemaining] = useState(() => Math.max(0, target.getTime() - Date.now()));

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(Math.max(0, target.getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="text-sm font-semibold">Next Mock Test</div>
      <div className="mt-2 text-2xl font-bold">{days}d {hours}h</div>
      <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{minutes}m {seconds}s remaining</div>
      <div className="mt-3">
        <a href="/quiz" className="inline-flex items-center rounded bg-indigo-600 px-3 py-1 text-sm font-semibold text-white hover:bg-indigo-700">Prepare</a>
      </div>
    </div>
  );
}
