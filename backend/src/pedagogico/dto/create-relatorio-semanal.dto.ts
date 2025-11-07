import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRelatorioSemanalDto {
  @IsNotEmpty()
  @IsString()
  turmaId: string;

  @IsNotEmpty()
  @IsString()
  alunoNome: string;

  @IsNotEmpty()
  @IsDateString()
  dataInicio: string;

  @IsNotEmpty()
  @IsDateString()
  dataFim: string;

  @IsNotEmpty()
  @IsString()
  desenvolvimento: string;

  @IsOptional()
  @IsString()
  observacoes?: string;
}
