import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMonthpowerDto } from '../dto/create-monthpower.dto';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function createMonthPower(
  prisma: PrismaService,
  user: AuthUser,
  createMonthpowerDto: CreateMonthpowerDto,
) {
  const {
    totalPower,
    totalDate,
    turbinedata,
    powerId,
    sYear,
    sMonth,
    remark,
    remarks,
    ...monthPowerData
  } = createMonthpowerDto;

  const existingMonthPower = await prisma.monthPower.findFirst({
    where: {
      powerId: Number(powerId),
      sYear: sYear,
      sMonth: `${String(sMonth).padStart(2, '0')}`,
    },
  });

  if (existingMonthPower) {
    throw new BadRequestException(
      'MonthPower with this powerId and powerDate already exists.',
    );
  }

  return prisma.monthPower.create({
    data: {
      ...monthPowerData,
      powerId: Number(powerId),
      sYear,
      sMonth: `${String(sMonth).padStart(2, '0')}`,
      yearmonth: `${sYear}${String(sMonth).padStart(2, '0')}`,
      createdByUserId: user.id,
      decAcknowUserId: user.id,
      decAcknow: true,
      decAcknowAt: new Date(),
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
