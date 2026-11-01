import Link from "next/link";
import { adminLogin } from "@/lib/actions";
import { Logo } from "@/components/Logo";
import { Lock, Bot, ArrowRight } from "lucide-react";

interface AdminLoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

/**
 * Admin Login page (Server Component).
 *
 * Uses a Server Action (`adminLogin`) to verify the password and set the
 * session cookie. On failure the action redirects back here with ?error=invalid.
 */
export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;
  const error = params.error === "invalid";

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900">
      <div className="w-full max-w-md px-4">
        <div className="card p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <Logo size={34} variant="flat" />
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Admin Panel</h2>
              <p className="text-xs text-gray-500">Sofaine Robot</p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-900/20 border border-red-500/30 text-red-400 text-sm">
              Invalid password. Please try again.
            </div>
          )}

          <form action={adminLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Admin Password
              </label>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-gray-600 text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-cyan focus:border-transparent outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              Sign in <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-500">
            Demo credentials — check <code className="text-gray-400">.env</code>
            for the default ADMIN_PASSWORD.
          </p>
          <p className="text-center text-xs text-gray-600">
            <Link href="/" className="text-neon-cyan hover:text-neon-cyan/80 underline underline-offset-4">
              ← Back to site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
