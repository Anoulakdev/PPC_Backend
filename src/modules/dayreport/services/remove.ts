import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeDayReport(prisma: PrismaService, id: number) {
  const dayreport = await prisma.dayReport.findUnique({
    where: { id },
  });

  if (!dayreport) throw new NotFoundException('dayreport not found');

  await prisma.$transaction(async (tx) => {
    // 👉 ลบ reportOriginal
    await tx.reportOriginal.delete({
      where: { dayReportId: id },
    });

    // 👉 ลบ DayReport
    await tx.dayReport.delete({
      where: { id },
    });
  });

  return {
    statusCode: HttpStatus.OK,
    message: 'Deleted all data successfully',
  };
}
