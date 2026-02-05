import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function checkPowerYear(
  prisma: PrismaService,
  user: AuthUser,
  powerId: number,
  sYear: string,
) {
  return await prisma.yearPower.findMany({
    where: {
      powerId: Number(powerId),
      sYear: sYear,
    },
  });
}
