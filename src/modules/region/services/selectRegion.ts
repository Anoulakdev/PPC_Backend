import { PrismaService } from '../../../prisma/prisma.service';

export async function selectRegion(prisma: PrismaService) {
  return prisma.region.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
