type BadgeId = "first_lesson" | "week_streak" | "n5_complete" | "vocab_master";

type BadgeCardProps = {
  badgeId: BadgeId;
  earned: boolean;
};

const BADGE_META: Record<BadgeId, { icon: string; name: string; description: string }> = {
  first_lesson: {
    icon: "🎯",
    name: "First Lesson",
    description: "Complete your first lesson.",
  },
  week_streak: {
    icon: "🔥",
    name: "Week Streak",
    description: "Stay active for 7 days in a row.",
  },
  n5_complete: {
    icon: "🏆",
    name: "N5 Complete",
    description: "Finish all 10 JLPT N5 lessons.",
  },
  vocab_master: {
    icon: "📚",
    name: "Vocab Master",
    description: "Earn 100 XP from your study progress.",
  },
};

export default function BadgeCard({ badgeId, earned }: BadgeCardProps) {
  const badge = BADGE_META[badgeId];

  return (
    <div
      className={[
        "rounded-xl border p-4 transition-all",
        earned
          ? "border-amber-300 bg-amber-50 text-slate-900"
          : "border-slate-200 bg-slate-50 text-slate-500 grayscale",
      ].join(" ")}
    >
      <div className="mb-2 flex items-center gap-2 text-lg font-bold">
        <span aria-hidden="true">{earned ? badge.icon : "🔒"}</span>
        <span>{badge.name}</span>
      </div>
      <p className="text-sm">{badge.description}</p>
    </div>
  );
}
