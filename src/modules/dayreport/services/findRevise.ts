import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
// import * as moment from 'moment-timezone';

export async function findRevise(prisma: PrismaService, id: number) {
  const dayreport = await prisma.dayReportHistory.findUnique({
    where: { id },
    include: {
      powerHistory: true,
    },
  });

  if (!dayreport) throw new NotFoundException('dayreport not found');

  return dayreport;
}
