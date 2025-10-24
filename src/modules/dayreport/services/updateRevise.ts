import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { UpdateDayreportDto } from '../dto/update-dayreport.dto';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export async function updateRevise(
  prisma: PrismaService,
  id: number,
  user: AuthUser,
  updateDayreportDto: UpdateDayreportDto,
) {
  const { totalPower, totalUnit, turbinedata, remarks } = updateDayreportDto;

  return prisma.$transaction(async (tx) => {
    // ✅ ตรวจสอบว่า DayReport มีอยู่จริงไหม
    const dayreport = await tx.dayReport.findUnique({
      where: { id },
      include: {
        dayReportCurrents: {
          include: { powerCurrent: true },
        },
      },
    });

    if (!dayreport) {
      throw new NotFoundException('DayReport not found');
    }

    // ✅ ดึง dayReportCurrent ตัวแรก
    const current = dayreport.dayReportCurrents[0];
    if (!current) {
      throw new NotFoundException('DayReportCurrent not found');
    }

    // ✅ อัปเดต DayReportCurrent (รวมทั้ง powerCurrent)
    await tx.dayReportCurrent.update({
      where: { id: current.id },
      data: {
        createdByUserId: user.id,
        activeStorageamount: new Prisma.Decimal(
          updateDayreportDto.activeStorageamount ?? 0,
        ),
        activeStorageaverage: new Prisma.Decimal(
          updateDayreportDto.activeStorageaverage ?? 0,
        ),
        waterLevel: new Prisma.Decimal(updateDayreportDto.waterLevel ?? 0),
        dwy: new Prisma.Decimal(updateDayreportDto.dwy ?? 0),
        dwf: new Prisma.Decimal(updateDayreportDto.dwf ?? 0),
        dwm: new Prisma.Decimal(updateDayreportDto.dwm ?? 0),
        pws: new Prisma.Decimal(updateDayreportDto.pws ?? 0),
        inflowamount: new Prisma.Decimal(updateDayreportDto.inflowamount ?? 0),
        inflowaverage: new Prisma.Decimal(
          updateDayreportDto.inflowaverage ?? 0,
        ),
        tdAmount: new Prisma.Decimal(updateDayreportDto.tdAmount ?? 0),
        tdAverage: new Prisma.Decimal(updateDayreportDto.tdAverage ?? 0),
        spillwayamount: new Prisma.Decimal(
          updateDayreportDto.spillwayamount ?? 0,
        ),
        spillwayaverage: new Prisma.Decimal(
          updateDayreportDto.spillwayaverage ?? 0,
        ),
        owramount: new Prisma.Decimal(updateDayreportDto.owramount ?? 0),
        owraverage: new Prisma.Decimal(updateDayreportDto.owraverage ?? 0),
        rainFall: new Prisma.Decimal(updateDayreportDto.rainFall ?? 0),
        netEnergyOutput: new Prisma.Decimal(
          updateDayreportDto.netEnergyOutput ?? 0,
        ),
        waterRate: new Prisma.Decimal(updateDayreportDto.waterRate ?? 0),
        totalOutflow: new Prisma.Decimal(updateDayreportDto.totalOutflow ?? 0),
        averageOutflow: new Prisma.Decimal(
          updateDayreportDto.averageOutflow ?? 0,
        ),

        // ✅ อัปเดต powerCurrent ที่เชื่อมกับ DayReportCurrent
        powerCurrent: {
          update: {
            totalPower,
            totalUnit: Number(totalUnit),
            remarks: remarks || [],
            originalTurbines: turbinedata as any[],
          },
        },
      },
    });

    // ✅ เพิ่ม DayReportHistorys ใหม่ (revision)
    const newHistory = await tx.dayReportHistory.create({
      data: {
        dayReportId: id,
        createdByUserId: user.id,
        activeStorageamount: new Prisma.Decimal(
          updateDayreportDto.activeStorageamount ?? 0,
        ),
        activeStorageaverage: new Prisma.Decimal(
          updateDayreportDto.activeStorageaverage ?? 0,
        ),
        waterLevel: new Prisma.Decimal(updateDayreportDto.waterLevel ?? 0),
        dwy: new Prisma.Decimal(updateDayreportDto.dwy ?? 0),
        dwf: new Prisma.Decimal(updateDayreportDto.dwf ?? 0),
        dwm: new Prisma.Decimal(updateDayreportDto.dwm ?? 0),
        pws: new Prisma.Decimal(updateDayreportDto.pws ?? 0),
        inflowamount: new Prisma.Decimal(updateDayreportDto.inflowamount ?? 0),
        inflowaverage: new Prisma.Decimal(
          updateDayreportDto.inflowaverage ?? 0,
        ),
        tdAmount: new Prisma.Decimal(updateDayreportDto.tdAmount ?? 0),
        tdAverage: new Prisma.Decimal(updateDayreportDto.tdAverage ?? 0),
        spillwayamount: new Prisma.Decimal(
          updateDayreportDto.spillwayamount ?? 0,
        ),
        spillwayaverage: new Prisma.Decimal(
          updateDayreportDto.spillwayaverage ?? 0,
        ),
        owramount: new Prisma.Decimal(updateDayreportDto.owramount ?? 0),
        owraverage: new Prisma.Decimal(updateDayreportDto.owraverage ?? 0),
        rainFall: new Prisma.Decimal(updateDayreportDto.rainFall ?? 0),
        netEnergyOutput: new Prisma.Decimal(
          updateDayreportDto.netEnergyOutput ?? 0,
        ),
        waterRate: new Prisma.Decimal(updateDayreportDto.waterRate ?? 0),
        totalOutflow: new Prisma.Decimal(updateDayreportDto.totalOutflow ?? 0),
        averageOutflow: new Prisma.Decimal(
          updateDayreportDto.averageOutflow ?? 0,
        ),
        powerHistory: {
          create: {
            totalPower: new Decimal(totalPower ?? 0),
            totalUnit: Number(totalUnit),
            remarks: remarks || [],
            originalTurbines: turbinedata as any[],
          },
        },
      },
      include: {
        powerHistory: true,
      },
    });

    return {
      statusCode: 200,
      message: 'DayReport updated successfully',
      updatedCurrentId: current.id,
      newHistoryId: newHistory.id,
    };
  });
}
