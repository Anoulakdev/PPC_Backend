import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';

export async function findOneDayPower(prisma: PrismaService, id: number) {
  const daypower = await prisma.dayPower.findUnique({
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

  if (!daypower) throw new NotFoundException('daypower not found');

  const powerRevises = await prisma.dayRevise.findMany({
    where: { dayPowerId: id },
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
    ...daypower,
    createdAt: moment(daypower.createdAt).tz('Asia/Vientiane').format(),
    updatedAt: moment(daypower.updatedAt).tz('Asia/Vientiane').format(),
    powerRevises: powerRevises.map((revise) => ({
      ...revise,
      createdAt: moment(revise.createdAt).tz('Asia/Vientiane').format(),
      updatedAt: moment(revise.updatedAt).tz('Asia/Vientiane').format(),
    })),
  };
}
