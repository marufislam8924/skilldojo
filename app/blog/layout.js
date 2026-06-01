import { blogPosts } from "../../data/blogPosts";

export const metadata = {
  title: "Blog — Japanese Learning Tips & Guides",
  description:
    "Read expert guides on learning Japanese, Hiragana charts, JLPT N5 preparation tips, and conversation practice strategies for Bengali-speaking learners on the SkillDojo blog.",
  keywords: [
    "learn japanese online",
    "japanese learning blog",
    "JLPT N5 tips",
    "hiragana guide",
    "japanese conversation practice",
    
  ],
  alternates: {
    canonical: "/blog",
    languages: {
      "en-us": "/blog",
    },
  },
  openGraph: {
    title: "Blog — Japanese Learning Tips & Guides | SkillDojo",
    description:
      "Expert guides on learning Japanese, Hiragana charts, JLPT N5 tips, and conversation practice strategies for Bengali-speaking learners.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillDojo Blog — Japanese Learning Tips & Guides",
    description:
      "Expert guides on learning Japanese, Hiragana, JLPT N5, and conversation practice for Bengali-speaking learners.",
  },
};

export default function BlogLayout({ children }) {
  return children;
}
