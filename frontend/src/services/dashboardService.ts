import { api } from '@/lib/api';

export interface StatsSupervisor {
  totalTurmas: number;
  planosPendentes: number;
  totalObservacoes: number;
  projetosAtivos: number;
  totalProfessores: number;
  totalAlunos: number;
}

export interface StatsProfessor {
  minhasTurmas: number;
  meusPlanos: number;
  minhasObservacoes: number;
  meusProjetos: number;
  planosAprovados: number;
  planosPendentes: number;
}

// Interface para planos recentes retornados pelo dashboard
export interface PlanoRecente {
  id: string;
  tema: string;
  disciplina: string;
  data: string;
  status: string;
  objetivo: string;
  atividades?: string;
  recursos?: string;
  avaliacaoPlaneada?: string;
  observacoes?: string;
  turma?: {
    id: string;
    nome: string;
  };
}

export interface AtividadeRecente {
  id: string;
  tipo: 'observacao' | 'projeto';
  titulo: string;
  descricao: string;
  data: string;
  turma?: string;
}

export const dashboardService = {
  // Estatísticas do supervisor
  getStatsSupervisor: async (): Promise<StatsSupervisor> => {
    const response = await api.get('/dashboard/supervisor/stats');
    return response.data;
  },

  // Estatísticas do professor
  getStatsProfessor: async (): Promise<StatsProfessor> => {
    const response = await api.get('/dashboard/professor/stats');
    return response.data;
  },

  // Planos recentes do professor
  getPlanosRecentes: async (): Promise<PlanoRecente[]> => {
    const response = await api.get('/dashboard/professor/planos-recentes');
    return response.data;
  },

  // Planos pendentes de revisão (supervisor)
  getPlanosPendentes: async (): Promise<PlanoRecente[]> => {
    const response = await api.get('/dashboard/supervisor/planos-pendentes');
    return response.data;
  },

  // Atividades recentes (supervisor)
  getAtividadesRecentes: async (): Promise<AtividadeRecente[]> => {
    const response = await api.get('/dashboard/supervisor/atividades-recentes');
    return response.data;
  },

  // Projetos ativos do professor
  getProjetosAtivos: async () => {
    const response = await api.get('/dashboard/professor/projetos-ativos');
    return response.data;
  },
};
