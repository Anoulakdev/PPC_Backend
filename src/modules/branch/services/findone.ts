import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneBranch(prisma: PrismaService, id: number) {
  const branch = await prisma.branch.findUnique({ where: { id } });
  if (!branch) throw new NotFoundException('branch not found');
  return branch;
}
