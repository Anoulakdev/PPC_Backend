import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { dayPower } from './services/dayPower';
import { weekPower } from './services/weekPower';
import { monthPower } from './services/monthPower';
import { yearPower } from './services/yearPower';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  dayPower(
    user: AuthUser,
    powerId: number,
    startDate: string,
    endDate: string,
  ) {
    return dayPower(this.prisma, user, powerId, startDate, endDate);
  }

  weekPower(user: AuthUser, powerId: number, sYear: string, sWeek: string) {
    return weekPower(this.prisma, user, powerId, sYear, sWeek);
  }

  monthPower(user: AuthUser, powerId: number, sYear: string, sMonth: string) {
    return monthPower(this.prisma, user, powerId, sYear, sMonth);
  }

  yearPower(user: AuthUser, powerId: number, sYear: string) {
    return yearPower(this.prisma, user, powerId, sYear);
  }
}
