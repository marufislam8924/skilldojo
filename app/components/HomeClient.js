"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getStudentSession,
  getGamificationStats,
  getDashboardData,
} from "../lib/studentProgress";

const DAILY_GOAL = 5;

const COURSES = [
  { slug: "hiragana", icon: "あ", label: "Hiragana", desc: "Master all 46 hiragana characters", color: "#fee2e2", accent: "#ef4444", border: "#fecaca" },
  { slug: "katakana", icon: "ア", label: "Katakana", desc: "Learn katakana for loanwords", color: "#dbeafe", accent: "#3b82f6", border: "#bfdbfe" },
  { slug: "vocab", icon: "語", label: "Vocabulary", desc: "500+ JLPT N5 words", color: "#dcfce7", accent: "#22c55e", border: "#bbf7d0" },
  { slug: "grammar", icon: "文", label: "Grammar", desc: "Essential N5 grammar patterns", color: "#ede9fe", accent: "#8b5cf6", border: "#ddd6fe" },
  { slug: "conversation", icon: "話", label: "Conversation", desc: "Real-life Japanese phrases", color: "#fff7ed", accent: "#f97316", border: "#fed7aa" },
];

/* ─── MAIN EXPORT ─── */
export default function AppHome() {
  const [student, setStudent] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [gamifStats, setGamifStats] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    setMounted(true);
    refreshData();
    const handler = () => refreshData();
    window.addEventListener("skilldojo-auth-changed", handler);
    window.addEventListener("skilldojo-progress-changed", handler);
    return () => {
      window.removeEventListener("skilldojo-auth-changed", handler);
      window.removeEventListener("skilldojo-progress-changed", handler);
    };
  }, []);

  function refreshData() {
    const session = getStudentSession();
    setStudent(session);
    if (session) {
      setGamifStats(getGamificationStats());
      setDashboardData(getDashboardData());
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center">
        <div className="w-8 h-8 border-[3px] border-[#e63329] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return student ? (
    <DashboardView student={student} stats={gamifStats} data={dashboardData} />
  ) : (
    <OnboardingView />
  );
}

