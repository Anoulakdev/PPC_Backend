import { PrismaService } from '../../../prisma/prisma.service';

export async function selectContract(prisma: PrismaService) {
  return prisma.contract.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
