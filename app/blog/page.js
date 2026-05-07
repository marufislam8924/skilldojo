import Link from "next/link";
import { createSupabaseServerClient } from "../../lib/supabaseServer";
import { blogPosts } from "../../data/blogPosts";

export const metadata = {
  title: "Blog — Japanese Learning Guides",
  description:
    "Read Japanese learning guides, JLPT N5 tips, and conversation practice articles on the SkillDojo blog.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "SkillDojo Blog — Japanese Learning Guides",
    description:
      "Read Japanese learning guides, JLPT N5 tips, and conversation practice articles.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const supabase = createSupabaseServerClient();

  const localPosts = blogPosts.map((post) => ({
    id: post.slug,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || post.description || "",
    cover_image_url: post.cover_image_url || null,
    category: post.category || "Guide",
    created_at: post.created_at || post.publishDate || "2026-01-01",
  }));

  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image_url, category, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error);
  }

  const postList = Array.isArray(posts) && posts.length > 0 ? posts : localPosts;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "SkillDojo Blog",
    url: `${siteUrl}/blog`,
    description:
      "Japanese learning guides, Hiragana charts, JLPT N5 tips, and conversation practice strategies.",
    publisher: { "@type": "EducationalOrganization", name: "SkillDojo", url: siteUrl },
    blogPost: (posts || []).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.created_at,
      url: `${siteUrl}/blog/${post.slug}`,
    })),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="mb-10">
        <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">Blog</span>
        <h1 className="mt-4 text-3xl font-extrabold text-[var(--ink)]">Japanese Learning Guides</h1>
        <p className="mt-2 text-lg text-[var(--muted)]">Expert tips, study plans, and reference charts to help you master Japanese.</p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {(posts || []).map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm hover:shadow-md no-underline">
            <div className="text-sm text-[var(--muted)]">{post.category}</div>
            <h2 className="mt-2 text-lg font-bold text-[var(--ink)] group-hover:text-[var(--red)]">{post.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)] line-clamp-3">{post.excerpt}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-[var(--muted)]">
              <span>{new Date(post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              <span className="font-semibold">Read →</span>
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Ready to start learning?</h2>
        <Link href="/courses/30-days" className="mt-3 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white no-underline shadow-sm hover:bg-slate-800">Start the 30-Day Course</Link>
      </section>
    </main>
  );
}
