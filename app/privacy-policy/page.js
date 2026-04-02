import Link from "next/link";
import styles from "./privacy-policy.module.css";

export const metadata = {
  title: "Privacy Policy | SkillDojo",
  description:
    "Read the SkillDojo privacy policy to learn how we handle cookies, Google AdSense, YouTube embeds, and Google Sign-In account data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
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
        <div className={styles.heroTag}>Privacy Policy</div>
        <h1 className={styles.heroTitle}>Your Privacy at SkillDojo</h1>
        <p className={styles.heroDesc}>
          SkillDojo (skilldojojp.com) is a free Japanese learning website. This page explains
          what information we collect, how we use it, and how we keep it safe in simple terms.
        </p>
      </section>

      <section className={styles.bodySection}>
        <p className={styles.updated}>Last updated: April 1, 2026</p>

        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.cardIcon}>📌</div>
            <h2 className={styles.cardTitle}>What We Collect</h2>
            <p className={styles.cardText}>
              We collect only the data needed to run your learning account and improve site
              performance. We do not sell your personal data to third parties.
            </p>
          </article>

          <article className={styles.card}>
            <div className={styles.cardIcon}>🔐</div>
            <h2 className={styles.cardTitle}>Google Sign-In Accounts</h2>
            <p className={styles.cardText}>
              If you sign in with Google, we may store basic account details such as your
              name, email address, and profile image so we can identify your account and save
              your lesson progress.
            </p>
          </article>

          <article className={styles.card}>
            <div className={styles.cardIcon}>🍪</div>
            <h2 className={styles.cardTitle}>Cookies</h2>
            <p className={styles.cardText}>
              SkillDojo uses cookies and similar technologies to keep you signed in, remember
              preferences, and understand how pages are used. You can control cookies in your
              browser settings.
            </p>
          </article>

          <article className={styles.card}>
            <div className={styles.cardIcon}>📢</div>
            <h2 className={styles.cardTitle}>Google AdSense</h2>
            <p className={styles.cardText}>
              We may show ads using Google AdSense. Google may use cookies to show ads based
              on your interests and browsing behavior. You can learn more from Google and manage
              ad personalization in your Google account settings.
            </p>
          </article>

          <article className={styles.card}>
            <div className={styles.cardIcon}>▶️</div>
            <h2 className={styles.cardTitle}>YouTube Embeds</h2>
            <p className={styles.cardText}>
              Some pages may include embedded YouTube videos. When you interact with these
              embeds, YouTube may collect data according to YouTube and Google privacy policies.
            </p>
          </article>

          <article className={styles.card}>
            <div className={styles.cardIcon}>🧾</div>
            <h2 className={styles.cardTitle}>How We Use Data</h2>
            <ul className={styles.cardList}>
              <li>To create and maintain your user account</li>
              <li>To save and display your lesson progress</li>
              <li>To improve website performance and content quality</li>
              <li>To keep the platform secure and prevent abuse</li>
            </ul>
          </article>

          <article className={styles.card}>
            <div className={styles.cardIcon}>🛡️</div>
            <h2 className={styles.cardTitle}>Data Protection</h2>
            <p className={styles.cardText}>
              We use standard technical safeguards to protect account data. No online service is
              100% risk-free, but we work to keep your information protected.
            </p>
          </article>

          <article className={styles.card}>
            <div className={styles.cardIcon}>📩</div>
            <h2 className={styles.cardTitle}>Contact Us</h2>
            <p className={styles.cardText}>
              If you have privacy questions, contact us through the contact page and we will do
              our best to help.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Want to keep learning?</h2>
        <p className={styles.ctaDesc}>Continue your Japanese journey with free lessons.</p>
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
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <p style={{ color: "#7a7a7a", fontSize: "0.85rem" }}>© 2026 SkillDojo</p>
      </footer>
    </main>
  );
}
