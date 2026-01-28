import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export async function removePower(prisma: PrismaService, id: number) {
  const power = await prisma.power.findUnique({ where: { id } });
  if (!power) throw new NotFoundException('power not found');

  if (power.powerimg) {
    const imagePath = path.resolve(
      process.env.UPLOAD_BASE_PATH || '',
      'power',
      power.powerimg,
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

  await prisma.power.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'power deleted successfully',
  };
}
