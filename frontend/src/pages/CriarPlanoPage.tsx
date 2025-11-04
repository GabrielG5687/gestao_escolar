import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
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
  
  // Buscar turmas disponíveis
  const { data: turmas = [], isLoading: loadingTurmas } = useQuery({
    queryKey: ['turmas'],
    queryFn: turmasService.list,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PlanoForm>({
    resolver: zodResolver(planoSchema),
    defaultValues: {
      status: 'RASCUNHO',
      data: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: PlanoForm) => {
    try {
      await planosAulaService.create(data);
      toast.success('Plano de aula criado com sucesso!');
      navigate('/planos-aula');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao criar plano';
      toast.error(Array.isArray(message) ? message[0] : message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Novo Plano de Aula</h1>
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
            disabled={isSubmitting}
            className="btn btn-primary flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Salvando...' : 'Salvar Plano'}
          </button>
        </div>
      </form>
    </div>
  );
}
