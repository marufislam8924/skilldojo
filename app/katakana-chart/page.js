import { redirect } from "next/navigation";

export const metadata = {
  title: "Katakana Chart",
  description: "Redirecting to SkillDojo Katakana learning chart page.",
  alternates: {
    canonical: "/learn/learn-katakana-basics",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function KatakanaChartAliasPage() {
  redirect("/learn/learn-katakana-basics");
}
