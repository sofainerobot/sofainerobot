import { Send, Instagram, Facebook, Youtube, Twitter, Music, Shield, Cpu, Globe } from 'lucide-react';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-32 pb-12 px-4 bg-[#050505]">
      
      {/* 1. الشعار المتوهج (استخدمنا img بدلاً من Image لتجنب الأخطاء) */}
      <div className="mb-8">
        <img 
          src="/logo.jpg" 
          alt="Sofaine Robot Logo" 
          width={150} 
          height={150} 
          className="rounded-full object-cover mx-auto ring-4 ring-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.8)] animate-pulse"
        />
      </div>

      {/* 2. عنوان الموقع */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
        Sofaine Robot
      </h1>

      {/* 3. زر فتح الدردشة */}
      <div className="text-center mb-16">
        <a 
          href="https://t.me/sofainerobot" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105"
        >
          Open Chat <Send className="w-5 h-5" />
        </a>
      </div>

      {/* 4. الحسابات الاجتماعية */}
      <div className="flex flex-wrap justify-center gap-5 max-w-lg mt-16 mb-12">
        <a href="https://www.instagram.com/sofainerobot" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-pink-500/20 hover:text-pink-400 transition-all border border-white/10">
          <Instagram className="w-6 h-6" />
        </a>
        <a href="https://www.facebook.com/share/18dstWZPr6/" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-blue-600/20 hover:text-blue-500 transition-all border border-white/10">
          <Facebook className="w-6 h-6" />
        </a>
        <a href="https://t.me/sofainerobot" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-sky-500/20 hover:text-sky-400 transition-all border border-white/10">
          <Send className="w-6 h-6" />
        </a>
        {/* أيقونة تيك توك (استخدمنا الموسيقى مؤقتاً للتأكد من عدم وجود خطأ) */}
        <a href="https://www.tiktok.com/@sofaineroboot" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-white/20 hover:text-white transition-all border border-white/10">
          <Music className="w-6 h-6" />
        </a>
        <a href="https://youtube.com/@sofainerobot" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-red-600/20 hover:text-red-500 transition-all border border-white/10">
          <Youtube className="w-6 h-6" />
        </a>
        <a href="https://x.com/sofainerobot" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-gray-500/20 hover:text-gray-300 transition-all border border-white/10">
          <Twitter className="w-6 h-6" />
        </a>
      </div>

      {/* 5. بطاقة تعريف البوت */}
      <div className="w-full max-w-lg bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">ماذا يقدم سفيان روبوت؟</h2>
        <div className="flex flex-col gap-4 text-gray-300 text-sm">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-right">ثغرات Git حصرية ومحدثة باستمرار.</p>
          </div>
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-cyan-400 shrink-0" />
            <p className="text-right">أدوات ذكاء اصطناعي (AI) متطورة.</p>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-purple-400 shrink-0" />
            <p className="text-right">مواقع وتطبيقات من عالم آخر.</p>
          </div>
        </div>
      </div>

    </main>
  );
}