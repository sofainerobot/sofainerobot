import { getTranslations } from 'next-intl/server';
import About from '@/components/About';
import Contact from '@/components/Contact';
import { Send } from 'lucide-react';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // جلب الترجمة الخاصة بقسم About (إذا كانت موجودة)
  let t;
  try {
    t = await getTranslations({ locale, namespace: 'about' });
  } catch (error) {
    t = (key: string) => key; // في حال عدم وجود ترجمة
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 bg-[#050505]">
      
      {/* 1. زر فتح الدردشة (Open Chat) */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Sofaine Robot
        </h1>
        <a 
          href="https://t.me/sofainerobot" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-105"
        >
          Open Chat <Send className="w-5 h-5" />
        </a>
      </div>

      {/* 2. تعريف بالبوت (About) */}
      <div className="w-full max-w-3xl mb-12">
        <About />
      </div>

      {/* 3. الحسابات الاجتماعية (Contact) */}
      <div className="w-full max-w-3xl">
        <Contact />
      </div>

    </main>
  );
}
