import { create } from 'zustand'
import { Resolution, Notification, ResolutionTemplate } from '../types'
import { mockResolutions, mockNotifications, mockTemplates } from '../data/mockData'

interface AppState {
  resolutions: Resolution[]
  notifications: Notification[]
  templates: ResolutionTemplate[]

  // Resolution actions
  addResolution: (resolution: Omit<Resolution, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateResolution: (id: string, updates: Partial<Resolution>) => void
  deleteResolution: (id: string) => void
  getResolutionById: (id: string) => Resolution | undefined

  // Notification actions
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void
  markNotificationAsRead: (id: string) => void
  markAllNotificationsAsRead: () => void
  deleteNotification: (id: string) => void
  getUnreadCount: () => number
}

export const useStore = create<AppState>((set, get) => ({
  resolutions: mockResolutions,
  notifications: mockNotifications,
  templates: mockTemplates,

  addResolution: (resolution) => set((state) => ({
    resolutions: [
      {
        ...resolution,
        id: `RES-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ...state.resolutions,
    ],
  })),

  updateResolution: (id, updates) => set((state) => ({
    resolutions: state.resolutions.map((res) =>
      res.id === id ? { ...res, ...updates, updatedAt: new Date() } : res
    ),
  })),

  deleteResolution: (id) => set((state) => ({
    resolutions: state.resolutions.filter((res) => res.id !== id),
  })),

  getResolutionById: (id) => get().resolutions.find((res) => res.id === id),

  addNotification: (notification) => set((state) => ({
    notifications: [
      {
        ...notification,
        id: `NOTIF-${Date.now()}`,
        createdAt: new Date(),
      },
      ...state.notifications,
    ],
  })),

  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((notif) =>
      notif.id === id ? { ...notif, read: true } : notif
    ),
  })),

  markAllNotificationsAsRead: () => set((state) => ({
    notifications: state.notifications.map((notif) => ({ ...notif, read: true })),
  })),

  deleteNotification: (id) => set((state) => ({
    notifications: state.notifications.filter((notif) => notif.id !== id),
  })),

  getUnreadCount: () => get().notifications.filter((n) => !n.read).length,
}))
