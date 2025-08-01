import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeContract(prisma: PrismaService, id: number) {
  const contract = await prisma.contract.findUnique({ where: { id } });
  if (!contract) throw new NotFoundException('contract not found');

  await prisma.contract.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'contract deleted successfully',
  };
}
