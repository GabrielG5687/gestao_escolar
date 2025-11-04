import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjetoDto {
  @ApiProperty({ 
    example: 'Projeto Horta Escolar',
    description: 'Título do projeto'
  })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ 
    example: 'Projeto de criação de uma horta na escola com participação dos alunos',
    description: 'Descrição detalhada do projeto'
  })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ 
    example: 'uuid-da-turma',
    description: 'ID da turma (opcional)',
    required: false
  })
  @IsUUID()
  @IsOptional()
  turmaId?: string;

  @ApiProperty({ 
    example: '2025-02-01',
    description: 'Data de início do projeto'
  })
  @IsDateString()
  dataInicio: string;

  @ApiProperty({ 
    example: '2025-06-30',
    description: 'Data de término do projeto',
    required: false
  })
  @IsDateString()
  @IsOptional()
  dataFim?: string;

  @ApiProperty({ 
    example: ['/uploads/foto1.jpg', '/uploads/foto2.jpg'],
    description: 'URLs dos anexos/fotos',
    required: false,
    type: [String]
  })
  @IsArray()
  @IsOptional()
  anexos?: string[];
}
