import { PrismaService } from '../../../prisma/prisma.service';
import { CreateOwnerDto } from '../dto/create-owner.dto';

export async function createOwner(
  prisma: PrismaService,
  createOwnerDto: CreateOwnerDto,
) {
  return prisma.owner.create({
    data: createOwnerDto,
  });
}
