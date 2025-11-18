import { useState } from 'react'
import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'
import { Search, FileText, Copy } from 'lucide-react'

export default function TemplatesPage() {
  const templates = useStore((state) => state.templates)
  const addResolution = useStore((state) => state.addResolution)
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const categories = Array.from(new Set(templates.map((t) => t.category)))

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === 'all' || template.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleUseTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (!template) return

    // W prawdziwej aplikacji tutaj byłoby wypełnianie formularza zmiennymi
    // Na razie przekierowujemy do formularza nowej uchwały z zawartością szablonu
    const newResolution = {
      number: '',
      title: template.name,
      type: 'Uchwała WZA',
      content: template.content,
      status: 'draft' as const,
      createdBy: 'Dorota Płoskoń',
      approvers: [],
      attachments: [],
      notes: `Utworzono z szablonu: ${template.name}`,
    }

    addResolution(newResolution)
    navigate('/resolutions')
  }

  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Biblioteka szablonów</h1>
        <p className="text-gray-500 mt-1">
          Wybierz szablon i dostosuj do swoich potrzeb
        </p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj szablonów..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
            >
              <option value="all">Wszystkie kategorie</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="card hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start">
                <FileText className="h-6 w-6 text-primary-600 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{template.category}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{template.description}</p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <span className="text-xs text-gray-500">
                {template.variables.length} zmiennych
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleUseTemplate(template.id)
                }}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
              >
                <Copy className="h-4 w-4 mr-1" />
                Użyj szablonu
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Template Preview Modal */}
      {selectedTemplate && selectedTemplateData && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTemplate(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedTemplateData.name}
                  </h2>
                  <p className="text-gray-500 mt-1">
                    {selectedTemplateData.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Wymagane zmienne:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedTemplateData.variables.map((variable) => (
                    <div key={variable.key} className="text-sm">
                      <span className="font-medium text-gray-900">
                        {variable.label}
                      </span>
                      <span className="text-gray-500 ml-2">
                        ({variable.type})
                        {variable.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Podgląd szablonu:</h3>
                <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap font-sans text-gray-700">
                  {selectedTemplateData.content}
                </pre>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="btn-secondary"
                >
                  Zamknij
                </button>
                <button
                  onClick={() => handleUseTemplate(selectedTemplateData.id)}
                  className="btn-primary flex items-center"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Użyj szablonu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
