/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import * as moment from 'moment-timezone';

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

  // สตริงแสดงผล
  const todayStr = now.format('DD/MM/YYYY');
  const yesterdayStr = now.clone().subtract(1, 'day').format('DD/MM/YYYY');
  const monthStr = now.format('MM/YYYY');

  // helper function aggregate sum totalPower
  const getSum = async (whereDayPower: any) => {
    const [original, current] = await Promise.all([
      prisma.dayOriginal.aggregate({
        where: {
          dayPower: { powerId: Number(powerId), ...whereDayPower },
        },
        _sum: { totalPower: true },
      }),
      prisma.dayCurrent.aggregate({
        where: {
          dayPower: { powerId: Number(powerId), ...whereDayPower },
        },
        _sum: { totalPower: true },
      }),
    ]);

    return {
      totalOriginal: original._sum.totalPower?.toNumber() || 0,
      totalCurrent: current._sum.totalPower?.toNumber() || 0,
    };
  };

  // ดึงข้อมูลแต่ละช่วงเวลา
  const yesterdayData = await getSum({
    powerDate: { gte: startYesterday, lte: endYesterday },
  });

  const todayData = await getSum({
    powerDate: { gte: startToday, lte: endToday },
  });

  const monthData = await getSum({
    powerDate: { gte: startMonth, lte: endMonth },
  });

  // คืนผลลัพธ์
  return {
    yesterday: { ...yesterdayData, yesterdayStr },
    today: { ...todayData, todayStr },
    month: { ...monthData, monthStr },
  };
}
