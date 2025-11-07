import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PedagogicoController } from './pedagogico.controller';
import { PedagogicoService } from './pedagogico.service';
import { PlanejamentoBimestral } from '../database/entities/planejamento-bimestral.entity';
import { AnexoPlanoAula } from '../database/entities/anexo-plano-aula.entity';
import { AtividadeAdaptada } from '../database/entities/atividade-adaptada.entity';
import { RelatorioSemanalNEE } from '../database/entities/relatorio-semanal-nee.entity';
import { AtaPedagogica } from '../database/entities/ata-pedagogica.entity';
import { ObservacaoSupervisor } from '../database/entities/observacao-supervisor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlanejamentoBimestral,
      AnexoPlanoAula,
      AtividadeAdaptada,
      RelatorioSemanalNEE,
      AtaPedagogica,
      ObservacaoSupervisor,
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [PedagogicoController],
  providers: [PedagogicoService],
  exports: [PedagogicoService],
})
export class PedagogicoModule {}
