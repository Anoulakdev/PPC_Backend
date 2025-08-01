import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateOwnerDto } from '../dto/update-owner.dto';
import { NotFoundException } from '@nestjs/common';

export async function updateOwner(
  prisma: PrismaService,
  id: number,
  updateOwnerDto: UpdateOwnerDto,
) {
  const owner = await prisma.owner.findUnique({ where: { id } });
  if (!owner) throw new NotFoundException('owner not found');

  return prisma.owner.update({
    where: { id },
    data: updateOwnerDto,
  });
}
