import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtaOcorrencia } from '../database/entities/ata-ocorrencia.entity';
import { AtasService } from './atas.service';
import { AtasController } from './atas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AtaOcorrencia])],
  controllers: [AtasController],
  providers: [AtasService],
})
export class AtasModule {}
