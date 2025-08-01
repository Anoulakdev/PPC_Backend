import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeWeekPower(prisma: PrismaService, id: number) {
  const weekpower = await prisma.weekPower.findUnique({
    where: { id },
  });

  if (!weekpower) throw new NotFoundException('weekpower not found');

  await prisma.$transaction(async (tx) => {
    // 👉 ดึง weekRevise ทั้งหมด
    const revises = await tx.weekRevise.findMany({
      where: { weekPowerId: id },
      select: { id: true },
    });

    const reviseIds = revises.map((r) => r.id);

    // 👉 ลบ weekReviseDetail ถ้ามี
    if (reviseIds.length > 0) {
      await tx.weekReviseDetail.deleteMany({
        where: { weekreviseId: { in: reviseIds } },
      });
    }

    // 👉 ลบ weekRevise
    await tx.weekRevise.deleteMany({
      where: { weekPowerId: id },
    });

    // 👉 ลบ weekCurrent
    await tx.weekCurrent.delete({
      where: { weekPowerId: id },
    });

    // 👉 ลบ weekOriginal
    await tx.weekOriginal.delete({
      where: { weekPowerId: id },
    });

    // 👉 ลบ weekPower
    await tx.weekPower.delete({
      where: { id },
    });
  });

  return {
    statusCode: HttpStatus.OK,
    message: 'Deleted all data successfully',
  };
}
