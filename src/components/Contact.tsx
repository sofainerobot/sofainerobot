"use client";

import Link from "next/link";

import {
  Instagram,
  Facebook,
  Send,
  Music,
  Youtube,
  // lucide-react v0.358.0 exports the Twitter bird as `X`; alias it as `Twitter`
  // so the X platform button renders the Twitter/X logo exactly as specified.
  X as Twitter,
} from "lucide-react";

interface SocialLink {
  id?: string;
  platform: string;
  url: string;
}

/* Exact social links for @sofainerobot. Used as the default when no
   socialLinks prop is supplied; a parent can still override via the prop. */
const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
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
    url: "https://t.me/sofainerobot",
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
 * Sofaine Robot profiles. Icons are rendered via explicit conditionals (no
 * dynamic icon lookup), so a missing platform can never resolve to an
 * undefined component — the component is crash-free by design.
 *
 * Each button has:
 *  - Idle state: a continuous colorful pulsing glow (`animate-rainbow`).
 *  - Hover state: scales up (`hover:scale-110`).
 *  - Active/pressed state: immediate blue glow and background.
 */
export default function Contact({
  socialLinks,
}: {
  socialLinks?: SocialLink[];
}) {
  // Defensive default so .map never runs against undefined/null while loading.
  const links = socialLinks ?? DEFAULT_SOCIAL_LINKS;

  // Explicit icon per platform. No dynamic lookup, no undefined icons.
  const renderIcon = (platform: string): JSX.Element | null => {
    if (platform === "Instagram") {
      return <Instagram className="w-6 h-6" />;
    }
    if (platform === "Facebook") {
      return <Facebook className="w-6 h-6" />;
    }
    if (platform === "Telegram") {
      return <Send className="w-6 h-6" />;
    }
    if (platform === "TikTok") {
      return <Music className="w-6 h-6" />;
    }
    if (platform === "YouTube") {
      return <Youtube className="w-6 h-6" />;
    }
    if (platform === "X") {
      return <Twitter className="w-6 h-6" />;
    }
    return null;
  };

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
          {links.map((link) => {
            const href = link.url || "#";
            const key = link.id || href;

            // Only render a link when there is a real URL to avoid broken anchors.
            if (!link.url) {
              return null;
            }

            const Icon = renderIcon(link.platform);

            return (
              <a
                key={key}
                href={href}
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
                {Icon}
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
