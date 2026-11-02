import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Locale } from "@/i18n";

// ------------------------------------------------------------------
// Static message fallbacks.
//
// `getMessages()` reads messages for the request locale, but it throws
// "No messages found. Have you configured them correctly?" when next-intl
// has no `getRequestConfig` / `next-intl.config.json` message source (this
// project currently relies on convention). Importing the JSON files directly
// guarantees `messages` is always defined, so the client provider and every
// `useTranslations` call in Navbar/Footer/About/Hero never lose context.
// ------------------------------------------------------------------
import enMessages from "@/messages/en.json";
import arMessages from "@/messages/ar.json";

type AppMessages = typeof enMessages;

const messagesByLocale: Record<string, AppMessages> = {
  en: enMessages,
  ar: arMessages,
};

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
 *
 * Renders Navbar above and Footer below `{children}` so they wrap every
 * locale page consistently.
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

  // Messages for the client-side provider. Prefer next-intl's request
  // messages; fall back to the static translation files so a missing
  // messages config can never crash the layout.
  let messages: AppMessages;
  try {
    messages = (await getMessages({ locale })) as AppMessages;
  } catch {
    messages = messagesByLocale[locale] ?? enMessages;
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
