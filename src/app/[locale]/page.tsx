export const dynamic = "force-dynamic";

import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import { getHeroSettings, getFAQs } from "@/lib/db";
import { Locale } from "@/i18n";
import { setRequestLocale } from "next-intl/server";

/**
 * Main landing page (Server Component).
 *
 * Fetches dynamic content (Hero, FAQ) from the database and passes it to the
 * client sections. All static UI text is rendered by the client components
 * using the `useTranslations` hook from next-intl.
 *
 * Navbar and Footer are rendered by `[locale]/layout.tsx` around `{children}`,
 * so they are NOT rendered here.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [hero, faqs] = await Promise.all([getHeroSettings(), getFAQs()]);

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
