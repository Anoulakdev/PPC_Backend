import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { createBranch } from './services/create';
import { findAllBranch } from './services/findall';
import { findOneBranch } from './services/findone';
import { updateBranch } from './services/update';
import { removeBranch } from './services/remove';
import { selectBranch } from './services/selectBranch';

@Injectable()
export class BranchService {
  constructor(private prisma: PrismaService) {}

  create(createBranchDto: CreateBranchDto) {
    return createBranch(this.prisma, createBranchDto);
  }

  findAll() {
    return findAllBranch(this.prisma);
  }

  selectBranch() {
    return selectBranch(this.prisma);
  }

  findOne(id: number) {
    return findOneBranch(this.prisma, id);
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return updateBranch(this.prisma, id, updateBranchDto);
  }

  remove(id: number) {
    return removeBranch(this.prisma, id);
  }
}
