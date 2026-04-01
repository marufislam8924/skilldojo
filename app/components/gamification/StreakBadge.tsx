type StreakBadgeProps = {
  streak: number;
};

export default function StreakBadge({ streak }: StreakBadgeProps) {
  const hasStreak = streak > 0;

  return (
    <div
      title={`${streak} day streak! Keep it up`}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition-all",
        hasStreak
          ? "border-orange-300 bg-orange-50 text-orange-700 shadow-[0_0_20px_rgba(249,115,22,0.35)]"
          : "border-slate-300 bg-slate-100 text-slate-500",
      ].join(" ")}
    >
      <span aria-hidden="true">🔥</span>
      <span>{streak}</span>
    </div>
  );
}
