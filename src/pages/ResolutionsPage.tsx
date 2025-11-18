import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { Plus, Search, Filter } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { ResolutionStatus } from '../types'

export default function ResolutionsPage() {
  const resolutions = useStore((state) => state.resolutions)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<ResolutionStatus | 'all'>('all')

  const filteredResolutions = resolutions.filter((resolution) => {
    const matchesSearch =
      resolution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resolution.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resolution.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || resolution.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Uchwały</h1>
          <p className="text-gray-500 mt-1">Zarządzaj uchwałami spółki</p>
        </div>
        <Link to="/resolutions/new" className="btn-primary flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Nowa uchwała
        </Link>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj uchwał..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ResolutionStatus | 'all')}
              className="input pl-10"
            >
              <option value="all">Wszystkie statusy</option>
              <option value="draft">Projekt</option>
              <option value="pending">Oczekujące</option>
              <option value="approved">Zatwierdzone</option>
              <option value="signed">Podpisane</option>
              <option value="rejected">Odrzucone</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resolutions List */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Numer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tytuł
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Typ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data utworzenia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spotkanie
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResolutions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Nie znaleziono uchwał
                  </td>
                </tr>
              ) : (
                filteredResolutions.map((resolution) => (
                  <tr
                    key={resolution.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => window.location.href = `/resolutions/${resolution.id}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {resolution.number}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {resolution.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {resolution.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={resolution.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(resolution.createdAt, 'dd MMM yyyy', { locale: pl })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {resolution.meetingDate
                        ? format(resolution.meetingDate, 'dd MMM yyyy', { locale: pl })
                        : '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="text-sm text-gray-500">
        Wyświetlono {filteredResolutions.length} z {resolutions.length} uchwał
      </div>
    </div>
  )
}
