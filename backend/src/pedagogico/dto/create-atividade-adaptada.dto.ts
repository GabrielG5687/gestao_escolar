import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateAtividadeAdaptadaDto {
  @IsNotEmpty()
  @IsString()
  turmaId: string;

  @IsNotEmpty()
  @IsString()
  alunoNome: string;

  @IsNotEmpty()
  @IsDateString()
  data: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsString()
  adaptacoes: string;
}
