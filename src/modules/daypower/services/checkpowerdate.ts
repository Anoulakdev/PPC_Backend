import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function checkPowerDate(
  prisma: PrismaService,
  user: AuthUser,
  powerId: number,
  powerDate: string,
) {
  return await prisma.dayPower.findMany({
    where: {
      powerId: Number(powerId),
      powerDate: new Date(powerDate),
    },
  });
}
