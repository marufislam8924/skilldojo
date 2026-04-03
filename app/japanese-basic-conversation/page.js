import { redirect } from "next/navigation";

export const metadata = {
  title: "Japanese Basic Conversation",
  description: "Redirecting to SkillDojo basic Japanese conversation guide.",
  alternates: {
    canonical: "/blog/basic-japanese-conversation",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function JapaneseBasicConversationAliasPage() {
  redirect("/blog/basic-japanese-conversation");
}
