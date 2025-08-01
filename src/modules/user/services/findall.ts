/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaService } from '../../../prisma/prisma.service';
import * as moment from 'moment-timezone';

export async function findAllUser(prisma: PrismaService) {
  const users = await prisma.user.findMany({
    include: {
      role: true,
      company: true,
      powers: {
        select: {
          power: true,
        },
        orderBy: {
          powerId: 'asc', // หรือเปลี่ยนเป็น 'power.id' ถ้าใช้ nested order (เฉพาะบางกรณี)
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return users.map(({ password, ...user }) => {
    return {
      ...user,
      createdAt: moment(user.createdAt).tz('Asia/Vientiane').format(),
      updatedAt: moment(user.updatedAt).tz('Asia/Vientiane').format(),
    };
  });
}
