import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeDayPower(prisma: PrismaService, id: number) {
  const daypower = await prisma.dayPower.findUnique({
    where: { id },
  });

  if (!daypower) throw new NotFoundException('daypower not found');

  await prisma.$transaction(async (tx) => {
    // 👉 ดึง DayRevise ทั้งหมด
    const revises = await tx.dayRevise.findMany({
      where: { dayPowerId: id },
      select: { id: true },
    });

    const reviseIds = revises.map((r) => r.id);

    // 👉 ลบ DayReviseDetail ถ้ามี
    if (reviseIds.length > 0) {
      await tx.dayReviseDetail.deleteMany({
        where: { dayreviseId: { in: reviseIds } },
      });
    }

    // 👉 ลบ DayRevise
    await tx.dayRevise.deleteMany({
      where: { dayPowerId: id },
    });

    // 👉 ลบ DayCurrent
    await tx.dayCurrent.delete({
      where: { dayPowerId: id },
    });

    // 👉 ลบ DayOriginal
    await tx.dayOriginal.delete({
      where: { dayPowerId: id },
    });

    await tx.dayStart.delete({
      where: { dayPowerId: id },
    });

    // 👉 ลบ DayPower
    await tx.dayPower.delete({
      where: { id },
    });
  });

  return {
    statusCode: HttpStatus.OK,
    message: 'Deleted all data successfully',
  };
}
