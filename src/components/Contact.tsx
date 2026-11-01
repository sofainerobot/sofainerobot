"use client";

import Link from "next/link";
import {
  Send,
  Facebook,
  Instagram,
  Smartphone,
  Youtube,
  X,
  Mail,
  ArrowRight,
} from "lucide-react";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

/**
 * Contact & Social Media section ("Connect with me").
 *
 * Displays clickable social icons linked to the official Sofaine Robot profiles.
 * Links come from the database (passed as props) so the admin can update them.
 */
const ICONS: Record<string, React.ElementType> = {
  Send,
  Facebook,
  Instagram,
  Tiktok: Smartphone, // lucide v0.358 has no "Tiktok" icon; use Smartphone
  Youtube,
  X,
};

export default function Contact({
  socialLinks,
}: {
  socialLinks: SocialLink[];
}) {
  const sorted = [...socialLinks].sort((a, b) => a.platform.localeCompare(b.platform));

  return (
    <section id="contact" className="py-20 md:py-32 px-4">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 headline-gradient">
            Connect with me
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Follow Sofaine Robot across social media for updates, tutorials, and
            support. Or open the bot directly in Telegram.
          </p>
        </div>

        {/* Social grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {sorted.map((link) => {
            const Icon = ICONS[link.icon] || Link as React.ElementType;
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex items-center gap-4 p-4 group hover:translate-y-[-4px] transition-transform"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    link.platform === "Telegram"
                      ? "bg-neon-cyan/20 text-neon-cyan group-hover:bg-neon-cyan group-hover:text-dark-900"
                      : "bg-gray-800 text-gray-300 group-hover:bg-neon-cyan group-hover:text-white"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">
                    {link.platform}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{link.url}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-neon-cyan shrink-0 transition-colors" />
              </a>
            );
          })}
        </div>

        {/* Quick Telegram CTA */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div
            className="bg-neon-cyan/10 border border-neon-cyan/20 rounded-2xl p-8 md:p-12 text-center"
          >
            <h3 className="text-2xl font-bold mb-2">Prefer Telegram?</h3>
            <p className="text-gray-400 mb-6 max-w-xs mx-auto">
              Open @sofainerobot directly in Telegram and send /start.
            </p>
            <Link
              href="https://t.me/sofainerobot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3"
            >
              Open in Telegram <Send className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
