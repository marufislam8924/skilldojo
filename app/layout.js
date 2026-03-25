import Cursor from "./components/Cursor";
<body>
  <Cursor />
  {children}
</body>

import "./globals.css";

export const metadata = {
  title: "Skilldojo",
  description: "Learn Japanese",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}