import { PartialType } from '@nestjs/mapped-types';
import { CreateFueltypeDto } from './create-fueltype.dto';

export class UpdateFueltypeDto extends PartialType(CreateFueltypeDto) {}
