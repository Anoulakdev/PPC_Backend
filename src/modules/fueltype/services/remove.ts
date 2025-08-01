import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeFuel(prisma: PrismaService, id: number) {
  const fueltype = await prisma.fuelType.findUnique({ where: { id } });
  if (!fueltype) throw new NotFoundException('fueltype not found');

  await prisma.fuelType.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'fueltype deleted successfully',
  };
}
