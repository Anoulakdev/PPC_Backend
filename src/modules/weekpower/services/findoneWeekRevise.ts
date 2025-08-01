import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneWeekRevise(prisma: PrismaService, id: number) {
  const weekReviseDetail = await prisma.weekReviseDetail.findUnique({
    where: { id },
    include: {
      weekRevise: true,
    },
  });

  if (!weekReviseDetail) {
    throw new NotFoundException('weekReviseDetail not found');
  }

  return weekReviseDetail;
}
