import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function removeOwner(prisma: PrismaService, id: number) {
  const owner = await prisma.owner.findUnique({ where: { id } });
  if (!owner) throw new NotFoundException('owner not found');

  await prisma.owner.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'owner deleted successfully',
  };
}
