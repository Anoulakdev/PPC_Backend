import { PrismaService } from '../../../prisma/prisma.service';

export async function findAllVoltage(prisma: PrismaService) {
  return prisma.voltage.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
