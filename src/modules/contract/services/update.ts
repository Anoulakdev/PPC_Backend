import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateContractDto } from '../dto/update-contract.dto';
import { NotFoundException } from '@nestjs/common';

export async function updateContract(
  prisma: PrismaService,
  id: number,
  updateContractDto: UpdateContractDto,
) {
  const contract = await prisma.contract.findUnique({ where: { id } });
  if (!contract) throw new NotFoundException('contract not found');

  return prisma.contract.update({
    where: { id },
    data: updateContractDto,
  });
}
