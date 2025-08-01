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
import { FueltypeService } from './fueltype.service';
import { CreateFueltypeDto } from './dto/create-fueltype.dto';
import { UpdateFueltypeDto } from './dto/update-fueltype.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('fueltypes')
export class FueltypeController {
  constructor(private readonly fueltypeService: FueltypeService) {}

  @Post()
  @Roles(2)
  create(@Body() createFueltypeDto: CreateFueltypeDto) {
    return this.fueltypeService.create(createFueltypeDto);
  }

  @Get()
  @Roles(2)
  findAll() {
    return this.fueltypeService.findAll();
  }

  @Get('selectfuel')
  selectFuel() {
    return this.fueltypeService.selectFuel();
  }

  @Get(':id')
  @Roles(2)
  findOne(@Param('id') id: string) {
    return this.fueltypeService.findOne(+id);
  }

  @Put(':id')
  @Roles(2)
  update(
    @Param('id') id: string,
    @Body() updateFueltypeDto: UpdateFueltypeDto,
  ) {
    return this.fueltypeService.update(+id, updateFueltypeDto);
  }

  @Delete(':id')
  @Roles(2)
  remove(@Param('id') id: string) {
    return this.fueltypeService.remove(+id);
  }
}
