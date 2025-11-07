import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Users, Calendar, BookOpen, ChevronRight } from 'lucide-react';

interface Turma {
  id: string;
  nome: string;
  serie: string;
  ano: number;
}

export default function PedagogicoTurmas() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTurmas();
  }, []);

  const loadTurmas = async () => {
    try {
      const response = await api.get('/turmas/minhas-turmas');
      setTurmas(response.data);
    } catch (error) {
      console.error('Erro ao carregar turmas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTurma = (turmaId: string) => {
    navigate(`/pedagogico/${turmaId}`);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Minhas Turmas</h1>
          <p className="text-gray-600 dark:text-gray-400">Selecione uma turma para acessar</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl bg-white dark:bg-[#1e293b] p-6 shadow-md border border-gray-100 dark:border-gray-700 animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
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
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0891b2] via-[#06b6d4] to-[#22d3ee] p-8 shadow-xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">Minhas Turmas 📚</h1>
          <p className="text-cyan-50 text-lg">Selecione uma turma para acessar o módulo pedagógico</p>
        </div>
      </div>

      {turmas.length === 0 ? (
        <div className="text-center py-16 rounded-xl bg-white dark:bg-[#1e293b] shadow-md border border-gray-100 dark:border-gray-700">
          <div className="w-20 h-20 bg-gradient-to-br from-[#0891b2]/10 to-[#06b6d4]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-[#0891b2] dark:text-[#06b6d4]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Nenhuma turma encontrada</h3>
          <p className="text-gray-500 dark:text-gray-400">Você ainda não possui turmas cadastradas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {turmas.map((turma) => (
            <div
              key={turma.id}
              onClick={() => handleSelectTurma(turma.id)}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-[#1e293b] p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-[#0891b2] dark:hover:border-[#06b6d4] cursor-pointer"
            >
              {/* Efeito de hover com gradiente */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0891b2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                {/* Header do Card */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0891b2] to-[#06b6d4] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#0891b2] dark:group-hover:text-[#06b6d4] transition-colors mb-1">
                        {turma.nome}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {turma.serie}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Informações */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#0f172a] rounded-lg">
                    <span className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Ano Letivo
                    </span>
                    <span className="text-gray-900 dark:text-white font-bold">{turma.ano}</span>
                  </div>
                </div>

                {/* Botão de Acessar */}
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0891b2] to-[#06b6d4] hover:from-[#06b6d4] hover:to-[#22d3ee] text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#0891b2]/30 hover:shadow-xl hover:shadow-[#06b6d4]/40 transform group-hover:-translate-y-1">
                  Acessar
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
