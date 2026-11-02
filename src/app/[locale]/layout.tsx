import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "./globals.css";

import { Locale } from "@/i18n";

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

/**
 * Locale layout.
 *
 * Wraps every locale route in `NextIntlClientProvider` so that client
 * components can use `useTranslations` / `useLocale`. Also sets `lang` and
 * `dir` on <html> (rtl for Arabic).
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  params: Promise<{ locale: Locale }>;
  children: React.ReactNode;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
