import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMaintenanceDto } from '../dto/create-maintenance.dto';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as fs from 'fs';
import * as path from 'path';

export async function createMaintenance(
  prisma: PrismaService,
  user: AuthUser,
  createMaintenanceDto: CreateMaintenanceDto,
  Maintenancefilename?: string,
) {
  try {
    return await prisma.maintenancePlan.create({
      data: {
        ...createMaintenanceDto,
        powerId: Number(createMaintenanceDto.powerId),
        createdByUserId: user.id,
        startDate: new Date(createMaintenanceDto.startDate),
        endDate: new Date(createMaintenanceDto.endDate),
        startTime: createMaintenanceDto.startTime,
        endTime: createMaintenanceDto.endTime,
        partAdd: user.roleId === 4 ? 1 : 2,
      },
    });
  } catch (error) {
    if (Maintenancefilename) {
      const filePath = path.resolve(
        process.env.UPLOAD_BASE_PATH || '',
        'maintenance',
        Maintenancefilename,
      );

      try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        await fs.promises.unlink(filePath);
      } catch (fsError) {
        console.error('Error deleting uploaded image:', fsError);
      }
    }
    throw error;
  }
}
