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
    select: {
      waterLevel: true,
    },
  });

  if (!report) {
    return { waterLevel: 0 };
  }

  return report;
}
