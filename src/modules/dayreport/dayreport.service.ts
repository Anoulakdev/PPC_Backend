import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDayreportDto } from './dto/create-dayreport.dto';
import { UpdateDayreportDto } from './dto/update-dayreport.dto';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { createDayReport } from './services/create';
import { findAllDayReport } from './services/findall';
import { findOneDayReport } from './services/findone';
import { waterLevel } from './services/waterLevel';
import { checkPowerDate } from './services/checkpowerdate';
import { removeDayReport } from './services/remove';
import { updateRevise } from './services/updateRevise';
import { findRevise } from './services/findRevise';

@Injectable()
export class DayreportService {
  constructor(private prisma: PrismaService) {}

  create(user: AuthUser, createDayreportDto: CreateDayreportDto) {
    return createDayReport(this.prisma, user, createDayreportDto);
  }

  findAll(user: AuthUser, powerId: number, startDate: string, endDate: string) {
    return findAllDayReport(this.prisma, user, powerId, startDate, endDate);
  }

  checkPowerDate(powerId: number, powerDate: string) {
    return checkPowerDate(this.prisma, powerId, powerDate);
  }

  waterLevel(powerId: number, powerDate: string) {
    return waterLevel(this.prisma, powerId, powerDate);
  }

  findOne(id: number) {
    return findOneDayReport(this.prisma, id);
  }

  findRevise(id: number) {
    return findRevise(this.prisma, id);
  }

  updateRevise(
    id: number,
    user: AuthUser,
    updateDayreportDto: UpdateDayreportDto,
  ) {
    return updateRevise(this.prisma, id, user, updateDayreportDto);
  }

  remove(id: number) {
    return removeDayReport(this.prisma, id);
  }
}
