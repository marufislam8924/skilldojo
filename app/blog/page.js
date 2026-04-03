import Link from "next/link";
import { blogPosts } from "../../data/blogPosts";
import styles from "./blog.module.css";

export default function BlogPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "SkillDojo Blog",
    url: `${siteUrl}/blog`,
    description:
      "Japanese learning guides, Hiragana charts, JLPT N5 tips, and conversation practice strategies.",
    publisher: {
      "@type": "EducationalOrganization",
      name: "SkillDojo",
      url: siteUrl,
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.publishDate,
      author: { "@type": "Organization", name: post.author },
      url: `${siteUrl}/blog/${post.slug}`,
    })),
  };

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className={styles.hero}>
        <span className={styles.heroTag}>Blog</span>
        <h1 className={styles.heroTitle}>Japanese Learning Guides</h1>
        <p className={styles.heroDesc}>
          Expert tips, study plans, and reference charts to help you master
          Japanese from scratch and pass the JLPT N5 exam.
        </p>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={styles.card}
            >
              <span className={styles.cardDate}>
                {new Date(post.publishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.cardDesc}>{post.description}</p>
              <span className={styles.cardCta}>Read Article →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Ready to start learning?</h2>
        <Link href="/courses/30-days" className={styles.ctaBtn}>
          Start the 30-Day Course
        </Link>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link href="/" className={styles.footerLink}>Home</Link>
          <Link href="/hiragana" className={styles.footerLink}>Hiragana</Link>
          <Link href="/katakana" className={styles.footerLink}>Katakana</Link>
          <Link href="/vocab" className={styles.footerLink}>Vocabulary</Link>
          <Link href="/grammar" className={styles.footerLink}>Grammar</Link>
          <Link href="/conversation" className={styles.footerLink}>Conversation</Link>
          <Link href="/about" className={styles.footerLink}>About</Link>
        </div>
      </footer>
    </main>
  );
}
