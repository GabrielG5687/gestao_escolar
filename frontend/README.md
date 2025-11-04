# Sistema Pedagógico - Frontend

Frontend do sistema de acompanhamento pedagógico escolar desenvolvido com React + Vite.

## 🚀 Tecnologias

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- React Query (TanStack Query)
- React Hook Form + Zod
- Zustand (State Management)
- Axios
- Lucide React (Icons)

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Backend rodando em http://localhost:3000

## 🔧 Instalação

1. Instale as dependências:
```bash
cd frontend
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 🏃 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build de produção
npm run lint         # Executa o linter
```

## 📱 Funcionalidades

### Para Professores
- ✅ Dashboard com ações rápidas
- ✅ Criar e gerenciar planos de aula
- ✅ Registrar observações de participação
- ✅ Gerenciar projetos com fotos
- ✅ Visualizar comentários do supervisor

### Para Supervisores
- ✅ Dashboard com visão geral
- ✅ Revisar planos de aula
- ✅ Adicionar comentários e sugestões
- ✅ Acompanhar atividades NEE
- ✅ Exportar relatórios

## 🎨 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/      # Componentes reutilizáveis
│   │   └── Layout.tsx
│   ├── pages/          # Páginas da aplicação
│   │   ├── LoginPage.tsx
│   │   ├── DashboardProfessor.tsx
│   │   ├── DashboardSupervisor.tsx
│   │   ├── PlanosAulaPage.tsx
│   │   ├── CriarPlanoPage.tsx
│   │   ├── TurmasPage.tsx
│   │   ├── ObservacoesPage.tsx
│   │   └── ProjetosPage.tsx
│   ├── store/          # Zustand stores
│   │   └── authStore.ts
│   ├── lib/            # Utilitários
│   │   └── api.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
└── package.json
```

## 🔐 Autenticação

O sistema usa JWT para autenticação. O token é armazenado no localStorage e enviado automaticamente em todas as requisições.

**Credenciais de teste:**
- Admin: `admin@escola.com` / `admin123`
- Supervisor: `supervisor@escola.com` / `supervisor123`
- Professor: `joao@escola.com` / `professor123`

## 🎯 Próximos Passos

- [ ] Implementar React Query para cache de dados
- [ ] Adicionar upload de arquivos
- [ ] Implementar sistema de notificações
- [ ] Adicionar filtros e busca
- [ ] Implementar exportação de PDF
- [ ] Adicionar testes unitários
- [ ] PWA para notificações push

## 📄 Licença

MIT
