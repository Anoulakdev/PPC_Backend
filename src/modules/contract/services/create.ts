import { PrismaService } from '../../../prisma/prisma.service';
import { CreateContractDto } from '../dto/create-contract.dto';

export async function createContract(
  prisma: PrismaService,
  createContractDto: CreateContractDto,
) {
  return prisma.contract.create({
    data: createContractDto,
  });
}
