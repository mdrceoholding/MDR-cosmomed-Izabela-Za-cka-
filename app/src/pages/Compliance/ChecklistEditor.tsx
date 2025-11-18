import React, { useState } from 'react';
import { Save, FileText } from 'lucide-react';
import { mockChecklistaMDR } from '../../data/complianceData';
import { ChecklistSection } from '../../components/Compliance/ChecklistSection';

export const ChecklistEditor: React.FC = () => {
  const [checklist] = useState(mockChecklistaMDR);
  const [activeTab, setActiveTab] = useState<'dane' | 'podstawy' | 'definicje' | 'checklist'>(
    'dane'
  );

  const handleSave = () => {
    // In a real app, this would save to backend/localStorage
    alert('Zmiany zapisane pomyślnie!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Edytor Checklisty MDR</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Edytuj i zarządzaj checklistą zgodności MDR
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save size={20} />
          Zapisz zmiany
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex gap-4">
          {[
            { key: 'dane' as const, label: 'Dane Podmiotu' },
            { key: 'podstawy' as const, label: 'Podstawy Prawne' },
            { key: 'definicje' as const, label: 'Definicje i Skróty' },
            { key: 'checklist' as const, label: 'Checklista' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 border-b-2 font-medium transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        {activeTab === 'dane' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Sekcja 1: Dane Podmiotu</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nazwa</label>
                <input
                  type="text"
                  defaultValue={checklist.companyData.nazwa}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Kierownik</label>
                <input
                  type="text"
                  defaultValue={checklist.companyData.kierownik}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Adres</label>
                <input
                  type="text"
                  defaultValue={checklist.companyData.adres}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Numer Wersji</label>
                <input
                  type="text"
                  defaultValue={checklist.companyData.numerWersji}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Data Wejścia w Życie
                </label>
                <input
                  type="date"
                  defaultValue={checklist.companyData.dataWejsciaWZycie}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'podstawy' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Sekcja 4: Podstawy Prawne</h3>
            <textarea
              defaultValue={checklist.podstawyPrawne}
              rows={15}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Edytuj podstawy prawne, na których opiera się checklista MDR.
            </p>
          </div>
        )}

        {activeTab === 'definicje' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">
              Sekcja 5: Definicje i Skróty
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 px-4">Skrót</th>
                    <th className="text-left py-2 px-4">Definicja</th>
                    <th className="w-20"></th>
                  </tr>
                </thead>
                <tbody>
                  {checklist.definicje.map((def) => (
                    <tr
                      key={def.id}
                      className="border-b border-gray-200 dark:border-gray-700"
                    >
                      <td className="py-2 px-4">
                        <input
                          type="text"
                          defaultValue={def.skrot}
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <input
                          type="text"
                          defaultValue={def.definicja}
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <button className="text-red-600 dark:text-red-400 hover:text-red-700 text-sm">
                          Usuń
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Dodaj nową definicję
            </button>
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={24} />
              <h3 className="text-lg font-semibold">
                Sekcja 6: Checklista Zgodności MDR
              </h3>
            </div>
            <div className="space-y-4">
              {checklist.oblasti.map((oblast) => (
                <ChecklistSection
                  key={oblast.id}
                  oblast={oblast}
                  onPunktEdit={(id) => alert(`Edytuj punkt: ${id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
