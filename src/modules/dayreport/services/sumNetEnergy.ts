/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

// ==========================
// Helper: Decimal -> number
// ==========================
function decimalToNumber(value?: any): number {
  if (value === null || value === undefined) return 0;

  // Prisma Decimal
  if (typeof value === 'object' && typeof value.toNumber === 'function') {
    return value.toNumber();
  }

  if (typeof value === 'number') return value;

  return Number(value) || 0;
}

export async function sumNetEnergy(
  prisma: PrismaService,
  user: AuthUser,
  powerId: number,
  startDate: string,
  endDate: string,
) {
  // ==========================
  // WHERE CONDITION
  // ==========================
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

  // ==========================
  // QUERY
  // ==========================
  const dayReports = await prisma.dayReport.findMany({
    where,
    orderBy: { powerDate: 'desc' }, // สำคัญสำหรับสะสม
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
        orderBy: { createdAt: 'desc' },
        take: 1,
        select: {
          createdAt: true,
          updatedAt: true,
          createdByUser: {
            select: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
            },
          },
          // powerHistory: true,
        },
      },
    },
  });

  // ==========================
  // SUM HELPER (netEnergyOutput)
  // ==========================
  const sumNetEnergyOutput = (
    reports: typeof dayReports,
    start: moment.Moment,
    end: moment.Moment,
  ) => {
    return reports
      .filter((r) => {
        const d = moment(r.powerDate);
        return d.isSameOrAfter(start, 'day') && d.isSameOrBefore(end, 'day');
      })
      .reduce((sum, r) => {
        const current = r.dayReportCurrents?.[0];
        return sum + decimalToNumber(current?.netEnergyOutput);
      }, 0);
  };

  // ==========================
  // DAILY
  // ==========================
  const daily = dayReports.map((report) => {
    const current = report.dayReportCurrents?.[0];
    const history = report.dayReportHistorys?.[0] ?? null;

    return {
      id: report.id,
      powerId: report.powerId,
      powerDate: moment(report.powerDate)
        .tz('Asia/Vientiane')
        .format('YYYY-MM-DD'),
      power: report.power,
      netEnergyOutput: decimalToNumber(current?.netEnergyOutput),
      dayReportCurrent: current
        ? {
            ...current,
            netEnergyOutput: decimalToNumber(current.netEnergyOutput),
            createdAt: moment(current.createdAt).tz('Asia/Vientiane').format(),
            updatedAt: moment(current.updatedAt).tz('Asia/Vientiane').format(),
          }
        : null,
      dayReportHistory: history
        ? {
            ...history,
            createdAt: moment(history.createdAt).tz('Asia/Vientiane').format(),
            updatedAt: moment(history.updatedAt).tz('Asia/Vientiane').format(),
          }
        : null,
    };
  });

  // ==========================
  // MONTHLY (สะสมตั้งแต่ต้นเดือน)
  // ==========================
  const monthly = dayReports.map((report) => {
    const date = moment(report.powerDate).tz('Asia/Vientiane');
    const monthStart = date.clone().startOf('month');

    return {
      date: date.format('YYYY-MM-DD'),
      yearMonth: date.format('YYYY-MM'),
      totalNetEnergyOutput: sumNetEnergyOutput(dayReports, monthStart, date),
    };
  });

  // ==========================
  // YEARLY (สะสมตั้งแต่ต้นปี)
  // ==========================
  const yearly = dayReports.map((report) => {
    const date = moment(report.powerDate).tz('Asia/Vientiane');
    const yearStart = date.clone().startOf('year');

    return {
      date: date.format('YYYY-MM-DD'),
      year: date.format('YYYY'),
      totalNetEnergyOutput: sumNetEnergyOutput(dayReports, yearStart, date),
    };
  });

  // ==========================
  // RESPONSE
  // ==========================
  return {
    daily,
    monthly,
    yearly,
  };
}
