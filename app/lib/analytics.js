function hasWindow() {
  return typeof window !== "undefined";
}

export function trackEvent(eventName, payload = {}) {
  if (!eventName || !hasWindow()) return;

  const eventPayload = {
    ...payload,
    timestamp: Date.now(),
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventPayload);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...eventPayload,
    });
  }

  window.dispatchEvent(
    new CustomEvent("skilldojo-analytics", {
      detail: {
        eventName,
        payload: eventPayload,
      },
    })
  );
}

export function trackSessionDuration(ms, context = "global") {
  const safeMs = Number(ms);
  if (!Number.isFinite(safeMs) || safeMs <= 0) return;

  trackEvent("session_time", {
    context,
    session_ms: Math.round(safeMs),
    session_seconds: Math.round(safeMs / 1000),
  });
}

export function trackLessonCompletion(payload = {}) {
  const {
    courseSlug,
    lessonId,
    score,
    totalCards,
    isNewLesson,
    xpGained,
    currentStreak,
  } = payload;

  trackEvent("lesson_complete", {
    course_slug: courseSlug || "unknown",
    lesson_id: Number(lessonId) || 0,
    score: Number(score) || 0,
    total_cards: Number(totalCards) || 0,
    is_new_lesson: Boolean(isNewLesson),
    xp_gained: Number(xpGained) || 0,
    current_streak: Number(currentStreak) || 0,
  });
}
