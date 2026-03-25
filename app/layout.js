import "./globals.css";

export const metadata = {
  title: "SkillDojo 道場",
  description: "Learn Japanese the smart way — Free",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700;900&family=DM+Mono:wght@400;500&family=Sora:wght@300;400;600;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
