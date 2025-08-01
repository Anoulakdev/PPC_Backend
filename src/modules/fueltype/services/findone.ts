import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneFuel(prisma: PrismaService, id: number) {
  const fueltype = await prisma.fuelType.findUnique({ where: { id } });
  if (!fueltype) throw new NotFoundException('fueltype not found');
  return fueltype;
}
