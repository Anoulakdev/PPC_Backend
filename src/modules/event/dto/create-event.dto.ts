import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsInt()
  powerId: number;

  @IsNotEmpty()
  @IsInt()
  createdByUserId: number;

  @IsNotEmpty()
  @IsString()
  eventName: string;

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
  rootCause?: string;

  @IsOptional()
  @IsString()
  preventive?: string;

  @IsOptional()
  @IsString()
  remark?: string;

  @IsOptional()
  @IsString()
  eventFile?: string;

  @IsOptional()
  @IsInt()
  partAdd?: number;
}
