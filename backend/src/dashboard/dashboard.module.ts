import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Turma } from '../database/entities/turma.entity';
import { PlanoAula } from '../database/entities/plano-aula.entity';
import { ObservacaoParticipacao } from '../database/entities/observacao-participacao.entity';
import { ProjetoSala } from '../database/entities/projeto-sala.entity';
import { User } from '../database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Turma,
      PlanoAula,
      ObservacaoParticipacao,
      ProjetoSala,
      User,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
