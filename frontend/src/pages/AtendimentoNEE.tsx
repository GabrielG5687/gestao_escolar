import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Image, FileText, Calendar } from 'lucide-react';
import { api } from '@/lib/api';

interface AtividadeAdaptada {
  id: string;
  alunoNome: string;
  data: string;
  descricao: string;
  adaptacoes: string;
  fotos: string[];
}

interface RelatorioSemanal {
  id: string;
  alunoNome: string;
  dataInicio: string;
  dataFim: string;
  desenvolvimento: string;
  observacoes: string;
}

export default function AtendimentoNEE() {
  const { turmaId } = useParams();
  const [activeTab, setActiveTab] = useState<'atividades' | 'relatorios'>('atividades');
  const [atividades, setAtividades] = useState<AtividadeAdaptada[]>([]);
  const [relatorios, setRelatorios] = useState<RelatorioSemanal[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    alunoNome: '',
    data: '',
    descricao: '',
    adaptacoes: '',
  });

  useEffect(() => {
    loadAtividades();
    loadRelatorios();
  }, [turmaId]);

  const loadAtividades = async () => {
    try {
      const response = await api.get(`/pedagogico/atividades-adaptadas/${turmaId}`);
      setAtividades(response.data);
    } catch (error) {
      console.error('Erro ao carregar atividades:', error);
    }
  };

  const loadRelatorios = async () => {
    try {
      const response = await api.get(`/pedagogico/relatorios-semanais/${turmaId}`);
      setRelatorios(response.data);
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error);
    }
  };

  const handleSubmitAtividade = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/pedagogico/atividades-adaptadas', {
        ...formData,
        turmaId,
      });
      alert('Atividade cadastrada com sucesso!');
      setShowModal(false);
      setFormData({ alunoNome: '', data: '', descricao: '', adaptacoes: '' });
      loadAtividades();
    } catch (error) {
      console.error('Erro ao cadastrar atividade:', error);
      alert('Erro ao cadastrar atividade');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Atendimento NEE</h1>
          <p className="text-gray-600">Necessidades Educacionais Especiais</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
        >
          <Plus className="w-5 h-5" />
          Nova Atividade
        </button>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 border-b">
          <button
            onClick={() => setActiveTab('atividades')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'atividades'
                ? 'border-b-2 border-orange-600 text-orange-600'
                : 'text-gray-600'
            }`}
          >
            Atividades Adaptadas
          </button>
          <button
            onClick={() => setActiveTab('relatorios')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'relatorios'
                ? 'border-b-2 border-orange-600 text-orange-600'
                : 'text-gray-600'
            }`}
          >
            Relatórios Semanais
          </button>
        </div>
      </div>

      {activeTab === 'atividades' ? (
        <div className="grid gap-4">
          {atividades.map((atividade) => (
            <div key={atividade.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{atividade.alunoNome}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(atividade.data).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                {atividade.fotos.length > 0 && (
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <Image className="w-4 h-4" />
                    {atividade.fotos.length} fotos
                  </span>
                )}
              </div>
              <div className="mb-3">
                <h4 className="font-medium mb-1">Descrição:</h4>
                <p className="text-gray-700">{atividade.descricao}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Adaptações:</h4>
                <p className="text-gray-700">{atividade.adaptacoes}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {relatorios.map((relatorio) => (
            <div key={relatorio.id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">{relatorio.alunoNome}</h3>
              <p className="text-sm text-gray-600 mb-4">
                Período: {new Date(relatorio.dataInicio).toLocaleDateString('pt-BR')} até{' '}
                {new Date(relatorio.dataFim).toLocaleDateString('pt-BR')}
              </p>
              <div className="mb-3">
                <h4 className="font-medium mb-1">Desenvolvimento:</h4>
                <p className="text-gray-700">{relatorio.desenvolvimento}</p>
              </div>
              {relatorio.observacoes && (
                <div>
                  <h4 className="font-medium mb-1">Observações:</h4>
                  <p className="text-gray-700">{relatorio.observacoes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Nova Atividade Adaptada</h2>
            <form onSubmit={handleSubmitAtividade}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Nome do Aluno</label>
                <input
                  type="text"
                  value={formData.alunoNome}
                  onChange={(e) => setFormData({ ...formData, alunoNome: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Data</label>
                <input
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Descrição da Atividade</label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="w-full p-2 border rounded h-24"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Adaptações Realizadas</label>
                <textarea
                  value={formData.adaptacoes}
                  onChange={(e) => setFormData({ ...formData, adaptacoes: e.target.value })}
                  className="w-full p-2 border rounded h-24"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
