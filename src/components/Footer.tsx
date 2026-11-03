"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Send } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[#050505] border-t border-white/10 py-8 mt-20">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4">
        <h3 className="text-xl font-bold text-white">{t('brand')}</h3>
        
        <a 
          href="https://t.me/sofainerobot" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <Send className="w-4 h-4" />
          {t('openBot')}
        </a>

        <div className="flex gap-6 mt-4 text-sm text-gray-400">
          <Link href="/privacy" className="hover:text-white transition-colors">
            {t('privacy')}
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            {t('terms')}
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          {t('copyright', { year: 2026 })}
        </p>
      </div>
    </footer>
  );
}
