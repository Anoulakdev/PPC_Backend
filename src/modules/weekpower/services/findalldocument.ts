/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function findAllDocument(
  prisma: PrismaService,
  user: AuthUser,
  powerId: number,
  sYear: string,
  sWeek: string,
) {
  const where: any = {
    AND: [
      { decAcknow: true },
      { disAcknow: true },
      ...(user.roleId === 5 || user.roleId === 6
        ? [{ powerId: { in: user.powers } }]
        : []),
      { sYear: sYear },
      ...(powerId ? [{ powerId: Number(powerId) }] : []),
      ...(sWeek ? [{ sWeek: `${String(sWeek).padStart(2, '0')}` }] : []),
    ],
  };

  const weekpowers = await prisma.weekPower.findMany({
    where,
    orderBy: {
      id: 'desc',
    },
    include: {
      createdByUser: {
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
        },
      },
      decAcknowUser: {
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
        },
      },
      disAcknowUser: {
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
        },
      },
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
      powerOriginal: {
        select: {
          totalPower: true,
        },
      },
      powerCurrent: {
        select: {
          totalPower: true,
        },
      },
    },
  });

  return weekpowers.map((weekpower) => ({
    ...weekpower,
    createdAt: moment(weekpower.createdAt).tz('Asia/Vientiane').format(),
    updatedAt: moment(weekpower.updatedAt).tz('Asia/Vientiane').format(),
  }));
}
