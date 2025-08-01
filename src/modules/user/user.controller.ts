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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../config/multer.config';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('userimg', multerConfig('user')))
  uploadUserImage(
    @UploadedFile() userimg: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    const Imgfilename = userimg?.filename;

    if (Imgfilename) {
      createUserDto.userimg = Imgfilename;
    }

    return this.userService.create(createUserDto, Imgfilename);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('superadmin')
  findAllSuperAdmin() {
    return this.userService.findAllSuperAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin')
  findAllAdmin() {
    return this.userService.findAllAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('userimg', multerConfig('user')))
  async update(
    @Param('id', ParseIntPipe) id: number, // แก้ไขให้เป็น number
    @UploadedFile() userimg: Express.Multer.File,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (userimg) {
      updateUserDto.userimg = userimg.filename;
    }

    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('updateprofile/:id')
  @UseInterceptors(FileInterceptor('userimg', multerConfig('user')))
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() userimg: Express.Multer.File,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (userimg) {
      updateUserDto.userimg = userimg.filename;
    }

    return this.userService.updateProfile(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('updatestatus/:id')
  updateStatus(@Param('id') id: string, @Query('actived') actived: string) {
    return this.userService.updateStatus(+id, actived);
  }

  @UseGuards(JwtAuthGuard)
  @Put('changepassword/:id')
  changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('resetpassword/:id')
  resetPassword(@Param('id') id: string) {
    return this.userService.resetPassword(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
