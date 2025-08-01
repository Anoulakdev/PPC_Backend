import { PrismaService } from '../../../prisma/prisma.service';

export async function selectVoltage(prisma: PrismaService) {
  return prisma.voltage.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}
