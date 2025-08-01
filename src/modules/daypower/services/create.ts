import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateDaypowerDto } from '../dto/create-daypower.dto';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function createDayPower(
  prisma: PrismaService,
  user: AuthUser,
  createDaypowerDto: CreateDaypowerDto,
) {
  const {
    totalPower,
    totalUnit,
    machinedata,
    turbinedata,
    powerDate,
    powerId,
    remark,
    remarks,
    ...dayPowerData
  } = createDaypowerDto;

  const existingDayPower = await prisma.dayPower.findFirst({
    where: {
      powerId: Number(powerId),
      powerDate: new Date(powerDate),
    },
  });

  if (existingDayPower) {
    throw new BadRequestException(
      'DayPower with this powerId and powerDate already exists.',
    );
  }

  return prisma.dayPower.create({
    data: {
      ...dayPowerData,
      powerId: Number(powerId),
      powerDate: new Date(powerDate),
      createdByUserId: user.id,
      machinesAvailability: machinedata as any[],
      powerOriginal: {
        create: {
          totalPower,
          totalUnit,
          remark,
          remarks,
          originalTurbines: turbinedata as any[],
        },
      },
      powerCurrent: {
        create: {
          totalPower,
          totalUnit,
          remark,
          remarks,
          currentTurbines: turbinedata as any[],
        },
      },
    },
    include: {
      powerOriginal: true,
      powerCurrent: true,
    },
  });
}
