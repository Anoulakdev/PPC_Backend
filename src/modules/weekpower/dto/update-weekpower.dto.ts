import { PartialType } from '@nestjs/mapped-types';
import { CreateWeekpowerDto } from './create-weekpower.dto';

export class UpdateWeekpowerDto extends PartialType(CreateWeekpowerDto) {}
