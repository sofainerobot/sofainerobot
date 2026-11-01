"use client";

import { Bot } from "lucide-react";

/**
 * Sofaine Robot brand logo.
 *
 * A stylized "S" mark inside a neon-gradient rounded square. Used in the Navbar
 * and Hero section so "Sofaine Robot" is prominent and consistent everywhere.
 */
export function Logo({
  className = "",
  size = 36,
  variant = "default",
}: {
  className?: string;
  size?: number;
  variant?: "default" | "flat";
}) {
  const isFlat = variant === "flat";

  return (
    <div
      className={`relative flex items-center justify-center ${
        isFlat ? "" : "shadow-[0_0_20px_rgba(34,211,238,0.35)]"
      } ${className}`}
    >
      {/* Neon badge background */}
      {!isFlat && (
        <div
          className={`w-${size} h-${size} rounded-2xl bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-emerald flex items-center justify-center rotate-[-6deg] hover:rotate-0 transition-transform duration-500`}
        >
          <Bot className={`w-[45%] h-[45%] text-dark-900`} />
        </div>
      )}
      {/* Stylized "S" mark */}
      <svg
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="none"
        stroke={isFlat ? "currentColor" : "white"}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`absolute -rotate-[6deg] ${isFlat ? "text-neon-cyan" : ""} drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]`}
      >
        <path d="M6 20h4c2.2 0 4-1.8 4-4v-4c0-2.2-1.8-4-4-4H6c-2.2 0-4 1.8-4 4v4c0 2.2 1.8 4 4 4h4" />
      </svg>
    </div>
  );
}
