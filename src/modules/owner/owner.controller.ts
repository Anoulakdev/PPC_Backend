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
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('owners')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  @Roles(2)
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownerService.create(createOwnerDto);
  }

  @Get()
  @Roles(2)
  findAll() {
    return this.ownerService.findAll();
  }

  @Get('selectowner')
  selectOwner() {
    return this.ownerService.selectOwner();
  }

  @Get(':id')
  @Roles(2)
  findOne(@Param('id') id: string) {
    return this.ownerService.findOne(+id);
  }

  @Put(':id')
  @Roles(2)
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownerService.update(+id, updateOwnerDto);
  }

  @Delete(':id')
  @Roles(2)
  remove(@Param('id') id: string) {
    return this.ownerService.remove(+id);
  }
}
