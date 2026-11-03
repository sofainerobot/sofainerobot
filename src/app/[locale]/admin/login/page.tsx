"use client";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/actions";
import { Lock, ArrowRight } from "lucide-react";

export default function LoginPage({ params }: { params: { locale: string } }) {
  const router = useRouter();
  const [state, formAction] = useFormState(adminLogin, null);

  useEffect(() => {
    if (state?.success) {
      router.push(`/${state.locale}/admin/dashboard`);
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Admin Panel</h1>
        {state?.error && <p className="text-red-500 text-center mb-4">{state.error}</p>}
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="locale" value={params.locale} />
          <input type="password" name="password" required className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500" placeholder="Admin Password" />
          <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl flex justify-center items-center gap-2 transition-all">
            Sign in <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
