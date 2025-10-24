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
  const { totalPower, totalUnit, turbinedata, powerDate, powerId, remarks } =
    createDayreportDto;

  return prisma.$transaction(async (tx) => {
    // ✅ ตรวจสอบว่ามี DayReport เดิมหรือไม่
    const existingDayReport = await tx.dayReport.findFirst({
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

    // ✅ สร้าง DayReport พร้อมข้อมูลที่สัมพันธ์ทั้งหมด
    const newDayReport = await tx.dayReport.create({
      data: {
        powerId: Number(powerId),
        powerDate: new Date(powerDate),

        // --- DayReportCurrent ---
        dayReportCurrents: {
          create: {
            createdByUserId: user.id,
            activeStorageamount: new Prisma.Decimal(
              createDayreportDto.activeStorageamount ?? 0,
            ),
            activeStorageaverage: new Prisma.Decimal(
              createDayreportDto.activeStorageaverage ?? 0,
            ),
            waterLevel: new Prisma.Decimal(createDayreportDto.waterLevel ?? 0),
            dwy: new Prisma.Decimal(createDayreportDto.dwy ?? 0),
            dwf: new Prisma.Decimal(createDayreportDto.dwf ?? 0),
            dwm: new Prisma.Decimal(createDayreportDto.dwm ?? 0),
            pws: new Prisma.Decimal(createDayreportDto.pws ?? 0),
            inflowamount: new Prisma.Decimal(
              createDayreportDto.inflowamount ?? 0,
            ),
            inflowaverage: new Prisma.Decimal(
              createDayreportDto.inflowaverage ?? 0,
            ),
            tdAmount: new Prisma.Decimal(createDayreportDto.tdAmount ?? 0),
            tdAverage: new Prisma.Decimal(createDayreportDto.tdAverage ?? 0),
            spillwayamount: new Prisma.Decimal(
              createDayreportDto.spillwayamount ?? 0,
            ),
            spillwayaverage: new Prisma.Decimal(
              createDayreportDto.spillwayaverage ?? 0,
            ),
            owramount: new Prisma.Decimal(createDayreportDto.owramount ?? 0),
            owraverage: new Prisma.Decimal(createDayreportDto.owraverage ?? 0),
            rainFall: new Prisma.Decimal(createDayreportDto.rainFall ?? 0),
            netEnergyOutput: new Prisma.Decimal(
              createDayreportDto.netEnergyOutput ?? 0,
            ),
            waterRate: new Prisma.Decimal(createDayreportDto.waterRate ?? 0),
            totalOutflow: new Prisma.Decimal(
              createDayreportDto.totalOutflow ?? 0,
            ),
            averageOutflow: new Prisma.Decimal(
              createDayreportDto.averageOutflow ?? 0,
            ),
            powerCurrent: {
              create: {
                totalPower,
                totalUnit: Number(totalUnit),
                remarks: remarks || [],
                originalTurbines: turbinedata as any[],
              },
            },
          },
        },

        // --- DayReportHistory ---
        dayReportHistorys: {
          create: {
            createdByUserId: user.id,
            activeStorageamount: new Prisma.Decimal(
              createDayreportDto.activeStorageamount ?? 0,
            ),
            activeStorageaverage: new Prisma.Decimal(
              createDayreportDto.activeStorageaverage ?? 0,
            ),
            waterLevel: new Prisma.Decimal(createDayreportDto.waterLevel ?? 0),
            dwy: new Prisma.Decimal(createDayreportDto.dwy ?? 0),
            dwf: new Prisma.Decimal(createDayreportDto.dwf ?? 0),
            dwm: new Prisma.Decimal(createDayreportDto.dwm ?? 0),
            pws: new Prisma.Decimal(createDayreportDto.pws ?? 0),
            inflowamount: new Prisma.Decimal(
              createDayreportDto.inflowamount ?? 0,
            ),
            inflowaverage: new Prisma.Decimal(
              createDayreportDto.inflowaverage ?? 0,
            ),
            tdAmount: new Prisma.Decimal(createDayreportDto.tdAmount ?? 0),
            tdAverage: new Prisma.Decimal(createDayreportDto.tdAverage ?? 0),
            spillwayamount: new Prisma.Decimal(
              createDayreportDto.spillwayamount ?? 0,
            ),
            spillwayaverage: new Prisma.Decimal(
              createDayreportDto.spillwayaverage ?? 0,
            ),
            owramount: new Prisma.Decimal(createDayreportDto.owramount ?? 0),
            owraverage: new Prisma.Decimal(createDayreportDto.owraverage ?? 0),
            rainFall: new Prisma.Decimal(createDayreportDto.rainFall ?? 0),
            netEnergyOutput: new Prisma.Decimal(
              createDayreportDto.netEnergyOutput ?? 0,
            ),
            waterRate: new Prisma.Decimal(createDayreportDto.waterRate ?? 0),
            totalOutflow: new Prisma.Decimal(
              createDayreportDto.totalOutflow ?? 0,
            ),
            averageOutflow: new Prisma.Decimal(
              createDayreportDto.averageOutflow ?? 0,
            ),
            powerHistory: {
              create: {
                totalPower,
                totalUnit: Number(totalUnit),
                remarks: remarks || [],
                originalTurbines: turbinedata as any[],
              },
            },
          },
        },
      },
      include: {
        dayReportCurrents: {
          include: { powerCurrent: true },
        },
        dayReportHistorys: {
          include: { powerHistory: true },
        },
      },
    });

    return newDayReport;
  });
}
