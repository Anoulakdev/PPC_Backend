import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsInt,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsInt()
  @IsNotEmpty()
  roleId: number;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  isActive?: string;

  @IsBoolean()
  isOnline: boolean;

  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  powerIds?: number[];

  @IsString()
  @IsOptional()
  userimg?: string;

  @IsString()
  oldpassword: string;

  @IsString()
  password1: string;

  @IsString()
  password2: string;
}
