-- Script para criar o banco de dados
-- Execute com: psql -U postgres -f scripts/create-database.sql

-- Criar o banco de dados se não existir
SELECT 'CREATE DATABASE sistema_pedagogico'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'sistema_pedagogico')\gexec

-- Conectar ao banco
\c sistema_pedagogico

-- Mensagem de sucesso
\echo 'Banco de dados sistema_pedagogico criado/verificado com sucesso!'
