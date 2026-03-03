import { PrismaService } from '../../../prisma/prisma.service';

export async function sumNetEnergy(
  prisma: PrismaService,
  powerId: number,
  startDate: string,
  endDate: string,
) {
  const dayReports = await prisma.dayReport.findMany({
    where: {
      powerId: Number(powerId),
      powerDate: {
        gte: new Date(`${startDate}T00:00:00+07:00`),
        lte: new Date(`${endDate}T23:59:59+07:00`),
      },
    },
    orderBy: { powerDate: 'asc' },
    include: {
      power: {
        select: {
          id: true,
          name: true,
          fuelId: true,
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      dayReportCurrents: {
        select: {
          id: true,
          netEnergyOutput: true,
          createdByUser: {
            select: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
            },
          },
        },
      },
    },
  });

  // ✅ รวม netEnergyOutput ทั้งหมด
  const totalNetEnergy = dayReports.reduce((sum, report) => {
    const reportTotal = report.dayReportCurrents.reduce(
      (innerSum, current) => innerSum + Number(current.netEnergyOutput || 0),
      0,
    );

    return sum + reportTotal;
  }, 0);

  return {
    totalNetEnergy,
    data: dayReports,
  };
}
