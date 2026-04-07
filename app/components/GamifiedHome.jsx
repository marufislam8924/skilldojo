"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ContinueCard from "./gamification/ContinueCard";
import StreakBadge from "./gamification/StreakBadge";
import XPBar from "./gamification/XPBar";
import BadgeCard from "./gamification/BadgeCard";
import AchievementPopup from "./gamification/AchievementPopup";
import Confetti from "./Confetti";
import DailyGoal from "./DailyGoal";
import AdSenseUnit from "./AdSenseUnit";
import {
  addXP,
  clearReviewMistakes,
  getContinueLesson,
  getDashboardData,
  getGamificationStats,
  getReviewMistakes,
} from "../lib/studentProgress";
import { useAnalytics } from "../hooks/useAnalytics";
import { useBehavioralRetention } from "../hooks/useBehavioralRetention";

const TESTIMONIALS = [
  {
    quote: "I finally stayed consistent for 21 days because every lesson feels like a tiny win.",
    name: "Maya R.",
    role: "Beginner learner",
  },
  {
    quote: "The one-click start removed my excuses. I open SkillDojo and continue instantly.",
    name: "Ken J.",
    role: "Busy professional",
  },
  {
    quote: "The streak and XP feedback made me practice daily instead of weekly.",
    name: "Sara T.",
    role: "JLPT N5 student",
  },
];

const BADGE_SHOWCASE = ["first_lesson", "three_day_streak", "week_streak", "xp_500"];

