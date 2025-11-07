import { api } from '@/lib/api';

export interface Observacao {
  id: string;
  turmaId: string;
  alunoId: string;
  data: string;
  criterio: string;
  notas: string;
  createdAt: string;
  updatedAt: string;
  turma?: {
    id: string;
    nome: string;
  };
  aluno?: {
    id: string;
    nome: string;
  };
}

export const observacoesService = {
  // Listar observações com filtros opcionais
  list: async (params?: {
    turmaId?: string;
    alunoId?: string;
    data?: string;
  }): Promise<Observacao[]> => {
    const response = await api.get('/observacoes', { params });
    return response.data;
  },

  // Criar observação
  create: async (data: {
    turmaId: string;
    alunoId: string;
    data: string;
    criterio: string;
    notas: string;
  }): Promise<Observacao> => {
    const response = await api.post('/observacoes', data);
    return response.data;
  },

  // Deletar observação
  delete: async (id: string): Promise<void> => {
    await api.delete(`/observacoes/${id}`);
  },
};
