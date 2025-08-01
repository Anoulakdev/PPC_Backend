import { PrismaService } from '../../../prisma/prisma.service';

export async function selectOwner(prisma: PrismaService) {
  return prisma.owner.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