/* ─── ONBOARDING (not signed in) ─── */
function OnboardingView() {
  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-[#e8e2d9] sticky top-0 z-50">
        <span className="font-black text-xl text-[#0f0e0d]" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>
          Skill<span className="text-[#e63329]">Dojo</span> 道場
        </span>
        <Link
          href="/student/signin"
          className="text-sm font-bold text-[#e63329] hover:underline"
        >
          SIGN IN
        </Link>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="text-7xl md:text-8xl mb-6" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>
          🇯🇵
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-[#0f0e0d] mb-4 leading-tight" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>
          Learn Japanese.<br />
          <span className="text-[#e63329]">The fun way.</span>
        </h1>
        <p className="text-[#7a7067] text-base md:text-lg max-w-md mb-10 leading-relaxed">
          Free lessons. Track your progress. Build your streak.
          Master Hiragana, Katakana, and JLPT N5.
        </p>
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Link
            href="/student/signin"
            className="w-full py-4 bg-[#e63329] text-white text-center font-bold rounded-2xl text-lg shadow-lg hover:bg-[#cc2a22] transition-colors"
          >
            GET STARTED — IT&apos;S FREE
          </Link>
          <Link
            href="/hiragana"
            className="w-full py-4 bg-white text-[#0f0e0d] text-center font-bold rounded-2xl text-lg border-2 border-[#d9d0c3] hover:border-[#0f0e0d] transition-colors"
          >
            EXPLORE LESSONS
          </Link>
        </div>

        {/* Course Preview */}
        <div className="mt-16 w-full max-w-lg">
          <p className="text-xs font-bold text-[#7a7067] uppercase tracking-widest mb-6">
            What you&apos;ll learn
          </p>
          <div className="grid grid-cols-5 gap-2 md:gap-3">
            {COURSES.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="flex flex-col items-center gap-2 p-3 md:p-4 rounded-2xl hover:scale-105 transition-transform"
                style={{ background: c.color }}
              >
                <span className="text-2xl md:text-3xl font-black" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>
                  {c.icon}
                </span>
                <span className="text-[9px] md:text-[11px] font-bold text-[#0f0e0d] uppercase tracking-wide">
                  {c.label}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-sm text-[#7a7067] mt-6">
            90 lessons &bull; Always free &bull; Track your progress
          </p>
        </div>

        {/* Social proof */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-[#7a7067]">
          <span className="flex items-center gap-1">✅ <strong className="text-[#0f0e0d]">500+</strong> vocabulary words</span>
          <span className="flex items-center gap-1">✅ <strong className="text-[#0f0e0d]">AI</strong> audio</span>
          <span className="flex items-center gap-1">✅ <strong className="text-[#0f0e0d]">XP</strong> &amp; streaks</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e8e2d9] py-6 px-6 text-center text-sm text-[#7a7067]">
        <div className="flex items-center justify-center gap-6 mb-3">
          <Link href="/about" className="hover:text-[#0f0e0d] transition-colors">About</Link>
          <Link href="/contact" className="hover:text-[#0f0e0d] transition-colors">Contact</Link>
          <a href="https://youtube.com/@skilldojo-b2t" target="_blank" className="hover:text-[#0f0e0d] transition-colors">YouTube</a>
        </div>
        <p>&copy; 2026 SkillDojo</p>
      </footer>
    </div>
  );
}

/* ─── DASHBOARD (signed in) ─── */
function DashboardView({ student, stats, data }) {
  const lessonsToday = stats?.lessonsCompletedToday || 0;
  const goalProgress = Math.min(lessonsToday, DAILY_GOAL);
  const streak = stats?.currentStreak || 0;
  const totalXP = stats?.totalXP || 0;
  const level = stats?.level || 1;

  const coursesData = data?.courses || [];
  const continueCourse =
    coursesData.find((c) => c.completedCount > 0 && c.completedCount < c.totalLessons) ||
    coursesData.find((c) => c.completedCount === 0);

  return (
    <div className="min-h-screen bg-[#f5f1eb] flex flex-col pb-20 md:pb-0">
      {/* Top Nav */}
      <nav className="bg-white border-b border-[#e8e2d9] sticky top-0 z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/" className="font-black text-lg text-[#0f0e0d]" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>
            Skill<span className="text-[#e63329]">Dojo</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm font-bold" title="Daily streak">
              <span>🔥</span>
              <span className="text-[#f97316]">{streak}</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-bold" title="Experience points">
              <span>⭐</span>
              <span className="text-[#eab308]">{totalXP}</span>
            </div>
            <Link
              href="/student/dashboard"
              className="w-8 h-8 rounded-full bg-[#e63329] text-white flex items-center justify-center text-xs font-bold"
              title={student.name}
            >
              {(student.name || "S")[0].toUpperCase()}
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-5">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-black text-[#0f0e0d]" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>
            おかえり, {student.name}!
          </h1>
          <p className="text-sm text-[#7a7067] mt-1">
            Level {level} &bull; {totalXP.toLocaleString()} XP
          </p>
        </div>

        {/* Continue Learning Card */}
        {continueCourse && continueCourse.nextLesson <= continueCourse.totalLessons && (
          <Link
            href={`/${continueCourse.slug}/${continueCourse.nextLesson}`}
            className="block bg-[#e63329] rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-2">
              Continue Learning
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>
                {COURSES.find(c => c.slug === continueCourse.slug)?.icon || "学"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-lg">{continueCourse.label} — Lesson {continueCourse.nextLesson}</div>
                <div className="text-sm opacity-80">{continueCourse.completedCount}/{continueCourse.totalLessons} completed</div>
              </div>
              <div className="text-2xl shrink-0">→</div>
            </div>
          </Link>
        )}

        {/* Daily Goal */}
        <div className="bg-white rounded-2xl p-5 border border-[#e8e2d9]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-[#0f0e0d]">Daily Goal</h2>
            <span className="text-sm font-bold text-[#7a7067]">
              {goalProgress}/{DAILY_GOAL}
            </span>
          </div>
          <div className="flex gap-2 mb-3">
            {Array.from({ length: DAILY_GOAL }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-3 rounded-full transition-colors"
                style={{ background: i < goalProgress ? "#22c55e" : "#e8e2d9" }}
              />
            ))}
          </div>
          {goalProgress >= DAILY_GOAL ? (
            <p className="text-sm text-[#22c55e] font-bold">🎉 Goal complete! Keep going!</p>
          ) : (
            <p className="text-sm text-[#7a7067]">
              {DAILY_GOAL - goalProgress} more lesson{DAILY_GOAL - goalProgress !== 1 ? "s" : ""} to reach your daily goal
            </p>
          )}
        </div>

        {/* Streak Card */}
        {streak > 0 && (
          <div className="bg-gradient-to-r from-[#fff7ed] to-[#fef3c7] rounded-2xl p-5 border border-[#fed7aa]">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🔥</span>
              <div>
                <div className="font-black text-2xl text-[#ea580c]">{streak} day streak!</div>
                <p className="text-sm text-[#9a3412]">Keep it up! Don&apos;t break the chain.</p>
              </div>
            </div>
          </div>
        )}

        {/* Learning Path */}
        <div>
          <h2 className="font-bold text-[#0f0e0d] text-lg mb-4" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>
            Learning Path
          </h2>
          <div className="space-y-3">
            {COURSES.map((course) => {
              const progress = coursesData.find((c) => c.slug === course.slug);
              const completed = progress?.completedCount || 0;
              const total = progress?.totalLessons || 0;
              const percent = progress?.completedPercent || 0;
              const nextLesson = progress?.nextLesson || 1;
              const isComplete = completed >= total && total > 0;

              return (
                <Link
                  key={course.slug}
                  href={isComplete ? `/${course.slug}` : `/${course.slug}/${nextLesson}`}
                  className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-[#e8e2d9] hover:border-[#d9d0c3] hover:shadow-md transition-all group"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black shrink-0 transition-transform group-hover:scale-110"
                    style={{
                      background: course.color,
                      fontFamily: "'Zen Maru Gothic', sans-serif",
                      border: `2px solid ${course.border}`,
                    }}
                  >
                    {isComplete ? "✓" : course.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[#0f0e0d]">{course.label}</span>
                      {isComplete && (
                        <span className="text-[10px] bg-[#dcfce7] text-[#15803d] px-2 py-0.5 rounded-full font-bold">
                          Complete
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#7a7067] mt-0.5">{course.desc}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-2 bg-[#ede8df] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${percent}%`, background: course.accent }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-[#7a7067] shrink-0">
                        {completed}/{total}
                      </span>
                    </div>
                  </div>
                  <div className="text-[#d9d0c3] group-hover:text-[#0f0e0d] transition-colors text-lg shrink-0">
                    →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="font-bold text-[#0f0e0d] text-lg mb-4" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>
            Practice
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/flashcards"
              className="bg-white rounded-2xl p-5 border border-[#e8e2d9] hover:border-[#d9d0c3] hover:shadow-md transition-all text-center group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📝</div>
              <div className="font-bold text-sm text-[#0f0e0d]">Flashcards</div>
              <p className="text-xs text-[#7a7067] mt-1">Review with cards</p>
            </Link>
            <Link
              href="/vocab"
              className="bg-white rounded-2xl p-5 border border-[#e8e2d9] hover:border-[#d9d0c3] hover:shadow-md transition-all text-center group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📖</div>
              <div className="font-bold text-sm text-[#0f0e0d]">Vocabulary</div>
              <p className="text-xs text-[#7a7067] mt-1">Browse all words</p>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        {data?.recentActivity?.length > 0 && (
          <div>
            <h2 className="font-bold text-[#0f0e0d] text-lg mb-4" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>
              Recent Activity
            </h2>
            <div className="bg-white rounded-2xl border border-[#e8e2d9] divide-y divide-[#ede8df] overflow-hidden">
              {data.recentActivity.slice(0, 5).map((activity, i) => (
                <div key={i} className="px-4 py-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <span className="font-semibold text-sm text-[#0f0e0d]">
                      {activity.courseLabel}
                    </span>
                    <span className="text-xs text-[#7a7067] ml-2">
                      Lesson {activity.lessonId}
                    </span>
                  </div>
                  <div
                    className="text-sm font-bold shrink-0 ml-3"
                    style={{ color: activity.score >= activity.total ? "#22c55e" : "#f97316" }}
                  >
                    {activity.score}/{activity.total}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Tab Bar (mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8e2d9] md:hidden z-50" style={{ paddingBottom: "env(safe-area-inset-bottom, 0)" }}>
        <div className="flex items-stretch">
          <Link href="/" className="flex-1 flex flex-col items-center gap-1 py-3 text-[#e63329]">
            <span className="text-xl">🏠</span>
            <span className="text-[10px] font-bold">Learn</span>
          </Link>
          <Link href="/vocab" className="flex-1 flex flex-col items-center gap-1 py-3 text-[#7a7067] hover:text-[#0f0e0d]">
            <span className="text-xl">📖</span>
            <span className="text-[10px] font-bold">Vocab</span>
          </Link>
          <Link href="/flashcards" className="flex-1 flex flex-col items-center gap-1 py-3 text-[#7a7067] hover:text-[#0f0e0d]">
            <span className="text-xl">📝</span>
            <span className="text-[10px] font-bold">Practice</span>
          </Link>
          <Link href="/student/dashboard" className="flex-1 flex flex-col items-center gap-1 py-3 text-[#7a7067] hover:text-[#0f0e0d]">
            <span className="text-xl">👤</span>
            <span className="text-[10px] font-bold">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Footer (desktop) */}
      <footer className="hidden md:block border-t border-[#e8e2d9] py-4 px-6 text-center text-xs text-[#7a7067]">
        <div className="flex items-center justify-center gap-4">
          <Link href="/about" className="hover:text-[#0f0e0d] transition-colors">About</Link>
          <Link href="/contact" className="hover:text-[#0f0e0d] transition-colors">Contact</Link>
          <a href="https://youtube.com/@skilldojo-b2t" target="_blank" className="hover:text-[#0f0e0d] transition-colors">YouTube</a>
          <span>&copy; 2026 SkillDojo</span>
        </div>
      </footer>
    </div>
  );
}

/* ─── KEEP NAMED EXPORTS FOR BACKWARD COMPAT ─── */
export function CoursesSection({ courses }) {
  const courseIcons = {
    hiragana: "✍",
    katakana: "カ",
    vocab: "語",
    grammar: "文",
    conversation: "会",
  };

  return (
    <section className={styles.courses} id="curriculum">
      <ScrollReveal>
        <div className={styles.coursesHeader}>
          <div className={styles.coursesKicker}>Curriculum</div>
          <h2 className={styles.coursesTitle}>Choose Your Learning Path</h2>
          <p className={styles.coursesLead}>
            Structured tracks built for beginners, designed to take you from first character
            to confident JLPT N5 foundations.
          </p>
        </div>
      </ScrollReveal>
      <div className={styles.coursesGrid}>
        {courses.map((c, i) => {
          const levelClass = c.level === "Beginner" ? styles.levelBeginner : styles.levelJlpt;

          const cardContent = (
            <>
              <div className={styles.courseThumb} style={{ background: c.bg }}>
                <div className={styles.courseThumbTop}>
                  <span className={styles.courseIconChip}>{courseIcons[c.key] || "学"}</span>
                  <span className={styles.courseStatus}>{c.live ? "Live" : "Soon"}</span>
                </div>
                {c.kana}
              </div>
              <div className={styles.courseBody}>
                <div className={styles.courseTitle}>{c.title}</div>
                <div className={styles.courseDesc}>{c.desc}</div>
                <div className={styles.courseMeta}>
                  <span className={styles.lessonsCount}>{c.lessons} lessons</span>
                  <span className={`${styles.levelBadge} ${levelClass}`}>
                    {c.level}
                  </span>
                </div>
                <div className={styles.courseCta}>Start Course →</div>
                {!c.live && (
                  <div className={styles.comingSoon}>Coming Soon</div>
                )}
              </div>
            </>
          );

          const card = c.live ? (
            <Link key={c.key} href={`/${c.key}`} className={styles.courseCard}>
              {cardContent}
            </Link>
          ) : (
            <div key={c.key} className={styles.courseCard}>
              {cardContent}
            </div>
          );

          return (
            <ScrollReveal key={c.key} delay={i * 120} direction="up" distance={30}>
              {card}
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}

export function SeoSection() {
  const cards = [
    { title: "Learn Japanese N5 from scratch", desc: "Follow a clear Japanese beginner course covering Japanese language basics, daily drills, and step-by-step progress tracking." },
    { title: "Japanese N5 vocabulary list with meaning", desc: "Practice 500+ words lesson-wise with readings, English meaning, and interactive flashcards for fast recall." },
    { title: "JLPT N5 grammar explained easy", desc: "Grammar support is written for beginners so you can understand core patterns and use them in real conversation." },
    { title: "Japanese N5 listening practice with answers", desc: "Use pronunciation-focused practice with quick checks to build listening confidence before the test." },
    { title: "How to pass JLPT N5 in 30 days", desc: "Use a daily study sequence that mixes kana, vocabulary, review, and timed self-check sessions." },
    { title: "Japanese N5 study plan for beginners", desc: "Start with Hiragana and Katakana full course, then move into vocabulary, Japanese N5 verbs list with examples, and conversation drills." },
    { title: "Japanese N5 conversation practice", desc: "Build practical speaking confidence through greetings, shopping phrases, and daily life expressions." },
    { title: "JLPT N5 mock test free", desc: "Track your readiness with repeated review sessions and mock-style practice from your completed lessons." },
  ];

  return (
    <section className={styles.seoSection}>
      <ScrollReveal>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>Beginner Study Plan</div>
          <h2 className={styles.sectionTitle}>Japanese N5 Learning Roadmap</h2>
        </div>
      </ScrollReveal>
      <div className={styles.seoGrid}>
        {cards.map((card, i) => (
          <ScrollReveal key={card.title} delay={i * 80} direction="up" distance={25}>
            <article className={styles.seoCard}>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

export function AboutSection() {
  const stats = [
    { num: "46",   label: "Hiragana Characters", target: 46 },
    { num: "46",   label: "Katakana Characters", target: 46 },
    { num: "500+", label: "N5 Vocabulary Words", target: 500 },
    { num: "Free", label: "Always Free", target: null },
  ];

  return (
    <section className={styles.about} id="about">
      <div className={styles.aboutInner}>
        <div className={styles.aboutText}>
          <ScrollReveal direction="left" distance={40}>
            <div className={styles.sectionTag}>About SkillDojo</div>
            <h2 className={styles.aboutTitle}>Built for Real Learners</h2>
            <p className={styles.aboutDesc}>
              SkillDojo is a free Japanese learning platform focused on helping beginners
              reach JLPT N5 and beyond. Every lesson is designed to be direct, practical,
              and actually enjoyable — no bloated courses, no paywalls.
            </p>
            <p className={styles.aboutDesc}>
              We cover Hiragana, Katakana, 500+ N5 vocabulary words, and real-life
              conversation phrases — all with audio, flashcards, and progress tracking.
            </p>
            <a
              href="https://youtube.com/@skilldojo-b2t"
              target="_blank"
              className={styles.btnPrimary}
              style={{ display: "inline-block", marginTop: "12px" }}
            >
              ▶ Watch on YouTube
            </a>
          </ScrollReveal>
        </div>
        <div className={styles.aboutStats}>
          {stats.map(({ num, label, target }, i) => (
            <ScrollReveal key={label} delay={i * 150} direction="scale">
              <div className={styles.statCard}>
                <span className={styles.statNum}>
                  {target !== null ? (
                    <AnimatedCounter target={target} suffix={num.includes("+") ? "+" : ""} />
                  ) : (
                    num
                  )}
                </span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
