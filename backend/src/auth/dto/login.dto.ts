import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ 
    example: 'admin@escola.com',
    description: 'Email do usuário'
  })
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim().toLowerCase())
  email: string;

  @ApiProperty({ 
    example: 'admin123',
    description: 'Senha do usuário'
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
