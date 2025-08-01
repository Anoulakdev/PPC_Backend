import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';

class TurbineData {
  @IsInt()
  turbine: number;

  @IsArray()
  hourly: number[];
}

class MachineData {
  @IsInt()
  turbine: number;

  @IsInt()
  maxs: number;

  @IsInt()
  mins: number;
}

export class CreateDaypowerDto {
  @IsInt()
  powerId: number;

  @IsString()
  powerNo: string;

  @IsString()
  powerDate: string;

  @IsOptional()
  @IsString()
  remark?: string;

  @IsInt()
  createdByUserId: number;

  @IsOptional()
  @IsInt()
  decAcknowUserId?: number;

  @IsBoolean()
  decAcknow: boolean;

  @IsOptional()
  @IsInt()
  disAcknowUserId?: number;

  @IsBoolean()
  disAcknow: boolean;

  @IsInt()
  upstreamLevel: number;

  @IsInt()
  downstreamLevel: number;

  @IsInt()
  totalStorageamount: number;

  @IsInt()
  totalStorageaverage: number;

  @IsInt()
  activeStorageamount: number;

  @IsInt()
  activeStorageaverage: number;

  @IsInt()
  turbineDischargeamount: number;

  @IsInt()
  turbineDischargeaverage: number;

  @IsInt()
  spillwayDischargeamount: number;

  @IsInt()
  spillwayDischargeaverage: number;

  @IsInt()
  ecologicalDischargeamount: number;

  @IsInt()
  ecologicalDischargeaverage: number;

  @IsBoolean()
  revise: boolean;

  @IsInt()
  totalPower: number;

  @IsInt()
  totalUnit: number;

  @IsArray()
  turbinedata: TurbineData[];

  @IsArray()
  machinedata: MachineData[];

  @IsArray()
  remarks: string[];
}
