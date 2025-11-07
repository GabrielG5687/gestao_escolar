import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Save, FileText } from 'lucide-react';
import { api } from '@/lib/api';

interface PlanejamentoBimestral {
  id: string;
  bimestre: string;
  conteudo: string;
  anoLetivo: number;
}

export default function Planejamento() {
  const { turmaId } = useParams();
  const [planejamentos, setPlanejamentos] = useState<PlanejamentoBimestral[]>([]);
  const [selectedBimestre, setSelectedBimestre] = useState('1');
  const [conteudo, setConteudo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPlanejamentos();
  }, [turmaId]);

  useEffect(() => {
    const planejamento = planejamentos.find(p => p.bimestre === selectedBimestre);
    setConteudo(planejamento?.conteudo || '');
  }, [selectedBimestre, planejamentos]);

  const loadPlanejamentos = async () => {
    try {
      const response = await api.get(`/pedagogico/planejamentos-bimestrais/${turmaId}`);
      setPlanejamentos(response.data);
    } catch (error) {
      console.error('Erro ao carregar planejamentos:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const planejamento = planejamentos.find(p => p.bimestre === selectedBimestre);
      
      if (planejamento) {
        await api.put(`/pedagogico/planejamentos-bimestrais/${planejamento.id}`, {
          conteudo,
        });
      } else {
        await api.post('/pedagogico/planejamentos-bimestrais', {
          turmaId,
          bimestre: selectedBimestre,
          conteudo,
          anoLetivo: new Date().getFullYear(),
        });
      }
      
      alert('Planejamento salvo com sucesso!');
      loadPlanejamentos();
    } catch (error) {
      console.error('Erro ao salvar planejamento:', error);
      alert('Erro ao salvar planejamento');
    } finally {
      setLoading(false);
    }
  };

  const bimestres = [
    { value: '1', label: '1º Bimestre', periodo: 'Fevereiro - Abril' },
    { value: '2', label: '2º Bimestre', periodo: 'Maio - Julho' },
    { value: '3', label: '3º Bimestre', periodo: 'Agosto - Setembro' },
    { value: '4', label: '4º Bimestre', periodo: 'Outubro - Dezembro' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Planejamento</h1>
        <p className="text-gray-600">Organize o planejamento anual e bimestral da turma</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Selecione o período</label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {bimestres.map((bim) => (
              <button
                key={bim.value}
                onClick={() => setSelectedBimestre(bim.value)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedBimestre === bim.value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="font-semibold">{bim.label}</div>
                <div className="text-xs text-gray-500">{bim.periodo}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Conteúdo do Planejamento
          </label>
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            className="w-full h-96 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o planejamento do bimestre..."
          />
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          <Save className="w-5 h-5" />
          {loading ? 'Salvando...' : 'Salvar Planejamento'}
        </button>
      </div>
    </div>
  );
}
