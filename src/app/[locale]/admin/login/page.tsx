import { Lock, ArrowRight } from "lucide-react";

export default async function Page({ params, searchParams }: { params: Promise<{ locale: string }>, searchParams: Promise<{ error?: string }> }) {
  const { locale } = await params;
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        </div>

        {error && <p className="text-red-500 text-center mb-4 text-sm">كلمة المرور غير صحيحة</p>}

        <form action="/api/login" method="POST" className="space-y-6">
          <input type="hidden" name="locale" value={locale} />
          <div>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Admin Password"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-4 rounded-xl transition-all"
          >
            Sign in <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
