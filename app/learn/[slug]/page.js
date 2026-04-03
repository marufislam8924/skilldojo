import Link from "next/link";
import { notFound } from "next/navigation";
import {
  seoPages,
} from "../../../data/seoPages";
import { keywordPages } from "../../../data/keywords";
import styles from "./learnPage.module.css";

const allLearnPages = [...seoPages, ...keywordPages];

function getLearnPage(slug) {
  return allLearnPages.find((page) => page.slug === slug) || null;
}

function getAllLearnSlugs() {
  return allLearnPages.map((page) => page.slug);
}

export function generateStaticParams() {
  return getAllLearnSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const page = getLearnPage(params.slug);
  if (!page) return { title: "Page Not Found" };

  return {
    title: page.title,
    description: page.description,
    keywords: [
      page.category,
      "JLPT N5",
      "learn japanese",
      "japanese " + page.category,
      ...page.vocabulary.slice(0, 3).map((v) => v.romaji),
    ],
    alternates: { canonical: `/learn/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/learn/${page.slug}`,
      type: "article",
      siteName: "SkillDojo",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

const CATEGORY_LABELS = {
  hiragana: "Hiragana",
  katakana: "Katakana",
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  conversation: "Conversation",
  strategy: "Study Strategy",
};

const CATEGORY_LINKS = {
  hiragana: "/hiragana",
  katakana: "/katakana",
  vocabulary: "/vocab",
  grammar: "/grammar",
  conversation: "/conversation",
  strategy: "/learn",
};

export default function LearnPage({ params }) {
  const page = getLearnPage(params.slug);
  if (!page) notFound();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";

  const headline = page.keyword
    ? `${page.keyword.charAt(0).toUpperCase()}${page.keyword.slice(1)}`
    : page.title;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    author: { "@type": "EducationalOrganization", name: "SkillDojo" },
    publisher: {
      "@type": "EducationalOrganization",
      name: "SkillDojo",
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}/learn/${page.slug}`,
    educationalLevel: page.level === "beginner" ? "Beginner" : "Intermediate",
    inLanguage: "en",
    about: {
      "@type": "Thing",
      name: `Japanese ${CATEGORY_LABELS[page.category] || page.category}`,
    },
  };

  const relatedFromSlugs = (page.relatedSlugs || [])
    .map((slug) => allLearnPages.find((item) => item.slug === slug))
    .filter(Boolean);

  const fallbackRelated = allLearnPages
    .filter(
      (item) => item.slug !== page.slug && item.category === page.category
    )
    .slice(0, 4);

  const related =
    relatedFromSlugs.length > 0 ? relatedFromSlugs : fallbackRelated;

  const categoryPages = allLearnPages.filter(
    (item) => item.category === page.category
  );
  const currentCategoryIndex = categoryPages.findIndex(
    (item) => item.slug === page.slug
  );
  const nextTopic =
    currentCategoryIndex >= 0 && categoryPages.length > 1
      ? categoryPages[(currentCategoryIndex + 1) % categoryPages.length]
      : null;

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* NAV */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Skill<span style={{ color: "var(--red, #e63329)" }}>Dojo</span> 道場
        </Link>
        <Link
          href={CATEGORY_LINKS[page.category] || "/"}
          className={styles.backLink}
        >
          ← {CATEGORY_LABELS[page.category] || "Home"}
        </Link>
      </nav>

      {/* HEADER */}
      <header className={styles.header}>
        <span className={styles.badge}>
          {CATEGORY_LABELS[page.category] || page.category} · {page.level}
        </span>
        <h1 className={styles.title}>{headline}</h1>
        <p className={styles.description}>{page.description}</p>
      </header>

      {/* INTRO */}
      <section className={styles.content}>
        <p className={styles.intro}>{page.content}</p>

        {/* VOCABULARY TABLE */}
        <h2 className={styles.sectionTitle}>Key Vocabulary</h2>
        <table className={styles.vocabTable}>
          <thead>
            <tr>
              <th>Japanese</th>
              <th>Romaji</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            {page.vocabulary.map((v, i) => (
              <tr key={i}>
                <td className={styles.vocabJapanese}>{v.japanese}</td>
                <td>{v.romaji}</td>
                <td>{v.english}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* EXAMPLES */}
        <h2 className={styles.sectionTitle}>Example Sentences</h2>
        <ul className={styles.exampleList}>
          {page.examples.map((ex, i) => (
            <li key={i} className={styles.exampleItem}>
              <div className={styles.exampleJp}>{ex.japanese}</div>
              <div className={styles.exampleRomaji}>{ex.romaji}</div>
              <div className={styles.exampleEn}>{ex.english}</div>
            </li>
          ))}
        </ul>

        {/* TIPS */}
        <h2 className={styles.sectionTitle}>Study Tips</h2>
        <ul className={styles.tipsList}>
          {page.tips.map((tip, i) => (
            <li key={i} className={styles.tipItem}>
              <span className={styles.tipBullet}>{i + 1}</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {nextTopic && (
        <section className={styles.nextTopic}>
          <h2 className={styles.nextTopicTitle}>Next Topic</h2>
          <Link href={`/learn/${nextTopic.slug}`} className={styles.nextTopicLink}>
            {nextTopic.title}
          </Link>
        </section>
      )}

      {/* RELATED */}
      {related.length > 0 && (
        <section className={styles.related}>
          <h2 className={styles.relatedTitle}>Continue Learning</h2>
          <div className={styles.relatedGrid}>
            {related.map((rp) => (
              <Link
                key={rp.slug}
                href={`/learn/${rp.slug}`}
                className={styles.relatedCard}
              >
                <span className={styles.relatedCardBadge}>
                  {CATEGORY_LABELS[rp.category] || rp.category}
                </span>
                <span className={styles.relatedCardTitle}>{rp.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Practice What You Learned</h2>
        <p className={styles.ctaDesc}>
          Take your learning further with interactive lessons, flashcards, and
          the SkillDojo 30-day study plan.
        </p>
        <Link href="/courses/30-days" className={styles.ctaBtn}>
          Start the 30-Day Course
        </Link>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link href="/" className={styles.footerLink}>Home</Link>
          <Link href="/learn" className={styles.footerLink}>Learn</Link>
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
