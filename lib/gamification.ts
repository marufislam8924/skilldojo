import { supabase } from "@/lib/supabase";

const N5_COURSE_ID = "n5";

type UserStatsRow = {
  user_id: string;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  last_active_date: string | null;
  level: number;
};

function toIsoDate(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function diffInDays(fromDate: Date, toDate: Date) {
  const oneDayMs = 1000 * 60 * 60 * 24;
  const utcFrom = Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
  const utcTo = Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
  return Math.floor((utcTo - utcFrom) / oneDayMs);
}

async function getOrCreateUserStats(userId: string): Promise<UserStatsRow> {
  const { data, error } = await supabase
    .from("user_stats")
    .select("user_id, total_xp, current_streak, longest_streak, last_active_date, level")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;

  if (data) {
    return {
      ...data,
      total_xp: data.total_xp ?? 0,
      current_streak: data.current_streak ?? 0,
      longest_streak: data.longest_streak ?? 0,
      level: data.level ?? 1,
    } as UserStatsRow;
  }

  const initialStats: UserStatsRow = {
    user_id: userId,
    total_xp: 0,
    current_streak: 0,
    longest_streak: 0,
    last_active_date: null,
    level: 1,
  };

  const { error: insertError } = await supabase.from("user_stats").insert(initialStats);
  if (insertError) throw insertError;

  return initialStats;
}

export async function awardXP(userId: string, amount: number, lessonId: number) {
  const safeAmount = Math.max(0, Math.floor(amount));
  const stats = await getOrCreateUserStats(userId);

  const newTotalXP = (stats.total_xp ?? 0) + safeAmount;
  const newLevel = Math.floor(newTotalXP / 100) + 1;

  const { error: updateError } = await supabase
    .from("user_stats")
    .update({
      total_xp: newTotalXP,
      level: newLevel,
    })
    .eq("user_id", userId);

  if (updateError) throw updateError;

  const { error: progressError } = await supabase.from("user_progress").insert({
    user_id: userId,
    lesson_id: lessonId,
    course_id: N5_COURSE_ID,
    xp_earned: safeAmount,
  });

  if (progressError) throw progressError;

  return {
    totalXP: newTotalXP,
    level: newLevel,
    xpEarned: safeAmount,
  };
}

export async function updateStreak(userId: string) {
  const today = new Date();
  const todayIso = toIsoDate(today);
  const stats = await getOrCreateUserStats(userId);

  const lastDate = stats.last_active_date ? new Date(stats.last_active_date) : null;

  let currentStreak = stats.current_streak ?? 0;
  let longestStreak = stats.longest_streak ?? 0;

  if (!lastDate) {
    currentStreak = 1;
  } else {
    const daysSinceLastActive = diffInDays(lastDate, today);

    if (daysSinceLastActive === 0) {
      currentStreak = stats.current_streak ?? 1;
    } else if (daysSinceLastActive === 1) {
      currentStreak = (stats.current_streak ?? 0) + 1;
    } else {
      currentStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, currentStreak);

  const { error } = await supabase
    .from("user_stats")
    .update({
      current_streak: currentStreak,
      longest_streak: longestStreak,
      last_active_date: todayIso,
    })
    .eq("user_id", userId);

  if (error) throw error;

  return {
    currentStreak,
    longestStreak,
    lastActiveDate: todayIso,
  };
}

export async function checkAndAwardBadges(userId: string) {
  const earnedBadges: string[] = [];

  const { data: badgeRows, error: badgeFetchError } = await supabase
    .from("user_badges")
    .select("badge_id")
    .eq("user_id", userId);

  if (badgeFetchError) throw badgeFetchError;

  const alreadyEarned = new Set((badgeRows ?? []).map((row) => row.badge_id));

  const { data: stats, error: statsError } = await supabase
    .from("user_stats")
    .select("total_xp, current_streak")
    .eq("user_id", userId)
    .maybeSingle();

  if (statsError) throw statsError;

  const { data: progressRows, error: progressError } = await supabase
    .from("user_progress")
    .select("lesson_id, course_id")
    .eq("user_id", userId)
    .eq("course_id", N5_COURSE_ID);

  if (progressError) throw progressError;

  const completedN5Lessons = new Set((progressRows ?? []).map((row) => row.lesson_id));
  const hasLessonOne = completedN5Lessons.has(1);
  const hasCompletedAllN5 = completedN5Lessons.size >= 10;
  const hasWeekStreak = (stats?.current_streak ?? 0) >= 7;
  const hasVocabMasterXP = (stats?.total_xp ?? 0) >= 100;

  const badgesToInsert: string[] = [];

  if (hasLessonOne && !alreadyEarned.has("first_lesson")) {
    badgesToInsert.push("first_lesson");
  }

  if (hasWeekStreak && !alreadyEarned.has("week_streak")) {
    badgesToInsert.push("week_streak");
  }

  if (hasCompletedAllN5 && !alreadyEarned.has("n5_complete")) {
    badgesToInsert.push("n5_complete");
  }

  if (hasVocabMasterXP && !alreadyEarned.has("vocab_master")) {
    badgesToInsert.push("vocab_master");
  }

  if (badgesToInsert.length > 0) {
    const { error: insertError } = await supabase.from("user_badges").insert(
      badgesToInsert.map((badgeId) => ({
        user_id: userId,
        badge_id: badgeId,
      }))
    );

    if (insertError) throw insertError;
    earnedBadges.push(...badgesToInsert);
  }

  return {
    newlyEarned: earnedBadges,
  };
}
