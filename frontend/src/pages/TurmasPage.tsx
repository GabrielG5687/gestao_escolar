import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Users, Trash2, Edit, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { turmasService } from '@/services/turmasService';
import { usersService } from '@/services/usersService';
import { useAuthStore } from '@/store/authStore';

const turmaSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  ano: z.number().min(2020, 'Ano inválido').max(2030, 'Ano inválido'),
  serie: z.string().min(1, 'Série é obrigatória'),
  professorResponsavelId: z.string().min(1, 'Selecione um professor'),
});

type TurmaForm = z.infer<typeof turmaSchema>;

export default function TurmasPage() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: turmas = [], isLoading } = useQuery({
    queryKey: ['turmas'],
    queryFn: turmasService.list,
  });

  const { data: professores = [], isLoading: loadingProfessores } = useQuery({
    queryKey: ['professores'],
    queryFn: usersService.listProfessores,
    enabled: isModalOpen, // Só carrega quando o modal abre
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TurmaForm>({
    resolver: zodResolver(turmaSchema),
    defaultValues: {
      ano: new Date().getFullYear(),
      professorResponsavelId: '',
    },
  });

  const createMutation = useMutation({
    mutationFn: turmasService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['turmas'] });
      toast.success('Turma criada com sucesso!');
      setIsModalOpen(false);
      reset();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao criar turma');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: turmasService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['turmas'] });
      toast.success('Turma excluída com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao excluir turma');
    },
  });

  const onSubmit = (data: TurmaForm) => {
    createMutation.mutate(data);
  };

  const handleDelete = (id: string, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a turma "${nome}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const canManageTurmas = user?.role === 'ADMIN' || user?.role === 'SUPERVISOR';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Turmas</h1>
        {canManageTurmas && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Turma
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="card">
          <p className="text-gray-500">Carregando turmas...</p>
        </div>
      ) : turmas.length === 0 ? (
        <div className="card">
          <p className="text-gray-500">Nenhuma turma cadastrada ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {turmas.map((turma) => (
            <div key={turma.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {turma.nome}
                    </h3>
                    <p className="text-sm text-gray-500">{turma.serie}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="font-medium">Ano:</span>
                  <span>{turma.ano}</span>
                </div>
                {turma.professorResponsavel && (
                  <div className="flex justify-between">
                    <span className="font-medium">Professor:</span>
                    <span className="truncate ml-2">
                      {turma.professorResponsavel.nome}
                    </span>
                  </div>
                )}
              </div>

              {canManageTurmas && (
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-2">
                  <button
                    onClick={() => handleDelete(turma.id, turma.nome)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir turma"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal de Criar Turma */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Nova Turma</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Turma *
                </label>
                <input
                  {...register('nome')}
                  type="text"
                  className="input"
                  placeholder="Ex: 5º Ano A"
                />
                {errors.nome && (
                  <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Série *
                </label>
                <input
                  {...register('serie')}
                  type="text"
                  className="input"
                  placeholder="Ex: 5º Ano"
                />
                {errors.serie && (
                  <p className="mt-1 text-sm text-red-600">{errors.serie.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ano Letivo *
                </label>
                <input
                  {...register('ano', { valueAsNumber: true })}
                  type="number"
                  className="input"
                  placeholder="2025"
                />
                {errors.ano && (
                  <p className="mt-1 text-sm text-red-600">{errors.ano.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professor Responsável *
                </label>
                <select
                  {...register('professorResponsavelId')}
                  className="input"
                  disabled={loadingProfessores}
                >
                  <option value="">Selecione um professor</option>
                  {professores.map((professor) => (
                    <option key={professor.id} value={professor.id}>
                      {professor.nome} ({professor.email})
                    </option>
                  ))}
                </select>
                {errors.professorResponsavelId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.professorResponsavelId.message}
                  </p>
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
                  {createMutation.isPending ? 'Criando...' : 'Criar Turma'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
