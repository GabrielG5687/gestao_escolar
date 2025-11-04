import { Link } from 'react-router-dom';
import { FileText, Eye, FolderOpen, Plus } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function DashboardProfessor() {
  const { user } = useAuthStore();

  const quickActions = [
    {
      title: 'Novo Plano de Aula',
      description: 'Criar plano diário',
      icon: Plus,
      href: '/planos-aula/novo',
      color: 'bg-primary-500',
    },
    {
      title: 'Meus Planos',
      description: 'Ver planos criados',
      icon: FileText,
      href: '/planos-aula',
      color: 'bg-blue-500',
    },
    {
      title: 'Observações',
      description: 'Registrar observações',
      icon: Eye,
      href: '/observacoes',
      color: 'bg-green-500',
    },
    {
      title: 'Projetos',
      description: 'Gerenciar projetos',
      icon: FolderOpen,
      href: '/projetos',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Olá, {user?.nome}!
        </h1>
        <p className="text-gray-600 mt-2">
          Bem-vindo ao seu painel pedagógico
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action) => (
          <Link
            key={action.title}
            to={action.href}
            className="card hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {action.title}
            </h3>
            <p className="text-sm text-gray-600">{action.description}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Planos Recentes
          </h2>
          <p className="text-gray-500 text-sm">
            Nenhum plano criado ainda. Comece criando seu primeiro plano de aula!
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Notificações
          </h2>
          <p className="text-gray-500 text-sm">
            Você não tem notificações no momento.
          </p>
        </div>
      </div>
    </div>
  );
}
