import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';

class TurbineData {
  @IsInt()
  thead: string;

  @IsArray()
  tbody: number[];
}

export class CreateYearpowerDto {
  @IsInt()
  powerId: number;

  @IsString()
  powerNo: string;

  @IsString()
  sYear: string;

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

  @IsArray()
  turbinedata: TurbineData[];
}
