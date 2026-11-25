import { Orbitron } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';

const orbitron = Orbitron({ subsets: ['latin'], weight: '700', variable: '--font-orbitron' });

/**
 * Root Layout.
 *
 * Calling `await headers()` forces DYNAMIC rendering for every request. This
 * is REQUIRED for the CSP nonce to work: the middleware sets `x-nonce` on the
 * request, and we read it here so Next.js can apply the per-request nonce to
 * the scripts it injects (runtime / HMR) and to any inline scripts we render.
 *
 * Because the layout is dynamic, the response is not statically optimized,
 * which is the intended trade-off for per-request nonce-based CSP.
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const nonce = headersList.get('x-nonce') ?? undefined;

  return (
    <html lang="en" className="dark">
      <body className={`${orbitron.variable} bg-[#050505] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
