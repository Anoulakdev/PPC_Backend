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
import { YearpowerService } from './yearpower.service';
import { CreateYearpowerDto } from './dto/create-yearpower.dto';
import { UpdateYearpowerDto } from './dto/update-yearpower.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRequest } from '../../interfaces/user-request.interface';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('yearpowers')
export class YearpowerController {
  constructor(private readonly yearpowerService: YearpowerService) {}

  @Post()
  @Roles(6)
  create(
    @Req() req: UserRequest,
    @Body() createYearpowerDto: CreateYearpowerDto,
  ) {
    return this.yearpowerService.create(req.user, createYearpowerDto);
  }

  @Get()
  findAll(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('sYear') sYear: string,
  ) {
    return this.yearpowerService.findAll(req.user, powerId, sYear);
  }

  @Get('/alldocument')
  findAllDocument(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('sYear') sYear: string,
  ) {
    return this.yearpowerService.findAllDocument(req.user, powerId, sYear);
  }

  @Get('/checkpoweryear')
  checkPowerYear(
    @Req() req: UserRequest,
    @Query('powerId') powerId: number,
    @Query('sYear') sYear: string,
  ) {
    return this.yearpowerService.checkPowerYear(req.user, powerId, sYear);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.yearpowerService.findOne(+id);
  }

  @Get('yearrevise/:id')
  findOneYearRevise(@Param('id') id: string) {
    return this.yearpowerService.findOneYearRevise(+id);
  }

  @Put('acknowleged/:id')
  @Roles(4, 6)
  updateAcknowleged(@Param('id') id: string, @Req() req: UserRequest) {
    return this.yearpowerService.updateAcknowleged(+id, req.user);
  }

  @Put('revise/:id')
  @Roles(4, 6)
  updateRevise(
    @Param('id') id: string,
    @Req() req: UserRequest,
    @Body() updateYearpowerDto: UpdateYearpowerDto,
  ) {
    return this.yearpowerService.updateRevise(
      +id,
      req.user,
      updateYearpowerDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.yearpowerService.remove(+id);
  }
}
