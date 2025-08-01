import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeRegion(prisma: PrismaService, id: number) {
  const region = await prisma.region.findUnique({ where: { id } });
  if (!region) throw new NotFoundException('region not found');

  await prisma.region.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'region deleted successfully',
  };
}
