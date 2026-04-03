import Link from "next/link";
import { notFound } from "next/navigation";
import {
  conversationTopicPages,
  getConversationTopicPage,
  getAllConversationTopicSlugs,
} from "../../../data/conversationTopicPages";
import styles from "./conversationGuide.module.css";

export function generateStaticParams() {
  return getAllConversationTopicSlugs().map((slug) => ({ topic: slug }));
}

export function generateMetadata({ params }) {
  const page = getConversationTopicPage(params.topic);
  if (!page) return { title: "Page Not Found" };

  return {
    title: page.title,
    description: page.description,
    keywords: [
      "japanese conversation",
      "japanese phrases",
      page.slug.replace(/-/g, " "),
      "learn japanese",
      "JLPT N5",
      "travel japanese",
    ],
    alternates: { canonical: `/conversation-guide/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/conversation-guide/${page.slug}`,
      type: "article",
      siteName: "SkillDojo",
    },
    twitter: { card: "summary_large_image", title: page.title, description: page.description },
  };
}

export default function ConversationGuidePage({ params }) {
  const page = getConversationTopicPage(params.topic);
  if (!page) notFound();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";

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
    mainEntityOfPage: `${siteUrl}/conversation-guide/${page.slug}`,
    educationalLevel: "Beginner",
    inLanguage: "en",
  };

  // Other topics for "related" section (exclude current)
  const otherTopics = conversationTopicPages.filter(
    (t) => t.slug !== page.slug
  );

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
        <Link href="/conversation" className={styles.backLink}>
          ← All Conversations
        </Link>
      </nav>

      <header className={styles.header}>
        <span className={styles.badge}>Conversation Guide</span>
        <h1 className={styles.title}>{page.title}</h1>
        <p className={styles.description}>{page.description}</p>
      </header>

      <section className={styles.content}>
        <p className={styles.intro}>{page.content}</p>

        <h2 className={styles.sectionTitle}>
          Key Phrases ({page.phrases.length})
        </h2>
        <ul className={styles.phraseList}>
          {page.phrases.map((phrase, i) => (
            <li key={i} className={styles.phraseItem}>
              <div className={styles.phraseJp}>{phrase.japanese}</div>
              <div className={styles.phraseRomaji}>{phrase.romaji}</div>
              <div className={styles.phraseEn}>{phrase.english}</div>
              {phrase.context && (
                <span className={styles.phraseContext}>{phrase.context}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {otherTopics.length > 0 && (
        <section className={styles.related}>
          <h2 className={styles.relatedTitle}>More Conversation Topics</h2>
          <div className={styles.relatedGrid}>
            {otherTopics.slice(0, 4).map((t) => (
              <Link
                key={t.slug}
                href={`/conversation-guide/${t.slug}`}
                className={styles.relatedCard}
              >
                <span className={styles.relatedCardTitle}>{t.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Practice Real Conversations</h2>
        <p className={styles.ctaDesc}>
          Interactive dialogue lessons with audio, role-play, and instant
          feedback.
        </p>
        <Link href="/conversation" className={styles.ctaBtn}>
          Start Conversation Lessons
        </Link>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link href="/" className={styles.footerLink}>Home</Link>
          <Link href="/learn" className={styles.footerLink}>Learn</Link>
          <Link href="/hiragana" className={styles.footerLink}>Hiragana</Link>
          <Link href="/vocab" className={styles.footerLink}>Vocabulary</Link>
          <Link href="/conversation" className={styles.footerLink}>Conversation</Link>
          <Link href="/blog" className={styles.footerLink}>Blog</Link>
        </div>
      </footer>
    </main>
  );
}
