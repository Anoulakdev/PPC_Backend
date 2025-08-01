import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePowerDto {
  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  unit: number;

  @IsString()
  @IsOptional()
  abbreviation?: string;

  @IsString()
  @IsOptional()
  isActive?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsInt()
  @IsOptional()
  voltageId?: number;

  @IsInt()
  @IsOptional()
  fuelId?: number;

  @IsInt()
  @IsOptional()
  contractId?: number;

  @IsInt()
  @IsOptional()
  branchId?: number;

  @IsInt()
  @IsOptional()
  regionId?: number;

  @IsInt()
  @IsOptional()
  ownerId?: number;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsNumber()
  @IsOptional()
  installCapacity?: number;

  @IsNumber()
  @IsOptional()
  baseEnergy?: number;

  @IsString()
  @IsOptional()
  codDate?: string;

  @IsString()
  @IsOptional()
  powerimg?: string;
}
