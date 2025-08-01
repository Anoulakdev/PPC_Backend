import { Module } from '@nestjs/common';
import { PowerService } from './power.service';
import { PowerController } from './power.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [PowerController],
  providers: [PowerService, PrismaService],
})
export class PowerModule {}
