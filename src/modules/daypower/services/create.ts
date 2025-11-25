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

  return prisma.dayPower.create({
    data: {
      powerId: Number(powerId),
      powerNo: createDaypowerDto.powerNo,
      powerDate: new Date(powerDate),
      createdByUserId: user.id,
      decAcknowUserId: user.id,
      decAcknow: true,
      powerOriginal: {
        create: {
          upstreamLevel: new Prisma.Decimal(createDaypowerDto.upstreamLevel),
          downstreamLevel: new Prisma.Decimal(
            createDaypowerDto.downstreamLevel,
          ),
          totalStorageamount: new Prisma.Decimal(
            createDaypowerDto.totalStorageamount,
          ),
          totalStorageaverage: new Prisma.Decimal(
            createDaypowerDto.totalStorageaverage,
          ),
          activeStorageamount: new Prisma.Decimal(
            createDaypowerDto.activeStorageamount,
          ),
          activeStorageaverage: new Prisma.Decimal(
            createDaypowerDto.activeStorageaverage,
          ),
          turbineDischargeamount: new Prisma.Decimal(
            createDaypowerDto.turbineDischargeamount,
          ),
          turbineDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.turbineDischargeaverage,
          ),
          spillwayDischargeamount: new Prisma.Decimal(
            createDaypowerDto.spillwayDischargeamount,
          ),
          spillwayDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.spillwayDischargeaverage,
          ),
          ecologicalDischargeamount: new Prisma.Decimal(
            createDaypowerDto.ecologicalDischargeamount,
          ),
          ecologicalDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.ecologicalDischargeaverage,
          ),
          totalDischargeamount: new Prisma.Decimal(
            createDaypowerDto.totalDischargeamount,
          ),
          totalDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.totalDischargeaverage,
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
          upstreamLevel: new Prisma.Decimal(createDaypowerDto.upstreamLevel),
          downstreamLevel: new Prisma.Decimal(
            createDaypowerDto.downstreamLevel,
          ),
          totalStorageamount: new Prisma.Decimal(
            createDaypowerDto.totalStorageamount,
          ),
          totalStorageaverage: new Prisma.Decimal(
            createDaypowerDto.totalStorageaverage,
          ),
          activeStorageamount: new Prisma.Decimal(
            createDaypowerDto.activeStorageamount,
          ),
          activeStorageaverage: new Prisma.Decimal(
            createDaypowerDto.activeStorageaverage,
          ),
          turbineDischargeamount: new Prisma.Decimal(
            createDaypowerDto.turbineDischargeamount,
          ),
          turbineDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.turbineDischargeaverage,
          ),
          spillwayDischargeamount: new Prisma.Decimal(
            createDaypowerDto.spillwayDischargeamount,
          ),
          spillwayDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.spillwayDischargeaverage,
          ),
          ecologicalDischargeamount: new Prisma.Decimal(
            createDaypowerDto.ecologicalDischargeamount,
          ),
          ecologicalDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.ecologicalDischargeaverage,
          ),
          totalDischargeamount: new Prisma.Decimal(
            createDaypowerDto.totalDischargeamount,
          ),
          totalDischargeaverage: new Prisma.Decimal(
            createDaypowerDto.totalDischargeaverage,
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
      powerOriginal: true,
      powerCurrent: true,
    },
  });
}
