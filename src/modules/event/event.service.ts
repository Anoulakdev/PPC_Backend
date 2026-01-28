import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { createEvent } from './services/create';
import { findAllEDL } from './services/findallEDL';
import { findAllDAM } from './services/findallDAM';
import { findOneEvent } from './services/findone';
import { updateEvent } from './services/update';
import { removeEvent } from './services/remove';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  create(
    user: AuthUser,
    createEventDto: CreateEventDto,
    Eventfilename?: string,
  ) {
    return createEvent(this.prisma, user, createEventDto, Eventfilename);
  }

  findAllEDL(user: AuthUser, powerId?: number) {
    return findAllEDL(this.prisma, user, powerId);
  }

  findAllDAM(user: AuthUser, powerId?: number) {
    return findAllDAM(this.prisma, user, powerId);
  }

  findOne(id: number) {
    return findOneEvent(this.prisma, id);
  }

  update(user: AuthUser, id: number, updateEventDto: UpdateEventDto) {
    return updateEvent(this.prisma, user, id, updateEventDto);
  }

  remove(id: number) {
    return removeEvent(this.prisma, id);
  }
}
