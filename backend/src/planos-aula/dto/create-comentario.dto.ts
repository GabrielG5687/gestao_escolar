import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComentarioDto {
  @ApiProperty({ 
    example: 'Excelente planejamento! Sugiro adicionar mais atividades práticas.',
    description: 'Texto do comentário'
  })
  @IsString()
  @IsNotEmpty()
  texto: string;
}
