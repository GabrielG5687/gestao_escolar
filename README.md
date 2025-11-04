# Sistema Pedagógico

Sistema completo de acompanhamento pedagógico escolar com backend NestJS + TypeORM e frontend React + Vite.

## 📁 Estrutura do Projeto

```
gestao_escolar/
├── backend/          # API NestJS + TypeORM + PostgreSQL
└── frontend/         # React + Vite + Tailwind CSS
```

## 🚀 Início Rápido

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Configure o .env com suas credenciais PostgreSQL
npm run start:dev
npm run seed  # Popular banco com dados de teste
```

O backend estará disponível em `http://localhost:3000`
Documentação Swagger: `http://localhost:3000/api`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 🔐 Credenciais de Teste

- **Admin**: admin@escola.com / admin123
- **Supervisor**: supervisor@escola.com / supervisor123
- **Professor**: joao@escola.com / professor123

## 📚 Documentação

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [API Swagger](http://localhost:3000/api)

## 🛠️ Tecnologias

### Backend
- NestJS
- TypeORM
- PostgreSQL (Neon)
- JWT Authentication
- Swagger/OpenAPI
- TypeScript

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Query
- React Hook Form + Zod
- Zustand

## ✨ Funcionalidades

### Para Professores
- ✅ Dashboard personalizado
- ✅ Criar e gerenciar planos de aula
- ✅ Registrar observações de participação
- ✅ Gerenciar projetos com fotos
- ✅ Visualizar comentários do supervisor
- ✅ Upload de arquivos

### Para Supervisores
- ✅ Dashboard com visão geral
- ✅ Revisar planos de aula
- ✅ Adicionar comentários e sugestões
- ✅ Acompanhar atividades NEE
- ✅ Exportar relatórios em PDF
- ✅ Gerenciar turmas e professores

### Para Administradores
- ✅ Gerenciar usuários
- ✅ Configurar sistema
- ✅ Acesso total a todas funcionalidades

## 📝 Licença

MIT
