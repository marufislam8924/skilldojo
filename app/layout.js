import "./globals.css";

export const metadata = {
  title: "SkillDojo - Learn Japanese",
  description: "Master JLPT N5 with structured lessons, flashcards, and AI practice.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
