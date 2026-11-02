"use client";

import { useEffect, useRef } from "react";
import { Zap, Clock, Shield, Brain } from "lucide-react";

// Feature card definitions with icons, titles, descriptions, and accent colors
const features = [
  {
    icon: Zap,
    title: "Fast Responses",
    description: "Lightning-fast replies powered by optimized AI models.",
    color: "text-cyan-400",
    glow: "drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "The bot never sleeps. Chat anytime, day or night.",
    color: "text-emerald-400",
    glow: "drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your conversations are protected and kept confidential.",
    color: "text-purple-400",
    glow: "drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]",
  },
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Advanced AI that understands and responds intelligently.",
    color: "text-cyan-400",
    glow: "drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]",
  },
];

export default function Features() {
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  // Fade cards in with a staggered delay as the section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("reveal-active");
            }, i * 120);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="reveal py-20 md:py-32 px-4 relative">
      <div className="container">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Sofaine Robot
            </span>
            ?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need from a Telegram bot, wrapped in a sleek,
            intelligent experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={setCardRef(index)}
              className={`feature-card reveal group flex flex-col items-start rounded-2xl p-6 md:p-8 border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]`}
            >
              {/* Large, glowing icon */}
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 ${feature.color} bg-white/10 border border-white/20 ${feature.glow} transition-all duration-300 group-hover:scale-110`}>
                <feature.icon className="w-7 h-7 md:w-8 md:h-8" />
              </div>

              <h3 className={`text-white font-semibold text-xl mb-3 transition-colors duration-300 group-hover:${feature.color}`}>
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
