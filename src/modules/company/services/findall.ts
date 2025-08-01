import { PrismaService } from '../../../prisma/prisma.service';

export async function findAllCompany(prisma: PrismaService) {
  return prisma.company.findMany({
    orderBy: {
      id: 'desc',
    },
  });
}
