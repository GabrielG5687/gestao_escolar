import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Calendar, User, BookOpen, FileText, Edit, Trash2 } from 'lucide-react';
import { planosAulaService } from '@/services/planosAulaService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

export default function PlanoAulaDetalhesPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { data: plano, isLoading } = useQuery({
    queryKey: ['plano-aula', id],
    queryFn: () => planosAulaService.getById(id!),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: planosAulaService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planos-aula'] });
      toast.success('Plano de aula excluído com sucesso!');
      navigate('/planos-aula');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao excluir plano de aula');
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'RASCUNHO' | 'PUBLICADO' }) =>
      planosAulaService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plano-aula', id] });
      queryClient.invalidateQueries({ queryKey: ['planos-aula'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-planos-recentes'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-professor-stats'] });
      toast.success('Status atualizado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao atualizar status');
    },
  });

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este plano de aula?')) {
      deleteMutation.mutate(id!);
    }
  };

  const handleToggleStatus = () => {
    const newStatus = plano?.status === 'PUBLICADO' ? 'RASCUNHO' : 'PUBLICADO';
    const message =
      newStatus === 'PUBLICADO'
        ? 'Deseja publicar este plano de aula?'
        : 'Deseja voltar este plano para rascunho?';

    if (window.confirm(message)) {
      updateStatusMutation.mutate({ id: id!, status: newStatus });
    }
  };

  const canEdit = user?.role === 'PROFESSOR' || user?.role === 'ADMIN';
  const canDelete = user?.role === 'ADMIN' || (user?.role === 'PROFESSOR' && plano?.autorId === user?.id);
  const canChangeStatus = user?.role === 'ADMIN' || user?.role === 'SUPERVISOR' || (user?.role === 'PROFESSOR' && plano?.autorId === user?.id);

  if (isLoading) {
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

  if (!plano) {
    return (
      <div className="space-y-6">
        <div className="card">
          <p className="text-gray-500">Plano de aula não encontrado.</p>
          <Link to="/planos-aula" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
            ← Voltar para planos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/planos-aula')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </button>
        <div className="flex gap-2">
          {canChangeStatus && (
            <button
              onClick={handleToggleStatus}
              disabled={updateStatusMutation.isPending}
              className={`btn flex items-center ${
                plano.status === 'PUBLICADO'
                  ? 'btn-secondary text-yellow-600 hover:bg-yellow-50'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {updateStatusMutation.isPending
                ? 'Atualizando...'
                : plano.status === 'PUBLICADO'
                ? 'Voltar para Rascunho'
                : 'Publicar Plano'}
            </button>
          )}
          {canDelete && (
            <button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="btn btn-secondary flex items-center text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {deleteMutation.isPending ? 'Excluindo...' : 'Excluir'}
            </button>
          )}
          {canEdit && (
            <Link
              to={`/planos-aula/${plano.id}/editar`}
              className="btn btn-secondary flex items-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Link>
          )}
        </div>
      </div>

      <div className="card">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{plano.tema}</h1>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  plano.status === 'PUBLICADO'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {plano.status === 'PUBLICADO' ? 'Publicado' : 'Rascunho'}
              </span>
            </div>
            <p className="text-lg text-gray-600">{plano.disciplina}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Data</p>
              <p className="text-sm font-medium text-gray-900">
                {format(new Date(plano.data), "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <User className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Professor</p>
              <p className="text-sm font-medium text-gray-900">{plano.autor.nome}</p>
            </div>
          </div>

          {plano.turma && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <BookOpen className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Turma</p>
                <p className="text-sm font-medium text-gray-900">{plano.turma.nome}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-primary-600" />
              Objetivo
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap">{plano.objetivo}</p>
          </div>

          {plano.atividades && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Atividades</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{plano.atividades}</p>
            </div>
          )}

          {plano.recursos && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Recursos</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{plano.recursos}</p>
            </div>
          )}

          {plano.avaliacaoPlaneada && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Avaliação Planejada
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap">
                {plano.avaliacaoPlaneada}
              </p>
            </div>
          )}

          {plano.observacoes && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Observações</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{plano.observacoes}</p>
            </div>
          )}
        </div>

        {plano.comentarios && plano.comentarios.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Comentários do Supervisor
            </h2>
            <div className="space-y-4">
              {plano.comentarios.map((comentario: any) => (
                <div key={comentario.id} className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">
                      {comentario.autor.nome}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(comentario.createdAt), "dd/MM/yyyy 'às' HH:mm", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700">{comentario.texto}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
