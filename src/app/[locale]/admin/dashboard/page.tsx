import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/admin/Dashboard';

export default async function AdminDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session')?.value;

  // إذا لم يكن هناك جلسة صالحة، قم بطرده فوراً
  if (session !== 'true') {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div className="min-h-screen bg-[#050505] p-6">
      <AdminDashboard />
    </div>
  );
}