import Image from 'next/image';
import { Send, Instagram, Facebook, Music, Youtube, Twitter } from 'lucide-react';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 bg-[#050505]">
      
      {/* 1. الشعار المتوهج */}
      <div className="mb-8">
        <Image 
          src="/logo.jpg" 
          alt="Sofaine Robot Logo" 
          width={150} 
          height={150} 
          className="rounded-full object-cover mx-auto ring-4 ring-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.8)] animate-pulse"
          priority
        />
      </div>

      {/* 2. عنوان الموقع */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
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

      {/* 4. الحسابات الاجتماعية (الروابط فقط) */}
      <div className="flex flex-wrap justify-center gap-4 max-w-lg">
        <a href="https://www.instagram.com/sofainerobot" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-pink-500/20 hover:text-pink-400 transition-all border border-white/10">
          <Instagram className="w-6 h-6" />
        </a>
        <a href="https://www.facebook.com/share/18dstWZPr6/" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-blue-600/20 hover:text-blue-500 transition-all border border-white/10">
          <Facebook className="w-6 h-6" />
        </a>
        <a href="https://t.me/sofainerobot" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-sky-500/20 hover:text-sky-400 transition-all border border-white/10">
          <Send className="w-6 h-6" />
        </a>
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

    </main>
  );
}