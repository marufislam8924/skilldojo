const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.skilldojojp.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/flashcards", "/student", "/dashboard"],
        crawlDelay: 1,
      },
      {
        userAgent: ["Googlebot", "Bingbot"],
        allow: "/",
        disallow: ["/flashcards", "/student", "/dashboard"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}