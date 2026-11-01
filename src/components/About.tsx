"use client";

import { Shield, Zap, Brain, Clock, Users, Globe, ArrowRight } from "lucide-react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bg: string;
}

/**
 * About section (تعريف).
 *
 * Explains the bot's benefits in both Arabic and English, keeping the sleek
 * dark-mode / neon-accent design consistent with the rest of the site.
 */
export default function About() {
  const features: Feature[] = [
    {
      icon: Zap,
      title: "Fast Responses",
      description: "Lightning-fast replies powered by optimized AI models.",
      color: "text-neon-cyan",
      bg: "bg-neon-cyan/10",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "The bot never sleeps. Chat anytime, day or night.",
      color: "text-neon-emerald",
      bg: "bg-neon-emerald/10",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your conversations are protected and kept confidential.",
      color: "text-neon-purple",
      bg: "bg-neon-purple/10",
    },
    {
      icon: Brain,
      title: "AI-Powered",
      description: "Advanced AI that understands and responds intelligently.",
      color: "text-neon-cyan",
      bg: "bg-neon-cyan/10",
    },
    {
      icon: Users,
      title: "Easy to Use",
      description: "No setup required — just open the bot in Telegram and start.",
      color: "text-neon-emerald",
      bg: "bg-neon-emerald/10",
    },
    {
      icon: Globe,
      title: "Worldwide Access",
      description: "Reachable from anywhere, on any device with Telegram.",
      color: "text-neon-purple",
      bg: "bg-neon-purple/10",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 px-4 bg-dark-800/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 text-neon-cyan flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                <span className="block headline-gradient">About Sofaine Robot</span>
                <span className="block text-xs md:text-sm font-normal text-gray-400 mt-1 uppercase tracking-widest">
                  تعريف البوت
                </span>
              </h2>
            </div>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              Sofaine Robot (@sofainerobot) is an AI-powered Telegram assistant
              built to make your chats smarter, faster, and more useful. Whether
              you need quick answers, automation, or just a reliable companion
              available around the clock — it's all inside Telegram.
            </p>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              <strong className="text-white">Why use Sofaine Robot?</strong>
            </p>

            <ul className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                <span>Instant AI-powered responses — no waiting.</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-neon-emerald flex-shrink-0 mt-0.5" />
                <span>Available 24/7, every day of the year.</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-neon-purple flex-shrink-0 mt-0.5" />
                <span>Secure and private conversations.</span>
              </li>
            </ul>

            <a
              href="https://t.me/sofainerobot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Start Chatting <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Feature cards side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`${feature.bg} ${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-neon-cyan transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
