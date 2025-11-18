import { useState } from 'react';
import { DocumentTemplate, TemplateCategory } from '../types';
import { documentTemplates } from '../data/templates';

interface DocumentTemplatesProps {
  onSelectTemplate: (template: DocumentTemplate) => void;
}

export default function DocumentTemplates({ onSelectTemplate }: DocumentTemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');

  const filteredTemplates = selectedCategory === 'all'
    ? documentTemplates
    : documentTemplates.filter(t => t.category === selectedCategory);

  const categoryCount = (category: TemplateCategory) =>
    documentTemplates.filter(t => t.category === category).length;

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Wzory Dokumentów
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Wybierz wzór dokumentu i uzupełnij dane, aby wygenerować gotowy dokument
        </p>
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          Wszystkie ({documentTemplates.length})
        </button>
        {Object.values(TemplateCategory).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {category} ({categoryCount(category)})
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="bg-white/20 rounded-lg p-3">
                  <i className={`fas ${template.icon} text-2xl`}></i>
                </div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                  {template.category}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold leading-tight">
                {template.name}
              </h3>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 min-h-[60px]">
                {template.description}
              </p>

              {/* Info */}
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 mb-4">
                <i className="fas fa-list-ul"></i>
                <span>{template.variables.length} pól do wypełnienia</span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectTemplate(template)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg"
              >
                <i className="fas fa-edit"></i>
                <span>Użyj wzoru</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-16">
          <i className="fas fa-inbox text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Brak wzorów w wybranej kategorii
          </p>
        </div>
      )}
    </div>
  );
}
