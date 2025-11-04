import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanoAula } from '../database/entities/plano-aula.entity';
import { ComentarioPlano } from '../database/entities/comentario-plano.entity';
import { PlanosAulaService } from './planos-aula.service';
import { PlanosAulaController } from './planos-aula.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlanoAula, ComentarioPlano])],
  controllers: [PlanosAulaController],
  providers: [PlanosAulaService],
})
export class PlanosAulaModule {}
