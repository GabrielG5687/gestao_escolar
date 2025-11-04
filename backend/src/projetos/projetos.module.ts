import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjetoSala } from '../database/entities/projeto-sala.entity';
import { ProjetosService } from './projetos.service';
import { ProjetosController } from './projetos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProjetoSala])],
  controllers: [ProjetosController],
  providers: [ProjetosService],
})
export class ProjetosModule {}
