/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import * as moment from 'moment-timezone';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function totalPowerAll(prisma: PrismaService, user: AuthUser) {
  const timezone = 'Asia/Vientiane';
  const now = moment.tz(timezone);

  // ช่วงเวลา
  const startToday = now.clone().startOf('day').toDate();
  const endToday = now.clone().endOf('day').toDate();

  const startYesterday = now.clone().subtract(1, 'day').startOf('day').toDate();
  const endYesterday = now.clone().subtract(1, 'day').endOf('day').toDate();

  const startMonth = now.clone().startOf('month').toDate();
  const endMonth = now.clone().endOf('month').toDate();

  const todayStr = now.format('DD/MM/YYYY');
  const yesterdayStr = now.clone().subtract(1, 'day').format('DD/MM/YYYY');
  const monthStr = now.format('MM/YYYY');

  const powerFilter =
    user.roleId === 5 || user.roleId === 6
      ? { powerId: { in: user.powers } }
      : {};

  // helper function ใช้ aggregate
  const getSum = async (whereDayPower: any) => {
    const [original, current] = await Promise.all([
      prisma.dayOriginal.aggregate({
        where: {
          dayPower: {
            ...powerFilter,
            ...whereDayPower,
          },
        },
        _sum: {
          totalPower: true,
        },
      }),
      prisma.dayCurrent.aggregate({
        where: {
          dayPower: {
            ...powerFilter,
            ...whereDayPower,
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

  // ดึงข้อมูลแต่ละช่วง
  const yesterdayData = await getSum({
    powerDate: { gte: startYesterday, lte: endYesterday },
    decAcknow: true,
    disAcknow: true,
  });
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

  return {
    yesterday: { ...yesterdayData, yesterdayStr },
    today: { ...todayData, todayStr },
    month: { ...monthData, monthStr },
  };
}
