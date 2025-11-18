import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faDownload, faEye } from '@fortawesome/free-solid-svg-icons';
import { mockDocumentTemplates } from '../data/mockData';
import toast from 'react-hot-toast';

const Documents: React.FC = () => {
  const [templates] = useState(mockDocumentTemplates);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Legal', 'Corporate', 'Financial'];

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const handleDownload = (template: any) => {
    toast.success(`Pobieranie szablonu: ${template.name}`);
  };

  const handlePreview = (template: any) => {
    toast.success(`Podgląd: ${template.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dokumenty</h1>
        <p className="text-slate-400">Szablony dokumentów dla akcjonariuszy</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faFileLines} className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Szablony dokumentów</p>
              <p className="text-2xl font-bold text-white">{templates.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div>
            <p className="text-slate-400 text-sm mb-1">Kategorie</p>
            <p className="text-2xl font-bold text-white">
              {new Set(templates.map(t => t.category)).size}
            </p>
          </div>
        </div>

        <div className="card">
          <div>
            <p className="text-slate-400 text-sm mb-1">Ostatnia aktualizacja</p>
            <p className="text-2xl font-bold text-white">
              {new Date(Math.max(...templates.map(t => new Date(t.updatedAt).getTime()))).toLocaleDateString('pl-PL', { month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${
              selectedCategory === category
                ? 'border-blue-500 bg-blue-900 bg-opacity-20 text-white'
                : 'border-slate-700 text-slate-300 hover:border-slate-600'
            }`}
          >
            {category === 'all' ? 'Wszystkie' : category}
            <span className="ml-2 text-slate-400">
              ({category === 'all' ? templates.length : templates.filter(t => t.category === category).length})
            </span>
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="card hover:border-blue-500 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{template.name}</h3>
                <p className="text-slate-400 text-sm mb-3">{template.description}</p>
                <div className="flex items-center space-x-3 text-xs">
                  <span className="px-2 py-1 rounded bg-blue-900 text-blue-200">
                    {template.category}
                  </span>
                  <span className="text-slate-500">
                    Aktualizowano: {new Date(template.updatedAt).toLocaleDateString('pl-PL')}
                  </span>
                </div>
              </div>
              <FontAwesomeIcon icon={faFileLines} className="text-3xl text-blue-400" />
            </div>

            {template.variables.length > 0 && (
              <div className="mb-4">
                <p className="text-slate-400 text-sm mb-2">Zmienne w szablonie:</p>
                <div className="flex flex-wrap gap-2">
                  {template.variables.map((variable) => (
                    <span
                      key={variable}
                      className="px-2 py-1 rounded text-xs bg-slate-700 text-slate-300 font-mono"
                    >
                      {`{${variable}}`}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => handlePreview(template)}
                className="flex-1 btn-secondary"
              >
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                Podgląd
              </button>
              <button
                onClick={() => handleDownload(template)}
                className="flex-1 btn-primary"
              >
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Pobierz
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-slate-400">Brak szablonów w tej kategorii</p>
        </div>
      )}
    </div>
  );
};

export default Documents;
