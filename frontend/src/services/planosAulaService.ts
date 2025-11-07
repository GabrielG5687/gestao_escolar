import { api } from '@/lib/api';

export interface PlanoAulaData {
  turmaId: string;
  data: string;
  disciplina: string;
  tema: string;
  objetivo: string;
  recursos?: string;
  atividades?: string;
  avaliacaoPlaneada?: string;
  observacoes?: string;
  status?: 'RASCUNHO' | 'PUBLICADO';
}

export interface PlanoAula extends PlanoAulaData {
  id: string;
  autorId: string;
  createdAt: string;
  updatedAt: string;
  autor: {
    id: string;
    nome: string;
    email: string;
  };
  turma: {
    id: string;
    nome: string;
    serie: string;
  };
  comentarios?: Array<{
    id: string;
    texto: string;
    createdAt: string;
    autor: {
      id: string;
      nome: string;
    };
  }>;
}

export const planosAulaService = {
  // Criar plano de aula
  create: async (data: PlanoAulaData): Promise<PlanoAula> => {
    const response = await api.post('/planos-aula', data);
    return response.data;
  },

  // Listar planos de aula
  list: async (params?: {
    turmaId?: string;
    data?: string;
    autorId?: string;
  }): Promise<PlanoAula[]> => {
    const response = await api.get('/planos-aula', { params });
    return response.data;
  },

  // Buscar plano por ID
  getById: async (id: string): Promise<PlanoAula> => {
    const response = await api.get(`/planos-aula/${id}`);
    return response.data;
  },

  // Atualizar plano
  update: async (id: string, data: Partial<PlanoAulaData>): Promise<PlanoAula> => {
    const response = await api.patch(`/planos-aula/${id}`, data);
    return response.data;
  },

  // Deletar plano
  delete: async (id: string): Promise<void> => {
    await api.delete(`/planos-aula/${id}`);
  },

  // Adicionar comentário
  addComentario: async (planoId: string, texto: string) => {
    const response = await api.post(`/planos-aula/${planoId}/comentarios`, { texto });
    return response.data;
  },

  // Listar comentários
  getComentarios: async (planoId: string) => {
    const response = await api.get(`/planos-aula/${planoId}/comentarios`);
    return response.data;
  },

  // Atualizar status do plano
  updateStatus: async (planoId: string, status: 'RASCUNHO' | 'PUBLICADO') => {
    const response = await api.patch(`/planos-aula/${planoId}/status`, { status });
    return response.data;
  },
};
