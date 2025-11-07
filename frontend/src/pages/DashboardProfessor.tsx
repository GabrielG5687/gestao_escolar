import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  FileText,
  Eye,
  FolderOpen,
  Plus,
  BookOpen,
  CheckCircle,
  Clock,
  ChevronRight,
  X,
  Calendar,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { dashboardService, PlanoRecente } from '@/services/dashboardService';

export default function DashboardProfessor() {
  const { user } = useAuthStore();
  const [selectedPlano, setSelectedPlano] = useState<PlanoRecente | null>(null);

  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ['dashboard-professor-stats'],
    queryFn: dashboardService.getStatsProfessor,
  });

  const { data: planosRecentes = [], isLoading: loadingPlanos } = useQuery({
    queryKey: ['dashboard-planos-recentes'],
    queryFn: dashboardService.getPlanosRecentes,
  });

  const quickActions = [
    {
      title: 'Novo Plano de Aula',
      description: 'Criar plano diário',
      icon: Plus,
      href: '/planos-aula/novo',
      color: 'bg-[#0891b2]',
    },
    {
      title: 'Meus Planos',
      description: 'Ver planos criados',
      icon: FileText,
      href: '/planos-aula',
      color: 'bg-blue-500',
    },
    {
      title: 'Observações',
      description: 'Registrar observações',
      icon: Eye,
      href: '/observacoes',
      color: 'bg-green-500',
    },
    {
      title: 'Projetos',
      description: 'Gerenciar projetos',
      icon: FolderOpen,
      href: '/projetos',
      color: 'bg-purple-500',
    },
  ];

  const statsCards = [
    {
      name: 'Minhas Turmas',
      value: stats?.minhasTurmas || 0,
      icon: BookOpen,
      color: 'bg-blue-500',
      link: '/turmas',
      description: 'Turmas sob sua responsabilidade',
    },
    {
      name: 'Meus Planos',
      value: stats?.meusPlanos || 0,
      icon: FileText,
      color: 'bg-[#0891b2]',
      link: '/planos-aula',
      description: 'Total de planos criados',
    },
    {
      name: 'Planos Publicados',
      value: stats?.planosAprovados || 0,
      icon: CheckCircle,
      color: 'bg-green-500',
      link: '/planos-aula',
      description: 'Planos finalizados e publicados',
    },
    {
      name: 'Rascunhos',
      value: stats?.planosPendentes || 0,
      icon: Clock,
      color: 'bg-yellow-500',
      link: '/planos-aula',
      description: 'Planos em elaboração',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLICADO':
        return 'bg-green-100 text-green-700';
      case 'RASCUNHO':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PUBLICADO':
        return 'Publicado';
      case 'RASCUNHO':
        return 'Rascunho';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header com gradiente */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0891b2] via-[#06b6d4] to-[#22d3ee] p-8 shadow-xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">Olá, {user?.nome}! 👋</h1>
          <p className="text-cyan-50 text-lg">Bem-vindo ao seu painel pedagógico</p>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      {loadingStats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat) => (
            <Link
              key={stat.name}
              to={stat.link}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-[#1e293b] p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              {/* Efeito de hover com gradiente */}
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

      {/* Ações Rápidas */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 bg-gradient-to-b from-[#0891b2] to-[#06b6d4] rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ações Rápidas</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.href}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-[#1e293b] p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-[#0891b2] dark:hover:border-[#06b6d4]"
            >
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0891b2]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div
                  className={`${action.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}
                >
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#0891b2] dark:group-hover:text-[#06b6d4] transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
              </div>
              
              {/* Seta indicadora */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-5 h-5 text-[#0891b2] dark:text-[#06b6d4]" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Planos Recentes */}
      <div className="rounded-xl bg-white dark:bg-[#1e293b] p-6 shadow-md border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-gradient-to-b from-[#0891b2] to-[#06b6d4] rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Planos Recentes</h2>
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
        ) : planosRecentes.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Nenhum plano criado ainda.
            </p>
            <Link 
              to="/planos-aula/novo"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0891b2] hover:bg-[#06b6d4] text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Criar primeiro plano
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {planosRecentes.map((plano) => (
              <div
                key={plano.id}
                className="group relative overflow-hidden p-5 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-[#0891b2] dark:hover:border-[#06b6d4] hover:shadow-lg transition-all cursor-pointer bg-gray-50 dark:bg-[#0f172a]"
                onClick={() => setSelectedPlano(plano)}
              >
                {/* Efeito de hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0891b2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white truncate text-lg mb-2 group-hover:text-[#0891b2] dark:group-hover:text-[#06b6d4] transition-colors">
                      {plano.tema}
                    </h3>
                    <div className="flex items-center gap-4 flex-wrap">
                      {plano.turma && (
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-gray-400" />
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{plano.turma.nome}</p>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(plano.data).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{plano.disciplina}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(
                        plano.status
                      )} dark:bg-opacity-20`}
                    >
                      {getStatusLabel(plano.status)}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#0891b2] dark:group-hover:text-[#06b6d4] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Detalhes do Plano */}
      {selectedPlano && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 animate-in zoom-in-95 duration-200">
            {/* Header com gradiente */}
            <div className="sticky top-0 bg-gradient-to-r from-[#0891b2] to-[#06b6d4] p-6 flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-3">{selectedPlano.tema}</h2>
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm`}
                  >
                    {getStatusLabel(selectedPlano.status)}
                  </span>
                  <span className="text-sm text-cyan-50 font-medium">{selectedPlano.disciplina}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPlano(null)}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-[#0891b2]/10 to-transparent rounded-xl border border-[#0891b2]/20">
                  <div className="w-12 h-12 rounded-lg bg-[#0891b2] flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Data</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {new Date(selectedPlano.data).toLocaleDateString('pt-BR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {selectedPlano.turma && (
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl border border-blue-500/20">
                    <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Turma</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {selectedPlano.turma.nome}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-bold text-[#0891b2] dark:text-[#06b6d4] mb-2 uppercase tracking-wide">Objetivo</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {selectedPlano.objetivo}
                  </p>
                </div>

                {selectedPlano.atividades && (
                  <div className="p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-bold text-[#0891b2] dark:text-[#06b6d4] mb-2 uppercase tracking-wide">Atividades</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {selectedPlano.atividades}
                    </p>
                  </div>
                )}

                {selectedPlano.recursos && (
                  <div className="p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-bold text-[#0891b2] dark:text-[#06b6d4] mb-2 uppercase tracking-wide">Recursos</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {selectedPlano.recursos}
                    </p>
                  </div>
                )}

                {selectedPlano.avaliacaoPlaneada && (
                  <div className="p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-bold text-[#0891b2] dark:text-[#06b6d4] mb-2 uppercase tracking-wide">
                      Avaliação Planejada
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {selectedPlano.avaliacaoPlaneada}
                    </p>
                  </div>
                )}

                {selectedPlano.observacoes && (
                  <div className="p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-bold text-[#0891b2] dark:text-[#06b6d4] mb-2 uppercase tracking-wide">Observações</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {selectedPlano.observacoes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="sticky bottom-0 bg-white dark:bg-[#1e293b] border-t border-gray-200 dark:border-gray-700 p-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedPlano(null)}
                className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
              >
                Fechar
              </button>
              <Link
                to={`/planos-aula/${selectedPlano.id}`}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#0891b2] to-[#06b6d4] text-white hover:from-[#06b6d4] hover:to-[#22d3ee] transition-all font-medium shadow-lg hover:shadow-xl"
                onClick={() => setSelectedPlano(null)}
              >
                Ver Detalhes Completos
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
