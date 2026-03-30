/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import * as moment from 'moment-timezone';

export async function totalPowerMonth(prisma: PrismaService, powerId: number) {
  const timezone = 'Asia/Vientiane';
  const now = moment.tz(timezone);

  const currentYear = now.format('YYYY');
  const currentMonth = now.format('MM');

  const lastMonthMoment = now.clone().subtract(1, 'month');
  const lastMonth = lastMonthMoment.format('MM');
  const lastMonthYear = lastMonthMoment.format('YYYY');

  // label
  const currentMonthStr = now.format('MM/YYYY');
  const lastMonthStr = lastMonthMoment.format('MM/YYYY');
  const yearStr = currentYear;

  // helper
  const getSum = async (whereMonthPower: any) => {
    const [original, current] = await Promise.all([
      prisma.monthOriginal.aggregate({
        where: {
          monthPower: {
            powerId: Number(powerId),
            ...whereMonthPower,
          },
        },
        _sum: {
          totalPower: true,
        },
      }),
      prisma.monthCurrent.aggregate({
        where: {
          monthPower: {
            powerId: Number(powerId),
            ...whereMonthPower,
          },
        },
        _sum: {
          totalPower: true,
        },
      }),
    ]);

    return {
      totalOriginal: original._sum.totalPower?.toNumber() || 0,
      totalCurrent: current._sum.totalPower?.toNumber() || 0,
    };
  };

  // ❗เรียกทีละอัน ลดโหลด DB
  const lastMonthData = await getSum({
    sYear: lastMonthYear,
    sMonth: lastMonth,
  });

  const currentMonthData = await getSum({
    sYear: currentYear,
    sMonth: currentMonth,
  });

  const yearData = await getSum({
    sYear: currentYear,
  });

  return {
    lastMonth: {
      ...lastMonthData,
      lastMonthStr,
    },
    currentMonth: {
      ...currentMonthData,
      currentMonthStr,
    },
    year: {
      ...yearData,
      yearStr,
    },
  };
}
