import { PrismaService } from '../../../prisma/prisma.service';

export async function findAllBranch(prisma: PrismaService) {
  return prisma.branch.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
