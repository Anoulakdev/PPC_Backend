/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import * as moment from 'moment-timezone';
import { AuthUser } from '../../../interfaces/auth-user.interface';
export async function totalPowerAll(prisma: PrismaService, user: AuthUser) {
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

  // filter ตาม role
  const powerFilter =
    user.roleId === 5 || user.roleId === 6
      ? { powerId: { in: user.powers } }
      : {};

  // helper aggregate
  const getSum = async (whereWeekPower: any) => {
    const [original, current] = await Promise.all([
      prisma.weekOriginal.aggregate({
        where: {
          weekPower: {
            ...powerFilter,
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
            ...powerFilter,
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
    decAcknow: true,
    disAcknow: true,
  });

  const currentWeekData = await getSum({
    sYear: String(currentWeekYear),
    sWeek: String(currentWeek).padStart(2, '0'),
    decAcknow: true,
    disAcknow: true,
  });

  const yearData = await getSum({
    sYear: String(currentWeekYear),
    decAcknow: true,
    disAcknow: true,
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
