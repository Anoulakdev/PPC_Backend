import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVoltageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  code?: string;
}
