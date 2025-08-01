import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';

export async function findOneWeekPower(prisma: PrismaService, id: number) {
  const weekpower = await prisma.weekPower.findUnique({
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

  if (!weekpower) throw new NotFoundException('weekpower not found');

  const powerRevises = await prisma.weekRevise.findMany({
    where: { weekPowerId: id },
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
    ...weekpower,
    createdAt: moment(weekpower.createdAt).tz('Asia/Vientiane').format(),
    updatedAt: moment(weekpower.updatedAt).tz('Asia/Vientiane').format(),
    powerRevises: powerRevises.map((revise) => ({
      ...revise,
      createdAt: moment(revise.createdAt).tz('Asia/Vientiane').format(),
      updatedAt: moment(revise.updatedAt).tz('Asia/Vientiane').format(),
    })),
  };
}
