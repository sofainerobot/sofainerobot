"use client";

import { Shield, Zap, Brain, Clock, Users, Globe, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface Feature {
  icon: React.ElementType;
  key: string;
  color: string;
  bg: string;
}

/**
 * About section (حول البوت).
 *
 * All static text is translated via the `useTranslations` hook from next-intl.
 */
export default function About() {
  const t = useTranslations("about");

  const features: Feature[] = [
    {
      icon: Zap,
      key: "fastResponses",
      color: "text-neon-cyan",
      bg: "bg-neon-cyan/10",
    },
    {
      icon: Clock,
      key: "available247",
      color: "text-neon-emerald",
      bg: "bg-neon-emerald/10",
    },
    {
      icon: Shield,
      key: "securePrivate",
      color: "text-neon-purple",
      bg: "bg-neon-purple/10",
    },
    {
      icon: Brain,
      key: "aiPowered",
      color: "text-neon-cyan",
      bg: "bg-neon-cyan/10",
    },
    {
      icon: Users,
      key: "easyToUse",
      color: "text-neon-emerald",
      bg: "bg-neon-emerald/10",
    },
    {
      icon: Globe,
      key: "worldwideAccess",
      color: "text-neon-purple",
      bg: "bg-neon-purple/10",
    },
  ];

  return (
    <section id="about" className="py-12 md:py-16 px-4 bg-dark-800/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 text-neon-cyan flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                <span className="block headline-gradient">{t("heading")}</span>
                <span className="block text-xs md:text-sm font-normal text-gray-400 mt-1 uppercase tracking-widest">
                  {t("subheading")}
                </span>
              </h2>
            </div>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              {t("description")}
            </p>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              <strong className="text-white">{t("whyUse")}</strong>
            </p>

            <ul className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                <span>{t("instantResponses")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-neon-emerald flex-shrink-0 mt-0.5" />
                <span>{t("available247")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-neon-purple flex-shrink-0 mt-0.5" />
                <span>{t("securePrivate")}</span>
              </li>
            </ul>

            <a
              href="https://t.me/sofainerobot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              {t("startChatting")} <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Feature cards side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.key}
                className="card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`${feature.bg} ${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-neon-cyan transition-colors">
                  {t(`features.${feature.key}.title`)}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t(`features.${feature.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
