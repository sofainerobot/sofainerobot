import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/admin/Dashboard';
export const dynamic = 'force-dynamic';
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const cookieStore = await cookies();
  if (cookieStore.get('admin_session')?.value !== 'true') {
    redirect(`/${locale}/admin/login`);
  }
  return <div className="min-h-screen bg-[#050505] p-6"><AdminDashboard /></div>;
}
