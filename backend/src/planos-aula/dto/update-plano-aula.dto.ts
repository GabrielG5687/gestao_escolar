import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanoAulaDto } from './create-plano-aula.dto';

export class UpdatePlanoAulaDto extends PartialType(CreatePlanoAulaDto) {}
