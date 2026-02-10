import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

interface CombinedPowerOriginal {
  id: number;
  dayPowerId: number;
  totalPower: any;
  totalUnit: number;
  remark?: string | null;
  combinedHourlyOriginal: number[];
}

interface CombinedPowerCurrent {
  id: number;
  dayPowerId: number;
  totalPower: any;
  totalUnit: number;
  remark?: string | null;
  combinedHourlyCurrent: number[];
}

interface ItemResult {
  id: number;
  powerId: number;
  powerNo: string;
  powerDate: Date;
  decAcknowUserId: number | null;
  decAcknow: boolean;
  disAcknowUserId: number | null;
  disAcknow: boolean;
  decAcknowUser: {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
  } | null;
  disAcknowUser: {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
  } | null;
  power: {
    id: number;
    name: string;
    installCapacity: Prisma.Decimal | null;
    company: { id: number; name: string };
  };
  powerOriginal: CombinedPowerOriginal | null;
  powerCurrent: CombinedPowerCurrent | null;
}

interface GroupedCompanyItems {
  companyId: number;
  companyName: string;
  items: ItemResult[];
}

export async function findallNCC(
  prisma: PrismaService,
  powerDate: string,
  regionId?: number,
): Promise<GroupedCompanyItems[]> {
  const where: Prisma.DayPowerWhereInput = {
    powerDate: new Date(powerDate),
  };

  if (regionId !== undefined && regionId !== null) {
    where.power = {
      is: {
        regionId: Number(regionId),
      },
    };
  }

  const data = await prisma.dayPower.findMany({
    where,
    select: {
      id: true,
      powerId: true,
      powerNo: true,
      powerDate: true,
      decAcknowUserId: true,
      decAcknow: true,
      disAcknowUserId: true,
      disAcknow: true,
      decAcknowUser: {
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
        },
      },
      disAcknowUser: {
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
        },
      },
      power: {
        select: {
          id: true,
          name: true,
          installCapacity: true,
          company: {
            select: { id: true, name: true },
          },
          regionId: true,
        },
      },
      powerOriginal: true,
      powerCurrent: true,
    },
  });

  const transformed: ItemResult[] = data.map((item) => {
    const combinedHourlyCurrent = Array<number>(24).fill(0);
    const currentTurbines = item.powerCurrent?.currentTurbines as
      | Array<{ hourly: number[] }>
      | undefined;

    if (currentTurbines) {
      currentTurbines.forEach((turbine) => {
        const hourlyData = turbine.hourly ?? [];
        for (let i = 0; i < 24; i++) {
          combinedHourlyCurrent[i] += Number(hourlyData[i] || 0);
        }
      });

      // ✅ Format to 2 decimals afterward
      for (let i = 0; i < 24; i++) {
        combinedHourlyCurrent[i] = Number(combinedHourlyCurrent[i].toFixed(2));
      }
    }

    const combinedHourlyOriginal = Array<number>(24).fill(0);

    const originalTurbines = item.powerOriginal?.originalTurbines as
      | Array<{ hourly: number[] }>
      | undefined;

    if (originalTurbines) {
      originalTurbines.forEach((turbine) => {
        const hourlyData = turbine.hourly ?? [];
        for (let i = 0; i < 24; i++) {
          combinedHourlyOriginal[i] += Number(hourlyData[i] || 0);
        }
      });

      // ✅ Format to 2 decimals afterward
      for (let i = 0; i < 24; i++) {
        combinedHourlyOriginal[i] = Number(
          combinedHourlyOriginal[i].toFixed(2),
        );
      }
    }

    return {
      ...item,
      powerOriginal: item.powerOriginal
        ? {
            id: item.powerOriginal.id,
            dayPowerId: item.powerOriginal.dayPowerId,
            totalPower: item.powerOriginal.totalPower,
            totalUnit: item.powerOriginal.totalUnit,
            remark: item.powerOriginal.remark,
            combinedHourlyOriginal,
          }
        : null,
      powerCurrent: item.powerCurrent
        ? {
            id: item.powerCurrent.id,
            dayPowerId: item.powerCurrent.dayPowerId,
            totalPower: item.powerCurrent.totalPower,
            totalUnit: item.powerCurrent.totalUnit,
            remark: item.powerCurrent.remark,
            combinedHourlyCurrent,
          }
        : null,
    };
  });

  // ✅ ใช้ accumulator ที่มี type ชัดเจน
  const groupedByCompany: GroupedCompanyItems[] = Object.values(
    transformed.reduce<Record<number, GroupedCompanyItems>>((acc, item) => {
      const companyId = item.power.company.id;
      const companyName = item.power.company.name;

      if (!acc[companyId]) {
        acc[companyId] = {
          companyId,
          companyName,
          items: [],
        };
      }

      acc[companyId].items.push(item);
      return acc;
    }, {}),
  );

  return groupedByCompany;
}
