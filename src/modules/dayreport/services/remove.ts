import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeDayReport(prisma: PrismaService, id: number) {
  const dayreport = await prisma.dayReport.findUnique({
    where: { id },
    include: {
      dayReportCurrents: {
        include: {
          powerCurrent: true,
        },
      },
      dayReportHistorys: {
        include: {
          powerHistory: true,
        },
      },
    },
  });

  if (!dayreport) throw new NotFoundException('dayreport not found');

  await prisma.$transaction(async (tx) => {
    // 👉 ลบ ReportCurrent (ภายใน DayReportCurrent)
    if (dayreport.dayReportCurrents.length > 0) {
      const current = dayreport.dayReportCurrents[0];
      if (current.powerCurrent) {
        await tx.reportCurrent.delete({
          where: { id: current.powerCurrent.id },
        });
      }

      // 👉 ลบ DayReportCurrent
      await tx.dayReportCurrent.delete({
        where: { id: current.id },
      });
    }

    // 👉 ลบ ReportHistory (ภายใน DayReportHistory)
    if (dayreport.dayReportHistorys.length > 0) {
      const historyIds = dayreport.dayReportHistorys.map((h) => h.id);

      await tx.reportHistory.deleteMany({
        where: { dayReportHistoryId: { in: historyIds } },
      });

      await tx.dayReportHistory.deleteMany({
        where: { dayReportId: id },
      });
    }

    // 👉 ลบ DayReport
    await tx.dayReport.delete({
      where: { id },
    });
  });

  return {
    statusCode: HttpStatus.OK,
    message: 'Deleted all related data successfully',
  };
}
