# Sistema Pedagógico - Backend

Backend do sistema de acompanhamento pedagógico escolar desenvolvido com NestJS e PostgreSQL.

## 🚀 Tecnologias

- NestJS
- PostgreSQL
- Prisma ORM
- JWT Authentication
- TypeScript
- Bcrypt

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

## 🔧 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações de banco PostgreSQL.

3. Execute as migrations do banco (sincronização automática em dev):
```bash
npm run start:dev
```

Ou para produção, gere e execute migrations:
```bash
npm run migration:generate src/database/migrations/InitialMigration
npm run migration:run
```

4. Popule o banco com dados iniciais:
```bash
npm run seed
```

## 🏃 Executando

### Desenvolvimento
```bash
npm run start:dev
```

### Produção
```bash
npm run build
npm run start:prod
```

## 📚 Documentação da API

### Swagger UI

Acesse a documentação interativa completa em:
```
http://localhost:3000/api
```

A documentação Swagger inclui:
- ✅ Todos os endpoints disponíveis
- ✅ Exemplos de requisições e respostas
- ✅ Schemas de dados
- ✅ Autenticação JWT integrada
- ✅ Teste direto das APIs

### Principais Endpoints

**Autenticação**
- `POST /auth/login` - Login de usuário

**Usuários**
- `GET /users/me` - Perfil do usuário logado
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário

**Turmas**
- `GET /turmas` - Listar turmas
- `POST /turmas` - Criar turma
- `GET /turmas/:id` - Detalhes da turma

**Planos de Aula**
- `GET /planos-aula` - Listar planos
- `POST /planos-aula` - Criar plano
- `POST /planos-aula/:id/comentarios` - Adicionar comentário

**Outros Módulos**
- Planejamentos Anuais (`/planejamentos`)
- Observações (`/observacoes`)
- Atividades NEE (`/nee`)
- Projetos (`/projetos`)
- Atas (`/atas`)
- Conselhos de Classe (`/conselhos`)
- Uploads (`/uploads`)

## 🔐 Credenciais Padrão (Seed)

- **Admin**: admin@escola.com / admin123
- **Supervisor**: supervisor@escola.com / supervisor123
- **Professor**: joao@escola.com / professor123

## 🧪 Testes

```bash
npm test
```

## 📝 Estrutura do Projeto

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── auth/
│   ├── users/
│   ├── turmas/
│   ├── planejamentos/
│   ├── planos-aula/
│   ├── observacoes/
│   ├── nee/
│   ├── projetos/
│   ├── atas/
│   ├── conselhos/
│   ├── uploads/
│   ├── prisma/
│   ├── app.module.ts
│   └── main.ts
└── uploads/
```

## 🔒 Segurança

- Senhas hasheadas com bcrypt (salt 12)
- Autenticação JWT
- Rate limiting configurado
- Validação de dados com class-validator
- RBAC (Role-Based Access Control)

## 📄 Licença

MIT
