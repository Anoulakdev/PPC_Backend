import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { createOwner } from './services/create';
import { findAllOwner } from './services/findall';
import { findOneOwner } from './services/findone';
import { updateOwner } from './services/update';
import { removeOwner } from './services/remove';
import { selectOwner } from './services/selectOwner';

@Injectable()
export class OwnerService {
  constructor(private prisma: PrismaService) {}

  create(createOwnerDto: CreateOwnerDto) {
    return createOwner(this.prisma, createOwnerDto);
  }

  findAll() {
    return findAllOwner(this.prisma);
  }

  selectOwner() {
    return selectOwner(this.prisma);
  }

  findOne(id: number) {
    return findOneOwner(this.prisma, id);
  }

  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return updateOwner(this.prisma, id, updateOwnerDto);
  }

  remove(id: number) {
    return removeOwner(this.prisma, id);
  }
}
