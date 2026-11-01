import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getHeroSettings, getFAQs, getSocialLinks } from "@/lib/db";

/**
 * Main landing page (Server Component).
 *
 * Fetches dynamic content (Hero, FAQ, Contact) from the cloud database and
 * passes it down to the client sections. Everything else stays static.
 */
export default async function Home() {
  const [hero, faqs, socialLinks] = await Promise.all([
    getHeroSettings(),
    getFAQs(),
    getSocialLinks(),
  ]);

  return (
    <main className="relative">
      <Navbar />
      <Hero title={hero.title} description={hero.description} />
      <Features />
      <About />
      <FAQ faqs={faqs} />
      <Contact socialLinks={socialLinks} />
      <Footer />
    </main>
  );
}
