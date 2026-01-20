import { HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

export async function updateBossAcknow(
  prisma: PrismaService,
  id: number,
  bossacknow: boolean,
) {
  const power = await prisma.power.findUnique({ where: { id } });

  if (!power) {
    throw new NotFoundException('Power not found');
  }

  await prisma.power.update({
    where: { id },
    data: { bossAcknow: bossacknow },
  });

  return {
    statusCode: HttpStatus.OK,
    message: 'Update status successfully',
  };
}
