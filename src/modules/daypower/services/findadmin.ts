/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function findAdminDayPower(
  prisma: PrismaService,
  user: AuthUser,
  powerId: number,
  powerDate: string,
) {
  const where: any = {
    AND: [
      ...(powerId ? [{ powerId: Number(powerId) }] : []),
      { powerDate: new Date(powerDate) },
    ],
  };

  const daypowers = await prisma.dayPower.findMany({
    where,
    orderBy: [{ powerDate: 'desc' }, { createdAt: 'desc' }],
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

  return daypowers.map((daypower) => {
    return {
      ...daypower,
      createdAt: moment(daypower.createdAt).tz('Asia/Vientiane').format(),
      updatedAt: moment(daypower.updatedAt).tz('Asia/Vientiane').format(),
    };
  });
}
