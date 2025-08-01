import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOnePower(prisma: PrismaService, id: number) {
  const power = await prisma.power.findUnique({ where: { id } });
  if (!power) throw new NotFoundException('power not found');
  return power;
}
