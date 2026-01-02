import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { UpdateWeekpowerDto } from '../dto/update-weekpower.dto';

export async function updateRevise(
  prisma: PrismaService,
  id: number,
  user: AuthUser,
  updateWeekpowerDto: UpdateWeekpowerDto,
) {
  const { totalPower, totalDate, turbinedata, remark, remarks } =
    updateWeekpowerDto;

  const weekpower = await prisma.weekPower.findUnique({
    where: { id },
  });

  if (!weekpower) {
    throw new NotFoundException('weekPower not found');
  }

  await prisma.$transaction(async (tx) => {
    if (user.roleId === 6) {
      // ✅ อัปเดต weekOriginal
      await tx.weekOriginal.update({
        where: { weekPowerId: id },
        data: {
          totalPower,
          totalDate,
          remark,
          remarks: remarks || [],
          originalTurbines: turbinedata as any[],
        },
      });

      // ✅ อัปเดต weekCurrent
      await tx.weekCurrent.update({
        where: { weekPowerId: id },
        data: {
          totalPower,
          totalDate,
          remark,
          remarks: remarks || [],
          currentTurbines: turbinedata as any[],
        },
      });
    } else {
      // ✅ อัปเดต weekCurrent
      await tx.weekCurrent.update({
        where: { weekPowerId: id },
        data: {
          totalPower,
          totalDate,
          remark,
          remarks: remarks || [],
          currentTurbines: turbinedata as any[],
        },
      });
    }

    // ✅ สร้าง weekRevise
    const newRevise = await tx.weekRevise.create({
      data: {
        weekPowerId: id,
        reviseUserId: user.id,
      },
    });

    // ✅ สร้าง weekReviseDetail
    await tx.weekReviseDetail.create({
      data: {
        weekreviseId: newRevise.id,
        totalPower: Number(totalPower),
        totalDate: Number(totalDate),
        remark,
        remarks: remarks || [],
        reviseTurbines: turbinedata as any[],
      },
    });

    // ✅ อัปเดต weekPower ตาม role ของ user
    if (user.roleId === 6) {
      await tx.weekPower.update({
        where: { id },
        data: {
          revise: true,
          decAcknowUserId: user.id,
          decAcknow: true,
          decACknowAt: new Date(),
          disAcknowUserId: null,
          disAcknow: false,
          disAcknowAt: null,
        },
      });
    } else {
      await tx.weekPower.update({
        where: { id },
        data: {
          revise: true,
          decAcknowUserId: null,
          decAcknow: false,
          decACknowAt: null,
          disAcknowUserId: user.id,
          disAcknow: true,
          disAcknowAt: new Date(),
        },
      });
    }
  });

  return {
    statusCode: HttpStatus.OK,
    message: 'weekPower updated, and revise created successfully.',
  };
}
