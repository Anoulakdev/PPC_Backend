import { PrismaService } from '../../../prisma/prisma.service';

export async function selectFuel(prisma: PrismaService) {
  return prisma.fuelType.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
