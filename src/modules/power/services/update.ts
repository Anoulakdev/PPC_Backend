import { PrismaService } from '../../../prisma/prisma.service';
import { UpdatePowerDto } from '../dto/update-power.dto';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export async function updatePower(
  prisma: PrismaService,
  id: number,
  updatePowerDto: UpdatePowerDto,
) {
  const power = await prisma.power.findUnique({ where: { id } });
  if (!power) throw new NotFoundException('power not found');

  const oldImage = power.powerimg || '';

  if (updatePowerDto.powerimg && updatePowerDto.powerimg !== oldImage) {
    const oldImagePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'uploads',
      'power',
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
    updatePowerDto.powerimg = oldImage;
  }

  // ✅ อัปเดตข้อมูลในฐานข้อมูล
  return await prisma.power.update({
    where: { id },
    data: {
      ...updatePowerDto,
      companyId: Number(updatePowerDto.companyId),
      unit: Number(updatePowerDto.unit),
      voltageId: updatePowerDto.voltageId
        ? Number(updatePowerDto.voltageId)
        : null,
      fuelId: updatePowerDto.fuelId ? Number(updatePowerDto.fuelId) : null,
      contractId: updatePowerDto.contractId
        ? Number(updatePowerDto.contractId)
        : null,
      branchId: updatePowerDto.branchId
        ? Number(updatePowerDto.branchId)
        : null,
      regionId: updatePowerDto.regionId
        ? Number(updatePowerDto.regionId)
        : null,
      ownerId: updatePowerDto.ownerId ? Number(updatePowerDto.ownerId) : null,
      latitude:
        updatePowerDto.latitude !== undefined &&
        updatePowerDto.latitude !== null
          ? Number(updatePowerDto.latitude)
          : null,
      longitude:
        updatePowerDto.longitude !== undefined &&
        updatePowerDto.longitude !== null
          ? Number(updatePowerDto.longitude)
          : null,
      codDate: updatePowerDto.codDate ? new Date(updatePowerDto.codDate) : null,
    },
  });
}
