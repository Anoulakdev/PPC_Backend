import { Module } from '@nestjs/common';
import { WeekpowerService } from './weekpower.service';
import { WeekpowerController } from './weekpower.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [WeekpowerController],
  providers: [WeekpowerService, PrismaService],
})
export class WeekpowerModule {}
