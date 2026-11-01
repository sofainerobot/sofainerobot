import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  /* ---- Hero ---- */
  await prisma.heroSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "@sofainerobot",
      description:
        "Your AI-Powered Telegram Assistant — fast, secure, and available 24/7.",
    },
  });

  /* ---- FAQs ---- */
  const defaultFaqs = [
    {
      question: "What is Sofaine Robot?",
      answer:
        "Sofaine Robot is an AI-powered Telegram assistant that answers your questions and helps you get things done right inside Telegram.",
      order: 1,
    },
    {
      question: "How do I start using the bot?",
      answer:
        "Open https://t.me/sofainerobot in Telegram and tap /start to activate the bot.",
      order: 2,
    },
    {
      question: "Is it free to use?",
      answer: "Yes, Sofaine Robot is free to use for everyone.",
      order: 3,
    },
    {
      question: "Is it available 24/7?",
      answer: "Absolutely. The bot never sleeps — chat anytime, day or night.",
      order: 4,
    },
  ];

  for (const faq of defaultFaqs) {
    await prisma.fAQ.create({ data: faq });
  }

  /* ---- Social Links ---- */
  const defaultSocials = [
    {
      platform: "Telegram",
      url: "https://t.me/sofaineroboot",
      icon: "Send",
    },
    {
      platform: "Facebook",
      url: "https://www.facebook.com/share/18dstWZPr6/",
      icon: "Facebook",
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/sofainerobot?vrfl=dXF4eXIzMXc2MHJi",
      icon: "Instagram",
    },
    {
      platform: "TikTok",
      url: "https://www.tiktok.com/@sofaineroboot?_r=1&_t=ZN-9ApbH6NMQC6",
      icon: "Music",
    },
    {
      platform: "YouTube",
      url: "https://youtube.com/@sofainerobot?si=Qn0y79sKsF82N2xR",
      icon: "Youtube",
    },
    {
      platform: "X (Twitter)",
      url: "https://x.com/sofainerobot",
      icon: "X",
    },
  ];

  for (const social of defaultSocials) {
    await prisma.socialLink.create({ data: social });
  }

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
