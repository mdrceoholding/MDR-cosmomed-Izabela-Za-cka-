import { ResolutionStatus } from '../types'

interface StatusBadgeProps {
  status: ResolutionStatus
}

const statusConfig: Record<ResolutionStatus, { label: string; className: string }> = {
  draft: {
    label: 'Projekt',
    className: 'bg-gray-100 text-gray-800',
  },
  pending: {
    label: 'Oczekuje',
    className: 'bg-yellow-100 text-yellow-800',
  },
  approved: {
    label: 'Zatwierdzono',
    className: 'bg-blue-100 text-blue-800',
  },
  signed: {
    label: 'Podpisano',
    className: 'bg-green-100 text-green-800',
  },
  rejected: {
    label: 'Odrzucono',
    className: 'bg-red-100 text-red-800',
  },
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  )
}
