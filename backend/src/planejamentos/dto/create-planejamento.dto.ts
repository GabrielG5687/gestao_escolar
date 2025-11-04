import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePlanejamentoDto {
  @IsUUID()
  @IsOptional()
  escolaId?: string;

  @IsUUID()
  @IsOptional()
  turmaId?: string;

  @IsInt()
  anoLetivo: number;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsOptional()
  periodo?: string;
}
