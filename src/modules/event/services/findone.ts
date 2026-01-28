import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';

export async function findOneEvent(prisma: PrismaService, id: number) {
  const event = await prisma.eventReport.findUnique({
    where: { id },
    include: {
      power: {
        select: {
          id: true,
          name: true,
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      createdByUser: {
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
        },
      },
    },
  });
  if (!event) throw new NotFoundException('event not found');
  return {
    ...event,
    startDate: moment(event.startDate)
      .tz('Asia/Vientiane')
      .format('YYYY-MM-DD'),
    endDate: moment(event.endDate).tz('Asia/Vientiane').format('YYYY-MM-DD'),
  };
}
