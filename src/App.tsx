import { useState } from 'react';
import Sidebar from './components/Sidebar';
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
        return <DashboardView />;
      case 'shareholders':
        return <ShareholdersView />;
      case 'cap-table':
        return <CapTableView />;
      case 'documents':
        return <DocumentTemplates onSelectTemplate={handleSelectTemplate} />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-1 overflow-auto">
        {renderView()}
      </main>
    </div>
  );
}

// Placeholder Views
function DashboardView() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Akcjonariusze</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{shareholders.length}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3">
              <i className="fas fa-users text-2xl text-blue-600 dark:text-blue-300"></i>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Łączna liczba akcji</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">1,000</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 rounded-full p-3">
              <i className="fas fa-chart-line text-2xl text-green-600 dark:text-green-300"></i>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Wzory dokumentów</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">10</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-3">
              <i className="fas fa-file-invoice text-2xl text-purple-600 dark:text-purple-300"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Informacje o spółce</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Nazwa</p>
            <p className="font-medium text-gray-900 dark:text-white">{companyData.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">KRS</p>
            <p className="font-medium text-gray-900 dark:text-white">{companyData.krs}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">NIP</p>
            <p className="font-medium text-gray-900 dark:text-white">{companyData.nip}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Adres</p>
            <p className="font-medium text-gray-900 dark:text-white">{companyData.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShareholdersView() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Akcjonariusze</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Akcjonariusz
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Typ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Liczba akcji
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Udział (%)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {shareholders.map((shareholder) => (
              <tr key={shareholder.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{shareholder.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{shareholder.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    shareholder.type === 'physical'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {shareholder.type === 'physical' ? 'Osoba fizyczna' : 'Osoba prawna'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {shareholder.shares}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {shareholder.percentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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
