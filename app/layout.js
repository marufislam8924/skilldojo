import "./globals.css";

export const metadata = {
  title: "Skilldojo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}