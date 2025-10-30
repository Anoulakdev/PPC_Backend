import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDaypowerDto } from './dto/create-daypower.dto';
import { UpdateDaypowerDto } from './dto/update-daypower.dto';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { createDayPower } from './services/create';
import { findAllDayPower } from './services/findall';
import { findOneDayPower } from './services/findone';
import { updateAcknowleged } from './services/updateAcknowleged';
import { updateRevise } from './services/updateRevise';
import { removeDayPower } from './services/remove';
import { findOneDayRevise } from './services/findoneDayRevise';
import { checkPowerDate } from './services/checkpowerdate';
import { findAllDocument } from './services/findalldocument';
import { findPower } from './services/findpower';
import { totalPowerDay } from './services/totalPowerDay';
import { totalPowerAll } from './services/totalPowerAll';
import { totalPowerDashboard } from './services/totalPowerDashboard';
import { totalChart } from './services/totalChart';
import { totalCharts } from './services/totalCharts';
import { findallNCC } from './services/findallNCC';
import { GroupedCompanyItemsDTO } from './dto/daypower.dto';

@Injectable()
export class DaypowerService {
  constructor(private prisma: PrismaService) {}

  create(user: AuthUser, createDaypowerDto: CreateDaypowerDto) {
    return createDayPower(this.prisma, user, createDaypowerDto);
  }

  findAll(user: AuthUser, powerId: number, startDate: string, endDate: string) {
    return findAllDayPower(this.prisma, user, powerId, startDate, endDate);
  }

  findAllDocument(
    user: AuthUser,
    powerId: number,
    startDate: string,
    endDate: string,
  ) {
    return findAllDocument(this.prisma, user, powerId, startDate, endDate);
  }

  findallNCC(powerDate: string): Promise<GroupedCompanyItemsDTO[]> {
    return findallNCC(this.prisma, powerDate);
  }

  checkPowerDate(user: AuthUser, powerId: number, powerDate: string) {
    return checkPowerDate(this.prisma, user, powerId, powerDate);
  }

  findPower(powerId: number) {
    return findPower(this.prisma, powerId);
  }

  totalPowerDay(powerId: number) {
    return totalPowerDay(this.prisma, powerId);
  }

  totalPowerAll(user: AuthUser) {
    return totalPowerAll(this.prisma, user);
  }

  totalPowerDashboard(user: AuthUser) {
    return totalPowerDashboard(this.prisma, user);
  }

  totalChart(
    user: AuthUser,
    powerId: number,
    startDate: string,
    endDate: string,
  ) {
    return totalChart(this.prisma, user, powerId, startDate, endDate);
  }

  totalCharts(
    user: AuthUser,
    powerId: number,
    startDate: string,
    endDate: string,
  ) {
    return totalCharts(this.prisma, user, powerId, startDate, endDate);
  }

  findOne(id: number) {
    return findOneDayPower(this.prisma, id);
  }

  findOneDayRevise(id: number) {
    return findOneDayRevise(this.prisma, id);
  }

  updateAcknowleged(id: number, user: AuthUser) {
    return updateAcknowleged(this.prisma, id, user);
  }

  updateRevise(
    id: number,
    user: AuthUser,
    updateDaypowerDto: UpdateDaypowerDto,
  ) {
    return updateRevise(this.prisma, id, user, updateDaypowerDto);
  }

  async remove(id: number) {
    return removeDayPower(this.prisma, id);
  }
}
