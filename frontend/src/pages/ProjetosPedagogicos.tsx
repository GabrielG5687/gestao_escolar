import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Calendar, Paperclip } from 'lucide-react';
import { api } from '@/lib/api';

interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  anexos: string[];
}

export default function ProjetosPedagogicos() {
  const { turmaId } = useParams();
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    dataInicio: '',
    dataFim: '',
  });

  useEffect(() => {
    loadProjetos();
  }, [turmaId]);

  const loadProjetos = async () => {
    try {
      const response = await api.get(`/projetos/turma/${turmaId}`);
      setProjetos(response.data);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/projetos', {
        ...formData,
        turmaId,
      });
      alert('Projeto cadastrado com sucesso!');
      setShowModal(false);
      setFormData({ titulo: '', descricao: '', dataInicio: '', dataFim: '' });
      loadProjetos();
    } catch (error) {
      console.error('Erro ao cadastrar projeto:', error);
      alert('Erro ao cadastrar projeto');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projetos Pedagógicos</h1>
          <p className="text-gray-600">Registre e acompanhe projetos da turma</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <Plus className="w-5 h-5" />
          Novo Projeto
        </button>
      </div>

      <div className="grid gap-4">
        {projetos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">Nenhum projeto cadastrado</p>
          </div>
        ) : (
          projetos.map((projeto) => (
            <div key={projeto.id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-3">{projeto.titulo}</h3>
              <p className="text-gray-700 mb-4">{projeto.descricao}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Início: {new Date(projeto.dataInicio).toLocaleDateString('pt-BR')}
                </span>
                {projeto.dataFim && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Fim: {new Date(projeto.dataFim).toLocaleDateString('pt-BR')}
                  </span>
                )}
                {projeto.anexos.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Paperclip className="w-4 h-4" />
                    {projeto.anexos.length} anexos
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Novo Projeto Pedagógico</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Título</label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Descrição</label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="w-full p-2 border rounded h-32"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Data de Início</label>
                  <input
                    type="date"
                    value={formData.dataInicio}
                    onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Data de Fim</label>
                  <input
                    type="date"
                    value={formData.dataFim}
                    onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
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
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
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
