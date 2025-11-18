import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Toast from './components/Toast';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPassword from './components/auth/ForgotPassword';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/Dashboard';
import Shareholders from './components/Shareholders';
import UsersList from './components/users/UsersList';
import UserProfile from './components/users/UserProfile';
import { DashboardSkeleton } from './components/LoadingSkeleton';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
        <Toast />
      </ToastProvider>
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot'>('login');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Ładowanie...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
        {authView === 'login' && (
          <LoginForm
            onSwitchToRegister={() => setAuthView('register')}
            onSwitchToForgot={() => setAuthView('forgot')}
          />
        )}
        {authView === 'register' && (
          <RegisterForm onSwitchToLogin={() => setAuthView('login')} />
        )}
        {authView === 'forgot' && (
          <ForgotPassword onBackToLogin={() => setAuthView('login')} />
        )}
      </div>
    );
  }

  return <MainApp />;
};

const MainApp: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNavigate = (view: string) => {
    setLoading(true);
    setCurrentView(view);
    setTimeout(() => setLoading(false), 300); // Simulate loading
  };

  const renderView = () => {
    if (loading) {
      return <DashboardSkeleton />;
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UsersList />;
      case 'profile':
        return <UserProfile />;
      case 'shareholders':
        return <Shareholders />;
      case 'transactions':
        return <TransactionsView />;
      case 'documents':
        return <DocumentsView />;
      case 'meetings':
        return <MeetingsView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-6 overflow-auto">
          {renderView()}
        </main>
        <footer className="bg-gray-800 border-t border-gray-700 px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-gray-400 text-sm">
              &copy; 2025 MDR PHILOSOPHY PSA. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Pomoc</a>
              <a href="#" className="hover:text-white transition-colors">Regulamin</a>
              <a href="#" className="hover:text-white transition-colors">Prywatność</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Placeholder views
const TransactionsView: React.FC = () => (
  <div className="bg-gray-800 rounded-lg p-8 text-center">
    <i className="fas fa-exchange-alt text-6xl text-green-400 mb-4"></i>
    <h2 className="text-2xl font-bold text-white mb-2">Transakcje</h2>
    <p className="text-gray-400">Historia transakcji akcji - w budowie</p>
  </div>
);

const DocumentsView: React.FC = () => (
  <div className="bg-gray-800 rounded-lg p-8 text-center">
    <i className="fas fa-file-alt text-6xl text-purple-400 mb-4"></i>
    <h2 className="text-2xl font-bold text-white mb-2">Dokumenty</h2>
    <p className="text-gray-400">Zarządzanie dokumentami korporacyjnymi - w budowie</p>
  </div>
);

const MeetingsView: React.FC = () => (
  <div className="bg-gray-800 rounded-lg p-8 text-center">
    <i className="fas fa-calendar-alt text-6xl text-yellow-400 mb-4"></i>
    <h2 className="text-2xl font-bold text-white mb-2">Zebrania (WZA)</h2>
    <p className="text-gray-400">Walne Zgromadzenia Akcjonariuszy - w budowie</p>
  </div>
);

const ReportsView: React.FC = () => (
  <div className="bg-gray-800 rounded-lg p-8 text-center">
    <i className="fas fa-chart-bar text-6xl text-red-400 mb-4"></i>
    <h2 className="text-2xl font-bold text-white mb-2">Raporty</h2>
    <p className="text-gray-400">Raporty i analizy - w budowie</p>
  </div>
);

const SettingsView: React.FC = () => (
  <div className="bg-gray-800 rounded-lg p-8 text-center">
    <i className="fas fa-cog text-6xl text-gray-400 mb-4"></i>
    <h2 className="text-2xl font-bold text-white mb-2">Ustawienia</h2>
    <p className="text-gray-400">Ustawienia systemu - w budowie</p>
  </div>
);

export default App;
