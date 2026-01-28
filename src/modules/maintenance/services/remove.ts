import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export async function removeMaintenance(prisma: PrismaService, id: number) {
  const maintenance = await prisma.maintenancePlan.findUnique({
    where: { id },
  });
  if (!maintenance) throw new NotFoundException('maintenance not found');

  if (maintenance.maintenanceFile) {
    const filePath = path.resolve(
      process.env.UPLOAD_BASE_PATH || '',
      'maintenance',
      maintenance.maintenanceFile,
    );

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting image:', err);
          }
        });
      }
    });
  }

  await prisma.maintenancePlan.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'maintenance deleted successfully',
  };
}
