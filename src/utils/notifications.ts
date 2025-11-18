import { Resolution } from '../types'
import { differenceInDays } from 'date-fns'

interface NotificationRule {
  check: (resolution: Resolution) => boolean
  title: string
  message: (resolution: Resolution) => string
  type: 'deadline' | 'reminder' | 'approval'
}

export const notificationRules: NotificationRule[] = [
  // Przypomnienie 7 dni przed spotkaniem
  {
    check: (resolution) => {
      if (!resolution.meetingDate || resolution.status === 'signed' || resolution.status === 'rejected') {
        return false
      }
      const daysUntil = differenceInDays(resolution.meetingDate, new Date())
      return daysUntil === 7
    },
    title: 'Spotkanie za 7 dni',
    message: (resolution) =>
      `WZA w sprawie uchwały ${resolution.number} odbędzie się za 7 dni`,
    type: 'reminder',
  },

  // Przypomnienie 3 dni przed spotkaniem
  {
    check: (resolution) => {
      if (!resolution.meetingDate || resolution.status === 'signed' || resolution.status === 'rejected') {
        return false
      }
      const daysUntil = differenceInDays(resolution.meetingDate, new Date())
      return daysUntil === 3
    },
    title: 'Spotkanie za 3 dni',
    message: (resolution) =>
      `Zbliża się termin WZA (${resolution.number}) - pozostały 3 dni`,
    type: 'deadline',
  },

  // Przypomnienie 1 dzień przed spotkaniem
  {
    check: (resolution) => {
      if (!resolution.meetingDate || resolution.status === 'signed' || resolution.status === 'rejected') {
        return false
      }
      const daysUntil = differenceInDays(resolution.meetingDate, new Date())
      return daysUntil === 1
    },
    title: 'Spotkanie jutro!',
    message: (resolution) =>
      `Jutro odbędzie się WZA w sprawie uchwały ${resolution.number}`,
    type: 'deadline',
  },

  // Przypomnienie w dniu spotkania
  {
    check: (resolution) => {
      if (!resolution.meetingDate || resolution.status === 'signed' || resolution.status === 'rejected') {
        return false
      }
      const daysUntil = differenceInDays(resolution.meetingDate, new Date())
      return daysUntil === 0
    },
    title: 'Spotkanie dzisiaj!',
    message: (resolution) =>
      `Dzisiaj odbywa się WZA w sprawie uchwały ${resolution.number}`,
    type: 'deadline',
  },

  // Uchwała oczekuje na akceptację dłużej niż 3 dni
  {
    check: (resolution) => {
      if (resolution.status !== 'pending') return false
      const daysPending = differenceInDays(new Date(), resolution.updatedAt)
      return daysPending >= 3
    },
    title: 'Oczekująca akceptacja',
    message: (resolution) =>
      `Uchwała ${resolution.number} oczekuje na Twoją akceptację od ${differenceInDays(new Date(), resolution.updatedAt)} dni`,
    type: 'approval',
  },

  // Projekt nie został zatwierdzony przez 7 dni
  {
    check: (resolution) => {
      if (resolution.status !== 'draft') return false
      const daysDraft = differenceInDays(new Date(), resolution.createdAt)
      return daysDraft >= 7
    },
    title: 'Nieaktywny projekt',
    message: (resolution) =>
      `Projekt uchwały ${resolution.number} nie został zatwierdzony od ${differenceInDays(new Date(), resolution.createdAt)} dni`,
    type: 'reminder',
  },
]

export function checkNotifications(
  resolutions: Resolution[],
  existingNotifications: any[]
): any[] {
  const newNotifications: any[] = []

  resolutions.forEach((resolution) => {
    notificationRules.forEach((rule) => {
      if (rule.check(resolution)) {
        // Sprawdź czy takie powiadomienie już istnieje (aby nie duplikować)
        const alreadyExists = existingNotifications.some(
          (notif) =>
            notif.resolutionId === resolution.id &&
            notif.title === rule.title
        )

        if (!alreadyExists) {
          newNotifications.push({
            type: rule.type,
            title: rule.title,
            message: rule.message(resolution),
            resolutionId: resolution.id,
            read: false,
            actionUrl: `/resolutions/${resolution.id}`,
          })
        }
      }
    })
  })

  return newNotifications
}
