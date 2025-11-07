import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { planosAulaService } from '@/services/planosAulaService';
import { turmasService } from '@/services/turmasService';
import { ArrowLeft, Save } from 'lucide-react';

const planoSchema = z.object({
  turmaId: z.string().min(1, 'Selecione uma turma'),
  data: z.string().min(1, 'Data é obrigatória'),
  disciplina: z.string().min(1, 'Disciplina é obrigatória'),
  tema: z.string().min(1, 'Tema é obrigatório'),
  objetivo: z.string().min(1, 'Objetivo é obrigatório'),
  recursos: z.string().optional(),
  atividades: z.string().optional(),
  avaliacaoPlaneada: z.string().optional(),
  observacoes: z.string().optional(),
  status: z.enum(['RASCUNHO', 'PUBLICADO']),
});

type PlanoForm = z.infer<typeof planoSchema>;

export default function CriarPlanoPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const isEditing = !!id;
  
  // Buscar turmas disponíveis
  const { data: turmas = [], isLoading: loadingTurmas } = useQuery({
    queryKey: ['turmas'],
    queryFn: turmasService.list,
  });

  // Buscar plano existente se estiver editando
  const { data: planoExistente, isLoading: loadingPlano } = useQuery({
    queryKey: ['plano-aula', id],
    queryFn: () => planosAulaService.getById(id!),
    enabled: isEditing,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PlanoForm>({
    resolver: zodResolver(planoSchema),
    defaultValues: {
      status: 'RASCUNHO',
      data: new Date().toISOString().split('T')[0],
    },
  });

  // Mutation para criar plano
  const createMutation = useMutation({
    mutationFn: planosAulaService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planos-aula'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-planos-recentes'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-professor-stats'] });
      toast.success('Plano de aula criado com sucesso!');
      navigate('/planos-aula');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Erro ao criar plano';
      toast.error(Array.isArray(message) ? message[0] : message);
    },
  });

  // Mutation para atualizar plano
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: PlanoForm }) =>
      planosAulaService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planos-aula'] });
      queryClient.invalidateQueries({ queryKey: ['plano-aula', id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-planos-recentes'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-professor-stats'] });
      toast.success('Plano de aula atualizado com sucesso!');
      navigate('/planos-aula');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Erro ao atualizar plano';
      toast.error(Array.isArray(message) ? message[0] : message);
    },
  });

  // Preencher formulário quando carregar plano existente
  useEffect(() => {
    if (planoExistente) {
      reset({
        turmaId: planoExistente.turmaId,
        data: planoExistente.data.split('T')[0],
        disciplina: planoExistente.disciplina,
        tema: planoExistente.tema,
        objetivo: planoExistente.objetivo,
        recursos: planoExistente.recursos || '',
        atividades: planoExistente.atividades || '',
        avaliacaoPlaneada: planoExistente.avaliacaoPlaneada || '',
        observacoes: planoExistente.observacoes || '',
        status: planoExistente.status,
      });
    }
  }, [planoExistente, reset]);

  const onSubmit = (data: PlanoForm) => {
    if (isEditing) {
      updateMutation.mutate({ id: id!, data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (isEditing && loadingPlano) {
    return (
      <div className="space-y-6">
        <div className="card animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Editar Plano de Aula' : 'Novo Plano de Aula'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="card space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Turma *
              </label>
              <select
                {...register('turmaId')}
                className="input"
                disabled={loadingTurmas}
              >
                <option value="">Selecione uma turma</option>
                {turmas.map((turma) => (
                  <option key={turma.id} value={turma.id}>
                    {turma.nome} - {turma.serie}
                  </option>
                ))}
              </select>
              {errors.turmaId && (
                <p className="mt-1 text-sm text-red-600">{errors.turmaId.message}</p>
              )}
            </div>

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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Disciplina *
              </label>
              <input
                {...register('disciplina')}
                type="text"
                className="input"
                placeholder="Ex: Português"
              />
              {errors.disciplina && (
                <p className="mt-1 text-sm text-red-600">{errors.disciplina.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select {...register('status')} className="input">
                <option value="RASCUNHO">Rascunho</option>
                <option value="PUBLICADO">Publicado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tema *
            </label>
            <input
              {...register('tema')}
              type="text"
              className="input"
              placeholder="Ex: Interpretação de Texto"
            />
            {errors.tema && (
              <p className="mt-1 text-sm text-red-600">{errors.tema.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Objetivo *
            </label>
            <textarea
              {...register('objetivo')}
              rows={3}
              className="input"
              placeholder="Descreva o objetivo da aula..."
            />
            {errors.objetivo && (
              <p className="mt-1 text-sm text-red-600">{errors.objetivo.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recursos
            </label>
            <textarea
              {...register('recursos')}
              rows={3}
              className="input"
              placeholder="Livro didático, quadro, projetor..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Atividades
            </label>
            <textarea
              {...register('atividades')}
              rows={4}
              className="input"
              placeholder="Descreva as atividades planejadas..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avaliação Planejada
            </label>
            <textarea
              {...register('avaliacaoPlaneada')}
              rows={3}
              className="input"
              placeholder="Como será avaliado..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações
            </label>
            <textarea
              {...register('observacoes')}
              rows={3}
              className="input"
              placeholder="Observações adicionais..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
            className="btn btn-primary flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {createMutation.isPending || updateMutation.isPending
              ? 'Salvando...'
              : isEditing
              ? 'Atualizar Plano'
              : 'Salvar Plano'}
          </button>
        </div>
      </form>
    </div>
  );
}
