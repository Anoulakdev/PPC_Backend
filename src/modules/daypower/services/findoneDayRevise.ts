import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneDayRevise(prisma: PrismaService, id: number) {
  const dayReviseDetail = await prisma.dayReviseDetail.findUnique({
    where: { id },
    include: {
      dayRevise: {
        include: {
          dayPower: {
            select: {
              power: {
                select: {
                  id: true,
                  fuelId: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!dayReviseDetail) {
    throw new NotFoundException('DayReviseDetail not found');
  }

  return dayReviseDetail;
}
