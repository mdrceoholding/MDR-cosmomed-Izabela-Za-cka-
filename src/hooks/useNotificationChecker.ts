import { useEffect } from 'react'
import { useStore } from '../store/useStore'
import { checkNotifications } from '../utils/notifications'

/**
 * Hook który automatycznie sprawdza i generuje powiadomienia
 * na podstawie zasad określonych w utils/notifications.ts
 */
export function useNotificationChecker() {
  const resolutions = useStore((state) => state.resolutions)
  const notifications = useStore((state) => state.notifications)
  const addNotification = useStore((state) => state.addNotification)

  useEffect(() => {
    // Sprawdź powiadomienia przy pierwszym renderze
    const newNotifications = checkNotifications(resolutions, notifications)
    newNotifications.forEach((notif) => {
      addNotification(notif)
    })

    // Sprawdzaj powiadomienia co 1 godzinę
    const interval = setInterval(() => {
      const newNotifications = checkNotifications(resolutions, notifications)
      newNotifications.forEach((notif) => {
        addNotification(notif)
      })
    }, 60 * 60 * 1000) // 1 godzina

    return () => clearInterval(interval)
  }, [resolutions, notifications, addNotification])
}
