import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';

export async function findOneMonthPower(prisma: PrismaService, id: number) {
  const monthpower = await prisma.monthPower.findUnique({
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
      powerCurrent: true,
    },
  });

  if (!monthpower) throw new NotFoundException('monthpower not found');

  const powerRevises = await prisma.monthRevise.findMany({
    where: { monthPowerId: id },
    include: {
      reviseDetail: {
        select: {
          totalPower: true,
        },
      },
      reviseUser: {
        select: {
          firstname: true,
          lastname: true,
          company: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return {
    ...monthpower,
    createdAt: moment(monthpower.createdAt).tz('Asia/Vientiane').format(),
    updatedAt: moment(monthpower.updatedAt).tz('Asia/Vientiane').format(),
    powerRevises: powerRevises.map((revise) => ({
      ...revise,
      createdAt: moment(revise.createdAt).tz('Asia/Vientiane').format(),
      updatedAt: moment(revise.updatedAt).tz('Asia/Vientiane').format(),
    })),
  };
}
