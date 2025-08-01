import { PrismaService } from '../../../prisma/prisma.service';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function checkPowerMonth(
  prisma: PrismaService,
  user: AuthUser,
  powerId: number,
  sYear: string,
  sMonth: string,
) {
  return await prisma.monthPower.findMany({
    where: {
      powerId: Number(powerId),
      sYear: sYear,
      sMonth: `${String(sMonth).padStart(2, '0')}`,
    },
  });
}
