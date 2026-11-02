export const dynamic = "force-dynamic";

import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import { getHeroSettings, getFAQs, type FAQItem } from "@/lib/db";
import { Locale } from "@/i18n";
import { setRequestLocale, getTranslations } from "next-intl/server";

/**
 * Main landing page (Server Component).
 *
 * - Fetches dynamic content (Hero, FAQ) from the database via `@/lib/db`
 *   (Prisma client at `@/lib/prisma`). Every DB call is wrapped in try/catch
 *   with safe fallbacks so a Prisma/connection failure on Vercel can never
 *   take down the page, and `null` data never crashes a section.
 * - Uses `getTranslations` from `next-intl/server` (awaited) for static text
 *   rendered directly in this Server Component. Client sections (Hero, About,
 *   FAQ, …) remain `"use client"` and keep using `useTranslations`, which is
 *   correct for client components only.
 * - Navbar/Footer are rendered by `[locale]/layout.tsx` around `{children}`,
 *   so they are NOT rendered here.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // ------------------------------------------------------------------
  // Server-side translations (awaited).
  //
  // `getTranslations` is the Server Component counterpart of
  // `useTranslations` (which is client-components only). Scoped to the
  // "hero" namespace so we have safe fallback strings. Wrapped in try/catch
  // so a missing/unavailable messages source never crashes the page.
  // ------------------------------------------------------------------
  let t: (key: string) => string;
  try {
    t = await getTranslations({ locale, namespace: "hero" });
  } catch {
    // Identity fallback: `t(key) ?? default` still works, nothing crashes.
    t = (key) => key;
  }

  // ------------------------------------------------------------------
  // Database: wrapped in try/catch so a Prisma/connection failure never
  // crashes the page. Falls back to safe defaults.
  // ------------------------------------------------------------------
  let hero = {
    id: 1,
    title: t("title") ?? "Sofaine Robot",
    description:
      t("techStack") ??
      "Your AI-Powered Telegram Assistant — fast, secure, and available 24/7.",
  };

  try {
    const dbHero = await getHeroSettings();
    if (dbHero) {
      // `getHeroSettings` creates a row when none exists, but guard against
      // null anyway so the section never receives undefined data.
      hero = dbHero;
    }
  } catch {
    // Keep the fallback hero above; the page stays up without DB data.
  }

  let faqs: FAQItem[] = [];
  try {
    const fetched = await getFAQs();
    faqs = Array.isArray(fetched) ? fetched : [];
  } catch {
    faqs = [];
  }

  return (
    <main className="relative">
      <Hero description={hero.description} />
      <Stats />
      <Features />
      <HowItWorks />
      <About />
      <FAQ faqs={faqs} />
      <Contact />
    </main>
  );
}
