import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { createContract } from './services/create';
import { findAllContract } from './services/findall';
import { findOneContract } from './services/findone';
import { updateContract } from './services/update';
import { removeContract } from './services/remove';
import { selectContract } from './services/selectContract';

@Injectable()
export class ContractService {
  constructor(private prisma: PrismaService) {}

  create(createContractDto: CreateContractDto) {
    return createContract(this.prisma, createContractDto);
  }

  findAll() {
    return findAllContract(this.prisma);
  }

  selectContract() {
    return selectContract(this.prisma);
  }

  findOne(id: number) {
    return findOneContract(this.prisma, id);
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    return updateContract(this.prisma, id, updateContractDto);
  }

  remove(id: number) {
    return removeContract(this.prisma, id);
  }
}
