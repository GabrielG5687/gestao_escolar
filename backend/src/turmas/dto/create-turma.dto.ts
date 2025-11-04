import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTurmaDto {
  @ApiProperty({ example: '5º Ano A', description: 'Nome da turma' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 2025, description: 'Ano letivo' })
  @IsInt()
  ano: number;

  @ApiProperty({ example: '5º Ano', description: 'Série da turma' })
  @IsString()
  @IsNotEmpty()
  serie: string;

  @ApiProperty({ 
    example: 'uuid-do-professor',
    description: 'ID do professor responsável'
  })
  @IsUUID()
  professorResponsavelId: string;
}
