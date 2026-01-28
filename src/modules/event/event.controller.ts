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
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../config/multer.config';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRequest } from '../../interfaces/user-request.interface';

@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseInterceptors(FileInterceptor('eventFile', multerConfig('event')))
  uploadEventFile(
    @UploadedFile() eventFile: Express.Multer.File,
    @Req() req: UserRequest,
    @Body() createEventDto: CreateEventDto,
  ) {
    const Eventfilename = eventFile?.filename;
    if (Eventfilename) {
      createEventDto.eventFile = Eventfilename;
    }

    return this.eventService.create(req.user, createEventDto, Eventfilename);
  }

  @Get('/edl')
  findAllEDL(@Req() req: UserRequest, @Query('powerId') powerId?: number) {
    return this.eventService.findAllEDL(req.user, powerId);
  }

  @Get('/dam')
  findAllDAM(@Req() req: UserRequest, @Query('powerId') powerId?: number) {
    return this.eventService.findAllDAM(req.user, powerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('eventFile', multerConfig('event')))
  update(
    @Req() req: UserRequest,
    @Param('id') id: string,
    @UploadedFile() eventFile: Express.Multer.File,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    if (eventFile) {
      updateEventDto.eventFile = eventFile.filename;
    }

    return this.eventService.update(req.user, +id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
