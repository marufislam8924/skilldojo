import Link from "next/link";
import { redirect } from "next/navigation";
import BadgeCard from "@/components/gamification/BadgeCard";
import StreakBadge from "@/components/gamification/StreakBadge";
import XPBar from "@/components/gamification/XPBar";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard — Your Japanese Learning Progress",
  description:
    "Track your JLPT N5 course progress, XP, streaks, and earned badges on your personal SkillDojo dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const BADGE_IDS = [
  "first_lesson",
  "three_day_streak",
  "week_streak",
  "month_streak",
  "ten_lessons",
  "fifty_lessons",
  "n5_complete",
  "vocab_master",
  "xp_500",
  "xp_1000",
  "speed_demon",
  "perfectionist",
  "daily_champion",
  "comeback_kid",
] as const;

type BadgeId = (typeof BADGE_IDS)[number];

type UserStatsRow = {
  total_xp: number | null;
  current_streak: number | null;
  level: number | null;
};

type ProgressRow = {
  course_id: string;
  lesson_id: number;
  completed_at: string;
};

type BadgeRow = {
  badge_id: string;
};

const COURSE_META: Record<string, { title: string; totalLessons: number; href: string }> = {
  n5: {
    title: "JLPT N5",
    totalLessons: 10,
    href: "/courses/n5",
  },
};

function courseTitle(courseId: string) {
  return COURSE_META[courseId]?.title ?? courseId.toUpperCase();
}

function lessonTotal(courseId: string, completedCount: number) {
  return COURSE_META[courseId]?.totalLessons ?? Math.max(completedCount, 1);
}

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/student/signin");
  }

  const [{ data: statsData }, { data: progressData }, { data: badgesData }] = await Promise.all([
    supabase
      .from("user_stats")
      .select("total_xp, current_streak, level")
      .eq("user_id", user.id)
      .maybeSingle<UserStatsRow>(),
    supabase
      .from("user_progress")
      .select("course_id, lesson_id, completed_at")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false })
      .returns<ProgressRow[]>(),
    supabase
      .from("user_badges")
      .select("badge_id")
      .eq("user_id", user.id)
      .returns<BadgeRow[]>(),
  ]);

  const totalXP = statsData?.total_xp ?? 0;
  const level = statsData?.level ?? Math.floor(totalXP / 100) + 1;
  const streak = statsData?.current_streak ?? 0;

  // Calculate streak multiplier  
  let multiplier = 1.0;
  if (streak >= 30) multiplier = 2.0;
  else if (streak >= 14) multiplier = 1.5;
  else if (streak >= 7) multiplier = 1.3;
  else if (streak >= 3) multiplier = 1.1;

  const progressRows = progressData ?? [];
  const earnedBadgeIds = new Set((badgesData ?? []).map((row) => row.badge_id));

  const n5Completed = new Set(
    progressRows
      .filter((row) => row.course_id === "n5")
      .map((row) => row.lesson_id)
      .filter((value) => Number.isInteger(value) && value > 0)
  );

  let continueHref = "/courses/n5";
  let continueLabel = "Continue where you left off";

  for (let lesson = 1; lesson <= 10; lesson += 1) {
    if (!n5Completed.has(lesson)) {
      continueHref = `/courses/n5/${lesson}`;
      continueLabel = `Continue where you left off (Lesson ${lesson})`;
      break;
    }
  }

  const progressByCourse = new Map<string, Set<number>>();

  for (const row of progressRows) {
    if (!progressByCourse.has(row.course_id)) {
      progressByCourse.set(row.course_id, new Set<number>());
    }
    progressByCourse.get(row.course_id)?.add(row.lesson_id);
  }

  if (!progressByCourse.has("n5")) {
    progressByCourse.set("n5", new Set<number>());
  }

  const courseCards = Array.from(progressByCourse.entries()).map(([courseId, lessons]) => {
    const completed = lessons.size;
    const total = lessonTotal(courseId, completed);
    const percent = Math.round((completed / total) * 100);
    const isCompleted = completed >= total;

    let nextLesson = 1;
    for (let lesson = 1; lesson <= total; lesson += 1) {
      if (!lessons.has(lesson)) {
        nextLesson = lesson;
        break;
      }
    }

    const defaultHref = COURSE_META[courseId]?.href ?? `/courses/${courseId}`;
    const startHref = `${defaultHref}/1`;
    const continueHref = `${defaultHref}/${nextLesson}`;

    return {
      courseId,
      title: courseTitle(courseId),
      completed,
      total,
      percent,
      isCompleted,
      ctaLabel: completed === 0 ? "Start Course" : "Continue",
      ctaHref: completed === 0 ? startHref : continueHref,
    };
  });

  const displayName =
    user.user_metadata?.name ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Learner";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome back, {displayName}!
          </h1>
          <p className="mt-2 text-base text-slate-600">
            Keep your momentum going with streaks, XP, and badge progress.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-[auto_1fr] md:items-center">
            <StreakBadge streak={streak} />
            <XPBar totalXP={totalXP} level={level} />
          </div>

          {multiplier > 1 && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-violet-300 bg-violet-50 px-4 py-2.5">
              <span className="text-lg">⚡</span>
              <span className="text-sm font-bold text-violet-700">
                {multiplier}x XP bonus active
              </span>
              <span className="text-xs font-semibold text-violet-500">
                ({streak}-day streak)
              </span>
            </div>
          )}

          {multiplier < 2.0 && streak > 0 && (
            <p className="mt-2 text-xs text-slate-500">
              {streak < 3
                ? `${3 - streak} more day${3 - streak > 1 ? "s" : ""} to unlock 1.1x XP bonus!`
                : streak < 7
                  ? `${7 - streak} more day${7 - streak > 1 ? "s" : ""} to reach 1.3x XP bonus!`
                  : streak < 14
                    ? `${14 - streak} more day${14 - streak > 1 ? "s" : ""} to reach 1.5x XP bonus!`
                    : `${30 - streak} more day${30 - streak > 1 ? "s" : ""} to reach 2x XP bonus!`}
            </p>
          )}

          <div className="mt-6">
            <Link
              href={continueHref}
              className="inline-flex items-center rounded-full bg-emerald-600 px-5 py-2.5 text-base font-semibold text-white transition hover:bg-emerald-500"
            >
              {continueLabel}
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Course Progress</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courseCards.map((course) => (
              <article key={course.courseId} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-semibold text-slate-900">{course.title}</h3>
                  {course.isCompleted ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                      ✓ Completed
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-slate-600">{course.percent}%</span>
                  )}
                </div>

                <p className="mt-2 text-base text-slate-600">
                  {course.completed}/{course.total} lessons complete
                </p>

                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${course.percent}%` }}
                  />
                </div>

                {!course.isCompleted ? (
                  <Link
                    href={course.ctaHref}
                    className="mt-4 inline-flex items-center rounded-full bg-emerald-600 px-4 py-2 text-base font-semibold text-white transition hover:bg-emerald-500"
                  >
                    {course.ctaLabel}
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-bold text-slate-900">Badges</h2>
          <p className="mb-4 text-sm text-slate-500">
            {earnedBadgeIds.size} / {BADGE_IDS.length} earned
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {BADGE_IDS.map((badgeId) => (
              <BadgeCard key={badgeId} badgeId={badgeId} earned={earnedBadgeIds.has(badgeId)} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
