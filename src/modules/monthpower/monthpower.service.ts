import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMonthpowerDto } from './dto/create-monthpower.dto';
import { UpdateMonthpowerDto } from './dto/update-monthpower.dto';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { createMonthPower } from './services/create';
import { findAllMonthPower } from './services/findall';
import { findOneMonthPower } from './services/findone';
import { updateAcknowleged } from './services/updateAcknowleged';
import { updateRevise } from './services/updateRevise';
import { removeMonthPower } from './services/remove';
import { findOneMonthRevise } from './services/findoneMonthRevise';
import { checkPowerMonth } from './services/checkpowermonth';
import { findAllDocument } from './services/findalldocument';
import { totalPowerMonth } from './services/totalPowerMonth';
import { totalPowerAll } from './services/totalPowerAll';
import { totalCharts } from './services/totalCharts';

@Injectable()
export class MonthpowerService {
  constructor(private prisma: PrismaService) {}

  create(user: AuthUser, createMonthpowerDto: CreateMonthpowerDto) {
    return createMonthPower(this.prisma, user, createMonthpowerDto);
  }

  findAll(user: AuthUser, powerId: number, sYear: string, sMonth: string) {
    return findAllMonthPower(this.prisma, user, powerId, sYear, sMonth);
  }

  findAllDocument(
    user: AuthUser,
    powerId: number,
    sYear: string,
    sMonth: string,
  ) {
    return findAllDocument(this.prisma, user, powerId, sYear, sMonth);
  }

  checkPowerMonth(
    user: AuthUser,
    powerId: number,
    sYear: string,
    sMonth: string,
  ) {
    return checkPowerMonth(this.prisma, user, powerId, sYear, sMonth);
  }

  totalPowerMonth(powerId: number) {
    return totalPowerMonth(this.prisma, powerId);
  }

  totalPowerAll(user: AuthUser) {
    return totalPowerAll(this.prisma, user);
  }

  totalCharts(user: AuthUser, powerId: number, sYear: string) {
    return totalCharts(this.prisma, user, powerId, sYear);
  }

  findOne(id: number) {
    return findOneMonthPower(this.prisma, id);
  }

  findOneMonthRevise(id: number) {
    return findOneMonthRevise(this.prisma, id);
  }

  updateAcknowleged(id: number, user: AuthUser) {
    return updateAcknowleged(this.prisma, id, user);
  }

  updateRevise(
    id: number,
    user: AuthUser,
    updateMonthpowerDto: UpdateMonthpowerDto,
  ) {
    return updateRevise(this.prisma, id, user, updateMonthpowerDto);
  }

  async remove(id: number) {
    return removeMonthPower(this.prisma, id);
  }
}
