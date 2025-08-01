import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneRegion(prisma: PrismaService, id: number) {
  const region = await prisma.region.findUnique({ where: { id } });
  if (!region) throw new NotFoundException('region not found');
  return region;
}
