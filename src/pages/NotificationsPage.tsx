import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'
import { Bell, CheckCheck, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { NotificationType } from '../types'

const notificationIcons: Record<NotificationType, string> = {
  deadline: '⏰',
  approval: '✅',
  signed: '📝',
  reminder: '🔔',
  info: 'ℹ️',
}

const notificationColors: Record<NotificationType, string> = {
  deadline: 'bg-red-50 border-red-200',
  approval: 'bg-yellow-50 border-yellow-200',
  signed: 'bg-green-50 border-green-200',
  reminder: 'bg-blue-50 border-blue-200',
  info: 'bg-gray-50 border-gray-200',
}

export default function NotificationsPage() {
  const notifications = useStore((state) => state.notifications)
  const markAsRead = useStore((state) => state.markNotificationAsRead)
  const markAllAsRead = useStore((state) => state.markAllNotificationsAsRead)
  const deleteNotification = useStore((state) => state.deleteNotification)
  const unreadCount = useStore((state) => state.getUnreadCount())
  const navigate = useNavigate()

  const handleNotificationClick = (notificationId: string, actionUrl?: string) => {
    markAsRead(notificationId)
    if (actionUrl) {
      navigate(actionUrl)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Powiadomienia</h1>
          <p className="text-gray-500 mt-1">
            {unreadCount > 0
              ? `Masz ${unreadCount} nieprzeczytanych powiadomień`
              : 'Wszystkie powiadomienia przeczytane'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="btn-secondary flex items-center"
          >
            <CheckCheck className="h-5 w-5 mr-2" />
            Oznacz wszystkie jako przeczytane
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="card text-center py-12">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Brak powiadomień</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`card cursor-pointer transition-all relative ${
                !notification.read
                  ? notificationColors[notification.type]
                  : 'hover:bg-gray-50'
              }`}
              onClick={() =>
                handleNotificationClick(notification.id, notification.actionUrl)
              }
            >
              <div className="flex items-start">
                {/* Icon */}
                <div className="text-2xl mr-4 mt-1">
                  {notificationIcons[notification.type]}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </h3>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {format(notification.createdAt, 'dd MMMM yyyy, HH:mm', {
                          locale: pl,
                        })}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            markAsRead(notification.id)
                          }}
                          className="text-gray-400 hover:text-gray-600 p-1"
                          title="Oznacz jako przeczytane"
                        >
                          <CheckCheck className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                        className="text-gray-400 hover:text-red-600 p-1"
                        title="Usuń"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Action Link */}
                  {notification.actionUrl && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <span className="text-sm text-primary-600 font-medium hover:text-primary-700">
                        Zobacz szczegóły →
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {notifications.length > 0 && (
        <div className="text-sm text-gray-500 text-center">
          Łącznie {notifications.length} powiadomień
        </div>
      )}
    </div>
  )
}
