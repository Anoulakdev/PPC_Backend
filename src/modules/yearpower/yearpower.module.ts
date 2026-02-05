import { Module } from '@nestjs/common';
import { YearpowerService } from './yearpower.service';
import { YearpowerController } from './yearpower.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [YearpowerController],
  providers: [YearpowerService, PrismaService],
})
export class YearpowerModule {}
