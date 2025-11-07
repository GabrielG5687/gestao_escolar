import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TipoAta } from '../../database/entities/ata-pedagogica.entity';

export class CreateAtaPedagogicaDto {
  @IsNotEmpty()
  @IsEnum(TipoAta)
  tipo: TipoAta;

  @IsNotEmpty()
  @IsDateString()
  data: string;

  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  conteudo: string;

  @IsArray()
  @IsString({ each: true })
  participantes: string[];
}
