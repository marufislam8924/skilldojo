import Link from "next/link";
import styles from "./about.module.css";

export const metadata = {
  title: "About SkillDojo – Free Japanese Learning for Everyone",
  description:
    "Learn about SkillDojo: a free Japanese learning platform covering Hiragana, Katakana, JLPT N5 vocabulary, and beginner conversation with audio and progress tracking.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場
        </Link>
        <div className={styles.navActions}>
          <Link href="/hiragana" className={styles.navLink}>Hiragana</Link>
          <Link href="/katakana" className={styles.navLink}>Katakana</Link>
          <Link href="/vocab" className={styles.navLink}>Vocabulary</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroTag}>About SkillDojo</div>
        <h1 className={styles.heroTitle}>Built for Real Learners</h1>
        <p className={styles.heroDesc}>
          SkillDojo is a free Japanese learning platform created to give beginners a
          clear, no-nonsense path to JLPT N5 and beyond. No paywalls, no bloated
          course trees — just focused lessons that actually work.
        </p>
      </section>

      <section className={styles.bodySection}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🎯</div>
            <h2 className={styles.cardTitle}>Our Mission</h2>
            <p className={styles.cardText}>
              Make Japanese accessible to anyone, anywhere. Every lesson on SkillDojo is
              free, structured, and designed to build real fluency step by step — from your
              very first hiragana character to full N5 readiness.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📚</div>
            <h2 className={styles.cardTitle}>What We Cover</h2>
            <p className={styles.cardText}>
              Complete Hiragana and Katakana courses (46 characters each), 500+ JLPT N5
              vocabulary flashcards with audio, and 15 beginner conversation lessons with
              tap-to-hear pronunciation support.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🔊</div>
            <h2 className={styles.cardTitle}>Audio First</h2>
            <p className={styles.cardText}>
              Every vocabulary word and conversation phrase comes with native-quality
              Japanese audio so you build listening comprehension from day one, not
              just reading skills.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📈</div>
            <h2 className={styles.cardTitle}>Track Your Progress</h2>
            <p className={styles.cardText}>
              Create a free account to save your lesson progress across devices. See
              exactly which lessons you have completed and pick up right where you left off.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        {[
          { num: "46",   label: "Hiragana characters" },
          { num: "46",   label: "Katakana characters" },
          { num: "500+", label: "N5 vocabulary words" },
          { num: "15",   label: "Conversation lessons" },
          { num: "Free", label: "Always free" },
        ].map(({ num, label }) => (
          <div key={label} className={styles.stat}>
            <span className={styles.statNum}>{num}</span>
            <span className={styles.statLabel}>{label}</span>
          </div>
        ))}
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Ready to start?</h2>
        <p className={styles.ctaDesc}>Jump straight into your first lesson — no sign-up required.</p>
        <div className={styles.ctaBtns}>
          <Link href="/hiragana" className={styles.btnPrimary}>Start Hiragana →</Link>
          <Link href="/vocab" className={styles.btnSecondary}>Browse Vocabulary</Link>
          <Link href="/contact" className={styles.btnSecondary}>Contact Us</Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場
        </div>
        <div className={styles.footerLinks}>
          <a href="https://youtube.com/@skilldojo-b2t" target="_blank" rel="noopener noreferrer">YouTube</a>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <p style={{ color: "#7a7a7a", fontSize: "0.85rem" }}>© 2026 SkillDojo</p>
      </footer>
    </main>
  );
}
