import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PowerService } from './power.service';
import { CreatePowerDto } from './dto/create-power.dto';
import { UpdatePowerDto } from './dto/update-power.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../config/multer.config';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('powers')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @Post()
  @Roles(2)
  @UseInterceptors(FileInterceptor('powerimg', multerConfig('power')))
  uploadPowerImage(
    @UploadedFile() powerimg: Express.Multer.File,
    @Body() createPowerDto: CreatePowerDto,
  ) {
    const Imgfilename = powerimg?.filename;

    if (Imgfilename) {
      createPowerDto.powerimg = Imgfilename;
    }

    return this.powerService.create(createPowerDto, Imgfilename);
  }

  @Get()
  @Roles(2)
  findAll(@Query('companyId') companyId?: number) {
    return this.powerService.findAll(companyId);
  }

  @Get('selectpower')
  selectPower(@Query('companyId') companyId?: number) {
    return this.powerService.selectPower(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.powerService.findOne(+id);
  }

  @Put(':id')
  @Roles(2)
  @UseInterceptors(FileInterceptor('powerimg', multerConfig('power')))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() powerimg: Express.Multer.File,
    @Body() updatePowerDto: UpdatePowerDto,
  ) {
    if (powerimg) {
      updatePowerDto.powerimg = powerimg.filename;
    }

    return this.powerService.update(id, updatePowerDto);
  }

  @Delete(':id')
  @Roles(2)
  remove(@Param('id') id: string) {
    return this.powerService.remove(+id);
  }
}
