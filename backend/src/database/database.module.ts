import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Turma } from './entities/turma.entity';
import { PlanejamentoAnual } from './entities/planejamento-anual.entity';
import { PlanoAula } from './entities/plano-aula.entity';
import { ComentarioPlano } from './entities/comentario-plano.entity';
import { ObservacaoParticipacao } from './entities/observacao-participacao.entity';
import { NeeAtividade } from './entities/nee-atividade.entity';
import { ProjetoSala } from './entities/projeto-sala.entity';
import { AtaOcorrencia } from './entities/ata-ocorrencia.entity';
import { ConselhoClasse } from './entities/conselho-classe.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isLocalhost = configService.get('DB_HOST') === 'localhost' ||
          configService.get('DB_HOST') === '127.0.0.1';

        const config: any = {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [
            User,
            Turma,
            PlanejamentoAnual,
            PlanoAula,
            ComentarioPlano,
            ObservacaoParticipacao,
            NeeAtividade,
            ProjetoSala,
            AtaOcorrencia,
            ConselhoClasse,
          ],
          synchronize: configService.get('NODE_ENV') === 'development',
          logging: configService.get('NODE_ENV') === 'development',
        };

        // Adiciona SSL apenas se não for localhost
        if (!isLocalhost) {
          config.ssl = { rejectUnauthorized: false };
        }

        return config;
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule { }
