import { PrismaService } from '../../../prisma/prisma.service';

export async function findAllContract(prisma: PrismaService) {
  return prisma.contract.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
