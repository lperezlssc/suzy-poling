import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Suzy Poling | Creative Director & Designer",
  description: "Portfolio showcasing 154 exhibition photographs and creative projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
