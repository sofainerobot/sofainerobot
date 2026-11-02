export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getHeroSettings, getFAQs } from "@/lib/db";
import { Locale } from "@/i18n";
import { setRequestLocale } from "next-intl/server";

/**
 * Main landing page (Server Component).
 *
 * Fetches dynamic content (Hero, FAQ) from the database and passes it to the
 * client sections. All static UI text is rendered by the client components
 * using the `useTranslations` hook from next-intl.
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
      <Navbar />
      <Hero description={hero.description} />
      <Features />
      <HowItWorks />
      <About />
      <FAQ faqs={faqs} />
      <Contact />
      <Footer />
    </main>
  );
}
