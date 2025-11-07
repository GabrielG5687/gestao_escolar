import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { 
  Home, 
  Users, 
  FileText, 
  Eye, 
  FolderOpen, 
  LogOut,
  Menu,
  X,
  BookOpen
} from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const location = window.location.pathname;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Módulo Pedagógico', href: '/pedagogico', icon: BookOpen },
    { name: 'Turmas', href: '/turmas', icon: Users },
    { name: 'Planos de Aula', href: '/planos-aula', icon: FileText },
    { name: 'Observações', href: '/observacoes', icon: Eye },
    { name: 'Projetos', href: '/projetos', icon: FolderOpen },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] transition-colors">
      {/* Sidebar Desktop */}
      <aside
        className="hidden lg:block fixed left-0 top-0 h-full z-50 transition-all duration-300 ease-in-out"
        style={{ width: isSidebarExpanded ? '240px' : '72px' }}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        <div className="h-full bg-white/95 dark:bg-[#1e293b]/95 backdrop-blur-md shadow-2xl border-r border-[#e2e8f0] dark:border-[#334155] flex flex-col">
          {/* Logo */}
          <div className="h-20 flex items-center justify-center border-b border-[#e2e8f0] dark:border-[#334155]">
            <Link to="/" className="flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0891b2] to-[#38bdf8] rounded-xl flex items-center justify-center shadow-lg shadow-[#0891b2]/30 hover:scale-110 transition-transform duration-200">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-sm
                  transition-all duration-200 relative overflow-hidden
                  ${isActive(item.href)
                    ? 'bg-gradient-to-r from-[#0891b2] to-[#06b6d4] text-white shadow-lg shadow-[#0891b2]/30'
                    : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0891b2] dark:hover:text-[#06b6d4] hover:bg-[#e2e8f0]/50 dark:hover:bg-[#0f172a]'
                  }
                `}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isActive(item.href) ? '' : 'group-hover:scale-110'}`} />
                <span 
                  className={`whitespace-nowrap transition-all duration-300 ${
                    isSidebarExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 absolute'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="border-t border-[#e2e8f0] dark:border-[#334155] p-3 space-y-2">
            {/* Theme Toggle */}
            <div className={`flex items-center ${isSidebarExpanded ? 'justify-start px-3' : 'justify-center'}`}>
              <ThemeToggle />
            </div>

            {/* User Info */}
            <div className={`flex items-center gap-3 px-3 py-3 bg-[#e2e8f0]/30 dark:bg-[#0f172a] rounded-xl border border-[#e2e8f0] dark:border-[#334155] ${!isSidebarExpanded && 'justify-center'}`}>
              <div className="w-9 h-9 bg-gradient-to-br from-[#0891b2] to-[#38bdf8] rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg flex-shrink-0">
                {user?.nome?.charAt(0) || 'U'}
              </div>
              {isSidebarExpanded && (
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-[#1e293b] dark:text-[#f1f5f9] truncate">{user?.nome || 'Usuário'}</p>
                  <p className="text-[10px] text-[#0891b2] dark:text-[#06b6d4] font-medium uppercase">{user?.role || 'PROFESSOR'}</p>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-3 py-3 bg-[#dc2626]/10 dark:bg-[#ef4444]/10 hover:bg-[#dc2626]/20 dark:hover:bg-[#ef4444]/20 text-[#dc2626] dark:text-[#ef4444] rounded-xl font-medium text-sm transition-all duration-200 border border-[#dc2626]/20 dark:border-[#ef4444]/20 hover:border-[#dc2626]/40 dark:hover:border-[#ef4444]/40 ${!isSidebarExpanded && 'justify-center'}`}
              title="Sair do sistema"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {isSidebarExpanded && <span>Sair</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-white/95 dark:bg-[#1e293b]/95 backdrop-blur-md shadow-lg border-b border-[#e2e8f0] dark:border-[#334155]">
        <div className="px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0891b2] to-[#38bdf8] rounded-lg flex items-center justify-center shadow-lg shadow-[#0891b2]/30">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </Link>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-[#64748b] dark:text-[#94a3b8] hover:text-[#0891b2] dark:hover:text-[#06b6d4] hover:bg-[#e2e8f0]/50 dark:hover:bg-[#0f172a] transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="border-t border-[#e2e8f0] dark:border-[#334155] bg-white/98 dark:bg-[#1e293b]/98 backdrop-blur-md">
            <nav className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm
                    transition-all duration-200
                    ${isActive(item.href)
                      ? 'bg-gradient-to-r from-[#0891b2] to-[#06b6d4] text-white shadow-lg shadow-[#0891b2]/30'
                      : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0891b2] dark:hover:text-[#06b6d4] hover:bg-[#e2e8f0]/50 dark:hover:bg-[#0f172a]'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {/* Mobile User Info */}
              <div className="pt-4 mt-4 border-t border-[#e2e8f0] dark:border-[#334155]">
                <div className="flex items-center gap-3 px-4 py-3 bg-[#e2e8f0]/30 dark:bg-[#0f172a] rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0891b2] to-[#38bdf8] rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                    {user?.nome?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1e293b] dark:text-[#f1f5f9]">{user?.nome || 'Usuário'}</p>
                    <p className="text-xs text-[#0891b2] dark:text-[#06b6d4] font-medium">{user?.role || 'PROFESSOR'}</p>
                  </div>
                </div>
                
                {/* Mobile Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-[#dc2626]/10 dark:bg-[#ef4444]/10 hover:bg-[#dc2626]/20 dark:hover:bg-[#ef4444]/20 text-[#dc2626] dark:text-[#ef4444] rounded-xl font-medium text-sm transition-all duration-200 border border-[#dc2626]/20 dark:border-[#ef4444]/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair do Sistema</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main 
        className="transition-all duration-300 ease-in-out"
        style={{ 
          marginLeft: window.innerWidth >= 1024 ? (isSidebarExpanded ? '240px' : '72px') : '0',
          padding: '2rem'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
