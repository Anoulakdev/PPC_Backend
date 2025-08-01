import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { UpdateDaypowerDto } from '../dto/update-daypower.dto';

export async function updateRevise(
  prisma: PrismaService,
  id: number,
  user: AuthUser,
  updateDaypowerDto: UpdateDaypowerDto,
) {
  const { totalPower, totalUnit, turbinedata, remark, remarks } =
    updateDaypowerDto;

  const daypower = await prisma.dayPower.findUnique({
    where: { id },
  });

  if (!daypower) {
    throw new NotFoundException('DayPower not found');
  }

  await prisma.$transaction(async (tx) => {
    // ✅ อัปเดต DayCurrent
    await tx.dayCurrent.update({
      where: { dayPowerId: id },
      data: {
        totalPower,
        totalUnit,
        remark,
        remarks: remarks || [],
        currentTurbines: turbinedata as any[],
      },
    });

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
          disAcknowUserId: null,
          disAcknow: false,
        },
      });
    } else {
      await tx.dayPower.update({
        where: { id },
        data: {
          revise: true,
          decAcknowUserId: null,
          decAcknow: false,
          disAcknowUserId: user.id,
          disAcknow: true,
        },
      });
    }
  });

  return {
    statusCode: HttpStatus.OK,
    message: 'DayPower updated, and revise created successfully.',
  };
}
