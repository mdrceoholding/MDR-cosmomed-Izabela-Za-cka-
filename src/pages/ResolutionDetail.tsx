import { useParams, useNavigate, Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { ArrowLeft, Download, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

export default function ResolutionDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const resolution = useStore((state) => state.getResolutionById(id!))
  const updateResolution = useStore((state) => state.updateResolution)
  const deleteResolution = useStore((state) => state.deleteResolution)
  const addNotification = useStore((state) => state.addNotification)

  if (!resolution) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Uchwała nie została znaleziona</p>
        <Link to="/resolutions" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
          Wróć do listy uchwał
        </Link>
      </div>
    )
  }

  const handleApprove = () => {
    updateResolution(resolution.id, {
      status: 'approved',
      approvedDate: new Date(),
    })
    addNotification({
      type: 'approval',
      title: 'Uchwała zatwierdzona',
      message: `Uchwała ${resolution.number} została zatwierdzona`,
      resolutionId: resolution.id,
      read: false,
    })
  }

  const handleReject = () => {
    updateResolution(resolution.id, {
      status: 'rejected',
    })
    addNotification({
      type: 'info',
      title: 'Uchwała odrzucona',
      message: `Uchwała ${resolution.number} została odrzucona`,
      resolutionId: resolution.id,
      read: false,
    })
  }

  const handleSign = () => {
    updateResolution(resolution.id, {
      status: 'signed',
      signedDate: new Date(),
    })
    addNotification({
      type: 'signed',
      title: 'Uchwała podpisana',
      message: `Uchwała ${resolution.number} została podpisana`,
      resolutionId: resolution.id,
      read: false,
    })
  }

  const handleDelete = () => {
    if (window.confirm('Czy na pewno chcesz usunąć tę uchwałę?')) {
      deleteResolution(resolution.id)
      navigate('/resolutions')
    }
  }

  const handleExportPDF = () => {
    // W prawdziwej aplikacji tutaj byłaby logika eksportu do PDF
    alert('Eksport do PDF - funkcjonalność w przygotowaniu')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/resolutions"
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Uchwała {resolution.number}
            </h1>
            <p className="text-gray-500 mt-1">{resolution.title}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportPDF}
            className="btn-secondary flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Eksport PDF
          </button>
          <Link
            to={`/resolutions/${resolution.id}/edit`}
            className="btn-secondary flex items-center"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edytuj
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors font-medium flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Usuń
          </button>
        </div>
      </div>

      {/* Info Card */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="label">Status</p>
            <StatusBadge status={resolution.status} />
          </div>
          <div>
            <p className="label">Typ dokumentu</p>
            <p className="text-gray-900">{resolution.type}</p>
          </div>
          <div>
            <p className="label">Utworzył</p>
            <p className="text-gray-900">{resolution.createdBy}</p>
          </div>
          <div>
            <p className="label">Data utworzenia</p>
            <p className="text-gray-900">
              {format(resolution.createdAt, 'dd MMMM yyyy, HH:mm', { locale: pl })}
            </p>
          </div>
          <div>
            <p className="label">Ostatnia modyfikacja</p>
            <p className="text-gray-900">
              {format(resolution.updatedAt, 'dd MMMM yyyy, HH:mm', { locale: pl })}
            </p>
          </div>
          {resolution.meetingDate && (
            <div>
              <p className="label">Data spotkania</p>
              <p className="text-gray-900">
                {format(resolution.meetingDate, 'dd MMMM yyyy, HH:mm', { locale: pl })}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Treść uchwały</h2>
        <div className="prose max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
            {resolution.content}
          </pre>
        </div>
      </div>

      {/* Approvers */}
      {resolution.approvers.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Akceptujący</h2>
          <div className="space-y-2">
            {resolution.approvers.map((approver, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-900">{approver}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {resolution.notes && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notatki</h2>
          <p className="text-gray-700">{resolution.notes}</p>
        </div>
      )}

      {/* Actions */}
      {resolution.status !== 'signed' && resolution.status !== 'rejected' && (
        <div className="card bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Akcje</h2>
          <div className="flex space-x-4">
            {resolution.status === 'pending' && (
              <>
                <button
                  onClick={handleApprove}
                  className="btn-primary flex items-center"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Zatwierdź
                </button>
                <button
                  onClick={handleReject}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center"
                >
                  <XCircle className="h-5 w-5 mr-2" />
                  Odrzuć
                </button>
              </>
            )}
            {resolution.status === 'approved' && (
              <button
                onClick={handleSign}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Podpisz elektronicznie
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
