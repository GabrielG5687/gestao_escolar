import { PartialType } from '@nestjs/mapped-types';
import { CreateNeeDto } from './create-nee.dto';

export class UpdateNeeDto extends PartialType(CreateNeeDto) {}
