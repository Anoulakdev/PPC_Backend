import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateFueltypeDto } from '../dto/update-fueltype.dto';
import { NotFoundException } from '@nestjs/common';

export async function updateFuel(
  prisma: PrismaService,
  id: number,
  updateFueltypeDto: UpdateFueltypeDto,
) {
  const fueltype = await prisma.fuelType.findUnique({ where: { id } });
  if (!fueltype) throw new NotFoundException('fueltype not found');

  return prisma.fuelType.update({
    where: { id },
    data: updateFueltypeDto,
  });
}
