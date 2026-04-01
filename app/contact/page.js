import Link from "next/link";
import styles from "./contact.module.css";

export const metadata = {
  title: "Contact SkillDojo – Get in Touch",
  description:
    "Have a question, suggestion, or collaboration idea? Reach out to the SkillDojo team.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
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
          <Link href="/about" className={styles.navLink}>About</Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroTag}>Contact</div>
        <h1 className={styles.heroTitle}>Get in Touch</h1>
        <p className={styles.heroDesc}>
          Have a question, found a bug, or want to suggest a lesson? We would love to hear
          from you. Reach out via any of the channels below.
        </p>
      </section>

      <section className={styles.cards}>
        <a
          href="https://youtube.com/@skilldojo-b2t"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactCard}
        >
          <div className={styles.cardIcon}>▶</div>
          <h2 className={styles.cardTitle}>YouTube</h2>
          <p className={styles.cardText}>
            Leave a comment on any of our videos — we read every one and reply as fast
            as we can.
          </p>
          <span className={styles.cardLink}>youtube.com/@skilldojo-b2t →</span>
        </a>

        <div className={styles.contactCard}>
          <div className={styles.cardIcon}>✉</div>
          <h2 className={styles.cardTitle}>Email</h2>
          <p className={styles.cardText}>
            For partnership inquiries, bug reports, or content suggestions, email us
            directly.
          </p>
          <a href="mailto:hello@skilldojo.app" className={styles.cardLink}>
            hello@skilldojo.app →
          </a>
        </div>

        <Link href="/about" className={styles.contactCard}>
          <div className={styles.cardIcon}>ℹ</div>
          <h2 className={styles.cardTitle}>About SkillDojo</h2>
          <p className={styles.cardText}>
            Want to know more about our mission, what we cover, and who we are building
            for?
          </p>
          <span className={styles.cardLink}>Read about us →</span>
        </Link>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場
        </div>
        <div className={styles.footerLinks}>
          <a href="https://youtube.com/@skilldojo-b2t" target="_blank" rel="noopener noreferrer">YouTube</a>
          <Link href="/about">About</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <p style={{ color: "#7a7a7a", fontSize: "0.85rem" }}>© 2026 SkillDojo</p>
      </footer>
    </main>
  );
}
