import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
import * as path from 'path';

export async function createUser(
  prisma: PrismaService,
  createUserDto: CreateUserDto,
  Imgfilename?: string,
) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    if (!process.env.DEFAULT_PASSWORD) {
      throw new InternalServerErrorException('DEFAULT_PASSWORD is not defined');
    }

    const hashedPassword = await bcrypt.hash(process.env.DEFAULT_PASSWORD, 10);
    const { powerIds = [], ...rest } = createUserDto;

    const newUser = await prisma.user.create({
      data: {
        ...rest,
        password: hashedPassword,
        roleId: Number(rest.roleId),
        companyId: Number(rest.companyId),
        powers: {
          create: powerIds.map((powerId) => ({
            power: { connect: { id: Number(powerId) } },
          })),
        },
      },
      include: {
        powers: true,
      },
    });

    return newUser;
  } catch (error) {
    if (Imgfilename) {
      const filePath = path.resolve(
        process.env.UPLOAD_BASE_PATH || '',
        'user',
        Imgfilename,
      );

      try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        await fs.promises.unlink(filePath);
      } catch (fsError) {
        console.error('Error deleting uploaded image:', fsError);
      }
    }

    throw error;
  }
}
