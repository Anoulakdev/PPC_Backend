import { PrismaService } from '../../../prisma/prisma.service';
import { CreateRegionDto } from '../dto/create-region.dto';

export async function createRegion(
  prisma: PrismaService,
  createRegionDto: CreateRegionDto,
) {
  return prisma.region.create({
    data: createRegionDto,
  });
}
