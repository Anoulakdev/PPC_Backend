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
import { MonthpowerService } from './monthpower.service';
import { CreateMonthpowerDto } from './dto/create-monthpower.dto';
import { UpdateMonthpowerDto } from './dto/update-monthpower.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRequest } from '../../interfaces/user-request.interface';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('monthpowers')
export class MonthpowerController {
  constructor(private readonly monthpowerService: MonthpowerService) {}

  @Post()
  @Roles(6)
  create(
    @Req() req: UserRequest,
    @Body() createMonthpowerDto: CreateMonthpowerDto,
  ) {
    return this.monthpowerService.create(req.user, createMonthpowerDto);
  }

  @Get()
  findAll(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('sYear') sYear: string,
    @Query('sMonth') sMonth: string,
  ) {
    return this.monthpowerService.findAll(req.user, powerId, sYear, sMonth);
  }

  @Get('/alldocument')
  findAllDocument(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('sYear') sYear: string,
    @Query('sMonth') sMonth: string,
  ) {
    return this.monthpowerService.findAllDocument(
      req.user,
      powerId,
      sYear,
      sMonth,
    );
  }

  @Get('/checkpowermonth')
  checkPowerMonth(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('sYear') sYear: string,
    @Query('sMonth') sMonth: string,
  ) {
    return this.monthpowerService.checkPowerMonth(
      req.user,
      powerId,
      sYear,
      sMonth,
    );
  }

  @Get('/totalpowermonth')
  totalPowerMonth(@Query('powerId') powerId: number) {
    return this.monthpowerService.totalPowerMonth(powerId);
  }

  @Get('/totalpowerall')
  totalPowerAll(@Req() req: UserRequest) {
    return this.monthpowerService.totalPowerAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monthpowerService.findOne(+id);
  }

  @Get('monthrevise/:id')
  findOneMonthRevise(@Param('id') id: string) {
    return this.monthpowerService.findOneMonthRevise(+id);
  }

  @Put('acknowleged/:id')
  @Roles(4, 6)
  updateAcknowleged(@Param('id') id: string, @Req() req: UserRequest) {
    return this.monthpowerService.updateAcknowleged(+id, req.user);
  }

  @Put('revise/:id')
  @Roles(4, 6)
  updateRevise(
    @Param('id') id: string,
    @Req() req: UserRequest,
    @Body() updateMonthpowerDto: UpdateMonthpowerDto,
  ) {
    return this.monthpowerService.updateRevise(
      +id,
      req.user,
      updateMonthpowerDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monthpowerService.remove(+id);
  }
}
