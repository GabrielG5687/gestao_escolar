import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateObservacaoDto {
  @ApiProperty({ 
    example: 'uuid-da-turma',
    description: 'ID da turma'
  })
  @IsUUID()
  turmaId: string;

  @ApiProperty({ 
    example: 'uuid-do-aluno',
    description: 'ID do aluno (opcional)',
    required: false
  })
  @IsUUID()
  @IsOptional()
  alunoId?: string;

  @ApiProperty({ 
    example: '2025-02-10',
    description: 'Data da observação'
  })
  @IsDateString()
  data: string;

  @ApiProperty({ 
    example: 'participacao_oral',
    description: 'Critério observado (ex: participacao_oral, preservacao_material, desenvoltura)'
  })
  @IsString()
  @IsNotEmpty()
  criterio: string;

  @ApiProperty({ 
    example: 'Aluno participou ativamente da discussão em grupo',
    description: 'Notas sobre a observação'
  })
  @IsString()
  @IsNotEmpty()
  notas: string;
}
