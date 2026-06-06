"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  getStudentSession,
  getGamificationStats,
  getDashboardData,
  getContinueLesson,
  addXP,
} from "../../app/lib/studentProgress";
import Sidebar from "./Sidebar";
import StreakCounter from "./StreakCounter";
import XPBar from "./XPBar";
import TasksCard from "./TasksCard";
import ContinueButton from "./ContinueButton";
import CountdownTimer from "./CountdownTimer";
import BadgesList from "./BadgesList";
import ThemeToggle from "./ThemeToggle";
import SkeletonLoader from "./SkeletonLoader";

export default function DashboardClient() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(null);
  const [uid, setUid] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const student = getStudentSession();
        let userId = student?.uid || null;

        if (!userId) {
          try {
            const sessionResp = await supabase.auth.getUser();
            userId = sessionResp?.data?.user?.id ?? null;
          } catch (e) {
            // ignore
          }
        }

        if (mounted) setUid(userId);

        if (userId) {
          const { data, error: fetchErr } = await supabase
            .from("user_progress")
            .select("*")
            .eq("user_id", userId)
            .maybeSingle();

          if (fetchErr) {
            console.warn("Supabase fetch error:", fetchErr);
          }

          if (data) {
            const mapped = {
              streak: data.streak || 0,
              xp: data.xp || 0,
              last_module: data.last_module || null,
              badges: Array.isArray(data.badges) ? data.badges : data.badges ? JSON.parse(data.badges) : [],
              raw: data,
            };
            if (mounted) setProgress(mapped);
          } else {
            // Fallback to local progress
            const gamif = getGamificationStats();
            const dashboard = getDashboardData();
            if (mounted)
              setProgress({
                streak: gamif.currentStreak,
                xp: gamif.totalXP,
                last_module: getContinueLesson()?.href || null,
                badges: gamif.unlockedBadges || [],
                dashboard,
              });
          }
        } else {
          const gamif = getGamificationStats();
          const dashboard = getDashboardData();
          if (mounted)
            setProgress({
              streak: gamif.currentStreak,
              xp: gamif.totalXP,
              last_module: getContinueLesson()?.href || null,
              badges: gamif.unlockedBadges || [],
              dashboard,
            });
        }
      } catch (err) {
        console.error(err);
        if (mounted) setError(err?.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  async function handleMarkTaskDone(xpAmount = 10, taskKey = null) {
    // local add
    try {
      addXP(xpAmount, { source: "daily_task" });
    } catch (e) {
      console.warn(e);
    }

    // try to push to Supabase if we have uid
    try {
      const gamif = getGamificationStats();
      if (uid) {
        await supabase.from("user_progress").upsert(
          {
            user_id: uid,
            xp: gamif.totalXP,
            streak: gamif.currentStreak,
          },
          { onConflict: ["user_id"] }
        );
      }
    } catch (e) {
      console.warn("Failed to update supabase progress:", e?.message || e);
    }

    // refresh local view
    const gamifAfter = getGamificationStats();
    setProgress((p) => ({ ...(p || {}), xp: gamifAfter.totalXP, streak: gamifAfter.currentStreak, badges: gamifAfter.unlockedBadges || [] }));
    if (taskKey && typeof window !== "undefined") {
      const todayKey = `skilldojo.dailyTasks.${new Date().toISOString().slice(0,10)}`;
      const raw = window.localStorage.getItem(todayKey);
      const state = raw ? JSON.parse(raw) : {};
      state[taskKey] = true;
      window.localStorage.setItem(todayKey, JSON.stringify(state));
    }
  }

  if (loading) return <SkeletonLoader />;
  if (error) return <div className="p-4 rounded bg-red-50 text-red-700">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside className="md:col-span-1">
        <Sidebar />
      </aside>

      <main className="md:col-span-3">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">Your learning summary and daily tasks</p>
          </div>
          <div>
            <ThemeToggle />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1">
            <StreakCounter streak={progress?.streak || 0} />
          </div>
          <div className="col-span-2">
            <XPBar xp={progress?.xp || 0} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <TasksCard onMarkDone={handleMarkTaskDone} />
            <ContinueButton href={progress?.last_module || null} />
            <CountdownTimer />
          </div>

          <div className="lg:col-span-1">
            <BadgesList badges={progress?.badges || []} />
          </div>
        </div>
      </main>
    </div>
  );
}
