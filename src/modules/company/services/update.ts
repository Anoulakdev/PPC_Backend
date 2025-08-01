import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { NotFoundException } from '@nestjs/common';

export async function updateCompany(
  prisma: PrismaService,
  id: number,
  updateCompanyDto: UpdateCompanyDto,
) {
  const company = await prisma.company.findUnique({ where: { id } });
  if (!company) throw new NotFoundException('company not found');

  return prisma.company.update({
    where: { id },
    data: updateCompanyDto,
  });
}
