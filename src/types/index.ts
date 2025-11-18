export type ResolutionStatus = 'draft' | 'pending' | 'approved' | 'signed' | 'rejected'

export interface Resolution {
  id: string
  number: string
  title: string
  type: string
  content: string
  status: ResolutionStatus
  createdAt: Date
  updatedAt: Date
  meetingDate?: Date
  approvedDate?: Date
  signedDate?: Date
  createdBy: string
  approvers: string[]
  attachments: Attachment[]
  notes: string
}

export interface Attachment {
  id: string
  name: string
  url: string
  size: number
  uploadedAt: Date
}

export interface ResolutionTemplate {
  id: string
  name: string
  category: string
  description: string
  content: string
  variables: TemplateVariable[]
}

export interface TemplateVariable {
  key: string
  label: string
  type: 'text' | 'date' | 'number' | 'select'
  required: boolean
  options?: string[]
}

export type NotificationType = 'deadline' | 'approval' | 'signed' | 'reminder' | 'info'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  resolutionId?: string
  read: boolean
  createdAt: Date
  actionUrl?: string
}
