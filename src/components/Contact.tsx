"use client";

import Link from "next/link";
import {
  Send,
  Facebook,
  Instagram,
  Music,
  Youtube,
  X,
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
  Music, // TikTok (lucide v0.358 has no dedicated TikTok icon; Music is used)
  Youtube,
  X,
};

export default function Contact({
  socialLinks,
}: {
  socialLinks: SocialLink[];
}) {
  // Guard against undefined/null socialLinks (e.g. while data is loading) to
  // prevent a client-side exception when spreading/sorting the array.
  const sorted = (socialLinks || []).slice().sort((a, b) => a.platform.localeCompare(b.platform));

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
                className="card card-idle-glow w-16 h-16 rounded-full flex items-center justify-center group hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 active:border-blue-500 active:[animation:none] active:shadow-[0_0_20px_rgba(59,130,246,1)] active:bg-blue-500/20"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors bg-gray-800 text-gray-300 group-hover:bg-neon-cyan group-hover:text-white">
                  <Icon className="w-6 h-6" />
                </div>
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
