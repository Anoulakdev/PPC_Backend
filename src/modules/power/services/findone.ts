import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOnePower(prisma: PrismaService, id: number) {
  const power = await prisma.power.findUnique({
    where: { id },
    include: {
      company: true,
      voltage: true,
      fuel: true,
      contract: true,
      branch: true,
      region: true,
      owner: true,
    },
  });
  if (!power) throw new NotFoundException('power not found');
  return power;
}
