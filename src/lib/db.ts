import { prisma } from "@/lib/prisma";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export interface HeroSettings {
  id: number;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface AppDatabase {
  hero: HeroSettings;
  faqs: FAQItem[];
  socialLinks: SocialLink[];
}

/* ------------------------------------------------------------------ */
/* Hero Section                                                       */
/* ------------------------------------------------------------------ */

export async function getHeroSettings(): Promise<HeroSettings> {
  let hero = await prisma.heroSettings.findUnique({ where: { id: 1 } });

  if (!hero) {
    hero = await prisma.heroSettings.create({
      data: {
        id: 1,
        title: "@sofainerobot",
        description:
          "Your AI-Powered Telegram Assistant — fast, secure, and available 24/7.",
      },
    });
  }

  return hero;
}

export async function updateHeroSettings({
  title,
  description,
}: {
  title: string;
  description: string;
}): Promise<HeroSettings> {
  return prisma.heroSettings.upsert({
    where: { id: 1 },
    update: { title, description },
    create: { id: 1, title, description },
  });
}

/* ------------------------------------------------------------------ */
/* FAQ Items                                                          */
/* ------------------------------------------------------------------ */

export async function getFAQs(): Promise<FAQItem[]> {
  return prisma.fAQ.findMany({ orderBy: { order: "asc" } });
}

export async function createFAQ({
  question,
  answer,
  order,
}: {
  question: string;
  answer: string;
  order: number;
}): Promise<FAQItem> {
  return prisma.fAQ.create({ data: { question, answer, order } });
}

export async function updateFAQ({
  id,
  question,
  answer,
  order,
}: {
  id: string;
  question: string;
  answer: string;
  order: number;
}): Promise<FAQItem> {
  return prisma.fAQ.update({
    where: { id },
    data: { question, answer, order },
  });
}

export async function deleteFAQ({ id }: { id: string }): Promise<void> {
  await prisma.fAQ.delete({ where: { id } });
}

/* ------------------------------------------------------------------ */
/* Social Media Links                                                 */
/* ------------------------------------------------------------------ */

export async function getSocialLinks(): Promise<SocialLink[]> {
  return prisma.socialLink.findMany({ orderBy: { platform: "asc" } });
}

export async function createSocialLink({
  platform,
  url,
  icon,
}: {
  platform: string;
  url: string;
  icon: string;
}): Promise<SocialLink> {
  return prisma.socialLink.create({ data: { platform, url, icon } });
}

export async function updateSocialLink({
  id,
  platform,
  url,
  icon,
}: {
  id: string;
  platform: string;
  url: string;
  icon: string;
}): Promise<SocialLink> {
  return prisma.socialLink.update({
    where: { id },
    data: { platform, url, icon },
  });
}

export async function deleteSocialLink({ id }: { id: string }): Promise<void> {
  await prisma.socialLink.delete({ where: { id } });
}

/* ------------------------------------------------------------------ */
/* Convenience aggregate (used by pages that need everything at once) */
/* ------------------------------------------------------------------ */

export async function readDb(): Promise<AppDatabase> {
  const [hero, faqs, socialLinks] = await Promise.all([
    getHeroSettings(),
    getFAQs(),
    getSocialLinks(),
  ]);

  return { hero, faqs, socialLinks };
}
