type XPBarProps = {
  totalXP: number;
  level: number;
};

export default function XPBar({ totalXP, level }: XPBarProps) {
  const xpIntoLevel = totalXP % 100;
  const progress = Math.max(0, Math.min(100, xpIntoLevel));

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-800">Level {level}</p>
        <p className="text-xs text-slate-600">{xpIntoLevel}/100 XP</p>
      </div>

      <p className="mb-2 text-sm text-slate-600">Level {level} - {xpIntoLevel}/100 XP</p>

      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
