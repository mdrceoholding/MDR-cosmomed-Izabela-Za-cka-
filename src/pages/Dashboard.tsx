import { useStore } from '../store/useStore'
import { FileText, CheckCircle, Clock, AlertCircle, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

export default function Dashboard() {
  const resolutions = useStore((state) => state.resolutions)
  const notifications = useStore((state) => state.notifications)

  const stats = {
    total: resolutions.length,
    draft: resolutions.filter((r) => r.status === 'draft').length,
    pending: resolutions.filter((r) => r.status === 'pending').length,
    approved: resolutions.filter((r) => r.status === 'approved').length,
    signed: resolutions.filter((r) => r.status === 'signed').length,
  }

  const recentResolutions = resolutions.slice(0, 5)
  const upcomingMeetings = resolutions
    .filter((r) => r.meetingDate && r.meetingDate > new Date())
    .sort((a, b) => (a.meetingDate!.getTime() - b.meetingDate!.getTime()))
    .slice(0, 3)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Przegląd uchwał i powiadomień</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Wszystkie</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Projekty</p>
              <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Oczekujące</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-400" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Zatwierdzone</p>
              <p className="text-2xl font-bold text-blue-600">{stats.approved}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Podpisane</p>
              <p className="text-2xl font-bold text-green-600">{stats.signed}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Resolutions */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Ostatnie uchwały</h2>
            <Link to="/resolutions" className="text-sm text-primary-600 hover:text-primary-700">
              Zobacz wszystkie
            </Link>
          </div>
          <div className="space-y-3">
            {recentResolutions.map((resolution) => (
              <Link
                key={resolution.id}
                to={`/resolutions/${resolution.id}`}
                className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{resolution.number}</p>
                    <p className="text-sm text-gray-600">{resolution.title}</p>
                  </div>
                  <StatusBadge status={resolution.status} />
                </div>
                <p className="text-xs text-gray-500">
                  {format(resolution.updatedAt, 'dd MMM yyyy', { locale: pl })}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="card">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Nadchodzące spotkania</h2>
          </div>
          <div className="space-y-3">
            {upcomingMeetings.length === 0 ? (
              <p className="text-gray-500 text-sm">Brak zaplanowanych spotkań</p>
            ) : (
              upcomingMeetings.map((resolution) => (
                <Link
                  key={resolution.id}
                  to={`/resolutions/${resolution.id}`}
                  className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{resolution.number}</p>
                      <p className="text-sm text-gray-600">{resolution.title}</p>
                      <p className="text-xs text-primary-600 mt-1">
                        {format(resolution.meetingDate!, 'dd MMMM yyyy, HH:mm', { locale: pl })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Ostatnie powiadomienia</h2>
          <Link to="/notifications" className="text-sm text-primary-600 hover:text-primary-700">
            Zobacz wszystkie
          </Link>
        </div>
        <div className="space-y-2">
          {notifications.slice(0, 5).map((notification) => (
            <div
              key={notification.id}
              className={`p-3 border rounded-lg ${
                !notification.read ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-sm text-gray-900">{notification.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                </div>
                <p className="text-xs text-gray-500">
                  {format(notification.createdAt, 'dd MMM', { locale: pl })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
