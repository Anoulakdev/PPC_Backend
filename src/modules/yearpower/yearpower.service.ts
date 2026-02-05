import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateYearpowerDto } from './dto/create-yearpower.dto';
import { UpdateYearpowerDto } from './dto/update-yearpower.dto';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { createYearPower } from './services/create';
import { findAllYearPower } from './services/findall';
import { findAllDocument } from './services/findalldocument';
import { checkPowerYear } from './services/checkpoweryear';
import { findOneYearPower } from './services/findone';
import { findOneYearRevise } from './services/findoneYearRevise';
import { updateAcknowleged } from './services/updateAcknowleged';
import { updateRevise } from './services/updateRevise';
import { removeYearPower } from './services/remove';

@Injectable()
export class YearpowerService {
  constructor(private prisma: PrismaService) {}

  create(user: AuthUser, createYearpowerDto: CreateYearpowerDto) {
    return createYearPower(this.prisma, user, createYearpowerDto);
  }

  findAll(user: AuthUser, powerId: number, sYear: string) {
    return findAllYearPower(this.prisma, user, powerId, sYear);
  }

  findAllDocument(user: AuthUser, powerId: number, sYear: string) {
    return findAllDocument(this.prisma, user, powerId, sYear);
  }

  checkPowerYear(user: AuthUser, powerId: number, sYear: string) {
    return checkPowerYear(this.prisma, user, powerId, sYear);
  }

  findOne(id: number) {
    return findOneYearPower(this.prisma, id);
  }

  findOneYearRevise(id: number) {
    return findOneYearRevise(this.prisma, id);
  }

  updateAcknowleged(id: number, user: AuthUser) {
    return updateAcknowleged(this.prisma, id, user);
  }

  updateRevise(
    id: number,
    user: AuthUser,
    updateYearpowerDto: UpdateYearpowerDto,
  ) {
    return updateRevise(this.prisma, id, user, updateYearpowerDto);
  }

  async remove(id: number) {
    return removeYearPower(this.prisma, id);
  }
}
