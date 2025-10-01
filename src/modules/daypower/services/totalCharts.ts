/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';
import { Decimal } from '@prisma/client/runtime/library';

export async function totalCharts(
  prisma: PrismaService,
  user: AuthUser,
  powerId: number,
  startDate: string,
  endDate: string,
) {
  const where: any = {
    AND: [
      { decAcknow: true },
      { disAcknow: true },
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

  const daypowers = await prisma.dayPower.findMany({
    where,
    orderBy: { powerDate: 'asc' },
    include: {
      powerOriginal: {
        select: { totalPower: true },
      },
      powerCurrent: {
        select: { totalPower: true },
      },
    },
  });

  // map ให้เป็น number ทันที
  const rawData = daypowers.map((d) => ({
    date: moment(d.powerDate).format('DD/MM/YYYY'),
    original:
      d.powerOriginal?.totalPower instanceof Decimal
        ? d.powerOriginal.totalPower.toNumber()
        : (d.powerOriginal?.totalPower ?? 0),
    current:
      d.powerCurrent?.totalPower instanceof Decimal
        ? d.powerCurrent.totalPower.toNumber()
        : (d.powerCurrent?.totalPower ?? 0),
  }));

  // group by date
  const grouped = Object.values(
    rawData.reduce(
      (acc, cur) => {
        if (!acc[cur.date]) {
          acc[cur.date] = { ...cur };
        } else {
          acc[cur.date].original += cur.original;
          acc[cur.date].current += cur.current;
        }
        return acc;
      },
      {} as Record<string, { date: string; original: number; current: number }>,
    ),
  );

  return grouped;
}
