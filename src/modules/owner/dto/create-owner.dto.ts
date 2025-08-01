import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOwnerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  code?: string;
}
