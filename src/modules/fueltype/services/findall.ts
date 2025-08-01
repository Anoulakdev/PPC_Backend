import { PrismaService } from '../../../prisma/prisma.service';

export async function findAllFuel(prisma: PrismaService) {
  return prisma.fuelType.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
