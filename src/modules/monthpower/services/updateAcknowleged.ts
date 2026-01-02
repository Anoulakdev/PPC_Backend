import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function updateAcknowleged(
  prisma: PrismaService,
  id: number,
  user: AuthUser,
) {
  const monthpower = await prisma.monthPower.findUnique({
    where: { id },
  });

  if (!monthpower) throw new NotFoundException('monthpower not found');

  const isDec = user.roleId === 6;

  const updated = await prisma.monthPower.update({
    where: { id },
    data: isDec
      ? { decAcknowUserId: user.id, decAcknow: true, decACknowAt: new Date() }
      : { disAcknowUserId: user.id, disAcknow: true, disAcknowAt: new Date() },
  });

  return {
    statusCode: HttpStatus.OK,
    message: `Acknowledged by ${isDec ? 'Power' : 'EDL'} successfully`,
    data: updated,
  };
}
