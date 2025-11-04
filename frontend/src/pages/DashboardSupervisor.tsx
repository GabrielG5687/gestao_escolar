import { Users, FileText, Eye, FolderOpen } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function DashboardSupervisor() {
  const { user } = useAuthStore();

  const stats = [
    { name: 'Turmas', value: '0', icon: Users, color: 'bg-blue-500' },
    { name: 'Planos Pendentes', value: '0', icon: FileText, color: 'bg-yellow-500' },
    { name: 'Observações', value: '0', icon: Eye, color: 'bg-green-500' },
    { name: 'Projetos Ativos', value: '0', icon: FolderOpen, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Painel do Supervisor
        </h1>
        <p className="text-gray-600 mt-2">
          Bem-vindo, {user?.nome}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Planos para Revisar
          </h2>
          <p className="text-gray-500 text-sm">
            Nenhum plano pendente de revisão.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Atividades Recentes
          </h2>
          <p className="text-gray-500 text-sm">
            Nenhuma atividade recente.
          </p>
        </div>
      </div>
    </div>
  );
}
