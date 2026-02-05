import { PartialType } from '@nestjs/mapped-types';
import { CreateYearpowerDto } from './create-yearpower.dto';

export class UpdateYearpowerDto extends PartialType(CreateYearpowerDto) {}
