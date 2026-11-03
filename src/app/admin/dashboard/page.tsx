import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/admin/Dashboard';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  if (cookieStore.get('admin_session')?.value !== 'true') {
    redirect('/admin/login');
  }
  return <div className="min-h-screen bg-[#050505] p-6"><AdminDashboard /></div>;
}
