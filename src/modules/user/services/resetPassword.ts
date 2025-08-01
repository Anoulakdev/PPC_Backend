import { HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

export async function resetPassword(prisma: PrismaService, id: number) {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const hashedPassword = await bcrypt.hash('PPCD1234', 10);

  await prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
  });

  return {
    statusCode: HttpStatus.OK,
    message: 'Reset password successfully',
  };
}
