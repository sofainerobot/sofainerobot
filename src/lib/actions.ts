'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

async function checkAdmin() {
  if ((await cookies()).get('admin_session')?.value !== 'true') throw new Error('Unauthorized');
}

export async function updateHeroSettings(data: any) { await checkAdmin(); const existing = await prisma.heroSettings.findFirst(); if (existing) await prisma.heroSettings.update({ where: { id: existing.id }, data }); else await prisma.heroSettings.create({ data }); revalidatePath('/[locale]', 'layout'); }
export async function upsertFaq(data: any) { await checkAdmin(); if (data.id) await prisma.fAQ.update({ where: { id: data.id }, data }); else await prisma.fAQ.create({ data }); revalidatePath('/[locale]', 'layout'); }
export async function deleteFaq(id: number) { await checkAdmin(); await prisma.fAQ.delete({ where: { id } }); revalidatePath('/[locale]', 'layout'); }
export async function upsertSocialLink(data: any) { await checkAdmin(); if (data.id) await prisma.socialLink.update({ where: { id: data.id }, data }); else await prisma.socialLink.create({ data }); revalidatePath('/[locale]', 'layout'); }
export async function deleteSocialLink(id: string) { await checkAdmin(); await prisma.socialLink.delete({ where: { id } }); revalidatePath('/[locale]', 'layout'); }
