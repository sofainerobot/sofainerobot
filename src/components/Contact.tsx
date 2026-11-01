"use client";

import Link from "next/link";

import {
  Instagram,
  Facebook,
  Send,
  Youtube,
  // lucide-react v0.358.0 exports the Twitter bird as `X`; alias it as `Twitter`
  // so the X platform button renders the Twitter/X logo exactly as specified.
  X as Twitter,
} from "lucide-react";

/**
 * Hardcoded social links for @sofainerobot.
 *
 * No database dependency: every icon renders from this static array, so the
 * social row never depends on an (often empty) cloud table.
 */
const socialLinks = [
  {
    platform: "Instagram",
    url: "https://www.instagram.com/sofainerobot?vrfl=dXF4eXIzMXc2MHJi",
  },
  {
    platform: "Facebook",
    url: "https://www.facebook.com/share/18dstWZPr6/",
  },
  {
    platform: "Telegram",
    url: "https://t.me/sofaineroboot",
  },
  {
    platform: "TikTok",
    url: "https://www.tiktok.com/@sofaineroboot?_r=1&_t=ZN-9ApbH6NMQC6",
  },
  {
    platform: "YouTube",
    url: "https://youtube.com/@sofainerobot?si=Qn0y79sKsF82N2xR",
  },
  {
    platform: "X",
    url: "https://x.com/sofainerobot",
  },
];

/**
 * Contact & Social Media section ("Connect with me").
 *
 * Displays clickable, square social-icon buttons linked to the official
 * Sofaine Robot profiles. Icons are rendered via explicit `if` conditionals
 * inside the map (no dynamic icon lookup), so a missing platform can never
 * resolve to an undefined component — the component is crash-free by design.
 *
 * Each button has:
 *  - Idle state: a continuous colorful pulsing glow (`animate-rainbow`).
 *  - Hover state: scales up (`hover:scale-110`).
 *  - Active/pressed state: immediate blue glow and background.
 */
export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 px-4">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neon-cyan">
            Connect with me
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Follow Sofaine Robot across social media for updates, tutorials, and
            support. Or open the bot directly in Telegram.
          </p>
        </div>

        {/* Social buttons row: wraps on mobile, centered, consistent gap. */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {socialLinks.map((link) => {
            // Explicit icon per platform, rendered with `if` conditions.
            let icon = null;
            if (link.platform === "Instagram") {
              icon = <Instagram className="w-6 h-6" />;
            }
            if (link.platform === "Facebook") {
              icon = <Facebook className="w-6 h-6" />;
            }
            if (link.platform === "Telegram") {
              icon = <Send className="w-6 h-6" />;
            }
            if (link.platform === "TikTok") {
              icon = (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              );
            }
            if (link.platform === "YouTube") {
              icon = <Youtube className="w-6 h-6" />;
            }
            if (link.platform === "X") {
              icon = <Twitter className="w-6 h-6" />;
            }

            return (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  flex-shrink-0
                  items-center
                  justify-center
                  w-14
                  h-14
                  rounded-xl
                  bg-gray-800/50
                  border
                  border-gray-700
                  animate-rainbow
                  hover:scale-110
                  active:shadow-[0_0_25px_rgba(59,130,246,0.9)]
                  active:bg-blue-500/20
                  active:border-blue-500
                  transition-all
                  duration-200
                "
              >
                {icon}
              </a>
            );
          })}
        </div>

        {/* Quick Telegram CTA */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="bg-neon-cyan/10 border border-neon-cyan/20 rounded-2xl p-8 md:p-12 text-center">
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
