"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Bot, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import LanguageSelector from "./LanguageSelector";

export default function Navbar() {
  const t = useTranslations("navbar");
  // `useLocale` is provided by `NextIntlClientProvider` in the [locale] layout.
  const locale = useLocale() || "en";
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: t("home"), href: `/${locale}` },
    { name: t("about"), href: "#about" },
    { name: t("faq"), href: "#faq" },
    { name: t("contact"), href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-gray-700">
      <div className="container">
        <div className="flex items-center justify-end h-16 md:h-20">
          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://t.me/sofainerobot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hidden sm:inline-flex items-center gap-2"
            >
              {t('startBot')} <Bot className="w-4 h-4" />
            </a>
            <Link
              href={`/${locale}/admin/login`}
              className="text-xs font-medium text-gray-400 hover:text-white underline underline-offset-4 transition-colors"
            >
              {t('admin')} <Lock className="w-3 h-3 ml-1" />
            </Link>
            <LanguageSelector />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* Mobile panel */}
      <div
        className={`fixed top-16 left-0 right-0 z-50 bg-dark-900 border-b border-gray-700 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } pointer-events-none`}
      >
        <div className="container py-6 px-4">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-neon-cyan transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://t.me/sofainerobot"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full justify-center py-3"
            >
              Start Bot
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
