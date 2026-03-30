/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import * as moment from 'moment-timezone';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function totalPowerAll(prisma: PrismaService, user: AuthUser) {
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

  const powerFilter =
    user.roleId === 5 || user.roleId === 6
      ? { powerId: { in: user.powers } }
      : {};

  // helper
  const getSum = async (whereMonthPower: any) => {
    const [original, current] = await Promise.all([
      prisma.monthOriginal.aggregate({
        where: {
          monthPower: {
            ...powerFilter,
            decAcknow: true,
            disAcknow: true,
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
            ...powerFilter,
            decAcknow: true,
            disAcknow: true,
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

  // ❗ ไม่ใช้ Promise.all ยิงหนักพร้อมกัน (ลด DB load)
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
