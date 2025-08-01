import { PrismaService } from '../../../prisma/prisma.service';
import { CreateBranchDto } from '../dto/create-branch.dto';

export async function createBranch(
  prisma: PrismaService,
  createBranchDto: CreateBranchDto,
) {
  return prisma.branch.create({
    data: createBranchDto,
  });
}
