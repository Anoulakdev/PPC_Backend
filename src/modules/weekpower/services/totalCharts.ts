/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { Decimal } from '@prisma/client/runtime/library';

export async function totalCharts(
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
      ...(powerId ? [{ powerId: Number(powerId) }] : []),
      { sYear: sYear },
    ],
  };

  const weekpowers = await prisma.weekPower.findMany({
    where,
    orderBy: { sWeek: 'asc' },
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
  const rawData = weekpowers.map((d) => ({
    week: d.sWeek,
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
        if (!acc[cur.week]) {
          acc[cur.week] = { ...cur };
        } else {
          acc[cur.week].original += cur.original;
          acc[cur.week].current += cur.current;
        }
        return acc;
      },
      {} as Record<string, { week: string; original: number; current: number }>,
    ),
  );

  return grouped;
}
