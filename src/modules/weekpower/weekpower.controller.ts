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
} from '@nestjs/common';
import { WeekpowerService } from './weekpower.service';
import { CreateWeekpowerDto } from './dto/create-weekpower.dto';
import { UpdateWeekpowerDto } from './dto/update-weekpower.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRequest } from '../../interfaces/user-request.interface';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('weekpowers')
export class WeekpowerController {
  constructor(private readonly weekpowerService: WeekpowerService) {}

  @Post()
  @Roles(6)
  create(
    @Req() req: UserRequest,
    @Body() createWeekpowerDto: CreateWeekpowerDto,
  ) {
    return this.weekpowerService.create(req.user, createWeekpowerDto);
  }

  @Get()
  findAll(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('sYear') sYear: string,
    @Query('sWeek') sWeek: string,
  ) {
    return this.weekpowerService.findAll(req.user, powerId, sYear, sWeek);
  }

  @Get('/alldocument')
  findAllDocument(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('sYear') sYear: string,
    @Query('sWeek') sWeek: string,
  ) {
    return this.weekpowerService.findAllDocument(
      req.user,
      powerId,
      sYear,
      sWeek,
    );
  }

  @Get('/checkpowerweek')
  checkPowerWeek(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('sYear') sYear: string,
    @Query('sWeek') sWeek: string,
  ) {
    return this.weekpowerService.checkPowerWeek(
      req.user,
      powerId,
      sYear,
      sWeek,
    );
  }

  @Get('/totalpowerweek')
  totalPowerWeek(@Query('powerId') powerId: number) {
    return this.weekpowerService.totalPowerWeek(powerId);
  }

  @Get('/totalpowerall')
  totalPowerAll(@Req() req: UserRequest) {
    return this.weekpowerService.totalPowerAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weekpowerService.findOne(+id);
  }

  @Get('weekrevise/:id')
  findOneWeekRevise(@Param('id') id: string) {
    return this.weekpowerService.findOneWeekRevise(+id);
  }

  @Put('acknowleged/:id')
  @Roles(4, 6)
  updateAcknowleged(@Param('id') id: string, @Req() req: UserRequest) {
    return this.weekpowerService.updateAcknowleged(+id, req.user);
  }

  @Put('revise/:id')
  @Roles(4, 6)
  updateRevise(
    @Param('id') id: string,
    @Req() req: UserRequest,
    @Body() updateWeekpowerDto: UpdateWeekpowerDto,
  ) {
    return this.weekpowerService.updateRevise(
      +id,
      req.user,
      updateWeekpowerDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weekpowerService.remove(+id);
  }
}
