import { redirect } from "next/navigation";

export const metadata = {
  title: "JLPT N5 Vocabulary",
  description: "Redirecting to SkillDojo JLPT N5 vocabulary lessons.",
  alternates: {
    canonical: "/vocab",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function JlptN5VocabularyAliasPage() {
  redirect("/vocab");
}
