"use client";

import { useEffect, useState } from "react";

type AchievementPopupProps = {
  text: string;
  show: boolean;
  variant?: "success" | "reward" | "badge";
  onDone?: () => void;
};

export default function AchievementPopup({
  text,
  show,
  variant = "success",
  onDone,
}: AchievementPopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) return;
    setVisible(true);
    const hide = setTimeout(() => {
      setVisible(false);
      if (onDone) onDone();
    }, 1400);
    return () => clearTimeout(hide);
  }, [show, onDone]);

  if (!show && !visible) return null;

  const palette =
    variant === "reward"
      ? "border-amber-200 bg-amber-50 text-amber-900"
      : variant === "badge"
        ? "border-violet-200 bg-violet-50 text-violet-900"
        : "border-emerald-200 bg-emerald-50 text-emerald-900";

  return (
    <div
      className={`pointer-events-none fixed left-1/2 top-6 z-[120] w-[min(92vw,420px)] -translate-x-1/2 rounded-2xl border px-4 py-3 text-center text-sm font-bold shadow-lg transition-all duration-300 ${palette} ${visible ? "translate-y-0 opacity-100 scale-100" : "-translate-y-3 opacity-0 scale-95"}`}
      role="status"
      aria-live="polite"
    >
      {text}
    </div>
  );
}
