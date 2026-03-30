/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import * as moment from 'moment-timezone';

export async function totalPowerWeek(prisma: PrismaService, powerId: number) {
  const timezone = 'Asia/Vientiane';
  const now = moment.tz(timezone);

  const currentWeek = now.isoWeek();
  const currentWeekYear = now.isoWeekYear();

  const lastWeekMoment = now.clone().subtract(1, 'week');
  const lastWeek = lastWeekMoment.isoWeek();
  const lastWeekYear = lastWeekMoment.isoWeekYear();

  // labels
  const yearStr = String(currentWeekYear);
  const currentWeekStr = currentWeek;
  const lastWeekStr = lastWeek;

  // helper function ใช้ aggregate
  const getSum = async (whereWeekPower: any) => {
    const [original, current] = await Promise.all([
      prisma.weekOriginal.aggregate({
        where: {
          weekPower: {
            powerId: Number(powerId),
            ...whereWeekPower,
          },
        },
        _sum: {
          totalPower: true,
        },
      }),
      prisma.weekCurrent.aggregate({
        where: {
          weekPower: {
            powerId: Number(powerId),
            ...whereWeekPower,
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

  // ดึงข้อมูลทีละช่วง
  const lastWeekData = await getSum({
    sYear: String(lastWeekYear),
    sWeek: String(lastWeek).padStart(2, '0'),
  });

  const currentWeekData = await getSum({
    sYear: String(currentWeekYear),
    sWeek: String(currentWeek).padStart(2, '0'),
  });

  const yearData = await getSum({
    sYear: String(currentWeekYear),
  });

  return {
    lastWeek: {
      ...lastWeekData,
      lastWeekStr,
    },
    currentWeek: {
      ...currentWeekData,
      currentWeekStr,
    },
    year: {
      ...yearData,
      yearStr,
    },
  };
}
