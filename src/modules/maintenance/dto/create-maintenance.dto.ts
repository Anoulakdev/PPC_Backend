import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateMaintenanceDto {
  @IsNotEmpty()
  @IsInt()
  powerId: number;

  @IsNotEmpty()
  @IsInt()
  createdByUserId: number;

  @IsNotEmpty()
  @IsString()
  maintenanceName: string;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsOptional()
  @IsString()
  detail?: string;

  @IsOptional()
  @IsString()
  remark?: string;

  @IsOptional()
  @IsString()
  maintenanceFile?: string;

  @IsOptional()
  @IsInt()
  partAdd?: number;
}
