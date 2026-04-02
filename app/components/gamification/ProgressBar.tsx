type ProgressBarProps = {
  current: number;
  total: number;
  label?: string;
};

export default function ProgressBar({ current, total, label = "Progress" }: ProgressBarProps) {
  const safeTotal = Math.max(1, total || 1);
  const safeCurrent = Math.max(0, Math.min(current, safeTotal));
  const percent = Math.round((safeCurrent / safeTotal) * 100);

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-slate-700">
          {label} {safeCurrent} of {safeTotal} ({percent}%)
        </span>
        <span className="text-slate-500">{percent}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
