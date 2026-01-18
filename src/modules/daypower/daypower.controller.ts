import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  Sse,
  MessageEvent,
} from '@nestjs/common';
import { DaypowerService } from './daypower.service';
import { CreateDaypowerDto } from './dto/create-daypower.dto';
import { UpdateDaypowerDto } from './dto/update-daypower.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRequest } from '../../interfaces/user-request.interface';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
// import { GroupedCompanyItemsDTO } from './dto/daypower.dto';
import { Observable, interval, switchMap, map, startWith } from 'rxjs';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('daypowers')
export class DaypowerController {
  constructor(private readonly daypowerService: DaypowerService) {}

  @Post()
  @Roles(6)
  create(
    @Req() req: UserRequest,
    @Body() createDaypowerDto: CreateDaypowerDto,
  ) {
    return this.daypowerService.create(req.user, createDaypowerDto);
  }

  @Get()
  findAll(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.daypowerService.findAll(req.user, powerId, startDate, endDate);
  }

  @Get('/admindaily')
  @Roles(2)
  findAdmin(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('powerDate') powerDate: string,
  ) {
    return this.daypowerService.findAdmin(req.user, powerId, powerDate);
  }

  @Get('/alldocument')
  findAllDocument(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.daypowerService.findAllDocument(
      req.user,
      powerId,
      startDate,
      endDate,
    );
  }

  @Sse('/nccget')
  @Roles(8)
  streamNCC(
    @Query('powerDate') powerDate: string,
    @Query('regionId') regionId?: string,
  ): Observable<MessageEvent> {
    const region = regionId ? Number(regionId) : undefined;
    // ส่งข้อมูลทุก 5 วินาที (หรือเปลี่ยนได้ตามต้องการ)
    return interval(5000).pipe(
      startWith(0),
      switchMap(() => this.daypowerService.findallNCC(powerDate, region)),
      map((data) => ({
        data,
        retry: 3000, // ถ้าหลุด reconnect ภายใน 3 วิ
      })),
    );
  }

  @Get('/checkpowerdate')
  checkPowerDate(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('powerDate') powerDate: string,
  ) {
    return this.daypowerService.checkPowerDate(req.user, powerId, powerDate);
  }

  @Get('/getpower')
  findPower(@Query('powerId') powerId: number) {
    return this.daypowerService.findPower(powerId);
  }

  @Get('/totalpowerday')
  totalPowerDay(@Query('powerId') powerId: number) {
    return this.daypowerService.totalPowerDay(powerId);
  }

  @Get('/totalpowerall')
  totalPowerAll(@Req() req: UserRequest) {
    return this.daypowerService.totalPowerAll(req.user);
  }

  @Get('/totalpowerdashboard')
  totalPowerDashboard(@Req() req: UserRequest) {
    return this.daypowerService.totalPowerDashboard(req.user);
  }

  @Get('/totalchartdate')
  totalChartDate(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('powerDate') powerDate: string,
  ) {
    return this.daypowerService.totalChartDate(req.user, powerId, powerDate);
  }

  @Get('/totalchart')
  totalChart(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.daypowerService.totalChart(
      req.user,
      powerId,
      startDate,
      endDate,
    );
  }

  @Get('/totalcharts')
  totalCharts(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.daypowerService.totalCharts(
      req.user,
      powerId,
      startDate,
      endDate,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.daypowerService.findOne(+id);
  }

  @Get('dayrevise/:id')
  findOneDayRevise(@Param('id') id: string) {
    return this.daypowerService.findOneDayRevise(+id);
  }

  @Put('acknowleged/:id')
  @Roles(4, 6)
  updateAcknowleged(@Param('id') id: string, @Req() req: UserRequest) {
    return this.daypowerService.updateAcknowleged(+id, req.user);
  }

  @Put('revise/:id')
  @Roles(4, 6)
  updateRevise(
    @Param('id') id: string,
    @Req() req: UserRequest,
    @Body() updateDaypowerDto: UpdateDaypowerDto,
  ) {
    return this.daypowerService.updateRevise(+id, req.user, updateDaypowerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.daypowerService.remove(+id);
  }
}
