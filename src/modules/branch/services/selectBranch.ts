import { PrismaService } from '../../../prisma/prisma.service';

export async function selectBranch(prisma: PrismaService) {
  return prisma.branch.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
