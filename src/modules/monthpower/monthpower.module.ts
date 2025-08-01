import { Module } from '@nestjs/common';
import { MonthpowerService } from './monthpower.service';
import { MonthpowerController } from './monthpower.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [MonthpowerController],
  providers: [MonthpowerService, PrismaService],
})
export class MonthpowerModule {}
