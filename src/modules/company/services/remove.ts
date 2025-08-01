import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeCompany(prisma: PrismaService, id: number) {
  const company = await prisma.company.findUnique({ where: { id } });
  if (!company) throw new NotFoundException('company not found');

  await prisma.company.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'company deleted successfully',
  };
}
