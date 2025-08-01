import { PrismaService } from '../../../prisma/prisma.service';
import * as moment from 'moment-timezone';
import { Decimal } from '@prisma/client/runtime/library'; // สำคัญ!

type PowerSumData = {
  powerOriginal?: { totalPower: Decimal | null } | null;
  powerCurrent?: { totalPower: Decimal | null } | null;
};

export async function totalPowerDay(prisma: PrismaService, powerId: number) {
  const timezone = 'Asia/Vientiane';
  const now = moment.tz(timezone);

  // ช่วงเวลา
  const startToday = now.clone().startOf('day').toDate();
  const endToday = now.clone().endOf('day').toDate();

  const startYesterday = now.clone().subtract(1, 'day').startOf('day').toDate();
  const endYesterday = now.clone().subtract(1, 'day').endOf('day').toDate();

  const startMonth = now.clone().startOf('month').toDate();
  const endMonth = now.clone().endOf('month').toDate();

  const sToday = moment(startToday).tz(timezone).format('YYYY-MM-DD');
  const eToday = moment(endToday).tz(timezone).format('YYYY-MM-DD');

  const sYesterday = moment(startYesterday).tz(timezone).format('YYYY-MM-DD');
  const eYesterday = moment(endYesterday).tz(timezone).format('YYYY-MM-DD');

  const sMonth = moment(startMonth).tz(timezone).format('YYYY-MM-DD');
  const eMonth = moment(endMonth).tz(timezone).format('YYYY-MM-DD');

  const todayStr = moment().format('DD/MM/YYYY');
  const yesterdayStr = moment().subtract(1, 'day').format('DD/MM/YYYY');
  const monthStr = moment().format('MM/YYYY');

  // ดึงข้อมูลทั้ง 3 ช่วง
  const [todayData, yesterdayData, monthData] = await Promise.all([
    prisma.dayPower.findMany({
      where: {
        powerId: Number(powerId),
        powerDate: {
          gte: new Date(sToday),
          lte: new Date(eToday),
        },
      },
      select: {
        powerOriginal: {
          select: { totalPower: true },
        },
        powerCurrent: {
          select: { totalPower: true },
        },
      },
    }),
    prisma.dayPower.findMany({
      where: {
        powerId: Number(powerId),
        powerDate: {
          gte: new Date(sYesterday),
          lte: new Date(eYesterday),
        },
      },
      select: {
        powerOriginal: {
          select: { totalPower: true },
        },
        powerCurrent: {
          select: { totalPower: true },
        },
      },
    }),
    prisma.dayPower.findMany({
      where: {
        powerId: Number(powerId),
        powerDate: {
          gte: new Date(sMonth),
          lte: new Date(eMonth),
        },
      },
      select: {
        powerOriginal: {
          select: { totalPower: true },
        },
        powerCurrent: {
          select: { totalPower: true },
        },
      },
    }),
  ]);

  // รวมยอดแต่ละช่วงเวลา
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
    yesterday: {
      ...sumTotalPower(yesterdayData),
      yesterdayStr: yesterdayStr,
    },
    today: {
      ...sumTotalPower(todayData),
      todayStr: todayStr,
    },
    month: {
      ...sumTotalPower(monthData),
      monthStr: monthStr,
    },
  };
}
