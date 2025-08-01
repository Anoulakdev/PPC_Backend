import { PrismaService } from '../../../prisma/prisma.service';

export async function findAllOwner(prisma: PrismaService) {
  return prisma.owner.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
