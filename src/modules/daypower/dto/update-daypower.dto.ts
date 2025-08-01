import { PartialType } from '@nestjs/mapped-types';
import { CreateDaypowerDto } from './create-daypower.dto';

export class UpdateDaypowerDto extends PartialType(CreateDaypowerDto) {}
