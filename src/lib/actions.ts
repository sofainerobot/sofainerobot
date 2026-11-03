'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

// أبقينا فقط دوال الموقع العام في حال كنت تحتاجها مستقبلاً
export async function updateHeroSettings(data: any) {
  const existing = await prisma.heroSettings.findFirst();
  if (existing) await prisma.heroSettings.update({ where: { id: existing.id }, data });
  else await prisma.heroSettings.create({ data });
  revalidatePath('/');
}

export async function upsertFaq(data: any) {
  if (data.id) await prisma.fAQ.update({ where: { id: data.id }, data });
  else await prisma.fAQ.create({ data });
  revalidatePath('/');
}

export async function deleteFaq(id: number) {
  await prisma.fAQ.delete({ where: { id } });
  revalidatePath('/');
}

export async function upsertSocialLink(data: any) {
  if (data.id) await prisma.socialLink.update({ where: { id: data.id }, data });
  else await prisma.socialLink.create({ data });
  revalidatePath('/');
}

export async function deleteSocialLink(id: string) {
  await prisma.socialLink.delete({ where: { id } });
  revalidatePath('/');
}
