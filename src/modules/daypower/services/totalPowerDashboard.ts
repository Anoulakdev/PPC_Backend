/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import * as moment from 'moment-timezone';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function totalPowerDashboard(
  prisma: PrismaService,
  user: AuthUser,
) {
  const timezone = 'Asia/Vientiane';
  const now = moment.tz(timezone);

  // ช่วงเวลา
  const startToday = now.clone().startOf('day').toDate();
  const endToday = now.clone().endOf('day').toDate();

  const startMonth = now.clone().startOf('month').toDate();
  const endMonth = now.clone().endOf('month').toDate();

  const startYear = now.clone().startOf('year').toDate();
  const endYear = now.clone().endOf('year').toDate();

  // สตริงแสดงผล
  const todayStr = now.format('DD/MM/YYYY');
  const monthStr = now.format('MM/YYYY');
  const yearStr = now.format('YYYY');

  // filter ตาม role
  const powerFilter =
    user.roleId === 5 || user.roleId === 6
      ? { powerId: { in: user.powers } }
      : {};

  // helper function aggregate sum totalPower
  const getSum = async (whereDayPower: any) => {
    const [original, current] = await Promise.all([
      prisma.dayOriginal.aggregate({
        where: { dayPower: { ...powerFilter, ...whereDayPower } },
        _sum: { totalPower: true },
      }),
      prisma.dayCurrent.aggregate({
        where: { dayPower: { ...powerFilter, ...whereDayPower } },
        _sum: { totalPower: true },
      }),
    ]);

    return {
      totalOriginal: original._sum.totalPower?.toNumber() || 0,
      totalCurrent: current._sum.totalPower?.toNumber() || 0,
    };
  };

  // ดึงข้อมูลแต่ละช่วงเวลา
  const todayData = await getSum({
    powerDate: { gte: startToday, lte: endToday },
    decAcknow: true,
    disAcknow: true,
  });

  const monthData = await getSum({
    powerDate: { gte: startMonth, lte: endMonth },
    decAcknow: true,
    disAcknow: true,
  });

  const yearData = await getSum({
    powerDate: { gte: startYear, lte: endYear },
    decAcknow: true,
    disAcknow: true,
  });

  // คืนผลลัพธ์
  return {
    today: { ...todayData, todayStr },
    month: { ...monthData, monthStr },
    year: { ...yearData, yearStr },
  };
}
