import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateFueltypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  code?: string;
}
