import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateRegionDto } from '../dto/update-region.dto';
import { NotFoundException } from '@nestjs/common';

export async function updateRegion(
  prisma: PrismaService,
  id: number,
  updateRegionDto: UpdateRegionDto,
) {
  const region = await prisma.region.findUnique({ where: { id } });
  if (!region) throw new NotFoundException('region not found');

  return prisma.region.update({
    where: { id },
    data: updateRegionDto,
  });
}
