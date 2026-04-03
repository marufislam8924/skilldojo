import { redirect } from "next/navigation";

export const metadata = {
  title: "Hiragana Chart",
  description: "Redirecting to SkillDojo Hiragana chart page.",
  alternates: {
    canonical: "/blog/hiragana-chart",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function HiraganaChartAliasPage() {
  redirect("/blog/hiragana-chart");
}
