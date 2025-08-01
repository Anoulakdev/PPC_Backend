import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { createRegion } from './services/create';
import { findAllRegion } from './services/findall';
import { findOneRegion } from './services/findone';
import { updateRegion } from './services/update';
import { removeRegion } from './services/remove';
import { selectRegion } from './services/selectRegion';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService) {}

  create(createRegionDto: CreateRegionDto) {
    return createRegion(this.prisma, createRegionDto);
  }

  findAll() {
    return findAllRegion(this.prisma);
  }

  selectRegion() {
    return selectRegion(this.prisma);
  }

  findOne(id: number) {
    return findOneRegion(this.prisma, id);
  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    return updateRegion(this.prisma, id, updateRegionDto);
  }

  remove(id: number) {
    return removeRegion(this.prisma, id);
  }
}
