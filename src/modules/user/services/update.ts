import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export async function updateUser(
  prisma: PrismaService,
  id: number,
  updateUserDto: UpdateUserDto,
) {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const oldImage = user.userimg || '';

  // ✅ ลบรูปเก่าเมื่อมีการอัปโหลดรูปใหม่
  if (updateUserDto.userimg && updateUserDto.userimg !== oldImage) {
    const oldImagePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'uploads',
      'user',
      oldImage,
    );

    // ตรวจสอบว่าไฟล์มีอยู่หรือไม่ก่อนจะลบ
    fs.access(oldImagePath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error('Error deleting old image:', err);
          }
        });
      }
    });
  } else {
    // ✅ ถ้าไม่มีรูปใหม่ ให้ใช้รูปเก่า
    updateUserDto.userimg = oldImage;
  }

  const { powerIds = [], ...rest } = updateUserDto;

  // ✅ อัปเดตข้อมูลในฐานข้อมูล
  return prisma.user.update({
    where: { id },
    data: {
      ...rest,
      roleId: Number(rest.roleId),
      companyId: Number(rest.companyId),
      powers: {
        deleteMany: {}, // ลบความสัมพันธ์เก่า
        create: powerIds.map((powerId) => ({
          power: { connect: { id: Number(powerId) } },
        })),
      },
    },
    include: {
      powers: true,
    },
  });
}
