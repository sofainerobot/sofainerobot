"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Bot } from "lucide-react";

interface HeroProps {
  title: string;
  description: string;
}

export default function Hero({ title, description }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-24 md:py-36 px-4">
      {/* Ambient background glows for depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-purple/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
          {/* Brand logo */}
          <Image
            src="/logo.jpg"
            alt="Sofaine Robot logo"
            width={128}
            height={128}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto mb-6 ring-4 ring-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.8)] animate-pulse"
            priority
          />

          {/* Name */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Sofaine Robot
          </h2>

          {/* Bot handle */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-emerald mb-6">
            @sofainerobot
          </h1>

          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 text-xs font-semibold mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            Online on Telegram
          </div>

          {/* Sub-description */}
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {description}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link
              href="https://t.me/sofainerobot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center gap-2 px-8 py-3"
            >
              Launch @sofainerobot <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#about"
              className="btn-outline flex items-center justify-center gap-2 px-8 py-3"
            >
              <Zap className="w-4 h-4" /> About
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
