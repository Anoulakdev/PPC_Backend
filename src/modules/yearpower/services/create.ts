import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateYearpowerDto } from '../dto/create-yearpower.dto';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function createYearPower(
  prisma: PrismaService,
  user: AuthUser,
  createYearpowerDto: CreateYearpowerDto,
) {
  const { turbinedata, powerId, sYear, ...yearPowerData } = createYearpowerDto;

  const existingYearPower = await prisma.yearPower.findFirst({
    where: {
      powerId: Number(powerId),
      sYear: sYear,
    },
  });

  if (existingYearPower) {
    throw new BadRequestException(
      'YearPower with this powerId and powerDate already exists.',
    );
  }

  const power = await prisma.power.findUnique({
    where: {
      id: Number(powerId),
    },
  });

  return prisma.yearPower.create({
    data: {
      ...yearPowerData,
      powerId: Number(powerId),
      sYear,
      createdByUserId: user.id,

      ...(power?.bossAcknow === false && {
        decAcknowUserId: user.id,
        decAcknow: true,
        decAcknowAt: new Date(),
      }),

      powerStart: {
        create: {
          startTurbines: turbinedata as any[],
        },
      },
      powerOriginal: {
        create: {
          originalTurbines: turbinedata as any[],
        },
      },
      powerCurrent: {
        create: {
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
