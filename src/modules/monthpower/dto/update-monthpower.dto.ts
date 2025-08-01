import { PartialType } from '@nestjs/mapped-types';
import { CreateMonthpowerDto } from './create-monthpower.dto';

export class UpdateMonthpowerDto extends PartialType(CreateMonthpowerDto) {}
