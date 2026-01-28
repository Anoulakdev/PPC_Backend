import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyModule } from './modules/company/company.module';
import { RoleModule } from './modules/role/role.module';
import { PowerModule } from './modules/power/power.module';
import { DaypowerModule } from './modules/daypower/daypower.module';
import { WeekpowerModule } from './modules/weekpower/weekpower.module';
import { MonthpowerModule } from './modules/monthpower/monthpower.module';
import { VoltageModule } from './modules/voltage/voltage.module';
import { FueltypeModule } from './modules/fueltype/fueltype.module';
import { ContractModule } from './modules/contract/contract.module';
import { BranchModule } from './modules/branch/branch.module';
import { RegionModule } from './modules/region/region.module';
import { OwnerModule } from './modules/owner/owner.module';
import { ReportModule } from './modules/report/report.module';
import { DayreportModule } from './modules/dayreport/dayreport.module';
import { EventModule } from './modules/event/event.module';
import { MaintenanceModule } from './modules/maintenance/maintenance.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    CompanyModule,
    RoleModule,
    PowerModule,
    DaypowerModule,
    WeekpowerModule,
    MonthpowerModule,
    VoltageModule,
    FueltypeModule,
    ContractModule,
    BranchModule,
    RegionModule,
    OwnerModule,
    ReportModule,
    DayreportModule,
    EventModule,
    MaintenanceModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
