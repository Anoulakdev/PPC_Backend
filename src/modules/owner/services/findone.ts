import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneOwner(prisma: PrismaService, id: number) {
  const owner = await prisma.owner.findUnique({ where: { id } });
  if (!owner) throw new NotFoundException('owner not found');
  return owner;
}
