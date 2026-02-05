import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';

export async function findOneYearPower(prisma: PrismaService, id: number) {
  const yearpower = await prisma.yearPower.findUnique({
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

  if (!yearpower) throw new NotFoundException('yearpower not found');

  const powerRevises = await prisma.yearRevise.findMany({
    where: { yearPowerId: id },
    include: {
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
    ...yearpower,
    createdAt: moment(yearpower.createdAt).tz('Asia/Vientiane').format(),
    updatedAt: moment(yearpower.updatedAt).tz('Asia/Vientiane').format(),
    powerRevises: powerRevises.map((revise) => ({
      ...revise,
      createdAt: moment(revise.createdAt).tz('Asia/Vientiane').format(),
      updatedAt: moment(revise.updatedAt).tz('Asia/Vientiane').format(),
    })),
  };
}
