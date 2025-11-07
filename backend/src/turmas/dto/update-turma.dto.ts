import { PartialType } from '@nestjs/swagger';
import { CreateTurmaDto } from './create-turma.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTurmaDto extends PartialType(CreateTurmaDto) {
  @ApiProperty({ 
    example: '5º Ano A', 
    description: 'Nome da turma',
    required: false 
  })
  @IsString()
  @IsOptional()
  nome?: string;

  @ApiProperty({ 
    example: 2025, 
    description: 'Ano letivo',
    required: false 
  })
  @IsInt()
  @IsOptional()
  ano?: number;

  @ApiProperty({ 
    example: '5º Ano', 
    description: 'Série da turma',
    required: false 
  })
  @IsString()
  @IsOptional()
  serie?: string;

  @ApiProperty({ 
    example: 'uuid-do-professor',
    description: 'ID do professor responsável',
    required: false 
  })
  @IsUUID()
  @IsOptional()
  professorResponsavelId?: string;
}
