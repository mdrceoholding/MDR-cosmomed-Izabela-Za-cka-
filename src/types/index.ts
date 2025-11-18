// User and Authentication Types
export type UserRole = 'admin' | 'manager' | 'viewer' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

// Shareholder Types
export interface Shareholder {
  id: string;
  name: string;
  email: string;
  shares: number;
  sharePercentage: number;
  joinDate: string;
  type: 'cash' | 'know-how' | 'other';
  value: number;
  documents: string[];
}

// Dividend Types
export type DividendStatus = 'planned' | 'in_progress' | 'completed' | 'cancelled';
export type DividendType = 'regular' | 'special';

export interface DividendPayment {
  shareholderId: string;
  shareholderName: string;
  shares: number;
  amount: number;
  paid: boolean;
  paymentDate?: string;
}

export interface Dividend {
  id: string;
  amount: number;
  date: string;
  type: DividendType;
  status: DividendStatus;
  description: string;
  payments: DividendPayment[];
  createdAt: string;
  updatedAt: string;
}

// Report Types
export type ReportType = 'cap_table' | 'transactions' | 'documents' | 'compliance';
export type ReportFormat = 'pdf' | 'excel' | 'csv';

export interface ReportOptions {
  type: ReportType;
  format: ReportFormat;
  dateFrom?: string;
  dateTo?: string;
  sections?: string[];
  watermark: boolean;
}

export interface Report {
  id: string;
  type: ReportType;
  format: ReportFormat;
  generatedAt: string;
  generatedBy: string;
  fileUrl: string;
  options: ReportOptions;
}

// Calendar Event Types
export type EventType = 'wza' | 'payment_deadline' | 'document_deadline' | 'dividend_payment' | 'custom';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: EventType;
  color: string;
  reminders: number[]; // days before event
  createdBy: string;
  relatedTo?: string; // ID of related entity (dividend, document, etc.)
}

// Vesting Types
export type VestingType = 'time_based' | 'milestone_based' | 'cliff';
export type VestingStatus = 'locked' | 'partially_unlocked' | 'fully_unlocked';

export interface VestingMilestone {
  id: string;
  description: string;
  achieved: boolean;
  achievedDate?: string;
  sharesUnlocked: number;
}

export interface VestingSchedule {
  id: string;
  shareholderId: string;
  shareholderName: string;
  totalShares: number;
  vestedShares: number;
  unvestedShares: number;
  type: VestingType;
  status: VestingStatus;
  startDate: string;
  endDate: string;
  cliffDate?: string;
  vestingPeriodMonths: number;
  milestones?: VestingMilestone[];
  lockupEndDate?: string;
}

// Analytics Types
export interface FinancialMetrics {
  roe: number; // Return on Equity
  roa: number; // Return on Assets
  peRatio: number; // Price to Earnings
}

export interface ValueGrowth {
  date: string;
  value: number;
}

export interface CapitalBreakdown {
  type: string;
  value: number;
  percentage: number;
}

export interface ShareholderActivity {
  shareholderName: string;
  transactions: number;
  documentsUploaded: number;
  lastActivity: string;
}

export interface DividendForecast {
  quarter: string;
  estimatedAmount: number;
  confidence: number;
}

export interface Analytics {
  metrics: FinancialMetrics;
  valueGrowth: ValueGrowth[];
  capitalBreakdown: CapitalBreakdown[];
  shareholderActivity: ShareholderActivity[];
  dividendForecast: DividendForecast[];
  totalValue: number;
  totalShares: number;
  averageSharePrice: number;
}

// Virtual Data Room Types
export type DocumentCategory = 'due_diligence' | 'financial' | 'legal' | 'technical';
export type DocumentAccessLevel = 'public' | 'restricted' | 'confidential';

export interface DocumentAccess {
  userId: string;
  userName: string;
  viewedAt: string;
  downloadedAt?: string;
}

export interface DocumentShare {
  id: string;
  password?: string;
  expiresAt: string;
  createdAt: string;
  accessCount: number;
}

export interface VDRDocument {
  id: string;
  name: string;
  category: DocumentCategory;
  accessLevel: DocumentAccessLevel;
  uploadedBy: string;
  uploadedAt: string;
  size: number;
  fileType: string;
  watermarked: boolean;
  accessLog: DocumentAccess[];
  shareLink?: DocumentShare;
  allowedUsers: string[];
}

// Transaction Types
export interface Transaction {
  id: string;
  date: string;
  type: 'buy' | 'sell' | 'transfer' | 'grant';
  fromShareholder?: string;
  toShareholder: string;
  shares: number;
  pricePerShare: number;
  totalValue: number;
  status: 'pending' | 'completed' | 'cancelled';
  notes?: string;
}

// Document Template Types
export interface DocumentTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  fileUrl: string;
  variables: string[];
  createdAt: string;
  updatedAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Dashboard KPI Types
export interface KPI {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
}
