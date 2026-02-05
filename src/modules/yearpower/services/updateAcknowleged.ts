import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { AuthUser } from '../../../interfaces/auth-user.interface';

export async function updateAcknowleged(
  prisma: PrismaService,
  id: number,
  user: AuthUser,
) {
  const yearpower = await prisma.yearPower.findUnique({
    where: { id },
  });

  if (!yearpower) throw new NotFoundException('yearpower not found');

  const isDec = user.roleId === 6;

  const updated = await prisma.yearPower.update({
    where: { id },
    data: isDec
      ? { decAcknowUserId: user.id, decAcknow: true, decAcknowAt: new Date() }
      : { disAcknowUserId: user.id, disAcknow: true, disAcknowAt: new Date() },
  });

  return {
    statusCode: HttpStatus.OK,
    message: `Acknowledged by ${isDec ? 'Power' : 'EDL'} successfully`,
    data: updated,
  };
}
