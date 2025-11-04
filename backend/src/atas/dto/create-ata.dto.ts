import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAtaDto {
  @ApiProperty({ 
    example: 'uuid-da-turma',
    description: 'ID da turma'
  })
  @IsUUID()
  turmaId: string;

  @ApiProperty({ 
    example: '2025-02-10',
    description: 'Data da ocorrência'
  })
  @IsDateString()
  data: string;

  @ApiProperty({ 
    example: 'Conflito entre alunos',
    description: 'Título da ata'
  })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ 
    example: 'Descrição detalhada do ocorrido durante o intervalo',
    description: 'Descrição completa da ocorrência'
  })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ 
    example: 'Conversa com os responsáveis, acompanhamento pedagógico',
    description: 'Medidas tomadas',
    required: false
  })
  @IsString()
  @IsOptional()
  medidasTomadas?: string;

  @ApiProperty({ 
    example: ['/uploads/documento1.pdf'],
    description: 'URLs dos anexos',
    required: false,
    type: [String]
  })
  @IsArray()
  @IsOptional()
  anexos?: string[];
}
