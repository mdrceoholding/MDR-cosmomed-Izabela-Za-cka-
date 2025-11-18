import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Shareholders from './components/Shareholders';
import DocumentTemplates from './components/DocumentTemplates';
import DocumentEditor from './components/DocumentEditor';
import { DocumentTemplate } from './types';
import { companyData, shareholders } from './data/companyData';

function App() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);

  const handleSelectTemplate = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
  };

  const handleBackToTemplates = () => {
    setSelectedTemplate(null);
    setCurrentView('documents');
  };

  const renderView = () => {
    // If editing a document
    if (selectedTemplate) {
      return <DocumentEditor template={selectedTemplate} onBack={handleBackToTemplates} />;
    }

    // Otherwise show the selected view
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'shareholders':
        return <Shareholders />;
      case 'cap-table':
        return <CapTableView />;
      case 'documents':
        return <DocumentTemplates onSelectTemplate={handleSelectTemplate} />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '8px',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar currentView={currentView} onNavigate={setCurrentView} />
        <main className="flex-1 overflow-auto">
          {renderView()}
        </main>
      </div>
    </>
  );
}

function CapTableView() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Cap Table</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Struktura akcjonariatu</h2>
          <div className="space-y-4">
            {shareholders.map((shareholder) => (
              <div key={shareholder.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{shareholder.name}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{shareholder.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${shareholder.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Podsumowanie</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Kapitał zakładowy</span>
              <span className="font-medium text-gray-900 dark:text-white">100,000 PLN</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Łączna liczba akcji</span>
              <span className="font-medium text-gray-900 dark:text-white">1,000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Wartość nominalna akcji</span>
              <span className="font-medium text-gray-900 dark:text-white">100 PLN</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600 dark:text-gray-400">Liczba akcjonariuszy</span>
              <span className="font-medium text-gray-900 dark:text-white">{shareholders.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportsView() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Raporty</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Raport Cap Table', 'Raport roczny', 'Raport transakcji', 'Raport dywidend'].map((report, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-3">
                <i className="fas fa-file-chart-line text-2xl text-blue-600 dark:text-blue-300"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{report}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Wygeneruj raport</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Ustawienia</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Dane spółki</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nazwa spółki
            </label>
            <input
              type="text"
              defaultValue={companyData.name}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                KRS
              </label>
              <input
                type="text"
                defaultValue={companyData.krs}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                NIP
              </label>
              <input
                type="text"
                defaultValue={companyData.nip}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            Zapisz zmiany
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
