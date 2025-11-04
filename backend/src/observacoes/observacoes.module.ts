import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObservacaoParticipacao } from '../database/entities/observacao-participacao.entity';
import { ObservacoesService } from './observacoes.service';
import { ObservacoesController } from './observacoes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ObservacaoParticipacao])],
  controllers: [ObservacoesController],
  providers: [ObservacoesService],
})
export class ObservacoesModule {}
