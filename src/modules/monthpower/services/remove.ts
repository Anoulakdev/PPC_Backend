import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeMonthPower(prisma: PrismaService, id: number) {
  const monthpower = await prisma.monthPower.findUnique({
    where: { id },
  });

  if (!monthpower) throw new NotFoundException('monthpower not found');

  await prisma.$transaction(async (tx) => {
    // 👉 ดึง monthRevise ทั้งหมด
    const revises = await tx.monthRevise.findMany({
      where: { monthPowerId: id },
      select: { id: true },
    });

    const reviseIds = revises.map((r) => r.id);

    // 👉 ลบ monthReviseDetail ถ้ามี
    if (reviseIds.length > 0) {
      await tx.monthReviseDetail.deleteMany({
        where: { monthreviseId: { in: reviseIds } },
      });
    }

    // 👉 ลบ monthRevise
    await tx.monthRevise.deleteMany({
      where: { monthPowerId: id },
    });

    // 👉 ลบ monthCurrent
    await tx.monthCurrent.delete({
      where: { monthPowerId: id },
    });

    // 👉 ลบ monthOriginal
    await tx.monthOriginal.delete({
      where: { monthPowerId: id },
    });

    // 👉 ลบ monthStart
    await tx.monthStart.delete({
      where: { monthPowerId: id },
    });

    // 👉 ลบ monthPower
    await tx.monthPower.delete({
      where: { id },
    });
  });

  return {
    statusCode: HttpStatus.OK,
    message: 'Deleted all data successfully',
  };
}
