import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';

export async function findOneMaintenance(prisma: PrismaService, id: number) {
  const maintenance = await prisma.maintenancePlan.findUnique({
    where: { id },
    include: {
      power: {
        select: {
          id: true,
          name: true,
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      createdByUser: {
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
        },
      },
    },
  });
  if (!maintenance) throw new NotFoundException('maintenance not found');
  return {
    ...maintenance,
    startDate: moment(maintenance.startDate)
      .tz('Asia/Vientiane')
      .format('YYYY-MM-DD'),
    endDate: moment(maintenance.endDate)
      .tz('Asia/Vientiane')
      .format('YYYY-MM-DD'),
  };
}
