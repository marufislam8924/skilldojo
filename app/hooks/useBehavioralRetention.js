"use client";

import { useMemo } from "react";

const VARIABLE_REWARD_KEY = "skilldojo.variableReward";

function hasWindow() {
  return typeof window !== "undefined";
}

function readRewardState() {
  if (!hasWindow()) return null;

  try {
    const raw = window.localStorage.getItem(VARIABLE_REWARD_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeRewardState(value) {
  if (!hasWindow()) return;
  window.localStorage.setItem(VARIABLE_REWARD_KEY, JSON.stringify(value));
}

function pickRandomBonus() {
  const pool = [3, 5, 8, 13, 21];
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

export function useBehavioralRetention({ stats, overall }) {
  const completedLessons = Number(overall?.completedLessons) || 0;
  const totalLessons = Math.max(1, Number(overall?.totalLessons) || 1);

  const zeigarnik = useMemo(() => {
    const checkpointSize = 5;
    const progressInCheckpoint = completedLessons % checkpointSize;
    const unfinishedCount = progressInCheckpoint === 0 ? checkpointSize : checkpointSize - progressInCheckpoint;

    return {
      unfinishedCount,
      progressInCheckpoint,
      checkpointSize,
      message:
        unfinishedCount === 1
          ? "1 lesson left to close this learning block."
          : `${unfinishedCount} lessons left to close this learning block.`,
      completionMessage: `${completedLessons}/${totalLessons} lessons complete`,
    };
  }, [completedLessons, totalLessons]);

  const currentStreak = Number(stats?.currentStreak) || 0;
  const lessonsCompletedToday = Number(stats?.lessonsCompletedToday) || 0;
  const showStreakWarning = currentStreak >= 3 && lessonsCompletedToday === 0;
  const urgencyMessage = showStreakWarning
    ? "Continue now to keep progress and protect your streak."
    : "Continue now to keep progress.";

  const streakWarningText = showStreakWarning
    ? `Don't lose your ${currentStreak}-day streak!`
    : "";

  const maybeTriggerVariableReward = (source = "unknown") => {
    if (!hasWindow()) return { granted: false };

    const now = Date.now();
    const today = new Date().toISOString().slice(0, 10);
    const state = readRewardState() || {
      date: today,
      grantCountToday: 0,
      lastGrantedAt: 0,
    };

    const safeState =
      state.date === today
        ? state
        : {
            date: today,
            grantCountToday: 0,
            lastGrantedAt: 0,
          };

    const cooldownMs = 1000 * 60 * 20;
    if (now - (safeState.lastGrantedAt || 0) < cooldownMs) {
      return { granted: false, reason: "cooldown" };
    }

    if ((safeState.grantCountToday || 0) >= 4) {
      return { granted: false, reason: "daily_cap" };
    }

    let chance = 0.32;
    if (currentStreak >= 7) chance += 0.1;
    else if (currentStreak >= 3) chance += 0.06;

    const roll = Math.random();
    if (roll > chance) {
      return { granted: false, reason: "miss", chance, roll };
    }

    const bonusXP = pickRandomBonus();

    writeRewardState({
      date: today,
      grantCountToday: (safeState.grantCountToday || 0) + 1,
      lastGrantedAt: now,
    });

    return {
      granted: true,
      bonusXP,
      chance,
      roll,
      source,
      message: `Lucky bonus! +${bonusXP} XP`,
    };
  };

  return {
    zeigarnik,
    urgencyMessage,
    showStreakWarning,
    streakWarningText,
    maybeTriggerVariableReward,
  };
}
