import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateDaypowerDto } from '../dto/create-daypower.dto';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { Prisma } from '@prisma/client';

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

  const power = await prisma.power.findUnique({
    where: {
      id: Number(powerId),
    },
  });

  return prisma.dayPower.create({
    data: {
      powerId: Number(powerId),
      powerNo: createDaypowerDto.powerNo,
      powerDate: new Date(powerDate),
      createdByUserId: user.id,

      ...(power?.bossAcknow === false && {
        decAcknowUserId: user.id,
        decAcknow: true,
        decAcknowAt: new Date(),
      }),

      powerStart: {
        create: {
          upstreamLevel: new Prisma.Decimal(
            createDaypowerDto.upstreamLevel ?? 0,
          ),
          downstreamLevel: new Prisma.Decimal(
            createDaypowerDto.downstreamLevel ?? 0,
          ),
          totalStorageamount: new Prisma.Decimal(
            createDaypowerDto.totalStorageamount ?? 0,
          ),
          totalStorageaverage: new Prisma.Decimal(
            createDaypowerDto.totalStorageaverage ?? 0,
          ),
          activeStorageamount: new Prisma.Decimal(
            createDaypowerDto.activeStorageamount ?? 0,
          ),
          activeStorageaverage: new Prisma.Decimal(
            createDaypowerDto.activeStorageaverage ?? 0,
          ),
          turbineDischargeamount: new Prisma.Decimal(
            createDaypowerDto.turbineDischargeamount ?? 0,
          ),
          turbineDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.turbineDischargeaverage ?? 0,
          ),
          spillwayDischargeamount: new Prisma.Decimal(
            createDaypowerDto.spillwayDischargeamount ?? 0,
          ),
          spillwayDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.spillwayDischargeaverage ?? 0,
          ),
          ecologicalDischargeamount: new Prisma.Decimal(
            createDaypowerDto.ecologicalDischargeamount ?? 0,
          ),
          ecologicalDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.ecologicalDischargeaverage ?? 0,
          ),
          totalDischargeamount: new Prisma.Decimal(
            createDaypowerDto.totalDischargeamount ?? 0,
          ),
          totalDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.totalDischargeaverage ?? 0,
          ),
          machinesAvailability: machinedata as any[],
          totalPower,
          totalUnit,
          remark,
          remarks,
          startTurbines: turbinedata as any[],
        },
      },
      powerOriginal: {
        create: {
          upstreamLevel: new Prisma.Decimal(
            createDaypowerDto.upstreamLevel ?? 0,
          ),
          downstreamLevel: new Prisma.Decimal(
            createDaypowerDto.downstreamLevel ?? 0,
          ),
          totalStorageamount: new Prisma.Decimal(
            createDaypowerDto.totalStorageamount ?? 0,
          ),
          totalStorageaverage: new Prisma.Decimal(
            createDaypowerDto.totalStorageaverage ?? 0,
          ),
          activeStorageamount: new Prisma.Decimal(
            createDaypowerDto.activeStorageamount ?? 0,
          ),
          activeStorageaverage: new Prisma.Decimal(
            createDaypowerDto.activeStorageaverage ?? 0,
          ),
          turbineDischargeamount: new Prisma.Decimal(
            createDaypowerDto.turbineDischargeamount ?? 0,
          ),
          turbineDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.turbineDischargeaverage ?? 0,
          ),
          spillwayDischargeamount: new Prisma.Decimal(
            createDaypowerDto.spillwayDischargeamount ?? 0,
          ),
          spillwayDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.spillwayDischargeaverage ?? 0,
          ),
          ecologicalDischargeamount: new Prisma.Decimal(
            createDaypowerDto.ecologicalDischargeamount ?? 0,
          ),
          ecologicalDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.ecologicalDischargeaverage ?? 0,
          ),
          totalDischargeamount: new Prisma.Decimal(
            createDaypowerDto.totalDischargeamount ?? 0,
          ),
          totalDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.totalDischargeaverage ?? 0,
          ),
          machinesAvailability: machinedata as any[],
          totalPower,
          totalUnit,
          remark,
          remarks,
          originalTurbines: turbinedata as any[],
        },
      },
      powerCurrent: {
        create: {
          upstreamLevel: new Prisma.Decimal(
            createDaypowerDto.upstreamLevel ?? 0,
          ),
          downstreamLevel: new Prisma.Decimal(
            createDaypowerDto.downstreamLevel ?? 0,
          ),
          totalStorageamount: new Prisma.Decimal(
            createDaypowerDto.totalStorageamount ?? 0,
          ),
          totalStorageaverage: new Prisma.Decimal(
            createDaypowerDto.totalStorageaverage ?? 0,
          ),
          activeStorageamount: new Prisma.Decimal(
            createDaypowerDto.activeStorageamount ?? 0,
          ),
          activeStorageaverage: new Prisma.Decimal(
            createDaypowerDto.activeStorageaverage ?? 0,
          ),
          turbineDischargeamount: new Prisma.Decimal(
            createDaypowerDto.turbineDischargeamount ?? 0,
          ),
          turbineDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.turbineDischargeaverage ?? 0,
          ),
          spillwayDischargeamount: new Prisma.Decimal(
            createDaypowerDto.spillwayDischargeamount ?? 0,
          ),
          spillwayDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.spillwayDischargeaverage ?? 0,
          ),
          ecologicalDischargeamount: new Prisma.Decimal(
            createDaypowerDto.ecologicalDischargeamount ?? 0,
          ),
          ecologicalDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.ecologicalDischargeaverage ?? 0,
          ),
          totalDischargeamount: new Prisma.Decimal(
            createDaypowerDto.totalDischargeamount ?? 0,
          ),
          totalDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.totalDischargeaverage ?? 0,
          ),
          machinesAvailability: machinedata as any[],
          totalPower,
          totalUnit,
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
