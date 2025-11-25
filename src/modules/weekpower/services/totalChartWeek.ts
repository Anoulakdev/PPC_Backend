/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

type TurbineData = { turbine: number; hourly: number[] };
type WeekPowerItem = {
  powerOriginal?: {
    originalTurbines?: unknown;
  } | null;
  powerCurrent?: {
    currentTurbines?: unknown;
  } | null;
  startDate: Date | string | null;
};

export async function totalChartWeek(
  prisma: PrismaService,
  user: AuthUser,
  powerId: number,
  sYear: string,
  sWeek: string,
) {
  const where: any = {
    AND: [
      { decAcknow: true },
      { disAcknow: true },
      ...(user.roleId === 5 || user.roleId === 6
        ? [{ powerId: { in: user.powers } }]
        : []),
      ...(powerId ? [{ powerId: Number(powerId) }] : []),
      { sYear: sYear },
      { sWeek: sWeek },
    ],
  };

  const weekpowers = await prisma.weekPower.findMany({
    where,
    include: {
      powerOriginal: {
        select: {
          totalPower: true,
          totalDate: true,
          originalTurbines: true,
        },
      },
      powerCurrent: {
        select: {
          totalPower: true,
          totalDate: true,
          currentTurbines: true,
        },
      },
    },
  });

  if (weekpowers.length === 0)
    return { dates: [], totalPowerOriginal: [], totalPowerCurrent: [] };

  // สร้าง dates
  const firstStart = weekpowers[0].startDate;
  if (!firstStart)
    return { dates: [], totalPowerOriginal: [], totalPowerCurrent: [] };

  const start = new Date(firstStart);
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dates.push(moment(d).format('DD/MM/YYYY'));
  }

  // ฟังก์ชันรวม turbine แยก Original / Current
  const turbineSum = (
    powers: WeekPowerItem[],
    key: 'powerOriginal' | 'powerCurrent',
  ) => {
    const totals = Array(7).fill(0);

    powers.forEach((wp) => {
      const turbinesRaw =
        key === 'powerOriginal'
          ? wp.powerOriginal?.originalTurbines
          : wp.powerCurrent?.currentTurbines;

      if (!Array.isArray(turbinesRaw)) return;

      // cast แต่ละ element เป็น TurbineData
      (turbinesRaw as TurbineData[]).forEach((t) => {
        if (!Array.isArray(t.hourly)) return;

        const sumHourly = t.hourly.reduce((a, b) => a + b, 0);
        totals[t.turbine - 1] += sumHourly;
      });
    });

    return totals;
  };

  const totalPowerOriginal = turbineSum(weekpowers, 'powerOriginal');
  const totalPowerCurrent = turbineSum(weekpowers, 'powerCurrent');

  return {
    dates,
    totalPowerOriginal,
    totalPowerCurrent,
  };
}
