/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function findAllDayReport(
  prisma: PrismaService,
  user: AuthUser,
  powerId: number,
  startDate: string,
  endDate: string,
) {
  const where: any = {
    AND: [
      ...(user.roleId === 5 || user.roleId === 6
        ? [{ powerId: { in: user.powers } }]
        : []),
      ...(powerId ? [{ powerId: Number(powerId) }] : []),
      ...(startDate && endDate
        ? [
            {
              powerDate: {
                gte: new Date(`${startDate}T00:00:00+07:00`),
                lte: new Date(`${endDate}T23:59:59+07:00`),
              },
            },
          ]
        : []),
    ],
  };

  const daypowers = await prisma.dayReport.findMany({
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
      powerOriginal: true,
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
