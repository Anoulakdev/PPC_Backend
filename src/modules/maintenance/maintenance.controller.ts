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
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../config/multer.config';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRequest } from '../../interfaces/user-request.interface';

@UseGuards(JwtAuthGuard)
@Controller('maintenances')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('maintenanceFile', multerConfig('maintenance')),
  )
  uploadMaintenanceFile(
    @UploadedFile() maintenanceFile: Express.Multer.File,
    @Req() req: UserRequest,
    @Body() createMaintenanceDto: CreateMaintenanceDto,
  ) {
    const Maintenancefilename = maintenanceFile?.filename;
    if (Maintenancefilename) {
      createMaintenanceDto.maintenanceFile = Maintenancefilename;
    }

    return this.maintenanceService.create(
      req.user,
      createMaintenanceDto,
      Maintenancefilename,
    );
  }

  @Get('/edl')
  findAllEDL(@Req() req: UserRequest, @Query('powerId') powerId?: number) {
    return this.maintenanceService.findAllEDL(req.user, powerId);
  }

  @Get('/dam')
  findAllDAM(@Req() req: UserRequest, @Query('powerId') powerId?: number) {
    return this.maintenanceService.findAllDAM(req.user, powerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maintenanceService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('maintenanceFile', multerConfig('maintenance')),
  )
  update(
    @Req() req: UserRequest,
    @Param('id') id: string,
    @UploadedFile() maintenanceFile: Express.Multer.File,
    @Body() updateMaintenanceDto: UpdateMaintenanceDto,
  ) {
    if (maintenanceFile) {
      updateMaintenanceDto.maintenanceFile = maintenanceFile.filename;
    }

    return this.maintenanceService.update(req.user, +id, updateMaintenanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maintenanceService.remove(+id);
  }
}
