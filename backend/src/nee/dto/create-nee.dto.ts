import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNeeDto {
  @ApiProperty({ 
    example: 'uuid-da-turma',
    description: 'ID da turma'
  })
  @IsUUID()
  turmaId: string;

  @ApiProperty({ 
    example: 'uuid-do-aluno',
    description: 'ID do aluno com NEE',
    required: false
  })
  @IsUUID()
  @IsOptional()
  alunoId?: string;

  @ApiProperty({ 
    example: '2025-02-10',
    description: 'Data da atividade'
  })
  @IsDateString()
  data: string;

  @ApiProperty({ 
    example: 'Atividade de leitura adaptada com imagens',
    description: 'Descrição da atividade adaptada'
  })
  @IsString()
  @IsNotEmpty()
  descricaoAtividade: string;

  @ApiProperty({ 
    example: 'Texto simplificado, uso de imagens de apoio, tempo estendido',
    description: 'Adaptações realizadas',
    required: false
  })
  @IsString()
  @IsOptional()
  adaptacoes?: string;

  @ApiProperty({ 
    example: 'Aluno conseguiu completar a atividade com sucesso',
    description: 'Resultado observado',
    required: false
  })
  @IsString()
  @IsOptional()
  resultadoObservado?: string;
}
