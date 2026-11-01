"use client";

import Link from "next/link";

/* All of these icons are confirmed to exist in lucide-react v0.358.0.
   NOTE: this version exports `X` (the Twitter bird icon), not `Twitter`.
   There is no `MessageCircle` either, so Telegram uses `Send`, and unknown
   platforms fall back to `<Globe />`. */
import {
  Send,
  Facebook,
  Instagram,
  Music,
  Youtube,
  X,
  Globe,
} from "lucide-react";

interface SocialLink {
  id?: string;
  platform: string;
  url: string;
}

/**
 * Contact & Social Media section ("Connect with me").
 *
 * Displays clickable social icons linked to the official Sofaine Robot profiles.
 * Links come from the database (passed as props) so the admin can update them.
 *
 * This component is defensive by design:
 *  - socialLinks is accessed with optional chaining (?.) so undefined/null data
 *    while loading never crashes the render.
 *  - Icons are rendered via explicit conditionals (no dynamic icon lookup), so
 *    a missing platform can never resolve to an undefined component.
 *  - All class names are simple, static Tailwind utilities (no keyframe
 *    animations) to avoid hydration mismatches between server and client.
 */
export default function Contact({
  socialLinks,
}: {
  socialLinks?: SocialLink[];
}) {
  // Defensive default so .map never runs against undefined/null.
  const links = socialLinks ?? [];

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

        {/* Social grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {links.map((link, index) => {
            // Explicit icon per platform. No dynamic lookup, no undefined icons.
            let Icon: React.ElementType = Globe;
            if (link.platform === "Instagram") {
              Icon = Instagram;
            } else if (link.platform === "Facebook") {
              Icon = Facebook;
            } else if (link.platform === "Telegram") {
              Icon = Send;
            } else if (link.platform === "TikTok") {
              Icon = Music;
            } else if (link.platform === "YouTube") {
              Icon = Youtube;
            } else if (link.platform === "X") {
              Icon = X;
            }

            const href = link.url || "#";
            const key = link.id || href || String(index);

            // Only render a link when there is a real URL to avoid broken anchors.
            if (!link.url) {
              return null;
            }

            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  justify-center
                  w-14
                  h-14
                  rounded-full
                  bg-gray-800
                  border
                  border-gray-700
                  group
                  hover:bg-gray-700
                  hover:border-neon-cyan
                  transition-colors
                  duration-200
                "
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-gray-700 group-hover:bg-neon-cyan transition-colors duration-200">
                  <Icon className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </div>
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
