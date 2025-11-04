import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanejamentoAnual } from '../database/entities/planejamento-anual.entity';
import { PlanejamentosService } from './planejamentos.service';
import { PlanejamentosController } from './planejamentos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlanejamentoAnual])],
  controllers: [PlanejamentosController],
  providers: [PlanejamentosService],
})
export class PlanejamentosModule {}
