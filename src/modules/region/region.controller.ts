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
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  @Roles(2)
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @Get()
  @Roles(2)
  findAll() {
    return this.regionService.findAll();
  }

  @Get('selectregion')
  selectRegion() {
    return this.regionService.selectRegion();
  }

  @Get(':id')
  @Roles(2)
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  @Put(':id')
  @Roles(2)
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @Delete(':id')
  @Roles(2)
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
