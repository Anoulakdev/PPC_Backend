import { PrismaService } from '../../../prisma/prisma.service';
import { CreatePowerDto } from '../dto/create-power.dto';
import * as fs from 'fs';
import * as path from 'path';

export async function createPower(
  prisma: PrismaService,
  createPowerDto: CreatePowerDto,
  Imgfilename?: string,
) {
  try {
    return await prisma.power.create({
      data: {
        ...createPowerDto,
        companyId: Number(createPowerDto.companyId),
        unit: Number(createPowerDto.unit),
        voltageId: createPowerDto.voltageId
          ? Number(createPowerDto.voltageId)
          : null,
        fuelId: createPowerDto.fuelId ? Number(createPowerDto.fuelId) : null,
        contractId: createPowerDto.contractId
          ? Number(createPowerDto.contractId)
          : null,
        branchId: createPowerDto.branchId
          ? Number(createPowerDto.branchId)
          : null,
        regionId: createPowerDto.regionId
          ? Number(createPowerDto.regionId)
          : null,
        ownerId: createPowerDto.ownerId ? Number(createPowerDto.ownerId) : null,
        latitude:
          createPowerDto.latitude !== undefined &&
          createPowerDto.latitude !== null
            ? Number(createPowerDto.latitude)
            : null,
        longitude:
          createPowerDto.longitude !== undefined &&
          createPowerDto.longitude !== null
            ? Number(createPowerDto.longitude)
            : null,
        codDate: createPowerDto.codDate
          ? new Date(createPowerDto.codDate)
          : null,
      },
    });
  } catch (error) {
    if (Imgfilename) {
      const filePath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'uploads',
        'power',
        Imgfilename,
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
