/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function findAllDayReport(
  prisma: PrismaService,
  user: AuthUser,
  powerId: number,
  startDate: string,
  endDate: string,
) {
  const where: any = {
    AND: [
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

  const dayReports = await prisma.dayReport.findMany({
    where,
    orderBy: { powerDate: 'desc' },
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
          createdAt: 'desc',
        },
        take: 1,
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

  // แปลงเวลาทั้งหมดให้เป็น timezone Asia/Vientiane
  return dayReports.map((report) => {
    const current = report.dayReportCurrents?.[0]; // มีแค่ตัวเดียว
    const latestHistory = report.dayReportHistorys?.[0] ?? null;
    return {
      id: report.id,
      powerId: report.powerId,
      powerDate: moment(report.powerDate).tz('Asia/Vientiane').format(),
      power: report.power,
      dayReportCurrent: current
        ? {
            ...current,
            createdAt: moment(current.createdAt).tz('Asia/Vientiane').format(),
            updatedAt: moment(current.updatedAt).tz('Asia/Vientiane').format(),
          }
        : null,
      dayReportHistory: latestHistory
        ? {
            ...latestHistory,
            createdAt: moment(latestHistory.createdAt)
              .tz('Asia/Vientiane')
              .format(),
            updatedAt: moment(latestHistory.updatedAt)
              .tz('Asia/Vientiane')
              .format(),
          }
        : null,
    };
  });
}
