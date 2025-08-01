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

export class CreateWeekpowerDto {
  @IsInt()
  powerId: number;

  @IsString()
  powerNo: string;

  @IsString()
  sYear: string;

  @IsString()
  sWeek: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsOptional()
  @IsString()
  remark?: string;

  @IsArray()
  remarks: string[];

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

  @IsBoolean()
  revise: boolean;

  @IsInt()
  totalPower: number;

  @IsInt()
  totalDate: number;

  @IsArray()
  turbinedata: TurbineData[];
}
