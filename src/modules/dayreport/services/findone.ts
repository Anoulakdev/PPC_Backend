import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';

export async function findOneDayReport(prisma: PrismaService, id: number) {
  const dayreport = await prisma.dayReport.findUnique({
    where: { id },
    include: {
      createdByUser: {
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
        },
      },
      power: true,
      powerOriginal: true,
    },
  });

  if (!dayreport) throw new NotFoundException('dayreport not found');

  return {
    ...dayreport,
    createdAt: moment(dayreport.createdAt).tz('Asia/Vientiane').format(),
    updatedAt: moment(dayreport.updatedAt).tz('Asia/Vientiane').format(),
  };
}
