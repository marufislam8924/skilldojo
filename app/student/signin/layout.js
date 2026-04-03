export const metadata = {
  title: "Student Sign In",
  description:
    "Sign in to SkillDojo to save your lesson progress and continue your Japanese N5 course from your personal dashboard.",
  alternates: {
    canonical: "/student/signin",
  },
  openGraph: {
    title: "Student Sign In | SkillDojo",
    description:
      "Sign in to save your progress and continue learning Japanese on SkillDojo.",
    url: "/student/signin",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudentSignInLayout({ children }) {
  return children;
}
