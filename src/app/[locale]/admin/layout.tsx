import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session')?.value;

  // إذا لم تكن هناك جلسة صالحة، اطرد المستخدم إلى صفحة تسجيل الدخول
  if (session !== 'true') {
    redirect(`/${locale}/admin/login`);
  }

  return <>{children}</>;
}