import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';

export async function findOneDayReport(prisma: PrismaService, id: number) {
  const dayreport = await prisma.dayReport.findUnique({
    where: { id },
    include: {
      power: {
        select: {
          id: true,
          name: true,
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      dayReportCurrents: {
        include: {
          createdByUser: {
            select: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
            },
          },
          powerCurrent: true,
        },
      },
      dayReportHistorys: {
        orderBy: {
          id: 'desc',
        },
        include: {
          createdByUser: {
            select: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
            },
          },
          powerHistory: true,
        },
      },
    },
  });

  if (!dayreport) throw new NotFoundException('dayreport not found');

  const current = dayreport.dayReportCurrents?.[0] ?? null;

  return {
    id: dayreport.id,
    powerId: dayreport.powerId,
    powerDate: moment(dayreport.powerDate).tz('Asia/Vientiane').format(),
    power: dayreport.power,
    dayReportCurrent: current
      ? {
          ...current,
          createdAt: moment(current.createdAt).tz('Asia/Vientiane').format(),
          updatedAt: moment(current.updatedAt).tz('Asia/Vientiane').format(),
          powerCurrent: current.powerCurrent ?? null,
        }
      : null,
    dayReportHistorys: dayreport.dayReportHistorys.map((history) => ({
      //   ...history,
      id: history.id,
      createdByUser: history.createdByUser,
      totalPower: history.powerHistory?.totalPower,
      createdAt: moment(history.createdAt).tz('Asia/Vientiane').format(),
      updatedAt: moment(history.updatedAt).tz('Asia/Vientiane').format(),
    })),
  };
}
