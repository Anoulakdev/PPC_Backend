/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function findAllMonthPower(
  prisma: PrismaService,
  user: AuthUser,
  powerId: number,
  sYear: string,
  sMonth: string,
) {
  const where: any = {
    AND: [
      // {
      //   NOT: {
      //     AND: [{ decAcknow: true }, { disAcknow: true }],
      //   },
      // },
      ...(user.roleId === 5 || user.roleId === 6
        ? [{ powerId: { in: user.powers } }]
        : []),
      ...(powerId ? [{ powerId: Number(powerId) }] : []),
      { sYear: sYear },
      ...(sMonth ? [{ sMonth: `${String(sMonth).padStart(2, '0')}` }] : []),
    ],
  };

  const monthpowers = await prisma.monthPower.findMany({
    where,
    orderBy: {
      sMonth: 'desc',
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

  return monthpowers.map((monthpower) => {
    return {
      ...monthpower,
      createdAt: moment(monthpower.createdAt).tz('Asia/Vientiane').format(),
      updatedAt: moment(monthpower.updatedAt).tz('Asia/Vientiane').format(),
    };
  });
}
