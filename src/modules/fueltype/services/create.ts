import { PrismaService } from '../../../prisma/prisma.service';
import { CreateFueltypeDto } from '../dto/create-fueltype.dto';

export async function createFuel(
  prisma: PrismaService,
  createFueltypeDto: CreateFueltypeDto,
) {
  return prisma.fuelType.create({
    data: createFueltypeDto,
  });
}
