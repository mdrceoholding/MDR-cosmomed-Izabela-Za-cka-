import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { ArrowLeft, Save } from 'lucide-react'

export default function NewResolution() {
  const navigate = useNavigate()
  const addResolution = useStore((state) => state.addResolution)
  const addNotification = useStore((state) => state.addNotification)

  const [formData, setFormData] = useState({
    number: '',
    title: '',
    type: 'Uchwała WZA',
    content: '',
    meetingDate: '',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const resolution = {
      ...formData,
      status: 'draft' as const,
      createdBy: 'Dorota Płoskoń',
      approvers: [],
      attachments: [],
      meetingDate: formData.meetingDate ? new Date(formData.meetingDate) : undefined,
    }

    addResolution(resolution)

    addNotification({
      type: 'info',
      title: 'Utworzono nową uchwałę',
      message: `Uchwała ${formData.number} została utworzona jako projekt`,
      read: false,
    })

    navigate('/resolutions')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <Link
          to="/resolutions"
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nowa uchwała</h1>
          <p className="text-gray-500 mt-1">Utwórz nową uchwałę</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Podstawowe informacje</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Numer uchwały *</label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
                placeholder="np. 1/2025"
                className="input"
              />
            </div>

            <div>
              <label className="label">Typ dokumentu *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="Uchwała WZA">Uchwała WZA</option>
                <option value="Uchwała Zarządu">Uchwała Zarządu</option>
                <option value="Uchwała Rady Nadzorczej">Uchwała Rady Nadzorczej</option>
                <option value="Protokół">Protokół</option>
                <option value="Inne">Inne</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="label">Tytuł uchwały *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="np. Wniesienie wkładu niepieniężnego"
                className="input"
              />
            </div>

            <div>
              <label className="label">Data spotkania (opcjonalnie)</label>
              <input
                type="datetime-local"
                name="meetingDate"
                value={formData.meetingDate}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Treść uchwały</h2>
          <div>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={15}
              placeholder="Wprowadź treść uchwały..."
              className="input font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-2">
              Możesz użyć szablonu z biblioteki szablonów
            </p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notatki</h2>
          <div>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Dodatkowe informacje, uwagi..."
              className="input"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <Link to="/resolutions" className="btn-secondary">
            Anuluj
          </Link>
          <button type="submit" className="btn-primary flex items-center">
            <Save className="h-5 w-5 mr-2" />
            Zapisz jako projekt
          </button>
        </div>
      </form>
    </div>
  )
}
