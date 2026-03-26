import "./globals.css";
import Cursor from "./components/Cursor";

export const metadata = {
  title: "Skilldojo",
  description: "Learn Japanese",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}