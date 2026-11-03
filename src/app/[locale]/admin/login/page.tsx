import { adminLogin } from "@/lib/actions";
import { Lock, ArrowRight } from "lucide-react";
export const dynamic = 'force-dynamic';
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Admin Login</h1>
        <form action={adminLogin} className="space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <input type="password" name="password" required className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white" placeholder="Password" />
          <button type="submit" className="w-full bg-cyan-500 text-black font-bold py-3 rounded-xl flex justify-center items-center gap-2">Sign in <ArrowRight className="w-4 h-4" /></button>
        </form>
      </div>
    </div>
  );
}
