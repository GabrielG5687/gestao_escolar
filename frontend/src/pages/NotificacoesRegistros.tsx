import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Bell, FileText, Users } from 'lucide-react';
import { api } from '@/lib/api';

interface ObservacaoSupervisor {
  id: string;
  data: string;
  assunto: string;
  observacao: string;
  supervisor: {
    nome: string;
  };
}

interface AtaPedagogica {
  id: string;
  tipo: string;
  data: string;
  titulo: string;
  conteudo: string;
  participantes: string[];
}

export default function NotificacoesRegistros() {
  const { turmaId } = useParams();
  const [activeTab, setActiveTab] = useState<'observacoes' | 'atas'>('observacoes');
  const [observacoes, setObservacoes] = useState<ObservacaoSupervisor[]>([]);
  const [atas, setAtas] = useState<AtaPedagogica[]>([]);

  useEffect(() => {
    loadObservacoes();
    loadAtas();
  }, [turmaId]);

  const loadObservacoes = async () => {
    try {
      const response = await api.get(`/pedagogico/observacoes-supervisor?turmaId=${turmaId}`);
      setObservacoes(response.data);
    } catch (error) {
      console.error('Erro ao carregar observações:', error);
    }
  };

  const loadAtas = async () => {
    try {
      const response = await api.get('/pedagogico/atas-pedagogicas');
      setAtas(response.data);
    } catch (error) {
      console.error('Erro ao carregar atas:', error);
    }
  };

  const getTipoAtaLabel = (tipo: string) => {
    return tipo === 'ATENDIMENTO_INDIVIDUAL' 
      ? 'Atendimento Individual' 
      : 'Reunião Pedagógica';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Notificações e Registros</h1>
        <p className="text-gray-600">Acompanhe observações e atas pedagógicas</p>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 border-b">
          <button
            onClick={() => setActiveTab('observacoes')}
            className={`px-4 py-2 font-medium flex items-center gap-2 ${
              activeTab === 'observacoes'
                ? 'border-b-2 border-red-600 text-red-600'
                : 'text-gray-600'
            }`}
          >
            <Bell className="w-5 h-5" />
            Observações do Supervisor
          </button>
          <button
            onClick={() => setActiveTab('atas')}
            className={`px-4 py-2 font-medium flex items-center gap-2 ${
              activeTab === 'atas'
                ? 'border-b-2 border-red-600 text-red-600'
                : 'text-gray-600'
            }`}
          >
            <FileText className="w-5 h-5" />
            Atas Pedagógicas
          </button>
        </div>
      </div>

      {activeTab === 'observacoes' ? (
        <div className="grid gap-4">
          {observacoes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <Bell className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Nenhuma observação registrada</p>
            </div>
          ) : (
            observacoes.map((obs) => (
              <div key={obs.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">{obs.assunto}</h3>
                    <p className="text-sm text-gray-600">
                      Por: {obs.supervisor.nome}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(obs.data).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{obs.observacao}</p>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {atas.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Nenhuma ata registrada</p>
            </div>
          ) : (
            atas.map((ata) => (
              <div key={ata.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-2">
                      {getTipoAtaLabel(ata.tipo)}
                    </span>
                    <h3 className="text-xl font-semibold">{ata.titulo}</h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(ata.data).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap mb-4">{ata.conteudo}</p>
                {ata.participantes.length > 0 && (
                  <div className="border-t pt-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>Participantes: {ata.participantes.join(', ')}</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
