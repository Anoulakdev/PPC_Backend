/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

type User = {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  roleId: number | null;
  phone: string | null;
  isActive: string | null;
  isOnline: boolean;
  userimg: string | null;
  companyId: number | null;
  powers: {
    power: {
      id: number;
      name: string;
    };
  }[];
};

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        powers: {
          select: {
            power: true, // ดึงข้อมูล power จาก UserPower
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Email Not Found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password Not Match');
    }

    if (user.isActive !== 'A') {
      throw new ForbiddenException('User Is Disable');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      roleId: user.roleId,
      // companyId: user.companyId,
      // powers: user.powers.map((p) => p.power.id),
    };
    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }
}
