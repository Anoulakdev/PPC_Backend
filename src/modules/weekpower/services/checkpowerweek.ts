import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function checkPowerWeek(
  prisma: PrismaService,
  user: AuthUser,
  powerId: number,
  sYear: string,
  sWeek: string,
) {
  return await prisma.weekPower.findMany({
    where: {
      powerId: Number(powerId),
      sYear: sYear,
      sWeek: `${String(sWeek).padStart(2, '0')}`,
    },
  });
}
