import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Users,
  FileText,
  Eye,
  FolderOpen,
  GraduationCap,
  UserCheck,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { dashboardService } from '@/services/dashboardService';

export default function DashboardSupervisor() {
  const { user } = useAuthStore();

  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ['dashboard-supervisor-stats'],
    queryFn: dashboardService.getStatsSupervisor,
  });

  const { data: planosPendentes = [], isLoading: loadingPlanos } = useQuery({
    queryKey: ['dashboard-planos-pendentes'],
    queryFn: dashboardService.getPlanosPendentes,
  });

  const { data: atividadesRecentes = [], isLoading: loadingAtividades } = useQuery({
    queryKey: ['dashboard-atividades-recentes'],
    queryFn: dashboardService.getAtividadesRecentes,
  });

  const statsCards = [
    {
      name: 'Turmas',
      value: stats?.totalTurmas || 0,
      icon: Users,
      color: 'bg-blue-500',
      link: '/turmas',
      description: 'Total de turmas cadastradas',
    },
    {
      name: 'Planos Rascunho',
      value: stats?.planosPendentes || 0,
      icon: FileText,
      color: 'bg-yellow-500',
      link: '/planos-aula',
      description: 'Aguardando finalização',
    },
    {
      name: 'Observações',
      value: stats?.totalObservacoes || 0,
      icon: Eye,
      color: 'bg-green-500',
      link: '/observacoes',
      description: 'Observações registradas',
    },
    {
      name: 'Projetos Ativos',
      value: stats?.projetosAtivos || 0,
      icon: FolderOpen,
      color: 'bg-purple-500',
      link: '/projetos',
      description: 'Projetos em andamento',
    },
    {
      name: 'Professores',
      value: stats?.totalProfessores || 0,
      icon: UserCheck,
      color: 'bg-indigo-500',
      link: '/turmas',
      description: 'Professores cadastrados',
    },
    {
      name: 'Alunos',
      value: stats?.totalAlunos || 0,
      icon: GraduationCap,
      color: 'bg-pink-500',
      link: '/turmas',
      description: 'Alunos matriculados',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLICADO':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'RASCUNHO':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getAtividadeIcon = (tipo: string) => {
    switch (tipo) {
      case 'observacao':
        return Eye;
      case 'projeto':
        return FolderOpen;
      default:
        return FileText;
    }
  };

  const getAtividadeColor = (tipo: string) => {
    switch (tipo) {
      case 'observacao':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'projeto':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header com gradiente */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0891b2] via-[#06b6d4] to-[#22d3ee] p-8 shadow-xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">Painel do Supervisor 📊</h1>
          <p className="text-cyan-50 text-lg">Bem-vindo, {user?.nome}</p>
        </div>
      </div>

      {/* Estatísticas */}
      {loadingStats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsCards.map((stat) => (
            <Link
              key={stat.name}
              to={stat.link}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-[#1e293b] p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0891b2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`${stat.color} w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                  >
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#0891b2] group-hover:translate-x-1 transition-all" />
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{stat.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Planos para Revisar */}
        <div className="rounded-xl bg-white dark:bg-[#1e293b] p-6 shadow-md border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 bg-gradient-to-b from-[#0891b2] to-[#06b6d4] rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Planos para Revisar</h2>
            </div>
            <Link
              to="/planos-aula"
              className="flex items-center gap-2 text-[#0891b2] dark:text-[#06b6d4] hover:text-[#06b6d4] dark:hover:text-[#22d3ee] text-sm font-medium transition-colors group"
            >
              Ver todos
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loadingPlanos ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : planosPendentes.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">Nenhum plano pendente de revisão.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {planosPendentes.map((plano: any) => (
                <Link
                  key={plano.id}
                  to={`/planos-aula/${plano.id}`}
                  className="group block p-5 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-[#0891b2] dark:hover:border-[#06b6d4] hover:shadow-lg transition-all bg-gray-50 dark:bg-[#0f172a]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 dark:text-white truncate group-hover:text-[#0891b2] dark:group-hover:text-[#06b6d4] transition-colors">
                        {plano.titulo}
                      </h3>
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        {plano.professor && (
                          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                            Prof. {plano.professor.nome}
                          </p>
                        )}
                        {plano.turma && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">{plano.turma.nome}</p>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {new Date(plano.data).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                      Rascunho
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Atividades Recentes */}
        <div className="rounded-xl bg-white dark:bg-[#1e293b] p-6 shadow-md border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 bg-gradient-to-b from-[#0891b2] to-[#06b6d4] rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Atividades Recentes</h2>
          </div>

          {loadingAtividades ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : atividadesRecentes.length === 0 ? (
            <div className="text-center py-8">
              <Eye className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">Nenhuma atividade recente.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {atividadesRecentes.map((atividade) => {
                const Icon = getAtividadeIcon(atividade.tipo);
                return (
                  <div
                    key={`${atividade.tipo}-${atividade.id}`}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-[#0f172a]"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${getAtividadeColor(
                          atividade.tipo
                        )}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate">
                          {atividade.titulo}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {atividade.descricao}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          {atividade.turma && (
                            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                              {atividade.turma}
                            </span>
                          )}
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {new Date(atividade.data).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
