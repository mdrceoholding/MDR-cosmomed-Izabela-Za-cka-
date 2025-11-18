import { useState } from 'react';
import { docTemplates, docCategories } from '../data/templates';
import { DocumentTemplate } from '../types';
import { classNames } from '../utils/helpers';
import DocEditor from './DocEditor';

export default function DocumentTemplates() {
  const [filter, setFilter] = useState('Wszystkie');
  const [activeTemplate, setActiveTemplate] = useState<DocumentTemplate | null>(null);

  const filteredTemplates =
    filter === 'Wszystkie'
      ? docTemplates
      : docTemplates.filter((t) => t.category === filter);

  if (activeTemplate) {
    return <DocEditor template={activeTemplate} onBack={() => setActiveTemplate(null)} />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">📄 Wzory dokumentów</h1>
      <p className="mb-6 text-slate-400">
        Przykładowe formularze, uchwały, protokoły i umowy wykorzystywane w PSA. Wybierz wzór,
        dostosuj i pobierz!
      </p>

      {/* Filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {docCategories.map((cat) => (
          <button
            key={cat}
            className={classNames(
              'px-4 py-2 rounded-full text-sm font-semibold transition',
              filter === cat
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            )}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredTemplates.map((temp) => (
          <div
            key={temp.id}
            className="bg-slate-800 hover:bg-slate-700 rounded-xl p-6 flex flex-col items-center shadow-lg transition group"
          >
            <div className="w-16 h-16 bg-slate-700 mb-4 rounded-full flex items-center justify-center text-3xl">
              <span>{temp.emoji}</span>
            </div>
            <div className="text-lg font-bold mb-1 text-center">{temp.name}</div>
            <div className="text-sm mb-2 text-slate-300 text-center">{temp.desc}</div>
            <span className="inline-block text-xs bg-blue-600 rounded px-2 py-0.5 text-white mb-4">
              {temp.category}
            </span>
            <button
              className="mt-auto px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition text-sm font-semibold w-full"
              onClick={() => setActiveTemplate(temp)}
            >
              <i className="fa-solid fa-file-circle-plus mr-2"></i>
              Użyj wzoru
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
