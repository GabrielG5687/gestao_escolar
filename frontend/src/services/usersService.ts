import { api } from '@/lib/api';

export interface User {
  id: string;
  nome: string;
  email: string;
  role: 'ADMIN' | 'SUPERVISOR' | 'PROFESSOR' | 'ALUNO';
}

export const usersService = {
  // Listar todos os usuários
  list: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  // Listar apenas professores
  listProfessores: async (): Promise<User[]> => {
    const response = await api.get('/users/professores');
    return response.data;
  },

  // Buscar usuário por ID
  getById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Perfil do usuário logado
  getMe: async (): Promise<User> => {
    const response = await api.get('/users/me');
    return response.data;
  },
};
