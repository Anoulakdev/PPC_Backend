import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export async function removeUser(prisma: PrismaService, id: number) {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  if (user.userimg) {
    const imagePath = path.resolve(
      process.env.UPLOAD_BASE_PATH || '',
      'user',
      user.userimg,
    );

    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error('Error deleting image:', err);
          }
        });
      }
    });
  }

  await prisma.userPower.deleteMany({ where: { userId: id } });

  await prisma.user.delete({ where: { id } });

  return {
    statusCode: HttpStatus.OK,
    message: 'User deleted successfully',
    userId: id,
  };
}
