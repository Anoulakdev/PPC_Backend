/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

type TurbineData = {
  hourly: number[];
  turbine: number;
};

export async function totalChart(
  prisma: PrismaService,
  user: AuthUser,
  powerId: number,
  startDate: string,
  endDate: string,
) {
  const where: any = {
    AND: [
      { decAcknow: true },
      { disAcknow: true },
      ...(user.roleId === 5 || user.roleId === 6
        ? [{ powerId: { in: user.powers } }]
        : []),
      ...(powerId ? [{ powerId: Number(powerId) }] : []),
      ...(startDate && endDate
        ? [
            {
              powerDate: {
                gte: new Date(`${startDate}T00:00:00+07:00`),
                lte: new Date(`${endDate}T23:59:59+07:00`),
              },
            },
          ]
        : []),
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
