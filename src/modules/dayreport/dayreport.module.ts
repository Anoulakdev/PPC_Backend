import { Module } from '@nestjs/common';
import { DayreportService } from './dayreport.service';
import { DayreportController } from './dayreport.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [DayreportController],
  providers: [DayreportService, PrismaService],
})
export class DayreportModule {}
