import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { DayreportService } from './dayreport.service';
import { CreateDayreportDto } from './dto/create-dayreport.dto';
// import { UpdateDayreportDto } from './dto/update-dayreport.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRequest } from '../../interfaces/user-request.interface';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('dayreports')
export class DayreportController {
  constructor(private readonly dayreportService: DayreportService) {}

  @Post()
  @Roles(6)
  create(
    @Req() req: UserRequest,
    @Body() createDayreportDto: CreateDayreportDto,
  ) {
    return this.dayreportService.create(req.user, createDayreportDto);
  }

  @Get()
  findAll(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.dayreportService.findAll(req.user, powerId, startDate, endDate);
  }

  @Get('/checkpowerdate')
  checkPowerDate(
    @Query('powerId') powerId: number,
    @Query('powerDate') powerDate: string,
  ) {
    return this.dayreportService.checkPowerDate(powerId, powerDate);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dayreportService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDayreportDto: UpdateDayreportDto,
  // ) {
  //   return this.dayreportService.update(+id, updateDayreportDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dayreportService.remove(+id);
  }
}
