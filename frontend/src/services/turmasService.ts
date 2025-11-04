import { api } from '@/lib/api';

export interface Turma {
  id: string;
  nome: string;
  ano: number;
  serie: string;
  professorResponsavelId: string;
  createdAt: string;
  updatedAt: string;
  professorResponsavel?: {
    id: string;
    nome: string;
    email: string;
  };
}

export const turmasService = {
  // Listar turmas
  list: async (): Promise<Turma[]> => {
    const response = await api.get('/turmas');
    return response.data;
  },

  // Buscar turma por ID
  getById: async (id: string): Promise<Turma> => {
    const response = await api.get(`/turmas/${id}`);
    return response.data;
  },

  // Criar turma
  create: async (data: {
    nome: string;
    ano: number;
    serie: string;
    professorResponsavelId: string;
  }): Promise<Turma> => {
    const response = await api.post('/turmas', data);
    return response.data;
  },

  // Atualizar turma
  update: async (id: string, data: Partial<Turma>): Promise<Turma> => {
    const response = await api.patch(`/turmas/${id}`, data);
    return response.data;
  },

  // Deletar turma
  delete: async (id: string): Promise<void> => {
    await api.delete(`/turmas/${id}`);
  },
};
