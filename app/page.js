"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  const courses = [
    { key: "hiragana", kana: "あ", title: "Hiragana Complete", desc: "Master all 46 hiragana characters with AI voice.", lessons: 21, level: "Beginner", bg: "#fff0f0", live: true },
    { key: "katakana", kana: "ア", title: "Katakana Complete", desc: "Learn katakana for loanwords with AI voice.", lessons: 21, level: "Beginner", bg: "#f0f4ff", live: true },
    { key: "vocab",    kana: "言", title: "Daily Vocabulary",  desc: "500+ essential words organized by topic.", lessons: 30, level: "Intermediate", bg: "#f0fff4", live: false },
    { key: "convo",    kana: "話", title: "Basic Conversation", desc: "Greetings, shopping, travel phrases.", lessons: 15, level: "Beginner", bg: "#fffaf0", live: false },
  ];

  return (
    <main className={styles.main}>

      {/* NAV */}
      <nav className={styles.nav}>
        <span className={styles.logo}>Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場</span>
        <a href="https://youtube.com/@skilldojo-b2t" target="_blank" className={styles.ytLink}>
          ▶ YouTube
        </a>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <div className={styles.heroTag}>🇯🇵 Free Japanese Course</div>
          <h1 className={styles.heroTitle}>
            Learn Japanese<br />the <em>Right</em> Way.
          </h1>
          <p className={styles.heroDesc}>
            SkillDojo teaches real Japanese — Hiragana, Katakana, vocabulary, and conversation — step by step. No fluff.
          </p>
          <div className={styles.heroBtns}>
            <button
              className={styles.btnPrimary}
              onClick={() => router.push("/hiragana")}
            >
              Start for Free →
            </button>
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
        </div>
      </section>

      {/* COURSES */}
      <section className={styles.courses}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>Curriculum</div>
          <h2 className={styles.sectionTitle}>Choose Your Path</h2>
        </div>
        <div className={styles.coursesGrid}>
          {courses.map((c) => (
            <div
              key={c.key}
              className={styles.courseCard}
              onClick={() => c.live ? router.push(`/${c.key}`) : null}
              style={{ cursor: c.live ? "pointer" : "default" }}
            >
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
            </div>
          ))}
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
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
        <p style={{ color: "#7a7a7a", fontSize: "0.85rem" }}>
          © 2026 SkillDojo
        </p>
      </footer>
    </main>
  );
}
