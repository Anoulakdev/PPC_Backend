/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function findAllDAM(
  prisma: PrismaService,
  user: AuthUser,
  powerId?: number,
) {
  const where: any = {
    AND: [
      { partAdd: 2 },
      ...(user.roleId === 5 || user.roleId === 6
        ? [{ powerId: { in: user.powers } }]
        : []),
      ...(powerId ? [{ powerId: Number(powerId) }] : []),
    ],
  };

  const events = await prisma.eventReport.findMany({
    where,
    orderBy: { createdAt: 'desc' },
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

  return events.map((event) => {
    return {
      ...event,
      createdAt: moment(event.createdAt).tz('Asia/Vientiane').format(),
      updatedAt: moment(event.updatedAt).tz('Asia/Vientiane').format(),
    };
  });
}
