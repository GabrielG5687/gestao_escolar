import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../database/entities/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'João Silva', description: 'Nome completo do usuário' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  nome: string;

  @ApiProperty({ example: 'joao@escola.com', description: 'Email do usuário' })
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim().toLowerCase())
  email: string;

  @ApiProperty({ example: 'senha123', description: 'Senha (mínimo 6 caracteres)' })
  @IsString()
  @MinLength(6)
  senha: string;

  @ApiProperty({ 
    enum: Role, 
    example: Role.PROFESSOR,
    description: 'Papel do usuário no sistema'
  })
  @IsEnum(Role)
  role: Role;
}
