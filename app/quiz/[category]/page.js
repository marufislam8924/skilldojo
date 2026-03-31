import QuizGame from "./QuizGame";
import { quizCategories } from "../../../data/quizData";

export function generateStaticParams() {
  return quizCategories.map((cat) => ({ category: cat.id }));
}

export function generateMetadata({ params }) {
  const cat = quizCategories.find((c) => c.id === params.category);
  const title = cat ? cat.title : "Quiz";
  return {
    title: `${title} — SkillDojo`,
    description: cat?.description || "Test your Japanese knowledge with interactive quizzes.",
    alternates: {
      canonical: `/quiz/${params.category}`,
    },
  };
}

export default function QuizCategoryPage({ params }) {
  return <QuizGame categoryId={params.category} />;
}
