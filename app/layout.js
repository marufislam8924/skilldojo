import "./globals.css";
import Cursor from "./components/Cursor";
import ThemeToggle from "./components/ThemeToggle";

export const metadata = {
  title: "Skilldojo",
  description: "Learn Japanese",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}