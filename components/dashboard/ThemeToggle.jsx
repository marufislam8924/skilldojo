"use client";

import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("skilldojo.theme");
      if (stored) {
        setMode(stored);
        document.documentElement.classList.toggle("dark", stored === "dark");
      } else {
        // prefer system
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        setMode(prefersDark ? "dark" : "light");
        document.documentElement.classList.toggle("dark", prefersDark);
      }
    } catch {
      // ignore
    }
  }, []);

  function toggle() {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    try {
      window.localStorage.setItem("skilldojo.theme", next);
    } catch {}
    document.documentElement.classList.toggle("dark", next === "dark");
  }

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      aria-pressed={mode === "dark"}
    >
      <span>{mode === "dark" ? "🌙" : "☀️"}</span>
      <span className="text-sm font-medium">{mode === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
