#!/bin/bash

echo "🚀 Configurando Sistema Pedagógico..."
echo ""

# Backend
echo "📦 Instalando dependências do backend..."
cd backend
npm install

if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env do backend..."
    cp .env.example .env
    echo "⚠️  Configure o arquivo backend/.env com suas credenciais PostgreSQL"
fi

cd ..

# Frontend
echo ""
echo "📦 Instalando dependências do frontend..."
cd frontend
npm install

if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env do frontend..."
    cp .env.example .env
fi

cd ..

echo ""
echo "✅ Instalação concluída!"
echo ""
echo "📚 Próximos passos:"
echo "1. Configure o arquivo backend/.env com suas credenciais PostgreSQL"
echo "2. Inicie o backend: cd backend && npm run start:dev"
echo "3. Popule o banco: cd backend && npm run seed"
echo "4. Em outro terminal, inicie o frontend: cd frontend && npm run dev"
echo ""
echo "🌐 URLs:"
echo "   Backend: http://localhost:3000"
echo "   Swagger: http://localhost:3000/api"
echo "   Frontend: http://localhost:5173"
echo ""
echo "🔐 Credenciais de teste:"
echo "   Admin: admin@escola.com / admin123"
echo "   Supervisor: supervisor@escola.com / supervisor123"
echo "   Professor: joao@escola.com / professor123"
