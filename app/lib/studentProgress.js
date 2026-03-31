export const AUTH_KEY = "skilldojo.student";
export const PROGRESS_KEY = "skilldojo.progress";
export const GAMIFICATION_KEY = "skilldojo.gamification";

import {
  getGoogleRedirectSignInResult,
  isFirebaseConfigured,
  readRemoteProgress,
  shouldFallbackToRedirect,
  signInWithGoogleRedirectStart,
  signInWithGooglePopup,
  signOutFirebase,
  writeRemoteProgress,
  hasPendingRedirect,
  clearPendingRedirect,
  waitForRedirectUser,
} from "./firebaseClient";

export const COURSE_TOTALS = {
  hiragana: 21,
  katakana: 21,
  vocab: 25,
  grammar: 8,
  conversation: 15,
};

export const COURSE_LABELS = {
  hiragana: "Hiragana",
  katakana: "Katakana",
  vocab: "Vocabulary",
  grammar: "Grammar",
  conversation: "Conversation",
};

function hasWindow() {
  return typeof window !== "undefined";
}

function isPermissionDeniedError(error) {
  const code = error?.code || "";
  return code === "permission-denied" || code === "firestore/permission-denied";
}

function readJson(key, fallback) {
  if (!hasWindow()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  if (!hasWindow()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getStudentSession() {
  return readJson(AUTH_KEY, null);
}

export function isCloudSyncEnabled() {
  return isFirebaseConfigured();
}

// Gamification: XP, streaks, levels
function getGamification() {
  return readJson(GAMIFICATION_KEY, {
    totalXP: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: null,
    lessonsCompletedToday: 0,
  });
}

function saveGamification(data) {
  writeJson(GAMIFICATION_KEY, data);
}

function calculateLevel(totalXP) {
  // Level = 1 + floor(XP / 100), max level 50
  return Math.min(50, 1 + Math.floor(totalXP / 100));
}

function calculateXPForNextLevel(level) {
  return level * 100;
}

export function updateStreakAndXP(lessonsCompleted = 0) {
  if (!hasWindow() || lessonsCompleted <= 0) return {};

  const today = new Date().toDateString();
  const gamif = getGamification();
  const lastDate = gamif.lastActivityDate ? new Date(gamif.lastActivityDate).toDateString() : null;
  
  let currentStreak = gamif.currentStreak || 0;
  let longestStreak = gamif.longestStreak || 0;
  let lessonsToday = gamif.lessonsCompletedToday || 0;

  // Update streak: if activity across days
  if (lastDate !== today) {
    const lastDateObj = lastDate ? new Date(lastDate) : null;
    const todayObj = new Date(today);
    
    if (lastDateObj) {
      const diffMs = todayObj - lastDateObj;
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      
      if (diffDays === 1) {
        // Consecutive day: extend streak
        currentStreak += 1;
      } else if (diffDays > 1) {
        // Streak broken: reset to 1
        currentStreak = 1;
      }
    } else {
      // First activity ever
      currentStreak = 1;
    }

    longestStreak = Math.max(longestStreak, currentStreak);
    lessonsToday = 0;
  }

  // XP: 10 points per lesson
  const xpGained = lessonsCompleted * 10;
  const newTotal = (gamif.totalXP || 0) + xpGained;

  lessonsToday += lessonsCompleted;

  const newData = {
    totalXP: newTotal,
    currentStreak,
    longestStreak,
    lastActivityDate: new Date().toISOString(),
    lessonsCompletedToday: lessonsToday,
  };

  saveGamification(newData);
  return {
    xpGained,
    newLevel: calculateLevel(newTotal),
    currentStreak,
    message: `+${xpGained} XP • Streak: ${currentStreak} days`,
  };
}

export function getGamificationStats() {
  const gamif = getGamification();
  const level = calculateLevel(gamif.totalXP || 0);
  const xpForNextLevel = calculateXPForNextLevel(level);
  const currentLevelXP = (level - 1) * 100;
  const progressToNext = Math.min(100, Math.round(((gamif.totalXP - currentLevelXP) / xpForNextLevel) * 100));

  return {
    totalXP: gamif.totalXP || 0,
    level,
    progressToNext,
    currentStreak: gamif.currentStreak || 0,
    longestStreak: gamif.longestStreak || 0,
    lessonsCompletedToday: gamif.lessonsCompletedToday || 0,
  };
}

function isBetterScore(nextScore, prevScore) {
  if (!prevScore) return true;
  if (nextScore.score > prevScore.score) return true;
  if (nextScore.score === prevScore.score && nextScore.total > prevScore.total) return true;
  return false;
}

function mergeCourseState(localState = {}, remoteState = {}) {
  const localCompleted = Array.isArray(localState.completedLessons)
    ? localState.completedLessons
    : [];
  const remoteCompleted = Array.isArray(remoteState.completedLessons)
    ? remoteState.completedLessons
    : [];
  const completedLessons = [...new Set([...localCompleted, ...remoteCompleted])].sort(
    (a, b) => a - b
  );

  const localScores = localState.bestScores || {};
  const remoteScores = remoteState.bestScores || {};
  const bestScores = { ...localScores };

  Object.entries(remoteScores).forEach(([lessonKey, payload]) => {
    const current = bestScores[lessonKey];
    if (isBetterScore(payload, current)) {
      bestScores[lessonKey] = payload;
    }
  });

  const localUpdated = localState.lastUpdated ? new Date(localState.lastUpdated).getTime() : 0;
  const remoteUpdated = remoteState.lastUpdated
    ? new Date(remoteState.lastUpdated).getTime()
    : 0;

  return {
    completedLessons,
    bestScores,
    lastLessonId: localUpdated >= remoteUpdated ? localState.lastLessonId : remoteState.lastLessonId,
    lastUpdated:
      localUpdated >= remoteUpdated ? localState.lastUpdated || null : remoteState.lastUpdated || null,
  };
}

function mergeProgress(localProgress = {}, remoteProgress = {}) {
  const merged = {};

  Object.keys(COURSE_TOTALS).forEach((courseSlug) => {
    merged[courseSlug] = mergeCourseState(localProgress[courseSlug], remoteProgress[courseSlug]);
  });

  return merged;
}

export function signInStudent(name) {
  const cleaned = String(name || "").trim();
  const student = {
    name: cleaned || "Student",
    signedInAt: new Date().toISOString(),
    provider: "local",
    uid: null,
    email: null,
  };
  writeJson(AUTH_KEY, student);
  if (hasWindow()) {
    window.dispatchEvent(new Event("skilldojo-auth-changed"));
  }
  return student;
}

function createStudentFromUser(user) {
  return {
    name: user.displayName || user.email || "Student",
    signedInAt: new Date().toISOString(),
    provider: "google",
    uid: user.uid,
    email: user.email || null,
  };
}

async function applyGoogleUserSession(user) {
  const student = createStudentFromUser(user);

  writeJson(AUTH_KEY, student);
  if (hasWindow()) {
    window.dispatchEvent(new Event("skilldojo-auth-changed"));
  }

  try {
    await syncProgressFromCloud(user.uid);
  } catch {
    // Keep sign-in successful even when cloud sync fails.
  }
  return student;
}

export async function signInStudentWithGoogle() {
  try {
    const result = await signInWithGooglePopup();
    return applyGoogleUserSession(result.user);
  } catch (error) {
    if (shouldFallbackToRedirect(error)) {
      await signInWithGoogleRedirectStart();
      return null;
    }
    throw error;
  }
}

export async function finishGoogleRedirectSignIn() {
  const result = await getGoogleRedirectSignInResult();
  if (result?.user) {
    clearPendingRedirect();
    return applyGoogleUserSession(result.user);
  }

  // Fallback: on some mobile browsers getRedirectResult returns null
  // even after a successful redirect. Check Firebase auth state directly.
  const hadPendingRedirect = hasPendingRedirect();
  if (hadPendingRedirect) {
    clearPendingRedirect();
  }

  const user = await waitForRedirectUser(hadPendingRedirect ? 8000 : 1200);
  if (user) {
    return applyGoogleUserSession(user);
  }

  return null;
}

export function signOutStudent() {
  const student = getStudentSession();
  if (!hasWindow()) return;
  window.localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event("skilldojo-auth-changed"));

  if (student?.provider === "google") {
    signOutFirebase().catch(() => {
      // Keep local sign-out even when provider sign-out fails.
    });
  }
}

export function getStudentProgress() {
  return readJson(PROGRESS_KEY, {});
}

function saveStudentProgress(progress) {
  writeJson(PROGRESS_KEY, progress);
  if (hasWindow()) {
    window.dispatchEvent(new Event("skilldojo-progress-changed"));
  }
}

export async function syncProgressFromCloud(uid) {
  if (!uid || !isCloudSyncEnabled()) return getStudentProgress();

  const localProgress = getStudentProgress();
  const remoteProgress = await readRemoteProgress(uid);
  const merged = mergeProgress(localProgress, remoteProgress || {});

  saveStudentProgress(merged);
  await writeRemoteProgress(uid, merged);
  return merged;
}

export async function syncProgressToCloud(uid) {
  if (!uid || !isCloudSyncEnabled()) return;
  const localProgress = getStudentProgress();
  await writeRemoteProgress(uid, localProgress);
}

export function markLessonComplete(courseSlug, lessonId, score, totalCards) {
  if (!hasWindow() || !courseSlug || !lessonId) return;

  const safeScore = Number(score) || 0;
  const safeTotal = Number(totalCards) || 0;
  const now = new Date().toISOString();
  const progress = getStudentProgress();

  const courseState = progress[courseSlug] || {
    completedLessons: [],
    bestScores: {},
    lastLessonId: null,
    lastUpdated: null,
  };

  const isNewLesson = !courseState.completedLessons.includes(lessonId);

  if (isNewLesson) {
    courseState.completedLessons.push(lessonId);
    courseState.completedLessons.sort((a, b) => a - b);
  }

  const scoreKey = String(lessonId);
  const previousBest = courseState.bestScores[scoreKey];
  const shouldReplace =
    !previousBest ||
    safeScore > previousBest.score ||
    (safeScore === previousBest.score && safeTotal > previousBest.total);

  if (shouldReplace) {
    courseState.bestScores[scoreKey] = {
      score: safeScore,
      total: safeTotal,
      completedAt: now,
    };
  }

  courseState.lastLessonId = lessonId;
  courseState.lastUpdated = now;
  progress[courseSlug] = courseState;

  saveStudentProgress(progress);

  // Track XP and streak only for new lessons
  const gamifResult = isNewLesson ? updateStreakAndXP(1) : {};

  const student = getStudentSession();
  if (student?.uid && student.provider === "google") {
    syncProgressToCloud(student.uid).catch(() => {
      // Do not block lesson flow if cloud sync fails.
    });
  }

  return gamifResult;
}

export function getDashboardData() {
  const progress = getStudentProgress();

  const courses = Object.entries(COURSE_TOTALS).map(([slug, totalLessons]) => {
    const state = progress[slug] || {};
    const completedLessons = Array.isArray(state.completedLessons)
      ? state.completedLessons
      : [];

    return {
      slug,
      label: COURSE_LABELS[slug] || slug,
      totalLessons,
      completedCount: completedLessons.length,
      completedPercent:
        totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0,
      nextLesson:
        completedLessons.length < totalLessons ? completedLessons.length + 1 : totalLessons,
    };
  });

  const recentActivity = [];
  Object.entries(progress).forEach(([courseSlug, state]) => {
    const scores = state?.bestScores || {};
    Object.entries(scores).forEach(([lessonKey, payload]) => {
      recentActivity.push({
        courseSlug,
        courseLabel: COURSE_LABELS[courseSlug] || courseSlug,
        lessonId: Number(lessonKey),
        score: payload.score,
        total: payload.total,
        completedAt: payload.completedAt,
      });
    });
  });

  recentActivity.sort((a, b) => {
    const aTime = a.completedAt ? new Date(a.completedAt).getTime() : 0;
    const bTime = b.completedAt ? new Date(b.completedAt).getTime() : 0;
    return bTime - aTime;
  });

  const totalLessons = courses.reduce((sum, course) => sum + course.totalLessons, 0);
  const completedLessons = courses.reduce((sum, course) => sum + course.completedCount, 0);

  return {
    courses,
    overall: {
      completedLessons,
      totalLessons,
      completedPercent:
        totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
    },
    recentActivity: recentActivity.slice(0, 8),
  };
}
