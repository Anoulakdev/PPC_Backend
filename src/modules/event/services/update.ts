import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateEventDto } from '../dto/update-event.dto';
import { NotFoundException } from '@nestjs/common';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as fs from 'fs';
import * as path from 'path';

export async function updateEvent(
  prisma: PrismaService,
  user: AuthUser,
  id: number,
  updateEventDto: UpdateEventDto,
) {
  const event = await prisma.eventReport.findUnique({ where: { id } });
  if (!event) throw new NotFoundException('event not found');

  const oldFile = event.eventFile || '';

  if (updateEventDto.eventFile && updateEventDto.eventFile !== oldFile) {
    const oldFilePath = path.resolve(
      process.env.UPLOAD_BASE_PATH || '',
      'event',
      oldFile,
    );

    // ตรวจสอบว่าไฟล์มีอยู่หรือไม่ก่อนจะลบ
    fs.access(oldFilePath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(oldFilePath, (err) => {
          if (err) {
            console.error('Error deleting old image:', err);
          }
        });
      }
    });
  } else {
    // ✅ ถ้าไม่มีรูปใหม่ ให้ใช้รูปเก่า
    updateEventDto.eventFile = oldFile;
  }

  return await prisma.eventReport.update({
    where: { id },
    data: {
      ...updateEventDto,
      powerId: Number(updateEventDto.powerId),
      createdByUserId: user.id,
      startDate: updateEventDto.startDate
        ? new Date(updateEventDto.startDate)
        : undefined,
      endDate: updateEventDto.endDate
        ? new Date(updateEventDto.endDate)
        : undefined,
      startTime: updateEventDto.startTime,
      endTime: updateEventDto.endTime,
    },
  });
}
