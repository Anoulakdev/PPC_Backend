import { IsArray, IsInt, IsString } from 'class-validator';

export class CreateDayreportDto {
  @IsInt()
  powerId: number;

  @IsString()
  powerDate: string;

  @IsInt()
  createdByUserId: number;

  @IsInt()
  activeStorageamount: number;

  @IsInt()
  activeStorageaverage: number;

  @IsInt()
  waterLevel: number;

  @IsInt()
  dwy: number;

  @IsInt()
  dwf: number;

  @IsInt()
  dwm: number;

  @IsInt()
  pws: number;

  @IsInt()
  inflowamount: number;

  @IsInt()
  inflowaverage: number;

  @IsInt()
  tdAmount: number;

  @IsInt()
  tdAverage: number;

  @IsInt()
  spillwayamount: number;

  @IsInt()
  spillwayaverage: number;

  @IsInt()
  owramount: number;

  @IsInt()
  owraverage: number;

  @IsInt()
  rainFall: number;

  @IsInt()
  netEnergyOutput: number;

  @IsInt()
  waterRate: number;

  @IsInt()
  totalOutflow: number;

  @IsInt()
  averageOutflow: number;

  @IsInt()
  totalPower: number;

  @IsInt()
  totalUnit: number;

  @IsArray()
  turbinedata: number[];

  @IsArray()
  remarks: string[];
}
