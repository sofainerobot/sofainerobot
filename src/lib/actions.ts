'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
const ADMIN_PASSWORD = "Sofaine_Admin_2026!";
async function checkAdmin() {
  if ((await cookies()).get('admin_session')?.value !== 'true') throw new Error('Unauthorized');
}
export async function adminLogin(formData: FormData) {
  const password = formData.get('password') as string;
  const locale = formData.get('locale') as string || 'en';
  if (password === ADMIN_PASSWORD) {
    (await cookies()).set('admin_session', 'true', { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 604800, path: '/' });
    redirect(`/${locale}/admin/dashboard`);
  }
  return { error: 'Wrong password' };
}
export async function adminLogout() { (await cookies()).delete('admin_session'); redirect('/en/admin/login'); }
export async function updateHeroSettings(data: any) { await checkAdmin(); const existing = await prisma.heroSettings.findFirst(); if (existing) await prisma.heroSettings.update({ where: { id: existing.id }, data }); else await prisma.heroSettings.create({ data }); revalidatePath('/[locale]', 'layout'); }
export async function upsertFaq(data: any) { await checkAdmin(); if (data.id) await prisma.fAQ.update({ where: { id: data.id }, data }); else await prisma.fAQ.create({ data }); revalidatePath('/[locale]', 'layout'); }
export async function deleteFaq(id: number) { await checkAdmin(); await prisma.fAQ.delete({ where: { id } }); revalidatePath('/[locale]', 'layout'); }
export async function upsertSocialLink(data: any) { await checkAdmin(); if (data.id) await prisma.socialLink.update({ where: { id: data.id }, data }); else await prisma.socialLink.create({ data }); revalidatePath('/[locale]', 'layout'); }
export async function deleteSocialLink(id: string) { await checkAdmin(); await prisma.socialLink.delete({ where: { id } }); revalidatePath('/[locale]', 'layout'); }
