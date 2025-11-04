import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turma } from '../database/entities/turma.entity';
import { TurmasService } from './turmas.service';
import { TurmasController } from './turmas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Turma])],
  controllers: [TurmasController],
  providers: [TurmasService],
})
export class TurmasModule {}
