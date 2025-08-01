import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFueltypeDto } from './dto/create-fueltype.dto';
import { UpdateFueltypeDto } from './dto/update-fueltype.dto';
import { createFuel } from './services/create';
import { findAllFuel } from './services/findall';
import { findOneFuel } from './services/findone';
import { updateFuel } from './services/update';
import { removeFuel } from './services/remove';
import { selectFuel } from './services/selectFuel';

@Injectable()
export class FueltypeService {
  constructor(private prisma: PrismaService) {}

  create(createFueltypeDto: CreateFueltypeDto) {
    return createFuel(this.prisma, createFueltypeDto);
  }

  findAll() {
    return findAllFuel(this.prisma);
  }

  selectFuel() {
    return selectFuel(this.prisma);
  }

  findOne(id: number) {
    return findOneFuel(this.prisma, id);
  }

  update(id: number, updateFueltypeDto: UpdateFueltypeDto) {
    return updateFuel(this.prisma, id, updateFueltypeDto);
  }

  remove(id: number) {
    return removeFuel(this.prisma, id);
  }
}
