import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NeeAtividade } from '../database/entities/nee-atividade.entity';
import { NeeService } from './nee.service';
import { NeeController } from './nee.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NeeAtividade])],
  controllers: [NeeController],
  providers: [NeeService],
})
export class NeeModule {}
