import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VoltageService } from './voltage.service';
import { CreateVoltageDto } from './dto/create-voltage.dto';
import { UpdateVoltageDto } from './dto/update-voltage.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('voltages')
export class VoltageController {
  constructor(private readonly voltageService: VoltageService) {}

  @Post()
  @Roles(2)
  create(@Body() createVoltageDto: CreateVoltageDto) {
    return this.voltageService.create(createVoltageDto);
  }

  @Get()
  @Roles(2)
  findAll() {
    return this.voltageService.findAll();
  }

  @Get('selectvoltage')
  selectVoltage() {
    return this.voltageService.selectVoltage();
  }

  @Get(':id')
  @Roles(2)
  findOne(@Param('id') id: string) {
    return this.voltageService.findOne(+id);
  }

  @Put(':id')
  @Roles(2)
  update(@Param('id') id: string, @Body() updateVoltageDto: UpdateVoltageDto) {
    return this.voltageService.update(+id, updateVoltageDto);
  }

  @Delete(':id')
  @Roles(2)
  remove(@Param('id') id: string) {
    return this.voltageService.remove(+id);
  }
}
