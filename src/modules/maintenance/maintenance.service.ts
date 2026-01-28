import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { createMaintenance } from './services/create';
import { findAllEDL } from './services/findallEDL';
import { findAllDAM } from './services/findallDAM';
import { findOneMaintenance } from './services/findone';
import { updateMaintenance } from './services/update';
import { removeMaintenance } from './services/remove';

@Injectable()
export class MaintenanceService {
  constructor(private prisma: PrismaService) {}

  create(
    user: AuthUser,
    createMaintenanceDto: CreateMaintenanceDto,
    Maintenancefilename?: string,
  ) {
    return createMaintenance(
      this.prisma,
      user,
      createMaintenanceDto,
      Maintenancefilename,
    );
  }

  findAllEDL(user: AuthUser, powerId?: number) {
    return findAllEDL(this.prisma, user, powerId);
  }

  findAllDAM(user: AuthUser, powerId?: number) {
    return findAllDAM(this.prisma, user, powerId);
  }

  findOne(id: number) {
    return findOneMaintenance(this.prisma, id);
  }

  update(
    user: AuthUser,
    id: number,
    updateMaintenanceDto: UpdateMaintenanceDto,
  ) {
    return updateMaintenance(this.prisma, user, id, updateMaintenanceDto);
  }

  remove(id: number) {
    return removeMaintenance(this.prisma, id);
  }
}
