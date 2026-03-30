import Link from "next/link";
import styles from "./page.module.css";
import StudentNavAction from "./components/StudentNavAction";

export const metadata = {
  title: "Japanese N5 and JLPT N5 Beginner Course",
  description:
    "Learn Japanese N5 from scratch with vocabulary lists, easy grammar explanations, listening practice, and a practical 30-day JLPT N5 study plan.",
  keywords: [
    "Japanese N5",
    "JLPT N5",
    "Learn Japanese N5",
    "Japanese beginner course",
    "Japanese language basics",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "SkillDojo",
        url: siteUrl,
        inLanguage: "en",
        description:
          "Free Japanese learning website with Hiragana, Katakana, and JLPT N5 vocabulary lessons.",
      },
      {
        "@type": "EducationalOrganization",
        name: "SkillDojo",
        url: siteUrl,
        sameAs: ["https://youtube.com/@skilldojo-b2t"],
      },
      {
        "@type": "Course",
        name: "Learn Japanese N5 from Scratch",
        provider: {
          "@type": "EducationalOrganization",
          name: "SkillDojo",
          url: siteUrl,
        },
        educationalLevel: "Beginner",
        about: [
          "Japanese N5 vocabulary list with meaning",
          "JLPT N5 grammar explained easy",
          "Japanese N5 listening practice with answers",
          "Japanese N5 conversation practice",
          "interactive Japanese grammar flashcards",
        ],
      },
    ],
  };

  const courses = [
    { key: "hiragana", kana: "あ", title: "Hiragana Complete", desc: "Master all 46 hiragana characters with AI voice.", lessons: 21, level: "Beginner", bg: "#fff0f0", live: true },
    { key: "katakana", kana: "ア", title: "Katakana Complete", desc: "Learn katakana for loanwords and modern Japanese.", lessons: 21, level: "Beginner", bg: "#f0f4ff", live: true },
    { key: "vocab",    kana: "言", title: "Daily Vocabulary",  desc: "500+ JLPT N5 words organized into interactive lessons.", lessons: 25, level: "JLPT N5", bg: "#f0fff4", live: true },
    { key: "grammar", kana: "文", title: "N5 Grammar", desc: "Essential beginner grammar patterns with example sentences and AI voice.", lessons: 8, level: "JLPT N5", bg: "#f6f5ff", live: true },
    { key: "conversation", kana: "話", title: "Basic Conversation", desc: "Real-life phrases with interactive AI voice flashcards.", lessons: 15, level: "Beginner", bg: "#fffaf0", live: true },
  ];

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* NAV */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場</Link>
        <div className={styles.navActions}>
          <StudentNavAction className={styles.navLink} dashboardLabel="Progress" />
          <Link href="/vocab" className={styles.navLink}>
            Vocabulary
          </Link>
          <Link href="/grammar" className={styles.navLink}>
            Grammar
          </Link>
          <Link href="/katakana" className={styles.navLink}>
            Katakana
          </Link>
          <a href="https://youtube.com/@skilldojo-b2t" target="_blank" className={styles.ytLink}>
            ▶ YouTube
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <div className={styles.heroTag}>🇯🇵 Free Japanese Course</div>
          <h1 className={styles.heroTitle}>
            Learn Japanese<br />the <em>Right</em> Way.
          </h1>
          <p className={styles.heroDesc}>
            SkillDojo teaches real Japanese — Hiragana, Katakana, vocabulary, grammar, and conversation — step by step. No fluff.
          </p>
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
        </div>

        <div className={styles.heroCard}>
          <div className={styles.cardLabel}>Lesson 1 — Hiragana Row あ</div>
          <div className={styles.kanaGrid}>
            {[["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"]].map(([k, r]) => (
              <div key={k} className={styles.kanaCell}>
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
            {[ ["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"] ].map(([k, r]) => (
              <div key={k} className={styles.kanaCellAlt}>
                <span className={styles.kanaBig}>{k}</span>
                <span className={styles.kanaRom}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className={styles.courses}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>Curriculum</div>
          <h2 className={styles.sectionTitle}>Choose Your Path</h2>
        </div>
        <div className={styles.coursesGrid}>
          {courses.map((c) => {
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

            if (c.live) {
              return (
                <Link key={c.key} href={`/${c.key}`} className={styles.courseCard}>
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={c.key} className={styles.courseCard}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.seoSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>Beginner SEO Guide</div>
          <h2 className={styles.sectionTitle}>Japanese N5 Learning Roadmap</h2>
        </div>
        <div className={styles.seoGrid}>
          <article className={styles.seoCard}>
            <h3>Learn Japanese N5 from scratch</h3>
            <p>
              Follow a clear Japanese beginner course covering Japanese language basics,
              daily drills, and step-by-step progress tracking.
            </p>
          </article>
          <article className={styles.seoCard}>
            <h3>Japanese N5 vocabulary list with meaning</h3>
            <p>
              Practice 500+ words lesson-wise with readings, English meaning, and
              interactive flashcards for fast recall.
            </p>
          </article>
          <article className={styles.seoCard}>
            <h3>JLPT N5 grammar explained easy</h3>
            <p>
              Grammar support is written for beginners so you can understand core
              patterns and use them in real conversation.
            </p>
          </article>
          <article className={styles.seoCard}>
            <h3>Japanese N5 listening practice with answers</h3>
            <p>
              Use pronunciation-focused practice with quick checks to build listening
              confidence before the test.
            </p>
          </article>
          <article className={styles.seoCard}>
            <h3>How to pass JLPT N5 in 30 days</h3>
            <p>
              Use a daily study sequence that mixes kana, vocabulary, review, and
              timed self-check sessions.
            </p>
          </article>
          <article className={styles.seoCard}>
            <h3>Japanese N5 study plan for beginners</h3>
            <p>
              Start with Hiragana and Katakana full course, then move into vocabulary,
              Japanese N5 verbs list with examples, and conversation drills.
            </p>
          </article>
          <article className={styles.seoCard}>
            <h3>Japanese N5 conversation practice</h3>
            <p>
              Build practical speaking confidence through greetings, shopping phrases,
              and daily life expressions.
            </p>
          </article>
          <article className={styles.seoCard}>
            <h3>JLPT N5 mock test free</h3>
            <p>
              Track your readiness with repeated review sessions and mock-style
              practice from your completed lessons.
            </p>
          </article>
        </div>
      </section>

      {/* ABOUT */}
      <section className={styles.about} id="about">
        <div className={styles.aboutInner}>
          <div className={styles.aboutText}>
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
          </div>
          <div className={styles.aboutStats}>
            {[
              { num: "46",   label: "Hiragana Characters" },
              { num: "46",   label: "Katakana Characters" },
              { num: "500+", label: "N5 Vocabulary Words" },
              { num: "Free", label: "Always Free" },
            ].map(({ num, label }) => (
              <div key={label} className={styles.statCard}>
                <span className={styles.statNum}>{num}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div>
          <div className={styles.footerLogo}>
            Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場
          </div>
          <p style={{ color: "#7a7a7a", fontSize: "0.85rem", marginTop: "6px" }}>
            Free Japanese education for everyone.
          </p>
        </div>
        <div className={styles.footerLinks}>
          <a href="https://youtube.com/@skilldojo-b2t" target="_blank">YouTube</a>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <p style={{ color: "#7a7a7a", fontSize: "0.85rem" }}>
          © 2026 SkillDojo
        </p>
      </footer>
    </main>
  );
}
