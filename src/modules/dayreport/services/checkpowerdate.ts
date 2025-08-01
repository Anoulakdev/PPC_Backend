import { PrismaService } from '../../../prisma/prisma.service';

export async function checkPowerDate(
  prisma: PrismaService,
  powerId: number,
  powerDate: string,
) {
  return await prisma.dayReport.findMany({
    where: {
      powerId: Number(powerId),
      powerDate: new Date(powerDate),
    },
  });
}
