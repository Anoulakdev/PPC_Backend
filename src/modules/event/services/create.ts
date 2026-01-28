import { PrismaService } from '../../../prisma/prisma.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { AuthUser } from '../../../interfaces/auth-user.interface';
import * as fs from 'fs';
import * as path from 'path';

export async function createEvent(
  prisma: PrismaService,
  user: AuthUser,
  createEventDto: CreateEventDto,
  Eventfilename?: string,
) {
  try {
    return await prisma.eventReport.create({
      data: {
        ...createEventDto,
        powerId: Number(createEventDto.powerId),
        createdByUserId: user.id,
        startDate: new Date(createEventDto.startDate),
        endDate: new Date(createEventDto.endDate),
        startTime: createEventDto.startTime,
        endTime: createEventDto.endTime,
        partAdd: user.roleId === 4 ? 1 : 2,
      },
    });
  } catch (error) {
    if (Eventfilename) {
      const filePath = path.resolve(
        process.env.UPLOAD_BASE_PATH || '',
        'event',
        Eventfilename,
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
