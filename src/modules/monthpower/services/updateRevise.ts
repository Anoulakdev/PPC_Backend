import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { UpdateMonthpowerDto } from '../dto/update-monthpower.dto';

export async function updateRevise(
  prisma: PrismaService,
  id: number,
  user: AuthUser,
  updateMonthpowerDto: UpdateMonthpowerDto,
) {
  const { totalPower, totalDate, turbinedata, remark, remarks } =
    updateMonthpowerDto;

  const monthpower = await prisma.monthPower.findUnique({
    where: { id },
  });

  if (!monthpower) {
    throw new NotFoundException('MonthPower not found');
  }

  await prisma.$transaction(async (tx) => {
    // ✅ อัปเดต monthCurrent
    await tx.monthCurrent.update({
      where: { monthPowerId: id },
      data: {
        totalPower,
        totalDate,
        remark,
        remarks: remarks || [],
        currentTurbines: turbinedata as any[],
      },
    });

    // ✅ สร้าง monthRevise
    const newRevise = await tx.monthRevise.create({
      data: {
        monthPowerId: id,
        reviseUserId: user.id,
      },
    });

    // ✅ สร้าง monthReviseDetail
    await tx.monthReviseDetail.create({
      data: {
        monthreviseId: newRevise.id,
        totalPower: Number(totalPower),
        totalDate: Number(totalDate),
        remark,
        remarks: remarks || [],
        reviseTurbines: turbinedata as any[],
      },
    });

    // ✅ อัปเดต monthPower ตาม role ของ user
    if (user.roleId === 6) {
      await tx.monthPower.update({
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
      await tx.monthPower.update({
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
    message: 'monthPower updated, and revise created successfully.',
  };
}
