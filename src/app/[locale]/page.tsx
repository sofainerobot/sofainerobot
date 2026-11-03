import Image from 'next/image';
import { Send } from 'lucide-react';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 bg-[#050505]">
      
      {/* الشعار المتوهج */}
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

      {/* عنوان الموقع */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
        Sofaine Robot
      </h1>

      {/* زر فتح الدردشة */}
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

      {/* تعريف بالبوت */}
      <div className="w-full max-w-3xl mb-12">
        <About />
      </div>

      {/* الحسابات الاجتماعية */}
      <div className="w-full max-w-3xl">
        <Contact />
      </div>

    </main>
  );
}