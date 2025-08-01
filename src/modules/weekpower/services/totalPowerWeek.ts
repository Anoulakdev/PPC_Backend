import { PrismaService } from '../../../prisma/prisma.service';
import * as moment from 'moment-timezone';
import { Decimal } from '@prisma/client/runtime/library';

type PowerSumData = {
  powerOriginal?: { totalPower: Decimal | null } | null;
  powerCurrent?: { totalPower: Decimal | null } | null;
};

export async function totalPowerWeek(prisma: PrismaService, powerId: number) {
  const timezone = 'Asia/Vientiane';
  const now = moment.tz(timezone);

  const currentWeek = now.isoWeek();
  const currentWeekYear = now.isoWeekYear();

  const lastWeekMoment = now.clone().subtract(1, 'week');
  const lastWeek = lastWeekMoment.isoWeek();
  const lastWeekYear = lastWeekMoment.isoWeekYear();

  const yearStr = String(currentWeekYear);
  const currentWeekStr = currentWeek;
  const lastWeekStr = lastWeek;

  const [lastWeekData, currentWeekData, yearData] = await Promise.all([
    prisma.weekPower.findMany({
      where: {
        powerId: Number(powerId),
        sYear: String(lastWeekYear),
        sWeek: String(lastWeek).padStart(2, '0'),
      },
      select: {
        powerOriginal: { select: { totalPower: true } },
        powerCurrent: { select: { totalPower: true } },
      },
    }),
    prisma.weekPower.findMany({
      where: {
        powerId: Number(powerId),
        sYear: String(currentWeekYear),
        sWeek: String(currentWeek).padStart(2, '0'),
      },
      select: {
        powerOriginal: { select: { totalPower: true } },
        powerCurrent: { select: { totalPower: true } },
      },
    }),
    prisma.weekPower.findMany({
      where: {
        powerId: Number(powerId),
        sYear: String(currentWeekYear),
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
    lastWeek: {
      ...sumTotalPower(lastWeekData),
      lastWeekStr: lastWeekStr,
    },
    currentWeek: {
      ...sumTotalPower(currentWeekData),
      currentWeekStr: currentWeekStr,
    },
    year: {
      ...sumTotalPower(yearData),
      yearStr: yearStr,
    },
  };
}
