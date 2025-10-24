import { PrismaService } from '../../../prisma/prisma.service';
import * as moment from 'moment-timezone';

export async function waterLevel(
  prisma: PrismaService,
  powerId: number,
  powerDate: string,
) {
  // ใช้ powerDate ที่รับมา แทน today
  const start = moment(powerDate)
    .tz('Asia/Vientiane')
    .subtract(1, 'day')
    .startOf('day')
    .toDate();

  const end = moment(powerDate)
    .tz('Asia/Vientiane')
    .subtract(1, 'day')
    .endOf('day')
    .toDate();

  const report = await prisma.dayReport.findFirst({
    where: {
      powerId: Number(powerId),
      powerDate: {
        gte: start,
        lte: end,
      },
    },
    include: {
      dayReportCurrents: {
        select: {
          waterLevel: true,
        },
      },
    },
  });

  if (!report) {
    return {
      id: null,
      powerId,
      powerDate,
      waterLevel: '0',
    };
  }

  const waterLevelValue =
    report.dayReportCurrents?.[0]?.waterLevel?.toString() ?? '0';

  return {
    id: report.id,
    powerId: report.powerId,
    powerDate: report.powerDate.toISOString(),
    waterLevel: waterLevelValue,
  };
}
