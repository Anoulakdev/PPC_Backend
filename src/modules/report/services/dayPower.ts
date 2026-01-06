/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function dayPower(
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
      {
        powerDate: {
          gte: new Date(`${startDate}T00:00:00+07:00`),
          lte: new Date(`${endDate}T23:59:59+07:00`),
        },
      },
    ],
  };

  const daypowers = await prisma.dayPower.findMany({
    where,
    orderBy: { powerDate: 'asc' },
    include: {
      createdByUser: {
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
        },
      },
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
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      powerOriginal: true,
      powerCurrent: true,
      // powerOriginal: {
      //   select: {
      //     totalPower: true,
      //     upstreamLevel: true,
      //     downstreamLevel: true,
      //     totalStorageamount: true,
      //     totalStorageaverage: true,
      //     activeStorageamount: true,
      //     activeStorageaverage: true,
      //     turbineDischargeamount: true,
      //     turbineDischargeaverage: true,
      //     spillwayDischargeamount: true,
      //     spillwayDischargeaverage: true,
      //     ecologicalDischargeamount: true,
      //     ecologicalDischargeaverage: true,
      //     totalDischargeamount: true,
      //     totalDischargeaverage: true,
      //   },
      // },
      // powerCurrent: {
      //   select: {
      //     totalPower: true,
      //     upstreamLevel: true,
      //     downstreamLevel: true,
      //     totalStorageamount: true,
      //     totalStorageaverage: true,
      //     activeStorageamount: true,
      //     activeStorageaverage: true,
      //     turbineDischargeamount: true,
      //     turbineDischargeaverage: true,
      //     spillwayDischargeamount: true,
      //     spillwayDischargeaverage: true,
      //     ecologicalDischargeamount: true,
      //     ecologicalDischargeaverage: true,
      //     totalDischargeamount: true,
      //     totalDischargeaverage: true,
      //   },
      // },
    },
  });

  return daypowers.map((daypower) => {
    return {
      ...daypower,
      decAcknowAt: daypower.decAcknowAt
        ? moment(daypower.decAcknowAt).tz('Asia/Vientiane').format()
        : null,
      disAcknowAt: daypower.disAcknowAt
        ? moment(daypower.disAcknowAt).tz('Asia/Vientiane').format()
        : null,
      powerDate: moment(daypower.powerDate)
        .tz('Asia/Vientiane')
        .format('YYYY-MM-DD'),
      createdAt: moment(daypower.createdAt).tz('Asia/Vientiane').format(),
      updatedAt: moment(daypower.updatedAt).tz('Asia/Vientiane').format(),
    };
  });
}
