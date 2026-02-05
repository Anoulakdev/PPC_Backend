import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeYearPower(prisma: PrismaService, id: number) {
  const yearpower = await prisma.yearPower.findUnique({
    where: { id },
  });

  if (!yearpower) throw new NotFoundException('yearpower not found');

  await prisma.$transaction(async (tx) => {
    // 👉 ดึง yearRevise ทั้งหมด
    const revises = await tx.yearRevise.findMany({
      where: { yearPowerId: id },
      select: { id: true },
    });

    const reviseIds = revises.map((r) => r.id);

    // 👉 ลบ yearReviseDetail ถ้ามี
    if (reviseIds.length > 0) {
      await tx.yearReviseDetail.deleteMany({
        where: { yearreviseId: { in: reviseIds } },
      });
    }

    // 👉 ลบ yearRevise
    await tx.yearRevise.deleteMany({
      where: { yearPowerId: id },
    });

    // 👉 ลบ yearCurrent
    await tx.yearCurrent.delete({
      where: { yearPowerId: id },
    });

    // 👉 ลบ yearOriginal
    await tx.yearOriginal.delete({
      where: { yearPowerId: id },
    });

    // 👉 ลบ yearStart
    await tx.yearStart.delete({
      where: { yearPowerId: id },
    });

    // 👉 ลบ yearPower
    await tx.yearPower.delete({
      where: { id },
    });
  });

  return {
    statusCode: HttpStatus.OK,
    message: 'Deleted all data successfully',
  };
}
