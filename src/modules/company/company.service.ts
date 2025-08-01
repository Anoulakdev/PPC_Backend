import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { createCompany } from './services/create';
import { findAllCompany } from './services/findall';
import { findOneCompany } from './services/findone';
import { updateCompany } from './services/update';
import { removeCompany } from './services/remove';
import { selectCompany } from './services/selectCompany';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  create(createCompanyDto: CreateCompanyDto) {
    return createCompany(this.prisma, createCompanyDto);
  }

  findAll() {
    return findAllCompany(this.prisma);
  }

  selectCompany() {
    return selectCompany(this.prisma);
  }

  findOne(id: number) {
    return findOneCompany(this.prisma, id);
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return updateCompany(this.prisma, id, updateCompanyDto);
  }

  async remove(id: number) {
    return removeCompany(this.prisma, id);
  }
}
