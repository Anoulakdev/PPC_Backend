import { PrismaService } from '../../../prisma/prisma.service';

export async function findAllRegion(prisma: PrismaService) {
  return prisma.region.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
