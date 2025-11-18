import { useState } from 'react'
import { useStore } from '../store/useStore'
import { Link } from 'react-router-dom'
import { Search, Calendar, Download } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

export default function ArchivePage() {
  const resolutions = useStore((state) => state.resolutions)
  const [searchTerm, setSearchTerm] = useState('')
  const [yearFilter, setYearFilter] = useState<string>('all')

  // Get all archived resolutions (signed or rejected)
  const archivedResolutions = resolutions.filter(
    (r) => r.status === 'signed' || r.status === 'rejected'
  )

  // Get unique years
  const years = Array.from(
    new Set(
      archivedResolutions.map((r) => new Date(r.createdAt).getFullYear().toString())
    )
  ).sort((a, b) => parseInt(b) - parseInt(a))

  // Filter resolutions
  const filteredResolutions = archivedResolutions.filter((resolution) => {
    const matchesSearch =
      resolution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resolution.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resolution.type.toLowerCase().includes(searchTerm.toLowerCase())

    const resolutionYear = new Date(resolution.createdAt).getFullYear().toString()
    const matchesYear = yearFilter === 'all' || resolutionYear === yearFilter

    return matchesSearch && matchesYear
  })

  const handleExportAll = () => {
    alert('Eksport wszystkich uchwał do archiwum - funkcjonalność w przygotowaniu')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Archiwum</h1>
          <p className="text-gray-500 mt-1">
            Przeglądaj podpisane i zakończone uchwały
          </p>
        </div>
        <button
          onClick={handleExportAll}
          className="btn-primary flex items-center"
        >
          <Download className="h-5 w-5 mr-2" />
          Eksportuj archiwum
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Wszystkie zarchiwizowane</p>
              <p className="text-2xl font-bold text-gray-900">
                {archivedResolutions.length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Podpisane</p>
              <p className="text-2xl font-bold text-green-600">
                {archivedResolutions.filter((r) => r.status === 'signed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Odrzucone</p>
              <p className="text-2xl font-bold text-red-600">
                {archivedResolutions.filter((r) => r.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj w archiwum..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Year Filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="input pl-10"
            >
              <option value="all">Wszystkie lata</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Archive List */}
      <div className="card">
        {filteredResolutions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Brak uchwał w archiwum</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredResolutions.map((resolution) => (
              <Link
                key={resolution.id}
                to={`/resolutions/${resolution.id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-sm font-medium text-gray-900">
                        {resolution.number}
                      </span>
                      <StatusBadge status={resolution.status} />
                    </div>
                    <h3 className="font-medium text-gray-900">{resolution.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{resolution.type}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
                  <span>
                    Utworzono: {format(resolution.createdAt, 'dd MMM yyyy', { locale: pl })}
                  </span>
                  {resolution.signedDate && (
                    <span>
                      Podpisano: {format(resolution.signedDate, 'dd MMM yyyy', { locale: pl })}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="text-sm text-gray-500">
        Wyświetlono {filteredResolutions.length} z {archivedResolutions.length} zarchiwizowanych
        uchwał
      </div>
    </div>
  )
}
