import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneMonthRevise(prisma: PrismaService, id: number) {
  const monthReviseDetail = await prisma.monthReviseDetail.findUnique({
    where: { id },
    include: {
      monthRevise: {
        include: {
          monthPower: {
            select: {
              id: true,
              sYear: true,
              sMonth: true,
            },
          },
        },
      },
    },
  });

  if (!monthReviseDetail) {
    throw new NotFoundException('monthReviseDetail not found');
  }

  return monthReviseDetail;
}
