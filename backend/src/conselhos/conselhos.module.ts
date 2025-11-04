import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConselhoClasse } from '../database/entities/conselho-classe.entity';
import { ConselhosService } from './conselhos.service';
import { ConselhosController } from './conselhos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConselhoClasse])],
  controllers: [ConselhosController],
  providers: [ConselhosService],
})
export class ConselhosModule {}
