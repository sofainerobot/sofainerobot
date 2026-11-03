import { adminLogin } from "@/lib/actions";
import { Lock, ArrowRight } from "lucide-react";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Admin Panel</h1>
        <form action={adminLogin} className="space-y-6">
          <input type="hidden" name="locale" value={locale} />
          <input type="password" name="password" required className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white" placeholder="Admin Password" />
          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-4 rounded-xl">
            Sign in <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
