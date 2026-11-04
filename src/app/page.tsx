"use client";

import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import Image from 'next/image'; // استيراد مكون الصورة المحسن

const translations = {
  en: {
    dir: 'ltr',
    subtitle: "Your ultimate gateway to elite cybersecurity, next-gen AI, and the hidden web.",
    offerTitle: "Unlock Your Cyber Arsenal",
    openChat: "Open Bot",
    mainTitle: "SOFAIN ROBOT",
    features: [
      { title: "Exclusive Zero-Day & Git Exploits", desc: "Stay ahead with real-time, exclusive access to the latest vulnerabilities and advanced Git exploits." },
      { title: "Next-Gen AI Arsenal", desc: "Supercharge your workflow with state-of-the-art AI models engineered for elite performance." },
      { title: "Deep Web & Hidden Apps", desc: "Navigate the unseen. Discover restricted apps, hidden websites, and exclusive resources beyond the surface web." }
    ]
  },
  fr: {
    dir: 'ltr',
    subtitle: "Votre passerelle ultime vers la cybersécurité d'élite, l'IA de nouvelle génération et le web caché.",
    offerTitle: "Débloquez votre Arsenal Cyber",
    openChat: "Ouvrir le Bot",
    mainTitle: "SOFAIN ROBOT",
    features: [
      { title: "Exploits Zero-Day & Git", desc: "Gardez une longueur d'avance avec un accès exclusif aux dernières vulnérabilités et exploits Git." },
      { title: "Arsenal d'IA de Nouvelle Génération", desc: "Boostez votre flux de travail avec des modèles d'IA de pointe conçus pour la performance." },
      { title: "Deep Web & Applications Cachées", desc: "Naviguez dans l'invisible. Découvrez des applications restreintes et des sites web cachés." }
    ]
  },
  ar: {
    dir: 'rtl',
    subtitle: "بوابتك المطلقة للأمن السيبراني، الذكاء الاصطناعي المتقدم، وعالم الويب الخفي.",
    offerTitle: "اكتشف ترسانتك السيبرانية",
    openChat: "افتح البوت",
    mainTitle: "سفيان روبوت",
    features: [
      { title: "ثغرات حصرية ومتقدمة", desc: "ابق في الطليعة مع وصول فوري وحصري لأحدث الثغرات وتحديثات Git المتقدمة." },
      { title: "ترسانة الذكاء الاصطناعي", desc: "ضاعف إنتاجيتك باستخدام أحدث نماذج الذكاء الاصطناعي المصممة للأداء الاحترافي." },
      { title: "الويب المظلم والتطبيقات الخفية", desc: "استكشف المجهول. اكتشف تطبيقات مقيدة، ومواقع خفية، وموارد حصرية تتجاوز الويب السطحي." }
    ]
  }
};

export default function Page() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'fr' | 'ar'>('en');

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  const changeLang = (l: 'en' | 'fr' | 'ar') => {
    setLang(l);
    setIsLangOpen(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center relative bg-[#050505] overflow-x-hidden">
      
      <header className="w-full flex items-center justify-between px-6 py-6 max-w-4xl mx-auto z-50 relative">
        <div className="flex items-center gap-5 md:gap-6">
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="w-12 h-12 rounded-full border border-red-500/50 flex items-center justify-center bg-[#0a0a0a] hover:bg-[#1a1a1a] transition-colors"
            >
              <Globe className="text-cyan-400 w-6 h-6" />
            </button>
            {isLangOpen && (
              <div className="absolute top-full mt-2 w-40 bg-[#121212] border border-gray-700 rounded-2xl overflow-hidden shadow-2xl z-50 ltr:left-0 rtl:right-0">
                <button onClick={() => changeLang('ar')} className={`w-full text-right px-5 py-4 hover:bg-white/5 font-bold text-lg ${lang === 'ar' ? 'text-red-500' : 'text-white'}`} dir="rtl">العربية</button>
                <button onClick={() => changeLang('fr')} className={`w-full text-left px-5 py-4 hover:bg-white/5 font-bold text-lg ${lang === 'fr' ? 'text-red-500' : 'text-white'}`} dir="ltr">Français</button>
                <button onClick={() => changeLang('en')} className={`w-full text-left px-5 py-4 hover:bg-white/5 font-bold text-lg ${lang === 'en' ? 'text-red-500' : 'text-white'}`} dir="ltr">English</button>
              </div>
            )}
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-widest font-[family-name:var(--font-orbitron)]">
            <span className="text-white">CYBER</span>
            <span className="text-red-600">NEXUS</span>
          </div>
        </div>
        <div className="w-12 h-12 pointer-events-none"></div>
      </header>

      <div className="flex flex-col items-center justify-start w-full px-4 pb-12 z-10 mt-8">
        
        {/* استخدام Next Image لضغط الصورة وتحسين التحميل */}
        <div className="mb-8 animate-float">
          <Image 
            src="/logo.jpg" 
            alt="Logo" 
            width={150} 
            height={150} 
            priority // تحميل سريع للصورة الأولى
            className="rounded-full object-cover mx-auto ring-4 ring-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.5)]" 
          />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl mb-12 text-center uppercase animated-gradient-text faint-glow font-[family-name:var(--font-orbitron)] whitespace-nowrap">
          {t.mainTitle}
        </h1>
        <p className="text-sm text-gray-400 text-center mb-8">{t.subtitle}</p>

        <div className="text-center mb-16">
          <a href="https://t.me/sofainerobot" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center">
            <img src="https://static.iimg.live/uploads/supreme-masterpiece-8195.png" alt="Open Bot" className="w-full max-w-xs md:max-w-sm mx-auto mix-blend-screen animate-hover-glow transition-transform duration-300 hover:scale-105" />
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-5 max-w-lg mt-8 mb-12">
          <a href="https://www.instagram.com/sofainerobot" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-pink-500/20 hover:text-pink-400 transition-all border border-white/10">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://www.facebook.com/share/18dstWZPr6/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-blue-600/20 hover:text-blue-500 transition-all border border-white/10">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="https://t.me/sofaineroboot" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-sky-500/20 hover:text-sky-400 transition-all border border-white/10">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </a>
          <a href="https://www.tiktok.com/@sofaineroboot" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/20 hover:text-white transition-all border border-white/10">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
          </a>
          <a href="https://youtube.com/@sofainerobot" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-red-600/20 hover:text-red-500 transition-all border border-white/10">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
          </a>
          <a href="https://x.com/sofainerobot" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-gray-500/20 hover:text-gray-300 transition-all border border-white/10">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>

        <div className="w-full max-w-lg bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-left shadow-lg" dir={t.dir}>
          <h2 className="text-xl font-bold text-white mb-6 text-center">{t.offerTitle}</h2>
          <div className="flex flex-col gap-5 text-gray-300 text-sm">
            <div className="flex items-start gap-4">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 shrink-0 mt-0.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <div><strong className="text-white block mb-1">{t.features[0].title}</strong><p>{t.features[0].desc}</p></div>
            </div>
            <div className="flex items-start gap-4">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400 shrink-0 mt-0.5"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
              <div><strong className="text-white block mb-1">{t.features[1].title}</strong><p>{t.features[1].desc}</p></div>
            </div>
            <div className="flex items-start gap-4">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400 shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              <div><strong className="text-white block mb-1">{t.features[2].title}</strong><p>{t.features[2].desc}</p></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
