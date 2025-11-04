import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TurmasModule } from './turmas/turmas.module';
import { PlanejamentosModule } from './planejamentos/planejamentos.module';
import { PlanosAulaModule } from './planos-aula/planos-aula.module';
import { ObservacoesModule } from './observacoes/observacoes.module';
import { NeeModule } from './nee/nee.module';
import { ProjetosModule } from './projetos/projetos.module';
import { AtasModule } from './atas/atas.module';
import { ConselhosModule } from './conselhos/conselhos.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    DatabaseModule,
    AuthModule,
    UsersModule,
    TurmasModule,
    PlanejamentosModule,
    PlanosAulaModule,
    ObservacoesModule,
    NeeModule,
    ProjetosModule,
    AtasModule,
    ConselhosModule,
    UploadsModule,
  ],
})
export class AppModule { }
