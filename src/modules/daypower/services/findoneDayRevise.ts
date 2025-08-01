import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneDayRevise(prisma: PrismaService, id: number) {
  const dayReviseDetail = await prisma.dayReviseDetail.findUnique({
    where: { id },
    include: {
      dayRevise: true,
    },
  });

  if (!dayReviseDetail) {
    throw new NotFoundException('DayReviseDetail not found');
  }

  return dayReviseDetail;
}
