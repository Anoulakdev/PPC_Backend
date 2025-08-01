import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { createUser } from './services/create';
import { findAllUser } from './services/findall';
import { findOneUser } from './services/findone';
import { updateUser } from './services/update';
import { removeUser } from './services/remove';
import { findAllSuperAdmin } from './services/findallSuperAdmin';
import { findAllAdmin } from './services/findallAdmin';
import { updateStatus } from './services/updateStatus';
import { resetPassword } from './services/resetPassword';
import { changePassword } from './services/changePassword';
import { updateProfile } from './services/updateProfile';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto, imgFilename?: string) {
    return createUser(this.prisma, createUserDto, imgFilename);
  }

  findAll() {
    return findAllUser(this.prisma);
  }

  findAllSuperAdmin() {
    return findAllSuperAdmin(this.prisma);
  }

  findAllAdmin() {
    return findAllAdmin(this.prisma);
  }

  findOne(id: number) {
    return findOneUser(this.prisma, id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return updateUser(this.prisma, id, updateUserDto);
  }

  updateProfile(id: number, updateUserDto: UpdateUserDto) {
    return updateProfile(this.prisma, id, updateUserDto);
  }

  updateStatus(id: number, actived: string) {
    return updateStatus(this.prisma, id, actived);
  }

  changePassword(id: number, dto: ChangePasswordDto) {
    return changePassword(this.prisma, id, dto);
  }

  resetPassword(id: number) {
    return resetPassword(this.prisma, id);
  }

  remove(id: number) {
    return removeUser(this.prisma, id);
  }
}
