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

export class CreateMonthpowerDto {
  @IsInt()
  powerId: number;

  @IsString()
  powerNo: string;

  @IsString()
  yearmonth: string;

  @IsString()
  sYear: string;

  @IsString()
  sMonth: string;

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

  @IsBoolean()
  revise: boolean;

  @IsInt()
  totalPower: number;

  @IsInt()
  totalDate: number;

  @IsArray()
  turbinedata: TurbineData[];

  @IsArray()
  remarks: string[];
}
