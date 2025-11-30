import { Bell, X } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '../store/useStore'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom'

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const notifications = useStore((state) => state.notifications)
  const markAsRead = useStore((state) => state.markNotificationAsRead)
  const deleteNotification = useStore((state) => state.deleteNotification)
  const unreadCount = useStore((state) => state.getUnreadCount())

  const handleNotificationClick = (notificationId: string, actionUrl?: string) => {
    markAsRead(notificationId)
    if (actionUrl) {
      navigate(actionUrl)
      setIsOpen(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20 max-h-96 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Powiadomienia</h3>
            </div>
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Brak powiadomień
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer relative ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() =>
                      handleNotificationClick(notification.id, notification.actionUrl)
                    }
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNotification(notification.id)
                      }}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <p className="font-medium text-sm text-gray-900 pr-6">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {format(notification.createdAt, 'dd MMM yyyy, HH:mm', { locale: pl })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
