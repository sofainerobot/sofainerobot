import { Send, Instagram, Facebook, Youtube, Twitter, Shield, Cpu, Globe } from 'lucide-react';

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-32 pb-12 px-4 bg-[#050505]">
      <div className="mb-8">
        <img src="/logo.jpg" alt="Logo" width={150} height={150} className="rounded-full object-cover mx-auto ring-4 ring-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.8)] animate-pulse" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]">
        Sofaine Robot
      </h1>

      <div className="text-center mb-16">
        <a href="https://t.me/sofainerobot" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 active:bg-blue-600 active:border-blue-500 active:shadow-[0_0_30px_rgba(59,130,246,0.8)] active:scale-95">
          Open Chat <Send className="w-5 h-5" />
        </a>
      </div>

      <div className="flex flex-wrap justify-center gap-5 max-w-lg mt-8 mb-12">
        <a href="https://www.instagram.com/sofainerobot" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-pink-500/20 hover:text-pink-400 transition-all border border-white/10"><Instagram className="w-6 h-6" /></a>
        <a href="https://www.facebook.com/share/18dstWZPr6/" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-blue-600/20 hover:text-blue-500 transition-all border border-white/10"><Facebook className="w-6 h-6" /></a>
        <a href="https://t.me/sofainerobot" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-sky-500/20 hover:text-sky-400 transition-all border border-white/10"><Send className="w-6 h-6" /></a>
        <a href="https://www.tiktok.com/@sofaineroboot" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-white/20 hover:text-white transition-all border border-white/10">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
        </a>
        <a href="https://youtube.com/@sofainerobot" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-red-600/20 hover:text-red-500 transition-all border border-white/10"><Youtube className="w-6 h-6" /></a>
        <a href="https://x.com/sofainerobot" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-gray-500/20 hover:text-gray-300 transition-all border border-white/10"><Twitter className="w-6 h-6" /></a>
      </div>

      <div className="w-full max-w-lg bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-left shadow-lg">
        <h2 className="text-xl font-bold text-white mb-6 text-center">What does Sofaine Robot offer?</h2>
        <div className="flex flex-col gap-5 text-gray-300 text-sm">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
            <div><strong className="text-white block mb-1">Exclusive Git Exploits</strong><p>Constantly updated vulnerabilities and exploits.</p></div>
          </div>
          <div className="flex items-start gap-4">
            <Cpu className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
            <div><strong className="text-white block mb-1">Advanced AI Tools</strong><p>Access powerful AI models to boost your workflow.</p></div>
          </div>
          <div className="flex items-start gap-4">
            <Globe className="w-6 h-6 text-purple-400 shrink-0 mt-0.5" />
            <div><strong className="text-white block mb-1">Dark Web & Beyond</strong><p>Explore unique websites and hidden apps.</p></div>
          </div>
        </div>
      </div>
    </main>
  );
}
