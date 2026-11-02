"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowDown, Zap } from "lucide-react";
import Stats from "./Stats";
import { useTranslations } from "next-intl";

interface HeroProps {
  description: string;
}

export default function Hero({ description }: HeroProps) {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden flex flex-col items-center justify-center px-4 pt-24 pb-6">
      <div className="absolute top-[-12%] left-[-8%] w-[60%] h-[60%] bg-cyan-400/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-12%] right-[-10%] w-[60%] h-[60%] bg-purple-600/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <Image
            src="/logo.jpg"
            alt="Sofaine Robot logo"
            width={128}
            height={128}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mx-auto mb-4 ring-4 ring-cyan-500/30 drop-shadow-[0_0_25px_rgba(34,211,238,0.5)] animate-float"
            priority
          />

          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-1 animate-fade-in">
            {t("title")}
          </h1>
          <p className="text-gray-400 text-sm tracking-widest uppercase mb-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t("subtitle")}
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold mb-2 animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            {t("status")}
          </div>

          <p className="text-gray-300 text-lg md:text-xl mb-2 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.2s" }}>
            {description}
          </p>

          <div className="flex flex-row items-center justify-center gap-3 mt-3 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Link
              href="https://t.me/sofainerobot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass flex items-center justify-center gap-2 px-6 py-3"
            >
              {t("launch")} <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#about"
              className="btn-outline flex items-center justify-center gap-2 px-6 py-3"
            >
              <Zap className="w-4 h-4" /> {t("about")}
            </a>
          </div>

          {/* Trust stats bar sitting right below the Hero buttons */}
          <Stats />

          {/* Elegant tech stack row */}
          <div className="w-full text-center text-xs text-gray-500 mt-2 uppercase tracking-wider">
            {t("techStack")}
          </div>

          {/* Subtle animated scroll arrow */}
          <ArrowDown className="animate-bounce mx-auto text-cyan-500 mt-2 mb-1 block" />
        </div>
      </div>
    </section>
  );
}
