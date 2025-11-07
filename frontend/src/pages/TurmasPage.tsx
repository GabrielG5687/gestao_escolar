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
  const [editingTurma, setEditingTurma] = useState<string | null>(null);

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

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TurmaForm> }) =>
      turmasService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['turmas'] });
      toast.success('Turma atualizada com sucesso!');
      setIsModalOpen(false);
      setEditingTurma(null);
      reset();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao atualizar turma');
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
    if (editingTurma) {
      updateMutation.mutate({ id: editingTurma, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (turma: any) => {
    setEditingTurma(turma.id);
    reset({
      nome: turma.nome,
      ano: turma.ano,
      serie: turma.serie,
      professorResponsavelId: turma.professorResponsavelId,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTurma(null);
    reset({
      ano: new Date().getFullYear(),
      professorResponsavelId: '',
    });
  };

  const handleDelete = (id: string, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a turma "${nome}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const canManageTurmas = user?.role === 'ADMIN' || user?.role === 'SUPERVISOR';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Turmas</h1>
          <p className="text-gray-600 dark:text-gray-400">Gerencie as turmas da sua escola</p>
        </div>
        {canManageTurmas && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0891b2] to-[#06b6d4] hover:from-[#06b6d4] hover:to-[#22d3ee] text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#0891b2]/30 hover:shadow-xl hover:shadow-[#06b6d4]/40 transform hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" />
            Nova Turma
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl bg-white dark:bg-[#1e293b] p-6 shadow-md border border-gray-100 dark:border-gray-700 animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      ) : turmas.length === 0 ? (
        <div className="text-center py-16 rounded-xl bg-white dark:bg-[#1e293b] shadow-md border border-gray-100 dark:border-gray-700">
          <div className="w-20 h-20 bg-gradient-to-br from-[#0891b2]/10 to-[#06b6d4]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-[#0891b2] dark:text-[#06b6d4]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Nenhuma turma cadastrada</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Comece criando sua primeira turma</p>
          {canManageTurmas && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0891b2] to-[#06b6d4] hover:from-[#06b6d4] hover:to-[#22d3ee] text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#0891b2]/30"
            >
              <Plus className="w-5 h-5" />
              Criar primeira turma
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {turmas.map((turma) => (
            <div 
              key={turma.id} 
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-[#1e293b] p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-[#0891b2] dark:hover:border-[#06b6d4]"
            >
              {/* Efeito de hover com gradiente */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0891b2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0891b2] to-[#06b6d4] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#0891b2] dark:group-hover:text-[#06b6d4] transition-colors">
                        {turma.nome}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{turma.serie}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#0f172a] rounded-lg">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Ano:</span>
                    <span className="text-gray-900 dark:text-white font-bold">{turma.ano}</span>
                  </div>
                  {turma.professorResponsavel && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#0f172a] rounded-lg">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Professor:</span>
                      <span className="text-gray-900 dark:text-white font-medium truncate ml-2 max-w-[150px]" title={turma.professorResponsavel.nome}>
                        {turma.professorResponsavel.nome}
                      </span>
                    </div>
                  )}
                </div>

                {canManageTurmas && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(turma)}
                      className="p-2.5 text-[#0891b2] dark:text-[#06b6d4] hover:bg-[#0891b2]/10 dark:hover:bg-[#06b6d4]/20 rounded-lg transition-all hover:scale-110"
                      title="Editar turma"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(turma.id, turma.nome)}
                      className="p-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all hover:scale-110"
                      title="Excluir turma"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Criar/Editar Turma */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingTurma ? 'Editar Turma' : 'Nova Turma'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome da Turma *
                </label>
                <input
                  {...register('nome')}
                  type="text"
                  className="input"
                  placeholder="Ex: 5º Ano A"
                />
                {errors.nome && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nome.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Série *
                </label>
                <input
                  {...register('serie')}
                  type="text"
                  className="input"
                  placeholder="Ex: 5º Ano"
                />
                {errors.serie && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.serie.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ano Letivo *
                </label>
                <input
                  {...register('ano', { valueAsNumber: true })}
                  type="number"
                  className="input"
                  placeholder="2025"
                />
                {errors.ano && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.ano.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.professorResponsavelId.message}
                  </p>
                )}
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
                  {editingTurma
                    ? updateMutation.isPending
                      ? 'Salvando...'
                      : 'Salvar Alterações'
                    : createMutation.isPending
                    ? 'Criando...'
                    : 'Criar Turma'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
