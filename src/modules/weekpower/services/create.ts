import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateWeekpowerDto } from '../dto/create-weekpower.dto';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as moment from 'moment-timezone';

export async function createWeekPower(
  prisma: PrismaService,
  user: AuthUser,
  createWeekpowerDto: CreateWeekpowerDto,
) {
  const {
    totalPower,
    totalDate,
    turbinedata,
    powerId,
    sYear,
    sWeek,
    remark,
    remarks,
    ...weekPowerData
  } = createWeekpowerDto;

  // ✅ คำนวณวันจันทร์และวันอาทิตย์ตาม ISO สัปดาห์ ด้วย timezone Asia/Vientiane
  const getStartAndEndDateOfISOWeek = (week: number, year: number) => {
    const zone = 'Asia/Vientiane';

    const monday = moment
      .tz({ year }, zone)
      .isoWeek(week)
      .startOf('isoWeek')
      .startOf('day'); // 🔧 ตัดเวลาให้เหลือ 00:00:00

    const sunday = moment(monday).add(6, 'days').endOf('day'); // 🔧 ให้เป็น 23:59:59 ของวันอาทิตย์

    return {
      startDate: monday.format('YYYY-MM-DD'),
      endDate: sunday.format('YYYY-MM-DD'),
    };
  };

  const { startDate, endDate } = getStartAndEndDateOfISOWeek(
    Number(sWeek),
    Number(sYear),
  );

  const existingWeekPower = await prisma.weekPower.findFirst({
    where: {
      powerId: Number(powerId),
      sYear: sYear,
      sWeek: `${String(sWeek).padStart(2, '0')}`,
    },
  });

  if (existingWeekPower) {
    throw new BadRequestException(
      'WeekPower with this powerId already exists.',
    );
  }

  const power = await prisma.power.findUnique({
    where: {
      id: Number(powerId),
    },
  });

  return prisma.weekPower.create({
    data: {
      ...weekPowerData,
      powerId: Number(powerId),
      sYear,
      sWeek: `${String(sWeek).padStart(2, '0')}`,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      createdByUserId: user.id,

      ...(power?.bossAcknow === false && {
        decAcknowUserId: user.id,
        decAcknow: true,
        decAcknowAt: new Date(),
      }),

      powerStart: {
        create: {
          totalPower,
          totalDate,
          remark,
          remarks,
          startTurbines: turbinedata as any[],
        },
      },
      powerOriginal: {
        create: {
          totalPower,
          totalDate,
          remark,
          remarks,
          originalTurbines: turbinedata as any[],
        },
      },
      powerCurrent: {
        create: {
          totalPower,
          totalDate,
          remark,
          remarks,
          currentTurbines: turbinedata as any[],
        },
      },
    },
    include: {
      powerStart: true,
      powerOriginal: true,
      powerCurrent: true,
    },
  });
}
