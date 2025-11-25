import { PrismaService } from '../../../prisma/prisma.service';

export async function findPower(prisma: PrismaService, powerId: number) {
  return await prisma.dayPower.findFirst({
    where: {
      powerId: Number(powerId),
    },
    orderBy: {
      powerDate: 'desc',
    },
    include: {
      powerCurrent: true,
    },
  });
}
