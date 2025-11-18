// Enums
export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  VIEWER = 'viewer',
  GUEST = 'guest'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

export enum TransactionType {
  BUY = 'buy',
  SELL = 'sell',
  TRANSFER = 'transfer',
  EMISSION = 'emission'
}

export enum DocumentStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

// Interfaces
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // hashed
  role: UserRole;
  position?: string;
  company?: string;
  phone?: string;
  avatar?: string;
  status: UserStatus;
  createdAt: Date;
  lastLogin?: Date;
}

export interface KnowHow {
  description: string;
  value: number; // wartość w PLN
  status: 'pending' | 'approved' | 'valued';
  valuationDate?: Date;
  valuedBy?: string; // ekspert/rzeczoznawca
}

export interface Shareholder {
  id: string;
  name: string;
  shares: number;
  percentage: number;
  email: string;
  phone?: string;
  address?: string;
  pesel?: string;
  kycStatus: 'verified' | 'pending' | 'rejected';
  type: 'individual' | 'company';
  addedAt: Date;
  knowHow?: KnowHow; // opcjonalne - aport niepieniężny
}

export interface Transaction {
  id: string;
  from: string;
  to: string;
  shares: number;
  amount: number;
  type: TransactionType;
  date: Date;
  status: 'completed' | 'pending' | 'cancelled';
  description?: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'resolution' | 'agreement' | 'certificate' | 'report';
  status: DocumentStatus;
  createdBy: string;
  createdAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  fileUrl?: string;
}

export interface TimelineEvent {
  id: string;
  type: 'transaction' | 'meeting' | 'emission' | 'document';
  title: string;
  description: string;
  date: Date;
  icon: string;
  color: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface KPICard {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: string;
  color: string;
}
