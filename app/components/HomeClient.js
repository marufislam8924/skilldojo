"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import TypingText from "./TypingText";
import styles from "../page.module.css";

export function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <ScrollReveal delay={100} direction="up">
          <div className={styles.heroTag}>🇯🇵 Free Japanese Course</div>
        </ScrollReveal>
        <ScrollReveal delay={200} direction="up">
          <h1 className={styles.heroTitle}>
            Speak Real Japanese{" "}
            <TypingText
              texts={["Japanese", "Hiragana", "Katakana", "Vocabulary", "Grammar"]}
              speed={90}
              pause={2200}
              className={styles.typingWord}
            />
            <br />in 30 Focused Minutes a Day.
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={350} direction="up">
          <p className={styles.heroDesc}>
            Build reading, listening, and conversation confidence fast with bite-size lessons and instant practice feedback made for complete beginners.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={500} direction="up">
          <div className="flex flex-col sm:flex-row gap-3">
            <Link className={`${styles.btnPrimary} w-full sm:w-auto py-3 px-6 text-center text-base`} href="/courses/30-days">
              Start the 30-Day Plan Free →
            </Link>
            <Link href="/katakana" className={`${styles.btnSecondary} w-full sm:w-auto py-3 px-6 text-center text-base`}>
              Explore Katakana
            </Link>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={400} direction="right" distance={60}>
        <div className={styles.heroCard}>
          <div className={styles.cardLabel}>Lesson 1 — Hiragana Row あ</div>
          <div className={styles.kanaGrid}>
            {[["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"]].map(([k, r], i) => (
              <div key={k} className={styles.kanaCell} style={{ animationDelay: `${i * 100 + 600}ms` }}>
                <span className={styles.kanaBig}>{k}</span>
                <span className={styles.kanaRom}>{r}</span>
              </div>
            ))}
          </div>
          <div className={styles.cardProgress}>
            <div className={styles.progBar}>
              <div className={styles.progFill} />
            </div>
            <span className={styles.progLabel}>Lesson 1 / 21</span>
          </div>
          <div className={styles.previewDivider} />

          <div className={styles.previewHeader}>
            <div className={styles.cardLabel}>Katakana Spotlight</div>
            <Link href="/katakana" className={styles.previewLink}>
              Open Katakana →
            </Link>
          </div>
          <div className={styles.kanaGrid}>
            {[ ["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"] ].map(([k, r], i) => (
              <div key={k} className={styles.kanaCellAlt} style={{ animationDelay: `${i * 100 + 800}ms` }}>
                <span className={styles.kanaBig}>{k}</span>
                <span className={styles.kanaRom}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

export function CoursesSection({ courses }) {
  const courseIcons = {
    hiragana: "✍",
    katakana: "カ",
    vocab: "語",
    grammar: "文",
    conversation: "会",
    quiz: "試",
    "courses/30-days": "📅",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <Link key={c.key} href={`/${c.key}`} className={`${styles.courseCard} rounded-xl border p-5 flex flex-col gap-2 active:bg-gray-100`}>
              {cardContent}
            </Link>
          ) : (
            <div key={c.key} className={`${styles.courseCard} rounded-xl border p-5 flex flex-col gap-2 active:bg-gray-100`}>
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
    { title: "Learn Japanese N5 from scratch", desc: "Starting from zero is easier than you think. SkillDojo breaks Japanese down into small, focused lessons — beginning with the alphabet, building into vocabulary, and finishing with real conversation. Every lesson is designed for complete beginners, so you never feel lost or overwhelmed. Just open a lesson and start." },
    { title: "Japanese N5 vocabulary list with meaning", desc: "Vocabulary is the fastest way to unlock the language. SkillDojo covers 1,000+ N5 vocabulary words organized into short, focused lessons with Japanese text, romaji pronunciation, and English meaning side by side. Interactive flashcards let you test yourself and track which words you know — so you spend more time on what matters." },
    { title: "JLPT N5 grammar explained easy", desc: "Japanese grammar looks intimidating at first, but the core patterns are surprisingly logical. SkillDojo explains each N5 grammar point in plain English with real example sentences — no linguistic jargon, no unnecessary complexity. You learn how grammar works by seeing it used in everyday conversation, which makes it stick far better than memorizing rules alone." },
    { title: "Japanese N5 listening practice with answers", desc: "Reading Japanese is one skill. Hearing it is another. Every lesson on SkillDojo includes AI-powered audio so you can hear native-quality pronunciation for every word and phrase. Listening exercises train your ear to recognize sounds quickly — which is exactly what the JLPT N5 listening section tests." },
    { title: "How to pass JLPT N5 in 30 days", desc: "Passing N5 in a month is possible with the right structure. Spend the first week mastering Hiragana and Katakana — SkillDojo's 21-lesson kana courses cover both completely. Week two moves into core vocabulary. Week three adds grammar patterns and conversation practice. Week four is review: flashcards, timed drills, and mock-style self-checks. Consistent 30-minute daily sessions are all it takes." },
    { title: "Japanese N5 study plan for beginners", desc: "The most common mistake beginners make is skipping the alphabet. Before anything else, learn Hiragana — it unlocks pronunciation, reading, and grammar all at once. Then add Katakana for loan words and modern Japanese. Once both are solid, SkillDojo's vocabulary and conversation lessons build naturally on top of that foundation. Follow the curriculum in order and you'll never feel like pieces are missing." },
    { title: "Japanese N5 conversation practice", desc: "The goal of language learning is communication. SkillDojo's 15-lesson conversation course covers the situations you'll actually face — greetings, introductions, shopping, asking for directions, taking the train, and handling emergencies. Every lesson is a realistic two-person dialogue with Japanese text, romaji, and English translation so you can follow along at your own pace and start speaking with confidence." },
    { title: "JLPT N5 mock test free", desc: "The best way to prepare for any exam is to practice under exam conditions. After completing each SkillDojo lesson, revisit the vocabulary and phrases in quiz mode to simulate the pressure of test-style questions. Repeated review sessions reveal exactly which areas need more work — so by exam day, there are no surprises." },
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
    { num: "46",   label: "Hiragana Characters" },
    { num: "46",   label: "Katakana Characters" },
    { num: "1,000+", label: "N5 Vocabulary Words" },
    { num: "Free", label: "Always Free" },
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
              We cover Hiragana, Katakana, 1,000+ N5 vocabulary words, and real-life
              conversation phrases — all with audio, flashcards, and progress tracking.
            </p>
          </ScrollReveal>
        </div>
        <div className={styles.aboutStats}>
          {stats.map(({ num, label }, i) => (
            <ScrollReveal key={label} delay={i * 150} direction="scale">
              <div className={styles.statCard}>
                <span className={styles.statNum}>{num}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
