import { PrismaService } from '../../../prisma/prisma.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export async function removeEvent(prisma: PrismaService, id: number) {
  const event = await prisma.eventReport.findUnique({ where: { id } });
  if (!event) throw new NotFoundException('event not found');

  if (event.eventFile) {
    const filePath = path.resolve(
      process.env.UPLOAD_BASE_PATH || '',
      'event',
      event.eventFile,
    );

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting image:', err);
          }
        });
      }
    });
  }

  await prisma.eventReport.delete({ where: { id } });
  return {
    statusCode: HttpStatus.OK,
    message: 'event deleted successfully',
  };
}
