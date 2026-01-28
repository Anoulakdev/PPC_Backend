import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateMaintenanceDto } from '../dto/update-maintenance.dto';
import { NotFoundException } from '@nestjs/common';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as fs from 'fs';
import * as path from 'path';

export async function updateMaintenance(
  prisma: PrismaService,
  user: AuthUser,
  id: number,
  updateMaintenanceDto: UpdateMaintenanceDto,
) {
  const maintenance = await prisma.maintenancePlan.findUnique({
    where: { id },
  });
  if (!maintenance) throw new NotFoundException('maintenance not found');

  const oldFile = maintenance.maintenanceFile || '';

  if (
    updateMaintenanceDto.maintenanceFile &&
    updateMaintenanceDto.maintenanceFile !== oldFile
  ) {
    const oldFilePath = path.resolve(
      process.env.UPLOAD_BASE_PATH || '',
      'maintenance',
      oldFile,
    );

    // ตรวจสอบว่าไฟล์มีอยู่หรือไม่ก่อนจะลบ
    fs.access(oldFilePath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(oldFilePath, (err) => {
          if (err) {
            console.error('Error deleting old image:', err);
          }
        });
      }
    });
  } else {
    // ✅ ถ้าไม่มีรูปใหม่ ให้ใช้รูปเก่า
    updateMaintenanceDto.maintenanceFile = oldFile;
  }

  return await prisma.maintenancePlan.update({
    where: { id },
    data: {
      ...updateMaintenanceDto,
      powerId: Number(updateMaintenanceDto.powerId),
      createdByUserId: user.id,
      startDate: updateMaintenanceDto.startDate
        ? new Date(updateMaintenanceDto.startDate)
        : undefined,
      endDate: updateMaintenanceDto.endDate
        ? new Date(updateMaintenanceDto.endDate)
        : undefined,
      startTime: updateMaintenanceDto.startTime,
      endTime: updateMaintenanceDto.endTime,
    },
  });
}
