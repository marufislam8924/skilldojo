import Link from "next/link";
import { notFound } from "next/navigation";
import {
  hiraganaCharPages,
  getHiraganaCharPage,
  getAllHiraganaCharSlugs,
} from "../../../data/hiraganaCharPages";
import styles from "./hiraganaGuide.module.css";

export function generateStaticParams() {
  return getAllHiraganaCharSlugs().map((slug) => ({ char: slug }));
}

export function generateMetadata({ params }) {
  const page = getHiraganaCharPage(params.char);
  if (!page) return { title: "Page Not Found" };

  const title = `Hiragana ${page.row} — ${page.chars.map((c) => c.kana).join(" ")} | Free Guide`;
  const description = page.description;

  return {
    title,
    description,
    keywords: [
      "hiragana",
      page.row,
      ...page.chars.map((c) => `hiragana ${c.romaji}`),
      "learn hiragana",
      "japanese alphabet",
      "JLPT N5",
    ],
    alternates: { canonical: `/hiragana-guide/${page.slug}` },
    openGraph: {
      title,
      description,
      url: `/hiragana-guide/${page.slug}`,
      type: "article",
      siteName: "SkillDojo",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function HiraganaGuidePage({ params }) {
  const page = getHiraganaCharPage(params.char);
  if (!page) notFound();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Hiragana ${page.row} — ${page.chars.map((c) => c.kana).join(" ")}`,
    description: page.description,
    author: { "@type": "EducationalOrganization", name: "SkillDojo" },
    publisher: {
      "@type": "EducationalOrganization",
      name: "SkillDojo",
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}/hiragana-guide/${page.slug}`,
    educationalLevel: "Beginner",
    inLanguage: "en",
  };

  // previous / next navigation
  const currentIdx = hiraganaCharPages.findIndex((p) => p.slug === page.slug);
  const prev = currentIdx > 0 ? hiraganaCharPages[currentIdx - 1] : null;
  const next =
    currentIdx < hiraganaCharPages.length - 1
      ? hiraganaCharPages[currentIdx + 1]
      : null;

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Skill<span style={{ color: "var(--red, #e63329)" }}>Dojo</span> 道場
        </Link>
        <Link href="/hiragana" className={styles.backLink}>
          ← All Hiragana
        </Link>
      </nav>

      <header className={styles.header}>
        <span className={styles.badge}>Hiragana Guide</span>
        <h1 className={styles.title}>
          {page.row}: {page.chars.map((c) => c.kana).join(" ")}
        </h1>
        <p className={styles.description}>{page.description}</p>
      </header>

      <section className={styles.content}>
        <p className={styles.intro}>{page.content}</p>

        {/* CHARACTER CARDS */}
        <h2 className={styles.sectionTitle}>Characters</h2>
        <div className={styles.charGrid}>
          {page.chars.map((c, i) => (
            <div key={i} className={styles.charCard}>
              <div className={styles.charKana}>{c.kana}</div>
              <div className={styles.charRomaji}>{c.romaji}</div>
              <div className={styles.charMnemonic}>{c.mnemonic}</div>
            </div>
          ))}
        </div>

        {/* PRACTICE WORDS */}
        <h2 className={styles.sectionTitle}>Practice Words</h2>
        <ul className={styles.wordList}>
          {page.words.map((w, i) => (
            <li key={i} className={styles.wordItem}>
              <div className={styles.wordJp}>{w.word}</div>
              <div className={styles.wordRomaji}>{w.romaji}</div>
              <div className={styles.wordMeaning}>{w.meaning}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* PREV / NEXT */}
      <div className={styles.rowNav}>
        {prev ? (
          <Link
            href={`/hiragana-guide/${prev.slug}`}
            className={styles.rowNavLink}
          >
            ← {prev.row}
          </Link>
        ) : (
          <span className={styles.rowNavPlaceholder} />
        )}
        {next ? (
          <Link
            href={`/hiragana-guide/${next.slug}`}
            className={styles.rowNavLink}
          >
            {next.row} →
          </Link>
        ) : (
          <span className={styles.rowNavPlaceholder} />
        )}
      </div>

      {/* CTA */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Practice Hiragana Interactively</h2>
        <p className={styles.ctaDesc}>
          Reinforce your learning with guided lessons, audio, and flashcards.
        </p>
        <Link href="/hiragana" className={styles.ctaBtn}>
          Start Hiragana Lessons
        </Link>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link href="/" className={styles.footerLink}>Home</Link>
          <Link href="/learn" className={styles.footerLink}>Learn</Link>
          <Link href="/hiragana" className={styles.footerLink}>Hiragana</Link>
          <Link href="/katakana" className={styles.footerLink}>Katakana</Link>
          <Link href="/vocab" className={styles.footerLink}>Vocabulary</Link>
          <Link href="/blog" className={styles.footerLink}>Blog</Link>
        </div>
      </footer>
    </main>
  );
}
