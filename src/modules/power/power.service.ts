import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePowerDto } from './dto/create-power.dto';
import { UpdatePowerDto } from './dto/update-power.dto';
import { createPower } from './services/create';
import { findAllPower } from './services/findall';
import { findOnePower } from './services/findone';
import { updatePower } from './services/update';
import { updateBossAcknow } from './services/updateBossAcknow';
import { removePower } from './services/remove';
import { selectPower } from './services/selectPower';

@Injectable()
export class PowerService {
  constructor(private prisma: PrismaService) {}

  create(createPowerDto: CreatePowerDto, imgFilename?: string) {
    return createPower(this.prisma, createPowerDto, imgFilename);
  }

  findAll(companyId?: number) {
    return findAllPower(this.prisma, companyId);
  }

  selectPower(companyId?: number) {
    return selectPower(this.prisma, companyId);
  }

  findOne(id: number) {
    return findOnePower(this.prisma, id);
  }

  update(id: number, updatePowerDto: UpdatePowerDto) {
    return updatePower(this.prisma, id, updatePowerDto);
  }

  updateBossAcknow(id: number, bossacknow: boolean) {
    return updateBossAcknow(this.prisma, id, bossacknow);
  }

  remove(id: number) {
    return removePower(this.prisma, id);
  }
}
