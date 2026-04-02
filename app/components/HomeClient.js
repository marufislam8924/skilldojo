"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ContinueCard from "./gamification/ContinueCard";
import StreakBadge from "./gamification/StreakBadge";
import XPBar from "./gamification/XPBar";
import DailyGoal from "./DailyGoal";
import AdSenseUnit from "./AdSenseUnit";
import {
  clearReviewMistakes,
  getDashboardData,
  getGamificationStats,
  getReviewMistakes,
} from "../lib/studentProgress";

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="mb-10 text-center">
            {subtitle ? (
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-3">
                {subtitle}
              </p>
            ) : null}
            {title ? <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">{title}</h2> : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <div className="h-11 w-11 rounded-xl bg-slate-100 text-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{text}</p>
    </article>
  );
}

function PathCard({ icon, title, text, href }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
    >
      <div className="h-11 w-11 rounded-xl bg-blue-50 text-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-gray-500">{text}</p>
    </Link>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 px-6 bg-gradient-to-b from-blue-50/70 via-white to-white">
      <div className="absolute -top-28 -right-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-1 text-sm font-medium text-blue-700">
            SkillDojoJP
          </p>
          <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Master Japanese from Zero to JLPT N5 - Free
          </h1>
          <p className="mt-5 text-lg text-gray-500 max-w-xl">
            Structured lessons, real conversations, and AI-powered voice practice.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/courses/30-days"
              className="inline-flex justify-center items-center rounded-2xl bg-slate-900 px-6 py-3 text-white font-semibold shadow-lg hover:bg-slate-800 transition"
            >
              Start Learning Free
            </Link>
            <Link
              href="#learning-journey"
              className="inline-flex justify-center items-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-slate-700 font-semibold shadow-md hover:bg-slate-50 transition"
            >
              Explore Lessons
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-lg backdrop-blur">
          <div className="flex items-center justify-between mb-5">
            <p className="font-semibold text-slate-900">Lesson Preview</p>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              Beginner Friendly
            </span>
          </div>

          <div className="space-y-3 mb-5">
            {[
              { title: "Hiragana Basics", xp: "+10 XP", done: true },
              { title: "Daily Vocabulary", xp: "+15 XP", done: true },
              { title: "Conversation Drill", xp: "+20 XP", done: false },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.xp}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    item.done ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {item.done ? "Complete" : "In Progress"}
                </span>
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Overall Progress</span>
              <span className="font-semibold text-slate-800">68%</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full w-[68%] bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const stats = [
    { value: "1000+", label: "Vocabulary" },
    { value: "50+", label: "Lessons" },
    { value: "Beginner", label: "Friendly" },
  ];

  return (
    <Section>
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-md">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-slate-500 mb-6">
          Trusted by learners worldwide
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-slate-50 p-5 text-center">
              <p className="text-3xl font-black text-slate-900">{s.value}</p>
              <p className="text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center -space-x-2">
          {["A", "K", "M", "R", "Y"].map((initial) => (
            <div
              key={initial}
              className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border border-white text-sm font-bold text-slate-700 flex items-center justify-center"
            >
              {initial}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function LearningPathSection() {
  const cards = [
    {
      icon: "あ",
      title: "Hiragana & Katakana",
      text: "Build your alphabet foundation with guided character lessons.",
      href: "/hiragana",
    },
    {
      icon: "語",
      title: "Vocabulary",
      text: "Learn essential JLPT N5 words with interactive flashcards.",
      href: "/vocab",
    },
    {
      icon: "文",
      title: "Grammar",
      text: "Understand beginner grammar patterns with practical examples.",
      href: "/grammar",
    },
    {
      icon: "話",
      title: "Conversation",
      text: "Practice real-life dialogues to speak confidently.",
      href: "/conversation",
    },
  ];

  return (
    <Section id="learning-journey" title="Your Learning Journey">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => (
          <PathCard key={card.title} {...card} />
        ))}
      </div>
    </Section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: "AI",
      title: "AI Voice Practice",
      text: "Hear natural pronunciation and improve listening with voice playback.",
    },
    {
      icon: "01",
      title: "Structured Lessons",
      text: "Follow a clear sequence from scripts to grammar and conversation.",
    },
    {
      icon: "✓",
      title: "Quiz & Practice",
      text: "Reinforce every lesson with quick quizzes and review sessions.",
    },
    {
      icon: "JP",
      title: "Beginner Friendly",
      text: "Simple explanations designed for absolute beginners.",
    },
  ];

  return (
    <Section title="Why SkillDojoJP?">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}
      </div>
    </Section>
  );
}

function ProgressMotivationSection() {
  return (
    <Section>
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-blue-50 p-8 shadow-md">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Track your daily learning</h2>
            <p className="text-gray-500 text-lg">Stay consistent. Reach JLPT N5 faster.</p>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Weekly consistency</span>
              <span className="font-semibold text-slate-800">73%</span>
            </div>
            <div className="h-3 rounded-full bg-slate-200 overflow-hidden mb-4">
              <div className="h-full w-[73%] bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full" />
            </div>
            <p className="text-sm text-gray-500">You are 2 lessons away from your weekly goal.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ProgressDashboardSection() {
  const [stats, setStats] = useState({
    totalXP: 0,
    level: 1,
    currentStreak: 0,
    lessonsCompletedToday: 0,
  });
  const [overall, setOverall] = useState({ completedLessons: 0, totalLessons: 0, completedPercent: 0 });
  const [mistakes, setMistakes] = useState([]);

  useEffect(() => {
    const refresh = () => {
      setStats(getGamificationStats());
      setOverall(getDashboardData().overall);
      setMistakes(getReviewMistakes(6));
    };

    refresh();
    window.addEventListener("skilldojo-progress-changed", refresh);
    return () => window.removeEventListener("skilldojo-progress-changed", refresh);
  }, []);

  return (
    <Section title="Progress Dashboard" subtitle="Retention">
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Daily Momentum</h3>
            <StreakBadge streak={stats.currentStreak} />
          </div>
          <XPBar totalXP={stats.totalXP} level={stats.level} />
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-semibold text-slate-700">Lessons completed</p>
            <p className="mt-1 text-sm text-slate-500">
              {overall.completedLessons} / {overall.totalLessons} ({overall.completedPercent}%)
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
          <h3 className="mb-3 text-lg font-bold text-slate-900">Daily Goal</h3>
          <DailyGoal lessonsCompletedToday={stats.lessonsCompletedToday} />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Review Mistakes</h3>
            {mistakes.length > 0 ? (
              <button
                type="button"
                onClick={() => {
                  clearReviewMistakes();
                  setMistakes([]);
                }}
                className="text-xs font-semibold text-red-600 hover:text-red-700"
              >
                Clear
              </button>
            ) : null}
          </div>

          {mistakes.length === 0 ? (
            <p className="text-sm text-slate-500">No mistakes saved yet. Great job.</p>
          ) : (
            <div className="space-y-2">
              {mistakes.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-sm font-semibold text-slate-800">{item.prompt || "Question"}</p>
                  <p className="mt-1 text-xs text-slate-500">Expected: {item.expected || "N/A"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

function CTASection() {
  return (
    <Section>
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-10 md:p-14 text-center shadow-lg">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Start Your Japanese Journey Today</h2>
        <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
          Join SkillDojoJP and build real Japanese skills with daily lessons, practice quizzes, and guided progression.
        </p>
        <Link
          href="/courses/30-days"
          className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-3 font-semibold text-slate-900 shadow-md hover:bg-slate-100 transition"
        >
          Get Started Free
        </Link>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center text-sm">
        <div className="flex gap-5 text-slate-600">
          <Link href="/">Home</Link>
          <Link href="/hiragana">Lessons</Link>
          <Link href="/vocab">Vocabulary</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
          <a href="https://github.com/marufislam8924/skilldojo" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
        <p className="text-slate-500">© 2026 SkillDojoJP</p>
      </div>
    </footer>
  );
}

export default function HomeClient() {
  const homeAdSlot = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_HOME_SLOT;

  return (
    <div className="bg-white text-slate-900">
      <HeroSection />
      <section className="px-6 pb-2">
        <div className="max-w-7xl mx-auto">
          <ContinueCard />
        </div>
      </section>
      <TrustSection />
      <section className="px-6 py-4">
        <div className="max-w-7xl mx-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <AdSenseUnit slot={homeAdSlot} />
        </div>
      </section>
      <LearningPathSection />
      <FeaturesSection />
      <ProgressDashboardSection />
      <ProgressMotivationSection />
      <CTASection />
      <Footer />
    </div>
  );
}
