import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, FileText, Calendar, User, Trash2 } from 'lucide-react';
import { planosAulaService } from '@/services/planosAulaService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

export default function PlanosAulaPage() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { data: planos = [], isLoading } = useQuery({
    queryKey: ['planos-aula'],
    queryFn: () => planosAulaService.list(),
  });

  const deleteMutation = useMutation({
    mutationFn: planosAulaService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planos-aula'] });
      toast.success('Plano de aula excluído com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao excluir plano de aula');
    },
  });

  const handleDelete = (id: string, tema: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm(`Tem certeza que deseja excluir o plano "${tema}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const canDelete = (plano: any) => {
    return user?.role === 'ADMIN' || (user?.role === 'PROFESSOR' && plano.autorId === user?.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Planos de Aula</h1>
        <Link to="/planos-aula/novo" className="btn btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Novo Plano
        </Link>
      </div>

      {isLoading ? (
        <div className="card">
          <p className="text-gray-500">Carregando planos...</p>
        </div>
      ) : planos.length === 0 ? (
        <div className="card">
          <p className="text-gray-500">Nenhum plano de aula criado ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {planos.map((plano) => (
            <div key={plano.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary-600" />
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    plano.status === 'PUBLICADO' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {plano.status}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {plano.tema}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4">
                {plano.disciplina}
              </p>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {format(new Date(plano.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {plano.autor.nome}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <Link
                  to={`/planos-aula/${plano.id}`}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Ver detalhes →
                </Link>
                {canDelete(plano) && (
                  <button
                    onClick={(e) => handleDelete(plano.id, plano.tema, e)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir plano"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
