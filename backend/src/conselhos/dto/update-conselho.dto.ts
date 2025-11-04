import { PartialType } from '@nestjs/mapped-types';
import { CreateConselhoDto } from './create-conselho.dto';

export class UpdateConselhoDto extends PartialType(CreateConselhoDto) {}
