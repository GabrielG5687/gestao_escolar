import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TipoAnexo } from '../../database/entities/anexo-plano-aula.entity';

export class CreateAnexoPlanoDto {
  @IsNotEmpty()
  @IsString()
  planoAulaId: string;

  @IsNotEmpty()
  @IsEnum(TipoAnexo)
  tipo: TipoAnexo;

  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  url?: string;
}
