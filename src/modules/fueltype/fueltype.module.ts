import { Module } from '@nestjs/common';
import { FueltypeService } from './fueltype.service';
import { FueltypeController } from './fueltype.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [FueltypeController],
  providers: [FueltypeService, PrismaService],
})
export class FueltypeModule {}
