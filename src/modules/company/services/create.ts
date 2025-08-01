import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCompanyDto } from '../dto/create-company.dto';

export async function createCompany(
  prisma: PrismaService,
  createCompanyDto: CreateCompanyDto,
) {
  return prisma.company.create({
    data: createCompanyDto,
  });
}
