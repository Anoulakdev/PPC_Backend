import { Module } from '@nestjs/common';
import { DaypowerService } from './daypower.service';
import { DaypowerController } from './daypower.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [DaypowerController],
  providers: [DaypowerService, PrismaService],
})
export class DaypowerModule {}
