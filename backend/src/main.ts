import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Sistema Pedagógico API')
    .setDescription('API para sistema de acompanhamento pedagógico escolar')
    .setVersion('1.0')
    .addTag('auth', 'Autenticação e autorização')
    .addTag('users', 'Gerenciamento de usuários')
    .addTag('turmas', 'Gerenciamento de turmas')
    .addTag('planejamentos', 'Planejamentos anuais')
    .addTag('planos-aula', 'Planos de aula diários')
    .addTag('observacoes', 'Observações de participação')
    .addTag('nee', 'Atividades adaptadas (NEE)')
    .addTag('projetos', 'Projetos de sala')
    .addTag('atas', 'Atas de ocorrência')
    .addTag('conselhos', 'Conselhos de classe')
    .addTag('uploads', 'Upload de arquivos')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Insira o token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Servidor rodando na porta ${port}`);
  console.log(`📚 Documentação Swagger: http://localhost:${port}/api`);
}
bootstrap();
