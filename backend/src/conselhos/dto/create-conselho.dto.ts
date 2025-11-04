import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConselhoDto {
  @ApiProperty({ 
    example: 'uuid-da-turma',
    description: 'ID da turma'
  })
  @IsUUID()
  turmaId: string;

  @ApiProperty({ 
    example: '1º Bimestre',
    description: 'Período/bimestre do conselho'
  })
  @IsString()
  @IsNotEmpty()
  periodoBimestre: string;

  @ApiProperty({ 
    example: 'Prof. João, Prof. Maria, Coordenadora Ana',
    description: 'Lista de participantes do conselho'
  })
  @IsString()
  @IsNotEmpty()
  participantes: string;

  @ApiProperty({ 
    example: 'Turma apresentou bom desempenho geral, com destaque para participação',
    description: 'Relatório geral da turma'
  })
  @IsString()
  @IsNotEmpty()
  relatorioGeral: string;

  @ApiProperty({ 
    example: '{"aluno1": "Bom desempenho", "aluno2": "Precisa melhorar leitura"}',
    description: 'Relatórios individuais dos alunos (JSON)',
    required: false
  })
  @IsString()
  @IsOptional()
  relatoriosIndividuais?: string;

  @ApiProperty({ 
    example: ['/uploads/ata-conselho.pdf'],
    description: 'URLs dos anexos',
    required: false,
    type: [String]
  })
  @IsArray()
  @IsOptional()
  anexos?: string[];
}
