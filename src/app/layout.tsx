import { Orbitron } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({ subsets: ['latin'], weight: '700', variable: '--font-orbitron' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${orbitron.variable} bg-[#050505] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
