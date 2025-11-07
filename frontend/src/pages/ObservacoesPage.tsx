import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, FileText, Trash2, X, Filter } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { observacoesService } from '@/services/observacoesService';
import { turmasService } from '@/services/turmasService';
import { usersService } from '@/services/usersService';
import { useAuthStore } from '@/store/authStore';

const observacaoSchema = z.object({
  turmaId: z.string().min(1, 'Selecione uma turma'),
  alunoId: z.string().min(1, 'Selecione um aluno'),
  data: z.string().min(1, 'Data é obrigatória'),
  criterio: z.string().min(1, 'Critério é obrigatório'),
  notas: z.string().min(1, 'Notas são obrigatórias'),
});

type ObservacaoForm = z.infer<typeof observacaoSchema>;

const criterios = [
  { value: 'participacao_oral', label: 'Participação Oral' },
  { value: 'trabalho_grupo', label: 'Trabalho em Grupo' },
  { value: 'comportamento', label: 'Comportamento' },
  { value: 'organizacao', label: 'Organização' },
  { value: 'criatividade', label: 'Criatividade' },
  { value: 'autonomia', label: 'Autonomia' },
  { value: 'outros', label: 'Outros' },
];

export default function ObservacoesPage() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    turmaId: '',
    alunoId: '',
    data: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const { data: observacoes = [], isLoading } = useQuery({
    queryKey: ['observacoes', filters],
    queryFn: () => observacoesService.list(filters),
  });

  const { data: turmas = [] } = useQuery({
    queryKey: ['turmas'],
    queryFn: turmasService.list,
    enabled: isModalOpen || showFilters,
  });

  const { data: alunos = [] } = useQuery({
    queryKey: ['alunos'],
    queryFn: usersService.listAlunos,
    enabled: isModalOpen || showFilters,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ObservacaoForm>({
    resolver: zodResolver(observacaoSchema),
    defaultValues: {
      data: new Date().toISOString().split('T')[0],
    },
  });

  const createMutation = useMutation({
    mutationFn: observacoesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['observacoes'] });
      toast.success('Observação criada com sucesso!');
      setIsModalOpen(false);
      reset({ data: new Date().toISOString().split('T')[0] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao criar observação');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: observacoesService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['observacoes'] });
      toast.success('Observação excluída com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao excluir observação');
    },
  });

  const onSubmit = (data: ObservacaoForm) => {
    createMutation.mutate(data);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta observação?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ turmaId: '', alunoId: '', data: '' });
  };

  const canManageObservacoes = user?.role !== 'ALUNO';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Observações</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-secondary flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </button>
          {canManageObservacoes && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Observação
            </button>
          )}
        </div>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Turma
              </label>
              <select
                value={filters.turmaId}
                onChange={(e) => handleFilterChange('turmaId', e.target.value)}
                className="input"
              >
                <option value="">Todas as turmas</option>
                {turmas.map((turma) => (
                  <option key={turma.id} value={turma.id}>
                    {turma.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aluno
              </label>
              <select
                value={filters.alunoId}
                onChange={(e) => handleFilterChange('alunoId', e.target.value)}
                className="input"
              >
                <option value="">Todos os alunos</option>
                {alunos.map((aluno) => (
                  <option key={aluno.id} value={aluno.id}>
                    {aluno.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data
              </label>
              <input
                type="date"
                value={filters.data}
                onChange={(e) => handleFilterChange('data', e.target.value)}
                className="input"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button onClick={clearFilters} className="btn btn-secondary">
              Limpar Filtros
            </button>
          </div>
        </div>
      )}

      {/* Lista de Observações */}
      {isLoading ? (
        <div className="card">
          <p className="text-gray-500">Carregando observações...</p>
        </div>
      ) : observacoes.length === 0 ? (
        <div className="card">
          <p className="text-gray-500">Nenhuma observação registrada ainda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {observacoes.map((obs) => (
            <div key={obs.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {obs.aluno?.nome || 'Aluno não encontrado'}
                      </h3>
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded">
                        {criterios.find((c) => c.value === obs.criterio)?.label ||
                          obs.criterio}
                      </span>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-4">
                        <span>
                          <span className="font-medium">Turma:</span>{' '}
                          {obs.turma?.nome || 'N/A'}
                        </span>
                        <span>
                          <span className="font-medium">Data:</span>{' '}
                          {new Date(obs.data).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 whitespace-pre-wrap">{obs.notas}</p>
                  </div>
                </div>

                {canManageObservacoes && (
                  <button
                    onClick={() => handleDelete(obs.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    title="Excluir observação"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Criar Observação */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Nova Observação</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Turma *
                  </label>
                  <select {...register('turmaId')} className="input">
                    <option value="">Selecione uma turma</option>
                    {turmas.map((turma) => (
                      <option key={turma.id} value={turma.id}>
                        {turma.nome}
                      </option>
                    ))}
                  </select>
                  {errors.turmaId && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.turmaId.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aluno *
                  </label>
                  <select {...register('alunoId')} className="input">
                    <option value="">Selecione um aluno</option>
                    {alunos.map((aluno) => (
                      <option key={aluno.id} value={aluno.id}>
                        {aluno.nome}
                      </option>
                    ))}
                  </select>
                  {errors.alunoId && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.alunoId.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data *
                  </label>
                  <input
                    {...register('data')}
                    type="date"
                    className="input"
                  />
                  {errors.data && (
                    <p className="mt-1 text-sm text-red-600">{errors.data.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Critério *
                  </label>
                  <select {...register('criterio')} className="input">
                    <option value="">Selecione um critério</option>
                    {criterios.map((criterio) => (
                      <option key={criterio.value} value={criterio.value}>
                        {criterio.label}
                      </option>
                    ))}
                  </select>
                  {errors.criterio && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.criterio.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notas *
                </label>
                <textarea
                  {...register('notas')}
                  rows={4}
                  className="input"
                  placeholder="Descreva suas observações sobre o aluno..."
                />
                {errors.notas && (
                  <p className="mt-1 text-sm text-red-600">{errors.notas.message}</p>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="btn btn-primary"
                >
                  {createMutation.isPending ? 'Criando...' : 'Criar Observação'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
