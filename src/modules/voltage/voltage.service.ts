import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateVoltageDto } from './dto/create-voltage.dto';
import { UpdateVoltageDto } from './dto/update-voltage.dto';
import { createVoltage } from './services/create';
import { findAllVoltage } from './services/findall';
import { findOneVoltage } from './services/findone';
import { updateVoltage } from './services/update';
import { removeVoltage } from './services/remove';
import { selectVoltage } from './services/selectVoltage';

@Injectable()
export class VoltageService {
  constructor(private prisma: PrismaService) {}

  create(createVoltageDto: CreateVoltageDto) {
    return createVoltage(this.prisma, createVoltageDto);
  }

  findAll() {
    return findAllVoltage(this.prisma);
  }

  selectVoltage() {
    return selectVoltage(this.prisma);
  }

  findOne(id: number) {
    return findOneVoltage(this.prisma, id);
  }

  update(id: number, updateVoltageDto: UpdateVoltageDto) {
    return updateVoltage(this.prisma, id, updateVoltageDto);
  }

  remove(id: number) {
    return removeVoltage(this.prisma, id);
  }
}
