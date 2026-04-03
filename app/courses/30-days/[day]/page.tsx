import type { Metadata } from "next";
import { curriculum } from "../../../../data/japaneseIn30Days";
import DayClient from "./DayClient";

export function generateStaticParams() {
  return Array.from({ length: 30 }, (_, i) => ({ day: String(i + 1) }));
}

export function generateMetadata({ params }: { params: { day: string } }): Metadata {
  const dayNum = Number(params.day);
  const day = curriculum.find((d) => d.day === dayNum);

  if (!day) {
    return { title: "Day Not Found" };
  }

  return {
    title: `Day ${dayNum}: ${day.title} — Japanese in 30 Days`,
    description: `${day.subtitle}. Follow the SkillDojo 30-day study plan with daily tasks for Hiragana, Katakana, vocabulary, grammar, and conversation.`,
    alternates: { canonical: `/courses/30-days/${dayNum}` },
    openGraph: {
      title: `Day ${dayNum}: ${day.title} — Japanese in 30 Days`,
      description: day.subtitle,
      url: `/courses/30-days/${dayNum}`,
      type: "article",
    },
  };
}

export default function Page() {
  return <DayClient />;
}
