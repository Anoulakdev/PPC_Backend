import { PrismaService } from '../../../prisma/prisma.service';
import * as moment from 'moment-timezone';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { Decimal } from '@prisma/client/runtime/library';

type PowerSumData = {
  powerOriginal?: { totalPower: Decimal | null } | null;
  powerCurrent?: { totalPower: Decimal | null } | null;
};

export async function totalPowerAll(prisma: PrismaService, user: AuthUser) {
  const timezone = 'Asia/Vientiane';
  const now = moment.tz(timezone);

  const currentYear = now.format('YYYY');
  const currentMonth = now.format('MM');

  const lastMonthMoment = now.clone().subtract(1, 'month');
  const lastMonth = lastMonthMoment.format('MM');
  const lastMonthYear = lastMonthMoment.format('YYYY');

  // label สำหรับแสดง
  const currentMonthStr = now.format('MM/YYYY');
  const lastMonthStr = lastMonthMoment.format('MM/YYYY');
  const yearStr = currentYear;

  const powerFilter =
    user.roleId === 5 || user.roleId === 6
      ? { powerId: { in: user.powers } }
      : {};

  // ดึงข้อมูลทั้ง 3 ช่วง
  const [lastMonthData, currentMonthData, yearData] = await Promise.all([
    prisma.monthPower.findMany({
      where: {
        ...powerFilter,
        decAcknow: true,
        disAcknow: true,
        sYear: lastMonthYear,
        sMonth: lastMonth,
      },
      select: {
        powerOriginal: { select: { totalPower: true } },
        powerCurrent: { select: { totalPower: true } },
      },
    }),
    prisma.monthPower.findMany({
      where: {
        ...powerFilter,
        decAcknow: true,
        disAcknow: true,
        sYear: currentYear,
        sMonth: currentMonth,
      },
      select: {
        powerOriginal: { select: { totalPower: true } },
        powerCurrent: { select: { totalPower: true } },
      },
    }),
    prisma.monthPower.findMany({
      where: {
        ...powerFilter,
        decAcknow: true,
        disAcknow: true,
        sYear: currentYear,
      },
      select: {
        powerOriginal: { select: { totalPower: true } },
        powerCurrent: { select: { totalPower: true } },
      },
    }),
  ]);

  const sumTotalPower = (data: PowerSumData[]) => {
    let totalOriginal = new Decimal(0);
    let totalCurrent = new Decimal(0);

    for (const item of data) {
      if (item.powerOriginal?.totalPower) {
        totalOriginal = totalOriginal.plus(item.powerOriginal.totalPower);
      }
      if (item.powerCurrent?.totalPower) {
        totalCurrent = totalCurrent.plus(item.powerCurrent.totalPower);
      }
    }

    return {
      totalOriginal: totalOriginal.toNumber(),
      totalCurrent: totalCurrent.toNumber(),
    };
  };

  return {
    lastMonth: {
      ...sumTotalPower(lastMonthData),
      lastMonthStr: lastMonthStr,
    },
    currentMonth: {
      ...sumTotalPower(currentMonthData),
      currentMonthStr: currentMonthStr,
    },
    year: {
      ...sumTotalPower(yearData),
      yearStr: yearStr,
    },
  };
}
