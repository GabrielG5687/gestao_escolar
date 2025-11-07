import { api } from '@/lib/api';

export interface Ata {
  id: string;
  turmaId: string;
  data: string;
  titulo: string;
  descricao: string;
  medidasTomadas?: string;
  autorId: string;
  anexos: string[];
  createdAt: string;
  turma?: {
    id: string;
    nome: string;
  };
  autor?: {
    id: string;
    nome: string;
  };
}

export const atasService = {
  // Listar atas com filtros opcionais
  list: async (params?: {
    turmaId?: string;
    data?: string;
  }): Promise<Ata[]> => {
    const response = await api.get('/atas', { params });
    return response.data;
  },

  // Buscar ata por ID
  getById: async (id: string): Promise<Ata> => {
    const response = await api.get(`/atas/${id}`);
    return response.data;
  },

  // Criar ata
  create: async (data: {
    turmaId: string;
    data: string;
    titulo: string;
    descricao: string;
    medidasTomadas?: string;
    anexos?: string[];
  }): Promise<Ata> => {
    const response = await api.post('/atas', data);
    return response.data;
  },

  // Atualizar ata
  update: async (id: string, data: Partial<Ata>): Promise<Ata> => {
    const response = await api.patch(`/atas/${id}`, data);
    return response.data;
  },

  // Deletar ata
  delete: async (id: string): Promise<void> => {
    await api.delete(`/atas/${id}`);
  },
};
