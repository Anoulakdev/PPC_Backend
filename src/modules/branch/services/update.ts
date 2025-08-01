import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateBranchDto } from '../dto/update-branch.dto';
import { NotFoundException } from '@nestjs/common';

export async function updateBranch(
  prisma: PrismaService,
  id: number,
  updateBranchDto: UpdateBranchDto,
) {
  const branch = await prisma.branch.findUnique({ where: { id } });
  if (!branch) throw new NotFoundException('branch not found');

  return prisma.branch.update({
    where: { id },
    data: updateBranchDto,
  });
}
