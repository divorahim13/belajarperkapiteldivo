import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Materi Bahasa Jerman - Leben in der Stadt",
  description: "Materi Lengkap Bahasa Jerman — Hidup di Kota",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
