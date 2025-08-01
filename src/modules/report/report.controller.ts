import { Controller, Get, UseGuards, Req, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRequest } from '../../interfaces/user-request.interface';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/day')
  dayPower(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.reportService.dayPower(req.user, powerId, startDate, endDate);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/week')
  weekPower(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('sYear') sYear: string,
    @Query('sWeek') sWeek: string,
  ) {
    return this.reportService.weekPower(req.user, powerId, sYear, sWeek);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/month')
  monthPower(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('sYear') sYear: string,
    @Query('sMonth') sMonth: string,
  ) {
    return this.reportService.monthPower(req.user, powerId, sYear, sMonth);
  }
}
