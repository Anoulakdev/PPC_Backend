import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';

export async function findOnePower(prisma: PrismaService, id: number) {
  const power = await prisma.power.findUnique({
    where: { id },
    include: {
      company: true,
      voltage: true,
      fuel: true,
      contract: true,
      branch: true,
      region: true,
      owner: true,
    },
  });
  if (!power) throw new NotFoundException('power not found');
  return {
    ...power,
    codDate: moment(power.codDate).tz('Asia/Vientiane').format('YYYY-MM-DD'),
  };
}
