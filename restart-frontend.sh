#!/bin/bash

# Script para reiniciar o frontend e resolver erro 500

echo "🔄 Reiniciando o servidor frontend..."
echo ""

# Ir para o diretório frontend
cd frontend

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 node_modules não encontrado. Instalando dependências..."
    npm install
fi

# Matar processos do Vite que possam estar rodando
echo "🛑 Parando processos anteriores..."
pkill -f "vite" 2>/dev/null || true

# Limpar cache do Vite
echo "🧹 Limpando cache..."
rm -rf node_modules/.vite 2>/dev/null || true

# Verificar se os arquivos existem
echo "✅ Verificando arquivos do módulo pedagógico..."
FILES=(
    "src/pages/PedagogicoTurmas.tsx"
    "src/pages/PedagogicoDashboard.tsx"
    "src/pages/Planejamento.tsx"
    "src/pages/PlanosAulaBimestre.tsx"
    "src/pages/ProjetosPedagogicos.tsx"
    "src/pages/AtendimentoNEE.tsx"
    "src/pages/NotificacoesRegistros.tsx"
)

ALL_EXIST=true
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ $file (FALTANDO!)"
        ALL_EXIST=false
    fi
done

if [ "$ALL_EXIST" = false ]; then
    echo ""
    echo "❌ Alguns arquivos estão faltando!"
    echo "   Verifique se todos os arquivos foram criados corretamente."
    exit 1
fi

echo ""
echo "🚀 Iniciando servidor de desenvolvimento..."
echo ""
echo "   Frontend estará disponível em: http://localhost:5173"
echo "   Pressione Ctrl+C para parar"
echo ""

# Iniciar o servidor
npm run dev
