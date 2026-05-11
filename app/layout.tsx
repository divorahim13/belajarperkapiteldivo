import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deutsch Lernen - Kapitel 6 Arbeitswelten",
  description: "Home belajar Bahasa Jerman A2 dengan progress tracking untuk Kapitel 6 Arbeitswelten.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
