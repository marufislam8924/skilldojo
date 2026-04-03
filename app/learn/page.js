import Link from "next/link";
import { seoPages } from "../../data/seoPages";
import { keywordPages } from "../../data/keywords";
import styles from "./learn.module.css";

const allLearnPages = [...seoPages, ...keywordPages];

export const metadata = {
  title: "Learn Japanese — 100+ Free Lessons, Vocabulary & Grammar Guides",
  description:
    "Browse 100+ free Japanese learning guides covering Hiragana, Katakana, JLPT N5 vocabulary, grammar, conversation, and study strategy. Start from zero.",
  keywords: [
    "learn japanese",
    "japanese lessons",
    "hiragana guide",
    "katakana guide",
    "JLPT N5",
    "japanese vocabulary",
    "japanese grammar",
  ],
  alternates: { canonical: "/learn" },
  openGraph: {
    title: "Learn Japanese — 100+ Free Lessons & Guides | SkillDojo",
    description:
      "Browse 100+ free Japanese learning guides covering Hiragana, Katakana, vocabulary, grammar, conversation, and study strategy.",
    url: "/learn",
    type: "website",
  },
};

const CATEGORY_LABELS = {
  hiragana: "Hiragana",
  katakana: "Katakana",
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  conversation: "Conversation",
  strategy: "Study Strategy",
};

const CATEGORY_ORDER = [
  "hiragana",
  "katakana",
  "vocabulary",
  "grammar",
  "conversation",
  "strategy",
];

export default function LearnIndexPage() {
  const grouped = {};
  for (const page of allLearnPages) {
    if (!grouped[page.category]) grouped[page.category] = [];
    grouped[page.category].push(page);
  }

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Skill<span style={{ color: "var(--red, #e63329)" }}>Dojo</span> 道場
        </Link>
        <Link href="/" className={styles.backLink}>
          ← Home
        </Link>
      </nav>

      <header className={styles.header}>
        <span className={styles.badge}>Free Guides</span>
        <h1 className={styles.title}>Learn Japanese</h1>
        <p className={styles.subtitle}>
          Comprehensive guides covering every aspect of beginner Japanese — from
          your first Hiragana character to real-world conversation.
        </p>
      </header>

      <section className={styles.grid}>
        {CATEGORY_ORDER.filter((cat) => grouped[cat]).map((cat) => (
          <div key={cat} className={styles.category}>
            <h2 className={styles.categoryTitle}>
              {CATEGORY_LABELS[cat]}
              <span className={styles.categoryCount}>
                {grouped[cat].length} guide{grouped[cat].length !== 1 ? "s" : ""}
              </span>
            </h2>
            <div className={styles.cardList}>
              {grouped[cat].map((page) => (
                <Link
                  key={page.slug}
                  href={`/learn/${page.slug}`}
                  className={styles.card}
                >
                  <span className={styles.cardTitle}>{page.title}</span>
                  <span className={styles.cardDesc}>{page.description}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link href="/" className={styles.footerLink}>Home</Link>
          <Link href="/hiragana" className={styles.footerLink}>Hiragana</Link>
          <Link href="/katakana" className={styles.footerLink}>Katakana</Link>
          <Link href="/vocab" className={styles.footerLink}>Vocabulary</Link>
          <Link href="/grammar" className={styles.footerLink}>Grammar</Link>
          <Link href="/conversation" className={styles.footerLink}>Conversation</Link>
          <Link href="/blog" className={styles.footerLink}>Blog</Link>
        </div>
      </footer>
    </main>
  );
}
