import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost, getAllBlogSlugs } from "../../../data/blogPosts";
import styles from "./blogPost.module.css";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = getBlogPost(params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

/* ── tiny markdown renderer (no external deps) ── */
function renderMarkdown(md) {
  const lines = md.trim().split("\n");
  const elements = [];
  let i = 0;
  let key = 0;

  function nextKey() {
    return key++;
  }

  function inlineMarkdown(text) {
    // Process bold, links, code spans
    const parts = [];
    let remaining = text;
    let k = 0;

    while (remaining.length > 0) {
      // bold
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // link
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
      // code
      const codeMatch = remaining.match(/`([^`]+)`/);

      let firstMatch = null;
      let firstIdx = Infinity;

      if (boldMatch && remaining.indexOf(boldMatch[0]) < firstIdx) {
        firstIdx = remaining.indexOf(boldMatch[0]);
        firstMatch = { type: "bold", match: boldMatch };
      }
      if (linkMatch && remaining.indexOf(linkMatch[0]) < firstIdx) {
        firstIdx = remaining.indexOf(linkMatch[0]);
        firstMatch = { type: "link", match: linkMatch };
      }
      if (codeMatch && remaining.indexOf(codeMatch[0]) < firstIdx) {
        firstIdx = remaining.indexOf(codeMatch[0]);
        firstMatch = { type: "code", match: codeMatch };
      }

      if (!firstMatch) {
        parts.push(remaining);
        break;
      }

      const before = remaining.substring(0, firstIdx);
      if (before) parts.push(before);

      if (firstMatch.type === "bold") {
        parts.push(<strong key={`b${k++}`}>{firstMatch.match[1]}</strong>);
        remaining = remaining.substring(firstIdx + firstMatch.match[0].length);
      } else if (firstMatch.type === "link") {
        const href = firstMatch.match[2];
        const isExternal = href.startsWith("http");
        parts.push(
          isExternal ? (
            <a key={`l${k++}`} href={href} target="_blank" rel="noopener noreferrer">
              {firstMatch.match[1]}
            </a>
          ) : (
            <Link key={`l${k++}`} href={href}>
              {firstMatch.match[1]}
            </Link>
          )
        );
        remaining = remaining.substring(firstIdx + firstMatch.match[0].length);
      } else if (firstMatch.type === "code") {
        parts.push(
          <code key={`c${k++}`} style={{ background: "#f0ede8", padding: "2px 6px", borderRadius: 4, fontSize: "0.9em" }}>
            {firstMatch.match[1]}
          </code>
        );
        remaining = remaining.substring(firstIdx + firstMatch.match[0].length);
      }
    }

    return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : parts;
  }

  // table parser
  function tryParseTable() {
    if (i >= lines.length) return null;
    const headerLine = lines[i];
    if (!headerLine.includes("|")) return null;
    if (i + 1 >= lines.length) return null;
    const sepLine = lines[i + 1];
    if (!/^\|?[\s-:|]+\|?$/.test(sepLine)) return null;

    const parseCols = (line) =>
      line.split("|").map((c) => c.trim()).filter((c) => c.length > 0);

    const headers = parseCols(headerLine);
    const rows = [];
    let j = i + 2;
    while (j < lines.length && lines[j].includes("|") && lines[j].trim() !== "") {
      rows.push(parseCols(lines[j]));
      j++;
    }
    i = j;

    return (
      <table key={nextKey()}>
        <thead>
          <tr>
            {headers.map((h, ci) => (
              <th key={ci}>{inlineMarkdown(h)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci}>{inlineMarkdown(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  while (i < lines.length) {
    const line = lines[i];

    // empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // table
    const table = tryParseTable();
    if (table) {
      elements.push(table);
      continue;
    }

    // headings
    if (line.startsWith("### ")) {
      elements.push(<h3 key={nextKey()}>{inlineMarkdown(line.slice(4))}</h3>);
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push(<h2 key={nextKey()}>{inlineMarkdown(line.slice(3))}</h2>);
      i++;
      continue;
    }

    // blockquote
    if (line.startsWith("> ")) {
      const bqLines = [];
      while (i < lines.length && (lines[i].startsWith("> ") || lines[i].startsWith(">"))) {
        bqLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      elements.push(
        <blockquote key={nextKey()}>
          {bqLines.map((bl, bi) =>
            bl.trim() === "" ? null : <p key={bi}>{inlineMarkdown(bl)}</p>
          )}
        </blockquote>
      );
      continue;
    }

    // ordered list
    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={nextKey()}>
          {items.map((item, ii) => (
            <li key={ii}>{inlineMarkdown(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // unordered list
    if (line.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={nextKey()}>
          {items.map((item, ii) => (
            <li key={ii}>{inlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // paragraph
    const pLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("> ") &&
      !lines[i].startsWith("- ") &&
      !/^\d+\.\s/.test(lines[i]) &&
      !lines[i].includes("|")
    ) {
      pLines.push(lines[i]);
      i++;
    }
    if (pLines.length > 0) {
      elements.push(<p key={nextKey()}>{inlineMarkdown(pLines.join(" "))}</p>);
    }
  }

  return elements;
}

export default function BlogPostPage({ params }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishDate,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "EducationalOrganization",
      name: "SkillDojo",
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug);

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Skill<span style={{ color: "var(--red, #c41e3a)" }}>Dojo</span> 道場
        </Link>
        <Link href="/blog" className={styles.backLink}>
          ← All Articles
        </Link>
      </nav>

      <header className={styles.header}>
        <span className={styles.tag}>Guide</span>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.meta}>
          {post.author} ·{" "}
          {new Date(post.publishDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <article className={styles.article}>{renderMarkdown(post.content)}</article>

      {relatedPosts.length > 0 && (
        <section className={styles.related}>
          <h2 className={styles.relatedTitle}>More Articles</h2>
          <div className={styles.relatedGrid}>
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className={styles.relatedCard}
              >
                <span className={styles.relatedCardTitle}>{rp.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Start Learning Japanese Free</h2>
        <p className={styles.ctaDesc}>
          Structured lessons, interactive flashcards, and a 30-day study plan.
        </p>
        <Link href="/courses/30-days" className={styles.ctaBtn}>
          Begin the 30-Day Course
        </Link>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link href="/" className={styles.footerLink}>Home</Link>
          <Link href="/blog" className={styles.footerLink}>Blog</Link>
          <Link href="/hiragana" className={styles.footerLink}>Hiragana</Link>
          <Link href="/katakana" className={styles.footerLink}>Katakana</Link>
          <Link href="/vocab" className={styles.footerLink}>Vocabulary</Link>
          <Link href="/conversation" className={styles.footerLink}>Conversation</Link>
          <Link href="/about" className={styles.footerLink}>About</Link>
        </div>
      </footer>
    </main>
  );
}
