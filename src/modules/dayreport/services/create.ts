import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateDayreportDto } from '../dto/create-dayreport.dto';
import { AuthUser } from '../../../interfaces/auth-user.interface';

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
