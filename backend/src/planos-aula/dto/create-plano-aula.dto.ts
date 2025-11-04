import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusPlano } from '../../database/entities/plano-aula.entity';

export class CreatePlanoAulaDto {
  @ApiProperty({ 
    example: 'uuid-da-turma',
    description: 'ID da turma'
  })
  @IsUUID()
  turmaId: string;

  @ApiProperty({ 
    example: '2025-02-10',
    description: 'Data da aula (formato: YYYY-MM-DD)'
  })
  @IsDateString()
  data: string;

  @ApiProperty({ 
    example: 'Português',
    description: 'Nome da disciplina'
  })
  @IsString()
  @IsNotEmpty()
  disciplina: string;

  @ApiProperty({ 
    example: 'Interpretação de Texto',
    description: 'Tema da aula'
  })
  @IsString()
  @IsNotEmpty()
  tema: string;

  @ApiProperty({ 
    example: 'Desenvolver habilidades de interpretação textual',
    description: 'Objetivo da aula'
  })
  @IsString()
  @IsNotEmpty()
  objetivo: string;

  @ApiProperty({ 
    example: 'Livro didático, quadro, projetor',
    description: 'Recursos necessários',
    required: false
  })
  @IsString()
  @IsOptional()
  recursos?: string;

  @ApiProperty({ 
    example: 'Leitura compartilhada, discussão em grupo, exercícios',
    description: 'Descrição das atividades',
    required: false
  })
  @IsString()
  @IsOptional()
  atividades?: string;

  @ApiProperty({ 
    example: 'Participação oral e exercícios escritos',
    description: 'Como será avaliado',
    required: false
  })
  @IsString()
  @IsOptional()
  avaliacaoPlaneada?: string;

  @ApiProperty({ 
    example: 'Atenção especial aos alunos com dificuldade de leitura',
    description: 'Observações adicionais',
    required: false
  })
  @IsString()
  @IsOptional()
  observacoes?: string;

  @ApiProperty({ 
    enum: StatusPlano,
    example: StatusPlano.RASCUNHO,
    description: 'Status do plano (RASCUNHO ou PUBLICADO)',
    required: false,
    default: StatusPlano.RASCUNHO
  })
  @IsEnum(StatusPlano)
  @IsOptional()
  status?: StatusPlano;
}
