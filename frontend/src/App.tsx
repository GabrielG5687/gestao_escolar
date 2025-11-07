import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LoginPage from './pages/LoginPage';
import DashboardProfessor from './pages/DashboardProfessor';
import DashboardSupervisor from './pages/DashboardSupervisor';
import PlanosAulaPage from './pages/PlanosAulaPage';
import PlanoAulaDetalhesPage from './pages/PlanoAulaDetalhesPage';
import CriarPlanoPage from './pages/CriarPlanoPage';
import TurmasPage from './pages/TurmasPage';
import ObservacoesPage from './pages/ObservacoesPage';
import ProjetosPage from './pages/ProjetosPage';
import PedagogicoTurmas from './pages/PedagogicoTurmas';
import PedagogicoDashboard from './pages/PedagogicoDashboard';
import Planejamento from './pages/Planejamento';
import PlanosAulaBimestre from './pages/PlanosAulaBimestre';
import ProjetosPedagogicos from './pages/ProjetosPedagogicos';
import AtendimentoNEE from './pages/AtendimentoNEE';
import NotificacoesRegistros from './pages/NotificacoesRegistros';
import Layout from './components/Layout';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const { user } = useAuthStore();

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              user?.role === 'PROFESSOR' ? (
                <DashboardProfessor />
              ) : (
                <DashboardSupervisor />
              )
            }
          />
          <Route path="turmas" element={<TurmasPage />} />
          <Route path="planos-aula" element={<PlanosAulaPage />} />
          <Route path="planos-aula/novo" element={<CriarPlanoPage />} />
          <Route path="planos-aula/:id" element={<PlanoAulaDetalhesPage />} />
          <Route path="planos-aula/:id/editar" element={<CriarPlanoPage />} />
          <Route path="observacoes" element={<ObservacoesPage />} />
          <Route path="projetos" element={<ProjetosPage />} />
          
          {/* Rotas do Módulo Pedagógico */}
          <Route path="pedagogico" element={<PedagogicoTurmas />} />
          <Route path="pedagogico/:turmaId" element={<PedagogicoDashboard />} />
          <Route path="pedagogico/:turmaId/planejamento" element={<Planejamento />} />
          <Route path="pedagogico/:turmaId/planos-aula" element={<PlanosAulaBimestre />} />
          <Route path="pedagogico/:turmaId/projetos" element={<ProjetosPedagogicos />} />
          <Route path="pedagogico/:turmaId/nee" element={<AtendimentoNEE />} />
          <Route path="pedagogico/:turmaId/notificacoes" element={<NotificacoesRegistros />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