function getLevelTrack(level = 1) {
  if (level >= 9) return "Advanced";
  if (level >= 4) return "Intermediate";
  return "Beginner";
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="px-6 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        {(title || subtitle) && (
          <div className="mb-8 text-center md:mb-10">
            {subtitle ? (
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-amber-600">{subtitle}</p>
            ) : null}
            {title ? (
              <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">{title}</h2>
            ) : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function SectionAction({ href, label, onClick }) {
  return (
    <div className="mt-6 text-center">
      <Link
        href={href}
        onClick={onClick}
        className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-900"
      >
        {label}
      </Link>
    </div>
  );
}

function TopProgressLoop({
  percent,
  continueHref,
  onContinueClick,
  urgencyMessage,
  streakWarningText,
  showStreakWarning,
  zeigarnikMessage,
}) {
  return (
    <div className="sticky top-14 z-40 border-y border-slate-200 bg-white/95 px-6 py-3 backdrop-blur md:top-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:max-w-xl">
          <div className="mb-1.5 flex items-center justify-between text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
            <span>Persistent Progress</span>
            <span>You are {percent}% complete</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs font-semibold text-slate-600">{zeigarnikMessage}</p>
          <p className="mt-0.5 text-xs text-amber-700">{urgencyMessage}</p>
          {showStreakWarning ? (
            <p className="mt-1 inline-flex rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-700 animate-pulse">
              {streakWarningText}
            </p>
          ) : null}
        </div>

        <Link
          href={continueHref}
          onClick={onContinueClick}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
        >
          Continue where you left off
        </Link>
      </div>
    </div>
  );
}

export default function GamifiedHome() {
  const router = useRouter();
  const { trackCTA, trackCustom } = useAnalytics("home");
  const homeAdSlot = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_HOME_SLOT;
  const animeFeaturedHref = "/anime-phrases";

  const [stats, setStats] = useState({
    totalXP: 0,
    level: 1,
    currentStreak: 0,
    lessonsCompletedToday: 0,
    minutesStudiedToday: 0,
    unlockedBadges: [],
  });
  const [overall, setOverall] = useState({ completedLessons: 0, totalLessons: 0, completedPercent: 0 });
  const [mistakes, setMistakes] = useState([]);
  const [continueInfo, setContinueInfo] = useState(null);
  const [liveLearners, setLiveLearners] = useState(23);
  const [contentReady, setContentReady] = useState(false);
  const [reward, setReward] = useState({ show: false, text: "" });
  const [showConfetti, setShowConfetti] = useState(false);

  const refreshHomeData = useCallback(() => {
    setStats(getGamificationStats());
    setOverall(getDashboardData().overall);
    setMistakes(getReviewMistakes(5));
    setContinueInfo(getContinueLesson());
  }, []);

  useEffect(() => {
    refreshHomeData();
    window.addEventListener("skilldojo-progress-changed", refreshHomeData);
    return () => window.removeEventListener("skilldojo-progress-changed", refreshHomeData);
  }, [refreshHomeData]);

  useEffect(() => {
    const timer = window.setTimeout(() => setContentReady(true), 420);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setLiveLearners((current) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(14, Math.min(42, current + delta));
      });
    }, 7000);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    trackCustom("live_learning_indicator", { learners_now: liveLearners });
  }, [liveLearners, trackCustom]);

  const continueHref = continueInfo?.href || "/hiragana/1";
  const continueLabel = continueInfo
    ? `Continue Lesson ${continueInfo.lessonId}`
    : "Continue Lesson";

  const persistentPercent = Math.max(20, overall.completedPercent || 0);
  const heroStartPercent = stats.totalXP > 0 ? Math.max(5, Math.min(100, stats.totalXP % 100)) : 5;

  const levelTrack = getLevelTrack(stats.level);
  const unlockedSet = useMemo(() => new Set(stats.unlockedBadges || []), [stats.unlockedBadges]);
  const {
    zeigarnik,
    urgencyMessage,
    showStreakWarning,
    streakWarningText,
    maybeTriggerVariableReward,
  } = useBehavioralRetention({ stats, overall });

  const triggerDopamineFeedback = useCallback(() => {
    setShowConfetti(true);
    window.setTimeout(() => setShowConfetti(false), 1300);

    // Optional sound feedback using Web Audio API.
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const context = new AudioCtx();
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = "triangle";
      oscillator.frequency.value = 660;
      oscillator.connect(gain);
      gain.connect(context.destination);

      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.16);

      oscillator.start();
      oscillator.stop(context.currentTime + 0.18);
    } catch {
      // No-op when audio is blocked or unsupported.
    }
  }, []);

  const maybeAwardVariableBonus = useCallback(
    (source) => {
      const rewardRoll = maybeTriggerVariableReward(source);
      if (!rewardRoll.granted) return;

      const bonusResult = addXP(rewardRoll.bonusXP, {
        source: `variable_reward_${source}`,
      });

      setReward({ show: true, text: `Lucky bonus! +${bonusResult.xpGained || rewardRoll.bonusXP} XP` });
      triggerDopamineFeedback();

      trackCustom("variable_reward_bonus", {
        source,
        bonus_xp: rewardRoll.bonusXP,
        chance: rewardRoll.chance,
      });
    },
    [maybeTriggerVariableReward, trackCustom, triggerDopamineFeedback]
  );

  const handleStartOneClick = useCallback(() => {
    trackCTA("start_in_1_click", { location: "hero_preview", target: continueHref });

    const xpResult = addXP(10, { source: "home_start_preview" });
    if (xpResult?.xpGained) {
      setReward({ show: true, text: `You earned +${xpResult.xpGained} XP` });
      triggerDopamineFeedback();
    }

    maybeAwardVariableBonus("start_one_click");

    window.setTimeout(() => {
      router.push(continueHref);
    }, 380);
  }, [continueHref, router, trackCTA, triggerDopamineFeedback, maybeAwardVariableBonus]);

  return (
    <div className="bg-white text-slate-900">
      <Confetti show={showConfetti} />

      <AchievementPopup
        show={reward.show}
        text={reward.text}
        variant="reward"
        onDone={() => setReward({ show: false, text: "" })}
      />

      <TopProgressLoop
        percent={persistentPercent}
        continueHref={continueHref}
        urgencyMessage={urgencyMessage}
        streakWarningText={streakWarningText}
        showStreakWarning={showStreakWarning}
        zeigarnikMessage={zeigarnik.message}
        onContinueClick={() => {
          trackCTA("continue_where_left_off", { location: "sticky_progress" });
          maybeAwardVariableBonus("sticky_continue");
        }}
      />

      <Section id="hero">
        <div className="grid items-center gap-7 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-amber-700">
              Start in 1 click, no signup needed
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl">
              Learn practical Japanese in 15 minutes a day and build real fluency momentum.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-600">
              Follow bite-sized lessons, earn instant rewards, and keep a streak that turns daily practice into habit.
            </p>
            <p className="mt-2 text-sm font-semibold text-amber-700">{urgencyMessage}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleStartOneClick}
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-base font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 animate-pulse [animation-duration:2.6s]"
              >
                Start Learning Now
              </button>
              <Link
                href="/courses/30-days"
                onClick={() => trackCTA("view_30_day_path", { location: "hero" })}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-900"
              >
                Explore 30-Day Plan
              </Link>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
                <span>New learner progress</span>
                <span>{heroStartPercent}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-orange-500 to-amber-400 transition-all duration-1000"
                  style={{ width: `${heroStartPercent}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-semibold text-slate-600">{zeigarnik.message}</p>
              <p className="mt-1 text-xs text-slate-500">{zeigarnik.completionMessage}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">Free lesson preview</h3>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">No login</span>
            </div>

            <div className="space-y-3">
              {!contentReady
                ? [1, 2, 3].map((idx) => (
                    <div key={idx} className="h-16 animate-pulse rounded-xl border border-slate-200 bg-slate-100" />
                  ))
                : [
                    { title: "Hiragana essentials", xp: "+10 XP", state: "Ready" },
                    { title: "Core N5 words", xp: "+15 XP", state: "Preview" },
                    { title: "Mini conversation", xp: "+20 XP", state: "Challenge" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <div>
                        <p className="font-semibold text-slate-800">{item.title}</p>
                        <p className="text-xs font-semibold text-slate-500">{item.xp}</p>
                      </div>
                      <span className="rounded-full bg-sky-50 px-2 py-1 text-xs font-bold text-sky-700">{item.state}</span>
                    </div>
                  ))}
            </div>

            {showStreakWarning ? (
              <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-bold text-rose-700">
                {streakWarningText}
              </p>
            ) : null}

            <button
              type="button"
              onClick={handleStartOneClick}
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-600"
            >
              Start in 1 click
            </button>
          </div>
        </div>

        <SectionAction
          href={continueHref}
          label="Continue Lesson →"
          onClick={() => {
            trackCTA("continue_after_hero", { target: continueHref });
            maybeAwardVariableBonus("hero_continue");
          }}
        />
      </Section>

      <Section title="Anime Phrases Course" subtitle="Featured New Course">
        <div className="relative overflow-hidden rounded-3xl border border-orange-200 bg-gradient-to-r from-orange-50 via-amber-50 to-rose-50 p-6 shadow-lg md:p-8">
          <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-orange-200/40 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-14 h-44 w-44 rounded-full bg-rose-200/30 blur-2xl" />

          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-center">
            <div>
              <p className="inline-flex items-center rounded-full border border-orange-300 bg-white/80 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-orange-700">
                New on SkillDojo
              </p>
              <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                Anime Phrases: 1000 real lines you actually hear in anime
              </h3>
              <p className="mt-3 max-w-2xl text-slate-700">
                Learn iconic expressions from greetings and reactions to battle lines, school life, and emotional endings. Structured for beginners to lower-intermediate learners.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "20 lessons",
                  "10 phrases per lesson",
                  "N5 to N3 range",
                  "Romaji and context included",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-bold text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`${animeFeaturedHref}/1`}
                  onClick={() => {
                    trackCTA("start_anime_phrases", { location: "featured_course" });
                    maybeAwardVariableBonus("anime_course_start");
                  }}
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Start Lesson 1
                </Link>
                <Link
                  href={animeFeaturedHref}
                  onClick={() => trackCTA("view_anime_phrases_overview", { location: "featured_course" })}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-900"
                >
                  Browse Course
                </Link>
              </div>
            </div>

            <div className="relative z-10 rounded-2xl border border-orange-200 bg-white/90 p-5 shadow-sm backdrop-blur">
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-orange-700">Course Snapshot</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: "Total phrases", value: "200" },
                  { label: "Lessons", value: "20" },
                  { label: "Format", value: "JP + Romaji" },
                  { label: "Focus", value: "Anime usage" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">{item.label}</p>
                    <p className="mt-1 text-sm font-black text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Gamified Progress System" subtitle="Keep Momentum">
        <div className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-bold uppercase tracking-[0.1em] text-slate-500">XP and level</p>
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
                {levelTrack}
              </span>
            </div>
            <XPBar totalXP={stats.totalXP} level={stats.level} />
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold uppercase tracking-[0.1em] text-slate-500">Daily streak</p>
              <StreakBadge streak={stats.currentStreak} />
            </div>
            <DailyGoal
              lessonsCompletedToday={stats.lessonsCompletedToday}
              minutesStudiedToday={stats.minutesStudiedToday}
            />
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.1em] text-slate-500">Badge rewards</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {BADGE_SHOWCASE.map((badgeId) => (
                <BadgeCard key={badgeId} badgeId={badgeId} earned={unlockedSet.has(badgeId)} />
              ))}
            </div>
          </article>
        </div>

        <SectionAction
          href="/quiz"
          label="Try Next Challenge →"
          onClick={() => {
            trackCTA("next_challenge_after_gamification", { target: "/quiz" });
            maybeAwardVariableBonus("challenge_after_gamification");
          }}
        />
      </Section>

      <Section title="Continue Where You Left Off" subtitle="Progress Loop">
        <ContinueCard />

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">You are {persistentPercent}% complete</h3>
            <p className="mt-1 text-sm text-slate-600">
              Completed {overall.completedLessons} of {overall.totalLessons || 1} lessons. Keep your streak alive with one short lesson now.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Review mistakes</h3>
              {mistakes.length > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    clearReviewMistakes();
                    setMistakes([]);
                    trackCTA("clear_mistakes", { location: "progress_loop" });
                  }}
                  className="text-xs font-bold text-red-600 transition-colors hover:text-red-700"
                >
                  Clear
                </button>
              ) : null}
            </div>

            {mistakes.length === 0 ? (
              <p className="text-sm text-slate-500">No mistakes saved yet. Keep practicing for perfect streak runs.</p>
            ) : (
              <ul className="space-y-2">
                {mistakes.map((item) => (
                  <li key={item.id} className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-700">
                    {item.prompt || "Question"}
                  </li>
                ))}
              </ul>
            )}
          </article>
        </div>

        <SectionAction
          href={continueHref}
          label={`${continueLabel} →`}
          onClick={() => {
            trackCTA("continue_after_progress_loop", { target: continueHref });
            maybeAwardVariableBonus("progress_loop_continue");
          }}
        />
      </Section>

      <Section title="Trusted by 10,000+ learners" subtitle="Social Proof">
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center shadow-sm">
          <p className="text-sm font-bold text-emerald-800">{liveLearners} users learning now</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {contentReady
            ? TESTIMONIALS.map((item) => (
                <article
                  key={item.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-slate-700">"{item.quote}"</p>
                  <p className="mt-4 text-sm font-bold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </article>
              ))
            : [1, 2, 3].map((item) => (
                <article key={item} className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-slate-100" />
              ))}
        </div>

        <SectionAction
          href="/conversation"
          label="Try Next Challenge →"
          onClick={() => {
            trackCTA("next_challenge_after_social_proof", { target: "/conversation" });
            maybeAwardVariableBonus("social_proof_challenge");
          }}
        />
      </Section>

      <Section title="The Curiosity Trigger" subtitle="Why learners quit">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
            <h3 className="text-2xl font-black text-rose-900">Most people fail because...</h3>
            <p className="mt-3 text-slate-700">
              They rely on motivation instead of systems. SkillDojo gives you streaks, rewards, and next actions so you never wonder what to do.
            </p>
          </article>

          <article className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <h3 className="text-2xl font-black text-amber-900">You are making this mistake...</h3>
            <p className="mt-3 text-slate-700">
              Waiting for long study sessions. Short daily reps with immediate feedback outperform marathon cramming.
            </p>
          </article>
        </div>

        <SectionAction
          href="/courses/30-days"
          label="Continue Lesson →"
          onClick={() => {
            trackCTA("continue_after_curiosity", { target: "/courses/30-days" });
            maybeAwardVariableBonus("curiosity_continue");
          }}
        />
      </Section>

      <section className="px-6 pb-4 pt-1">
        <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <AdSenseUnit slot={homeAdSlot} />
        </div>
      </section>

      <Section>
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-10 text-center shadow-xl">
          <h2 className="text-3xl font-black text-white md:text-5xl">Your next lesson is one click away.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Fast start, clear progress, and daily rewards. Keep learning momentum without friction.
          </p>
          <button
            type="button"
            onClick={() => {
              trackCTA("final_start_learning_now", { target: continueHref });
              maybeAwardVariableBonus("final_start");
              router.push(continueHref);
            }}
            className="mt-7 inline-flex items-center justify-center rounded-2xl bg-white px-7 py-3 text-base font-bold text-slate-900 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
          >
            Start Learning Now
          </button>
        </div>
      </Section>
    </div>
  );
}
