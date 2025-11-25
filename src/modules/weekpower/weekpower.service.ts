import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWeekpowerDto } from './dto/create-weekpower.dto';
import { UpdateWeekpowerDto } from './dto/update-weekpower.dto';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { createWeekPower } from './services/create';
import { findAllWeekPower } from './services/findall';
import { findOneWeekPower } from './services/findone';
import { updateAcknowleged } from './services/updateAcknowleged';
import { updateRevise } from './services/updateRevise';
import { removeWeekPower } from './services/remove';
import { findOneWeekRevise } from './services/findoneWeekRevise';
import { checkPowerWeek } from './services/checkpowerweek';
import { findAllDocument } from './services/findalldocument';
import { totalPowerWeek } from './services/totalPowerWeek';
import { totalPowerAll } from './services/totalPowerAll';
import { totalCharts } from './services/totalCharts';
import { totalChartWeek } from './services/totalChartWeek';

@Injectable()
export class WeekpowerService {
  constructor(private prisma: PrismaService) {}

  create(user: AuthUser, createWeekpowerDto: CreateWeekpowerDto) {
    return createWeekPower(this.prisma, user, createWeekpowerDto);
  }

  findAll(user: AuthUser, powerId: number, sYear: string, sWeek: string) {
    return findAllWeekPower(this.prisma, user, powerId, sYear, sWeek);
  }

  findAllDocument(
    user: AuthUser,
    powerId: number,
    sYear: string,
    sWeek: string,
  ) {
    return findAllDocument(this.prisma, user, powerId, sYear, sWeek);
  }

  checkPowerWeek(
    user: AuthUser,
    powerId: number,
    sYear: string,
    sWeek: string,
  ) {
    return checkPowerWeek(this.prisma, user, powerId, sYear, sWeek);
  }

  totalPowerWeek(powerId: number) {
    return totalPowerWeek(this.prisma, powerId);
  }

  totalPowerAll(user: AuthUser) {
    return totalPowerAll(this.prisma, user);
  }

  totalChartWeek(
    user: AuthUser,
    powerId: number,
    sYear: string,
    sWeek: string,
  ) {
    return totalChartWeek(this.prisma, user, powerId, sYear, sWeek);
  }

  totalCharts(user: AuthUser, powerId: number, sYear: string) {
    return totalCharts(this.prisma, user, powerId, sYear);
  }

  findOne(id: number) {
    return findOneWeekPower(this.prisma, id);
  }

  findOneWeekRevise(id: number) {
    return findOneWeekRevise(this.prisma, id);
  }

  updateAcknowleged(id: number, user: AuthUser) {
    return updateAcknowleged(this.prisma, id, user);
  }

  updateRevise(
    id: number,
    user: AuthUser,
    updateWeekpowerDto: UpdateWeekpowerDto,
  ) {
    return updateRevise(this.prisma, id, user, updateWeekpowerDto);
  }

  async remove(id: number) {
    return removeWeekPower(this.prisma, id);
  }
}
