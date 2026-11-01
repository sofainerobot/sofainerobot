import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inter font for clean, modern typography
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "@sofainerobot — AI Telegram Bot",
  description:
    "Launch @sofainerobot — your AI-powered utility bot on Telegram. Fast, secure, and available 24/7.",
  openGraph: {
    title: "@sofainerobot — AI Telegram Bot",
    description:
      "Launch @sofainerobot — your AI-powered utility bot on Telegram.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
