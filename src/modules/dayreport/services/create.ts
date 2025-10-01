import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateDayreportDto } from '../dto/create-dayreport.dto';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { Prisma } from '@prisma/client';

export async function createDayReport(
  prisma: PrismaService,
  user: AuthUser,
  createDayreportDto: CreateDayreportDto,
) {
  const {
    totalPower,
    totalUnit,
    turbinedata,
    powerDate,
    powerId,
    remarks,
    ...dayReportData
  } = createDayreportDto;

  const existingDayReport = await prisma.dayReport.findFirst({
    where: {
      powerId: Number(powerId),
      powerDate: new Date(powerDate),
    },
  });

  if (existingDayReport) {
    throw new BadRequestException(
      'DayReport with this powerId and powerDate already exists.',
    );
  }

  return prisma.dayReport.create({
    data: {
      ...dayReportData,
      powerId: Number(powerId),
      powerDate: new Date(powerDate),
      createdByUserId: user.id,
      activeStorageamount: new Prisma.Decimal(
        createDayreportDto.activeStorageamount,
      ),
      activeStorageaverage: new Prisma.Decimal(
        createDayreportDto.activeStorageaverage,
      ),
      waterLevel: new Prisma.Decimal(createDayreportDto.waterLevel),
      dwy: new Prisma.Decimal(createDayreportDto.dwy),
      dwf: new Prisma.Decimal(createDayreportDto.dwf),
      dwm: new Prisma.Decimal(createDayreportDto.dwm),
      pws: new Prisma.Decimal(createDayreportDto.pws),
      inflowamount: new Prisma.Decimal(createDayreportDto.inflowamount),
      inflowaverage: new Prisma.Decimal(createDayreportDto.inflowaverage),
      tdAmount: new Prisma.Decimal(createDayreportDto.tdAmount),
      tdAverage: new Prisma.Decimal(createDayreportDto.tdAverage),
      spillwayamount: new Prisma.Decimal(createDayreportDto.spillwayamount),
      spillwayaverage: new Prisma.Decimal(createDayreportDto.spillwayaverage),
      owramount: new Prisma.Decimal(createDayreportDto.owramount),
      owraverage: new Prisma.Decimal(createDayreportDto.owraverage),
      rainFall: new Prisma.Decimal(createDayreportDto.rainFall),
      netEnergyOutput: new Prisma.Decimal(createDayreportDto.netEnergyOutput),
      waterRate: new Prisma.Decimal(createDayreportDto.waterRate),
      totalOutflow: new Prisma.Decimal(createDayreportDto.totalOutflow),
      averageOutflow: new Prisma.Decimal(createDayreportDto.averageOutflow),
      powerOriginal: {
        create: {
          totalPower,
          totalUnit,
          remarks,
          originalTurbines: turbinedata as any[],
        },
      },
    },
    include: {
      powerOriginal: true,
    },
  });
}
