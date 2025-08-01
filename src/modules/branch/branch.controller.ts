import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('branchs')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  @Roles(2)
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchService.create(createBranchDto);
  }

  @Get()
  @Roles(2)
  findAll() {
    return this.branchService.findAll();
  }

  @Get('selectbranch')
  selectBranch() {
    return this.branchService.selectBranch();
  }

  @Get(':id')
  @Roles(2)
  findOne(@Param('id') id: string) {
    return this.branchService.findOne(+id);
  }

  @Put(':id')
  @Roles(2)
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchService.update(+id, updateBranchDto);
  }

  @Delete(':id')
  @Roles(2)
  remove(@Param('id') id: string) {
    return this.branchService.remove(+id);
  }
}
