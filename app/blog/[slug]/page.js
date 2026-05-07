import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "../../../lib/supabaseServer";
import { blogPosts } from "../../../data/blogPosts";
import styles from "./blogPost.module.css";

export async function generateStaticParams() {
  const localSlugs = blogPosts.map((post) => post.slug);
  const hasSupabaseEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  let dbSlugs = [];
  if (hasSupabaseEnv) {
    const supabase = createSupabaseServerClient();
    const { data: posts, error } = await supabase.from("posts").select("slug").eq("published", true);
    if (error) {
      console.error("Supabase fetch error:", error);
    }
    if (Array.isArray(posts)) {
      dbSlugs = posts.map((p) => p.slug);
    }
  }

  return Array.from(new Set([...dbSlugs, ...localSlugs])).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const localPost = blogPosts.find((post) => post.slug === params.slug);
  const hasSupabaseEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  let data = null;
  if (hasSupabaseEnv) {
    const supabase = createSupabaseServerClient();
    const { data: dbData, error } = await supabase
      .from("posts")
      .select("title, excerpt, created_at")
      .eq("slug", params.slug)
      .maybeSingle();
    if (error) {
      console.error("Supabase fetch error:", error);
    }
    data = dbData;
  }

  if (data) {
    return {
      title: data.title,
      description: data.excerpt,
      alternates: { canonical: `/blog/${params.slug}` },
      openGraph: {
        title: data.title,
        description: data.excerpt,
        url: `/blog/${params.slug}`,
        type: "article",
        publishedTime: data.created_at,
      },
    };
  }

  if (!localPost) return { title: "Post Not Found" };

  return {
    title: localPost.title,
    description: localPost.excerpt || localPost.description,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      title: localPost.title,
      description: localPost.excerpt || localPost.description,
      url: `/blog/${params.slug}`,
      type: "article",
      publishedTime: localPost.created_at || localPost.publishDate,
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
export default async function BlogPostPage({ params }) {
  const hasSupabaseEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  let post = null;
  if (hasSupabaseEnv) {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase
      .from("posts")
      .select("id, title, slug, content, excerpt, cover_image_url, category, created_at")
      .eq("slug", params.slug)
      .maybeSingle();
    post = data;
  }

  const localPost = blogPosts.find((item) => item.slug === params.slug);
  const postData =
    post ||
    (localPost
      ? {
          ...localPost,
          created_at: localPost.created_at || localPost.publishDate,
        }
      : null);

  if (!postData) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: postData.title,
    description: postData.excerpt,
    datePublished: postData.created_at,
    publisher: { "@type": "EducationalOrganization", name: "SkillDojo", url: siteUrl },
    mainEntityOfPage: `${siteUrl}/blog/${postData.slug}`,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="flex items-center justify-between mb-6">
        <Link href="/" className="text-lg font-black text-[var(--ink)] no-underline">Skill<span className="text-[var(--red)]">Dojo</span> 道場</Link>
        <Link href="/blog" className="text-sm text-[var(--muted)]">← All Articles</Link>
      </nav>

      <header className="mb-6">
        <div className="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{postData.category || 'Guide'}</div>
        <h1 className="mt-4 text-2xl font-extrabold text-[var(--ink)]">{postData.title}</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">{new Date(postData.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
      </header>

      <article className={styles.article}>{renderMarkdown(postData.content)}</article>

      <section className="mt-12">
        <h2 className="text-lg font-bold">Start Learning Japanese Free</h2>
        <p className="text-sm text-[var(--muted)] mt-2">Structured lessons, interactive flashcards, and a 30-day study plan.</p>
        <Link href="/courses/30-days" className="mt-3 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white no-underline shadow-sm hover:bg-slate-800">Begin the 30-Day Course</Link>
      </section>
    </main>
  );
}
