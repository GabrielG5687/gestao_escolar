import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Calendar, FileText, Paperclip } from 'lucide-react';
import { api } from '@/lib/api';

interface PlanoAula {
  id: string;
  data: string;
  disciplina: string;
  tema: string;
  objetivo: string;
  status: string;
}

export default function PlanosAulaBimestre() {
  const { turmaId } = useParams();
  const navigate = useNavigate();
  const [planos, setPlanos] = useState<PlanoAula[]>([]);
  const [selectedBimestre, setSelectedBimestre] = useState('1');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPlanos();
  }, [turmaId, selectedBimestre]);

  const loadPlanos = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/planos-aula/turma/${turmaId}`);
      const filteredPlanos = filterPlanosByBimestre(response.data, selectedBimestre);
      setPlanos(filteredPlanos);
    } catch (error) {
      console.error('Erro ao carregar planos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPlanosByBimestre = (planos: PlanoAula[], bimestre: string) => {
    const bimestreRanges: Record<string, [number, number]> = {
      '1': [1, 4],
      '2': [4, 7],
      '3': [7, 9],
      '4': [9, 12],
    };
    
    const [startMonth, endMonth] = bimestreRanges[bimestre];
    
    return planos.filter(plano => {
      const month = new Date(plano.data).getMonth() + 1;
      return month >= startMonth && month <= endMonth;
    });
  };

  const bimestres = [
    { value: '1', label: '1º Bimestre' },
    { value: '2', label: '2º Bimestre' },
    { value: '3', label: '3º Bimestre' },
    { value: '4', label: '4º Bimestre' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Meus Planos de Aula</h1>
          <p className="text-gray-600">Organize seus planos por bimestre</p>
        </div>
        <button
          onClick={() => navigate(`/pedagogico/${turmaId}/planos-aula/novo`)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Novo Plano
        </button>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          {bimestres.map((bim) => (
            <button
              key={bim.value}
              onClick={() => setSelectedBimestre(bim.value)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedBimestre === bim.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {bim.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Carregando planos...</div>
      ) : planos.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Nenhum plano de aula neste bimestre</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {planos.map((plano) => (
            <div
              key={plano.id}
              onClick={() => navigate(`/pedagogico/${turmaId}/planos-aula/${plano.id}`)}
              className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{plano.tema}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  plano.status === 'PUBLICADO' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {plano.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(plano.data).toLocaleDateString('pt-BR')}
                </span>
                <span>{plano.disciplina}</span>
              </div>
              <p className="text-gray-700 line-clamp-2">{plano.objetivo}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
