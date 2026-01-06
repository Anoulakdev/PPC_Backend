import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { UpdateDaypowerDto } from '../dto/update-daypower.dto';
import { Prisma } from '@prisma/client';

export async function updateRevise(
  prisma: PrismaService,
  id: number,
  user: AuthUser,
  updateDaypowerDto: UpdateDaypowerDto,
) {
  const { totalPower, totalUnit, machinedata, turbinedata, remark, remarks } =
    updateDaypowerDto;

  const daypower = await prisma.dayPower.findUnique({
    where: { id },
  });

  if (!daypower) {
    throw new NotFoundException('DayPower not found');
  }

  await prisma.$transaction(async (tx) => {
    if (user.roleId === 6) {
      // ✅ อัปเดต DayOriginal
      await tx.dayOriginal.update({
        where: { dayPowerId: id },
        data: {
          upstreamLevel: new Prisma.Decimal(
            updateDaypowerDto.upstreamLevel || 0,
          ),
          downstreamLevel: new Prisma.Decimal(
            updateDaypowerDto.downstreamLevel || 0,
          ),
          totalStorageamount: new Prisma.Decimal(
            updateDaypowerDto.totalStorageamount || 0,
          ),
          totalStorageaverage: new Prisma.Decimal(
            updateDaypowerDto.totalStorageaverage || 0,
          ),
          activeStorageamount: new Prisma.Decimal(
            updateDaypowerDto.activeStorageamount || 0,
          ),
          activeStorageaverage: new Prisma.Decimal(
            updateDaypowerDto.activeStorageaverage || 0,
          ),
          turbineDischargeamount: new Prisma.Decimal(
            updateDaypowerDto.turbineDischargeamount || 0,
          ),
          turbineDischargeaverage: new Prisma.Decimal(
            updateDaypowerDto.turbineDischargeaverage || 0,
          ),
          spillwayDischargeamount: new Prisma.Decimal(
            updateDaypowerDto.spillwayDischargeamount || 0,
          ),
          spillwayDischargeaverage: new Prisma.Decimal(
            updateDaypowerDto.spillwayDischargeaverage || 0,
          ),
          ecologicalDischargeamount: new Prisma.Decimal(
            updateDaypowerDto.ecologicalDischargeamount || 0,
          ),
          ecologicalDischargeaverage: new Prisma.Decimal(
            updateDaypowerDto.ecologicalDischargeaverage || 0,
          ),
          totalDischargeamount: new Prisma.Decimal(
            updateDaypowerDto.totalDischargeamount || 0,
          ),
          totalDischargeaverage: new Prisma.Decimal(
            updateDaypowerDto.totalDischargeaverage || 0,
          ),
          machinesAvailability: machinedata as any[],
          totalPower,
          totalUnit,
          remark,
          remarks: remarks || [],
          originalTurbines: turbinedata as any[],
        },
      });

      // ✅ อัปเดต DayCurrent
      await tx.dayCurrent.update({
        where: { dayPowerId: id },
        data: {
          upstreamLevel: new Prisma.Decimal(
            updateDaypowerDto.upstreamLevel || 0,
          ),
          downstreamLevel: new Prisma.Decimal(
            updateDaypowerDto.downstreamLevel || 0,
          ),
          totalStorageamount: new Prisma.Decimal(
            updateDaypowerDto.totalStorageamount || 0,
          ),
          totalStorageaverage: new Prisma.Decimal(
            updateDaypowerDto.totalStorageaverage || 0,
          ),
          activeStorageamount: new Prisma.Decimal(
            updateDaypowerDto.activeStorageamount || 0,
          ),
          activeStorageaverage: new Prisma.Decimal(
            updateDaypowerDto.activeStorageaverage || 0,
          ),
          turbineDischargeamount: new Prisma.Decimal(
            updateDaypowerDto.turbineDischargeamount || 0,
          ),
          turbineDischargeaverage: new Prisma.Decimal(
            updateDaypowerDto.turbineDischargeaverage || 0,
          ),
          spillwayDischargeamount: new Prisma.Decimal(
            updateDaypowerDto.spillwayDischargeamount || 0,
          ),
          spillwayDischargeaverage: new Prisma.Decimal(
            updateDaypowerDto.spillwayDischargeaverage || 0,
          ),
          ecologicalDischargeamount: new Prisma.Decimal(
            updateDaypowerDto.ecologicalDischargeamount || 0,
          ),
          ecologicalDischargeaverage: new Prisma.Decimal(
            updateDaypowerDto.ecologicalDischargeaverage || 0,
          ),
          totalDischargeamount: new Prisma.Decimal(
            updateDaypowerDto.totalDischargeamount || 0,
          ),
          totalDischargeaverage: new Prisma.Decimal(
            updateDaypowerDto.totalDischargeaverage || 0,
          ),
          machinesAvailability: machinedata as any[],
          totalPower,
          totalUnit,
          remark,
          remarks: remarks || [],
          currentTurbines: turbinedata as any[],
        },
      });
    } else {
      // ✅ อัปเดต DayCurrent
      await tx.dayCurrent.update({
        where: { dayPowerId: id },
        data: {
          upstreamLevel: new Prisma.Decimal(
            updateDaypowerDto.upstreamLevel || 0,
          ),
          downstreamLevel: new Prisma.Decimal(
            updateDaypowerDto.downstreamLevel || 0,
          ),
          totalStorageamount: new Prisma.Decimal(
            updateDaypowerDto.totalStorageamount || 0,
          ),
          totalStorageaverage: new Prisma.Decimal(
            updateDaypowerDto.totalStorageaverage || 0,
          ),
          activeStorageamount: new Prisma.Decimal(
            updateDaypowerDto.activeStorageamount || 0,
          ),
          activeStorageaverage: new Prisma.Decimal(
            updateDaypowerDto.activeStorageaverage || 0,
          ),
          turbineDischargeamount: new Prisma.Decimal(
            updateDaypowerDto.turbineDischargeamount || 0,
          ),
          turbineDischargeaverage: new Prisma.Decimal(
            updateDaypowerDto.turbineDischargeaverage || 0,
          ),
          spillwayDischargeamount: new Prisma.Decimal(
            updateDaypowerDto.spillwayDischargeamount || 0,
          ),
          spillwayDischargeaverage: new Prisma.Decimal(
            updateDaypowerDto.spillwayDischargeaverage || 0,
          ),
          ecologicalDischargeamount: new Prisma.Decimal(
            updateDaypowerDto.ecologicalDischargeamount || 0,
          ),
          ecologicalDischargeaverage: new Prisma.Decimal(
            updateDaypowerDto.ecologicalDischargeaverage || 0,
          ),
          totalDischargeamount: new Prisma.Decimal(
            updateDaypowerDto.totalDischargeamount || 0,
          ),
          totalDischargeaverage: new Prisma.Decimal(
            updateDaypowerDto.totalDischargeaverage || 0,
          ),
          machinesAvailability: machinedata as any[],
          totalPower,
          totalUnit,
          remark,
          remarks: remarks || [],
          currentTurbines: turbinedata as any[],
        },
      });
    }

    // ✅ สร้าง DayRevise
    const newRevise = await tx.dayRevise.create({
      data: {
        dayPowerId: id,
        reviseUserId: user.id,
      },
    });

    // ✅ สร้าง DayReviseDetail
    await tx.dayReviseDetail.create({
      data: {
        dayreviseId: newRevise.id,
        upstreamLevel: new Prisma.Decimal(updateDaypowerDto.upstreamLevel || 0),
        downstreamLevel: new Prisma.Decimal(
          updateDaypowerDto.downstreamLevel || 0,
        ),
        totalStorageamount: new Prisma.Decimal(
          updateDaypowerDto.totalStorageamount || 0,
        ),
        totalStorageaverage: new Prisma.Decimal(
          updateDaypowerDto.totalStorageaverage || 0,
        ),
        activeStorageamount: new Prisma.Decimal(
          updateDaypowerDto.activeStorageamount || 0,
        ),
        activeStorageaverage: new Prisma.Decimal(
          updateDaypowerDto.activeStorageaverage || 0,
        ),
        turbineDischargeamount: new Prisma.Decimal(
          updateDaypowerDto.turbineDischargeamount || 0,
        ),
        turbineDischargeaverage: new Prisma.Decimal(
          updateDaypowerDto.turbineDischargeaverage || 0,
        ),
        spillwayDischargeamount: new Prisma.Decimal(
          updateDaypowerDto.spillwayDischargeamount || 0,
        ),
        spillwayDischargeaverage: new Prisma.Decimal(
          updateDaypowerDto.spillwayDischargeaverage || 0,
        ),
        ecologicalDischargeamount: new Prisma.Decimal(
          updateDaypowerDto.ecologicalDischargeamount || 0,
        ),
        ecologicalDischargeaverage: new Prisma.Decimal(
          updateDaypowerDto.ecologicalDischargeaverage || 0,
        ),
        totalDischargeamount: new Prisma.Decimal(
          updateDaypowerDto.totalDischargeamount || 0,
        ),
        totalDischargeaverage: new Prisma.Decimal(
          updateDaypowerDto.totalDischargeaverage || 0,
        ),
        machinesAvailability: machinedata as any[],
        totalPower: Number(totalPower),
        totalUnit: Number(totalUnit),
        remark,
        remarks: remarks || [],
        reviseTurbines: turbinedata as any[],
      },
    });

    // ✅ อัปเดต DayPower ตาม role ของ user
    if (user.roleId === 6) {
      await tx.dayPower.update({
        where: { id },
        data: {
          revise: true,
          decAcknowUserId: user.id,
          decAcknow: true,
          decAcknowAt: new Date(),
          disAcknowUserId: null,
          disAcknow: false,
          disAcknowAt: null,
        },
      });
    } else {
      await tx.dayPower.update({
        where: { id },
        data: {
          revise: true,
          decAcknowUserId: null,
          decAcknow: false,
          decAcknowAt: null,
          disAcknowUserId: user.id,
          disAcknow: true,
          disAcknowAt: new Date(),
        },
      });
    }
  });

  return {
    statusCode: HttpStatus.OK,
    message: 'DayPower updated, and revise created successfully.',
  };
}
