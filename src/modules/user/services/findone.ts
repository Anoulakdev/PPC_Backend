/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';

export async function findOneUser(prisma: PrismaService, id: number) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      role: true,
      company: true,
      powers: {
        select: {
          power: true,
        },
      },
    },
  });
  if (!user) throw new NotFoundException('user not found');
  const { password, ...safeUser } = user;

  return {
    ...safeUser,
    createdAt: moment(user.createdAt).tz('Asia/Vientiane').format(),
    updatedAt: moment(user.updatedAt).tz('Asia/Vientiane').format(),
  };
}
