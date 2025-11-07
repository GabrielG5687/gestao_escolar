import { api } from '@/lib/api';

export interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  turmaId?: string;
  responsavelId: string;
  dataInicio: string;
  dataFim?: string;
  anexos: string[];
  createdAt: string;
  turma?: {
    id: string;
    nome: string;
  };
  responsavel?: {
    id: string;
    nome: string;
  };
}

export const projetosService = {
  // Listar projetos com filtro opcional por turma
  list: async (turmaId?: string): Promise<Projeto[]> => {
    const params = turmaId ? { turmaId } : {};
    const response = await api.get('/projetos', { params });
    return response.data;
  },

  // Buscar projeto por ID
  getById: async (id: string): Promise<Projeto> => {
    const response = await api.get(`/projetos/${id}`);
    return response.data;
  },

  // Criar projeto
  create: async (data: {
    titulo: string;
    descricao: string;
    turmaId?: string;
    dataInicio: string;
    dataFim?: string;
    anexos?: string[];
  }): Promise<Projeto> => {
    const response = await api.post('/projetos', data);
    return response.data;
  },

  // Atualizar projeto
  update: async (id: string, data: Partial<Projeto>): Promise<Projeto> => {
    const response = await api.patch(`/projetos/${id}`, data);
    return response.data;
  },

  // Deletar projeto
  delete: async (id: string): Promise<void> => {
    await api.delete(`/projetos/${id}`);
  },
};
