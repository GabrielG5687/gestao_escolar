import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  FolderOpen, 
  Users, 
  Bell,
  ChevronLeft 
} from 'lucide-react';
import { api } from '@/lib/api';

interface Turma {
  id: string;
  nome: string;
  serie: string;
  ano: number;
}

export default function PedagogicoDashboard() {
  const { turmaId } = useParams();
  const navigate = useNavigate();
  const [turma, setTurma] = useState<Turma | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTurma();
  }, [turmaId]);

  const loadTurma = async () => {
    try {
      const response = await api.get(`/turmas/${turmaId}`);
      setTurma(response.data);
    } catch (error) {
      console.error('Erro ao carregar turma:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      title: 'Planejamento',
      icon: BookOpen,
      path: `/pedagogico/${turmaId}/planejamento`,
      color: 'bg-blue-500',
    },
    {
      title: 'Meus Planos de Aula',
      icon: FileText,
      path: `/pedagogico/${turmaId}/planos-aula`,
      color: 'bg-green-500',
    },
    {
      title: 'Projetos Pedagógicos',
      icon: FolderOpen,
      path: `/pedagogico/${turmaId}/projetos`,
      color: 'bg-purple-500',
    },
    {
      title: 'Atendimento NEE',
      icon: Users,
      path: `/pedagogico/${turmaId}/nee`,
      color: 'bg-orange-500',
    },
    {
      title: 'Notificações e Registros',
      icon: Bell,
      path: `/pedagogico/${turmaId}/notificacoes`,
      color: 'bg-red-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/pedagogico')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Voltar para turmas
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{turma?.nome}</h1>
        <p className="text-gray-600">
          {turma?.serie} - Ano Letivo {turma?.ano}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold">{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
