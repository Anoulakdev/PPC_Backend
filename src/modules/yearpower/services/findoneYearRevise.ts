import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneYearRevise(prisma: PrismaService, id: number) {
  const yearReviseDetail = await prisma.yearReviseDetail.findUnique({
    where: { id },
    include: {
      yearRevise: {
        include: {
          yearPower: {
            select: {
              id: true,
              sYear: true,
            },
          },
        },
      },
    },
  });

  if (!yearReviseDetail) {
    throw new NotFoundException('yearReviseDetail not found');
  }

  return yearReviseDetail;
}
