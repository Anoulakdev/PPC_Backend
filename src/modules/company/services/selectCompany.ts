import { PrismaService } from '../../../prisma/prisma.service';

export async function selectCompany(prisma: PrismaService) {
  return prisma.company.findMany({
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      name: true,
    },
  });
}
