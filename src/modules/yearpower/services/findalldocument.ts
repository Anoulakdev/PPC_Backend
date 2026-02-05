/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function findAllDocument(
  prisma: PrismaService,
  user: AuthUser,
  powerId: number,
  sYear: string,
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
    ],
  };

  const yearpowers = await prisma.yearPower.findMany({
    where,
    orderBy: { sYear: 'desc' },
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
    },
  });

  return yearpowers.map((yearpower) => ({
    ...yearpower,
    createdAt: moment(yearpower.createdAt).tz('Asia/Vientiane').format(),
    updatedAt: moment(yearpower.updatedAt).tz('Asia/Vientiane').format(),
  }));
}
