"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import AnimatedCounter from "./AnimatedCounter";
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
            Learn{" "}
            <TypingText
              texts={["Japanese", "Hiragana", "Katakana", "Vocabulary", "Grammar"]}
              speed={90}
              pause={2200}
              className={styles.typingWord}
            />
            <br />the <em>Right</em> Way.
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={350} direction="up">
          <p className={styles.heroDesc}>
            SkillDojo teaches real Japanese — Hiragana, Katakana, vocabulary, grammar, and conversation — step by step. No fluff.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={500} direction="up">
          <div className={styles.heroBtns}>
            <Link className={styles.btnPrimary} href="/hiragana">
              Start for Free →
            </Link>
            <Link href="/katakana" className={styles.btnSecondary}>
              Explore Katakana
            </Link>
            <a
              href="https://youtube.com/@skilldojo-b2t"
              target="_blank"
              className={styles.btnSecondary}
            >
              Watch on YouTube
            </a>
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
  return (
    <section className={styles.courses}>
      <ScrollReveal>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>Curriculum</div>
          <h2 className={styles.sectionTitle}>Choose Your Path</h2>
        </div>
      </ScrollReveal>
      <div className={styles.coursesGrid}>
        {courses.map((c, i) => {
          const cardContent = (
            <>
              <div className={styles.courseThumb} style={{ background: c.bg }}>
                {c.kana}
              </div>
              <div className={styles.courseBody}>
                <div className={styles.courseTitle}>{c.title}</div>
                <div className={styles.courseDesc}>{c.desc}</div>
                <div className={styles.courseMeta}>
                  <span className={styles.lessonsCount}>{c.lessons} lessons</span>
                  <span
                    className={styles.levelBadge}
                    style={{
                      background: c.level === "Beginner" ? "#d4edda" : "#fff3cd",
                      color: c.level === "Beginner" ? "#155724" : "#856404",
                    }}
                  >
                    {c.level}
                  </span>
                </div>
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
