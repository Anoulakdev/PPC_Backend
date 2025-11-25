/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

type TurbineData = {
  hourly: number[];
  turbine: number;
};

export async function totalChartDate(
  prisma: PrismaService,
  user: AuthUser,
  powerId: number,
  powerDate: string,
) {
  const where: any = {
    AND: [
      { decAcknow: true },
      { disAcknow: true },
      { powerDate: new Date(powerDate) },
      ...(user.roleId === 5 || user.roleId === 6
        ? [{ powerId: { in: user.powers } }]
        : []),
      ...(powerId ? [{ powerId: Number(powerId) }] : []),
    ],
  };

  const daypowers = await prisma.dayPower.findMany({
    where,
    select: {
      powerId: true,
      powerOriginal: {
        select: {
          originalTurbines: true,
        },
      },
      powerCurrent: {
        select: {
          currentTurbines: true,
        },
      },
    },
  });

  // เตรียม array สำหรับรวม hourly รวม
  const originalHourlySum = Array(24).fill(0);
  const currentHourlySum = Array(24).fill(0);

  for (const dp of daypowers) {
    const originalTurbines = dp.powerOriginal?.originalTurbines as
      | TurbineData[]
      | undefined;
    const currentTurbines = dp.powerCurrent?.currentTurbines as
      | TurbineData[]
      | undefined;

    originalTurbines?.forEach((turbine) => {
      turbine.hourly.forEach((val, idx) => {
        originalHourlySum[idx] += val;
      });
    });

    currentTurbines?.forEach((turbine) => {
      turbine.hourly.forEach((val, idx) => {
        currentHourlySum[idx] += val;
      });
    });
  }

  return {
    originalHourlySum,
    currentHourlySum,
  };
}
