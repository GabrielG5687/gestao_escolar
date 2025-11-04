import { PartialType } from '@nestjs/mapped-types';
import { CreateAtaDto } from './create-ata.dto';

export class UpdateAtaDto extends PartialType(CreateAtaDto) {}
