import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRegionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  code?: string;
}
