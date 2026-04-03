export const metadata = {
  title: "Student Dashboard",
  description:
    "Track completed lessons, review progress, and continue your Hiragana, Katakana, Vocabulary, Grammar, and Conversation courses on SkillDojo.",
  alternates: {
    canonical: "/student/dashboard",
  },
  openGraph: {
    title: "Student Dashboard | SkillDojo",
    description:
      "Track completed lessons, review progress, and continue your Japanese study plan.",
    url: "/student/dashboard",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudentDashboardLayout({ children }) {
  return children;
}
