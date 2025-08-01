import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function findOneCompany(prisma: PrismaService, id: number) {
  const company = await prisma.company.findUnique({ where: { id } });
  if (!company) throw new NotFoundException('company not found');
  return company;
}
