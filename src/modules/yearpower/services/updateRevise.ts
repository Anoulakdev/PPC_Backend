import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import { UpdateYearpowerDto } from '../dto/update-yearpower.dto';

export async function updateRevise(
  prisma: PrismaService,
  id: number,
  user: AuthUser,
  updateYearpowerDto: UpdateYearpowerDto,
) {
  const { turbinedata } = updateYearpowerDto;

  const yearpower = await prisma.yearPower.findUnique({
    where: { id },
  });

  if (!yearpower) {
    throw new NotFoundException('YearPower not found');
  }

  await prisma.$transaction(async (tx) => {
    if (user.roleId === 6) {
      // ✅ อัปเดต yearOriginal
      await tx.yearOriginal.update({
        where: { yearPowerId: id },
        data: {
          originalTurbines: turbinedata as any[],
        },
      });
      // ✅ อัปเดต yearCurrent
      await tx.yearCurrent.update({
        where: { yearPowerId: id },
        data: {
          currentTurbines: turbinedata as any[],
        },
      });
    } else {
      // ✅ อัปเดต yearCurrent
      await tx.yearCurrent.update({
        where: { yearPowerId: id },
        data: {
          currentTurbines: turbinedata as any[],
        },
      });
    }

    // ✅ สร้าง yearRevise
    const newRevise = await tx.yearRevise.create({
      data: {
        yearPowerId: id,
        reviseUserId: user.id,
      },
    });

    // ✅ สร้าง yearReviseDetail
    await tx.yearReviseDetail.create({
      data: {
        yearreviseId: newRevise.id,
        reviseTurbines: turbinedata as any[],
      },
    });

    // ✅ อัปเดต yearPower ตาม role ของ user
    if (user.roleId === 6) {
      await tx.yearPower.update({
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
      await tx.yearPower.update({
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
    message: 'yearPower updated, and revise created successfully.',
  };
}
