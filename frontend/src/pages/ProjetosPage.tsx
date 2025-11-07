import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Lightbulb, Trash2, Edit, X, Filter, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { projetosService } from '@/services/projetosService';
import { turmasService } from '@/services/turmasService';
import { useAuthStore } from '@/store/authStore';

const projetoSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  turmaId: z.string().optional(),
  dataInicio: z.string().min(1, 'Data de início é obrigatória'),
  dataFim: z.string().optional(),
});

type ProjetoForm = z.infer<typeof projetoSchema>;

export default function ProjetosPage() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjeto, setEditingProjeto] = useState<string | null>(null);
  const [filterTurmaId, setFilterTurmaId] = useState('');

  const { data: projetos = [], isLoading } = useQuery({
    queryKey: ['projetos', filterTurmaId],
    queryFn: () => projetosService.list(filterTurmaId || undefined),
  });

  const { data: turmas = [] } = useQuery({
    queryKey: ['turmas'],
    queryFn: turmasService.list,
    enabled: isModalOpen || !!filterTurmaId,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjetoForm>({
    resolver: zodResolver(projetoSchema),
    defaultValues: {
      dataInicio: new Date().toISOString().split('T')[0],
    },
  });

  const createMutation = useMutation({
    mutationFn: projetosService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projetos'] });
      toast.success('Projeto criado com sucesso!');
      handleCloseModal();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao criar projeto');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjetoForm> }) =>
      projetosService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projetos'] });
      toast.success('Projeto atualizado com sucesso!');
      handleCloseModal();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao atualizar projeto');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: projetosService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projetos'] });
      toast.success('Projeto excluído com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao excluir projeto');
    },
  });

  const onSubmit = (data: ProjetoForm) => {
    if (editingProjeto) {
      updateMutation.mutate({ id: editingProjeto, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (projeto: any) => {
    setEditingProjeto(projeto.id);
    reset({
      titulo: projeto.titulo,
      descricao: projeto.descricao,
      turmaId: projeto.turmaId || '',
      dataInicio: projeto.dataInicio.split('T')[0],
      dataFim: projeto.dataFim ? projeto.dataFim.split('T')[0] : '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, titulo: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o projeto "${titulo}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProjeto(null);
    reset({
      dataInicio: new Date().toISOString().split('T')[0],
    });
  };

  const canManageProjetos = user?.role !== 'ALUNO';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Projetos</h1>
        <div className="flex gap-2">
          {canManageProjetos && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Projeto
            </button>
          )}
        </div>
      </div>

      {/* Filtro por Turma */}
      <div className="card">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filterTurmaId}
            onChange={(e) => setFilterTurmaId(e.target.value)}
            className="input flex-1"
          >
            <option value="">Todas as turmas</option>
            {turmas.map((turma) => (
              <option key={turma.id} value={turma.id}>
                {turma.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Projetos */}
      {isLoading ? (
        <div className="card">
          <p className="text-gray-500">Carregando projetos...</p>
        </div>
      ) : projetos.length === 0 ? (
        <div className="card">
          <p className="text-gray-500">Nenhum projeto criado ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projetos.map((projeto) => (
            <div key={projeto.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {projeto.titulo}
                    </h3>
                    {projeto.turma && (
                      <p className="text-sm text-gray-500">{projeto.turma.nome}</p>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {projeto.descricao}
              </p>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(projeto.dataInicio).toLocaleDateString('pt-BR')}
                    {projeto.dataFim &&
                      ` - ${new Date(projeto.dataFim).toLocaleDateString('pt-BR')}`}
                  </span>
                </div>
                {projeto.responsavel && (
                  <div className="flex justify-between">
                    <span className="font-medium">Responsável:</span>
                    <span className="truncate ml-2">{projeto.responsavel.nome}</span>
                  </div>
                )}
              </div>

              {canManageProjetos && (
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(projeto)}
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Editar projeto"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(projeto.id, projeto.titulo)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir projeto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal de Criar/Editar Projeto */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingProjeto ? 'Editar Projeto' : 'Novo Projeto'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  {...register('titulo')}
                  type="text"
                  className="input"
                  placeholder="Ex: Projeto Horta Escolar"
                />
                {errors.titulo && (
                  <p className="mt-1 text-sm text-red-600">{errors.titulo.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição *
                </label>
                <textarea
                  {...register('descricao')}
                  rows={4}
                  className="input"
                  placeholder="Descreva o projeto..."
                />
                {errors.descricao && (
                  <p className="mt-1 text-sm text-red-600">{errors.descricao.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Turma (opcional)
                </label>
                <select {...register('turmaId')} className="input">
                  <option value="">Sem turma específica</option>
                  {turmas.map((turma) => (
                    <option key={turma.id} value={turma.id}>
                      {turma.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Início *
                  </label>
                  <input {...register('dataInicio')} type="date" className="input" />
                  {errors.dataInicio && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.dataInicio.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Término (opcional)
                  </label>
                  <input {...register('dataFim')} type="date" className="input" />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="btn btn-primary"
                >
                  {editingProjeto
                    ? updateMutation.isPending
                      ? 'Salvando...'
                      : 'Salvar Alterações'
                    : createMutation.isPending
                    ? 'Criando...'
                    : 'Criar Projeto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
