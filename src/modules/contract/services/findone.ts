import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneContract(prisma: PrismaService, id: number) {
  const contract = await prisma.contract.findUnique({ where: { id } });
  if (!contract) throw new NotFoundException('contract not found');
  return contract;
}
