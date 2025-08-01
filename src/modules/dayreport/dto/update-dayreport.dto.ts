import { PartialType } from '@nestjs/mapped-types';
import { CreateDayreportDto } from './create-dayreport.dto';

export class UpdateDayreportDto extends PartialType(CreateDayreportDto) {}
