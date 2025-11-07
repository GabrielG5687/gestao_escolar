import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Bimestre } from '../../database/entities/planejamento-bimestral.entity';

export class CreatePlanejamentoBimestralDto {
  @IsNotEmpty()
  @IsString()
  turmaId: string;

  @IsNotEmpty()
  @IsNumber()
  anoLetivo: number;

  @IsNotEmpty()
  @IsEnum(Bimestre)
  bimestre: Bimestre;

  @IsNotEmpty()
  @IsString()
  conteudo: string;
}
