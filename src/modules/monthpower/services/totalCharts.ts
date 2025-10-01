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

  const monthpowers = await prisma.monthPower.findMany({
    where,
    orderBy: { sMonth: 'asc' },
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
  const rawData = monthpowers.map((d) => ({
    month: d.sMonth,
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
        if (!acc[cur.month]) {
          acc[cur.month] = { ...cur };
        } else {
          acc[cur.month].original += cur.original;
          acc[cur.month].current += cur.current;
        }
        return acc;
      },
      {} as Record<
        string,
        { month: string; original: number; current: number }
      >,
    ),
  );

  // ✅ sort ตาม month (เลขเดือน)
  const sorted = grouped.sort((a, b) => Number(a.month) - Number(b.month));

  return sorted;
}
