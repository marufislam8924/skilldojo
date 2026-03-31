import Link from "next/link";
import styles from "./page.module.css";
import StudentNavAction from "./components/StudentNavAction";
import UserProgressBanner from "./components/UserProgressBanner";
import { HeroSection, CoursesSection, SeoSection, AboutSection } from "./components/HomeClient";

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
    { key: "quiz", kana: "試", title: "Quiz Mode", desc: "Test your knowledge with timed multiple-choice quizzes.", lessons: 5, level: "All Levels", bg: "#fef3c7", live: true },
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
          <a href="https://youtube.com/@skilldojo-b2t" target="_blank" className={styles.ytLink}>
            ▶ YouTube
          </a>
        </div>
      </nav>

      {/* MENU BAR */}
      <div className={styles.menuBar}>
        <Link href="/hiragana" className={styles.menuLink}>Hiragana</Link>
        <Link href="/katakana" className={styles.menuLink}>Katakana</Link>
        <Link href="/vocab" className={styles.menuLink}>Vocabulary</Link>
        <Link href="/grammar" className={styles.menuLink}>Grammar</Link>
        <Link href="/conversation" className={styles.menuLink}>Conversation</Link>
        <Link href="/quiz" className={styles.menuLink}>Quiz</Link>
      </div>

      {/* USER PROGRESS BANNER */}
      <UserProgressBanner />

      {/* HERO */}
      <HeroSection />

      {/* COURSES */}
      <CoursesSection courses={courses} />

      <SeoSection />

      {/* ABOUT */}
      <AboutSection />

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
