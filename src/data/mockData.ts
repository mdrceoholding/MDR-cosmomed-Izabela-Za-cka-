import { User, UserRole, UserStatus, Shareholder, Transaction, TransactionType, TimelineEvent, Document, DocumentStatus } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Dorota',
    lastName: 'Płoskoń',
    email: 'dorota.ploskon@mdrphilosophy.pl',
    password: 'hashed_password_123', // In production, this would be bcrypt hashed
    role: UserRole.ADMIN,
    position: 'CEO',
    company: 'MDR PHILOSOPHY PSA',
    phone: '+48 600 123 456',
    avatar: null,
    status: UserStatus.ACTIVE,
    createdAt: new Date('2025-01-15'),
    lastLogin: new Date('2025-11-18')
  },
  {
    id: '2',
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jan.kowalski@mdrphilosophy.pl',
    password: 'hashed_password_456',
    role: UserRole.MANAGER,
    position: 'Dyrektor Operacyjny',
    company: 'MDR PHILOSOPHY PSA',
    phone: '+48 600 234 567',
    avatar: null,
    status: UserStatus.ACTIVE,
    createdAt: new Date('2025-02-10'),
    lastLogin: new Date('2025-11-17')
  },
  {
    id: '3',
    firstName: 'Anna',
    lastName: 'Nowak',
    email: 'anna.nowak@mdrphilosophy.pl',
    password: 'hashed_password_789',
    role: UserRole.VIEWER,
    position: 'Księgowa',
    company: 'MDR PHILOSOPHY PSA',
    phone: '+48 600 345 678',
    avatar: null,
    status: UserStatus.ACTIVE,
    createdAt: new Date('2025-03-05'),
    lastLogin: new Date('2025-11-16')
  },
  {
    id: '4',
    firstName: 'Piotr',
    lastName: 'Lewandowski',
    email: 'piotr.lewandowski@mdrphilosophy.pl',
    password: 'hashed_password_abc',
    role: UserRole.MANAGER,
    position: 'Dyrektor Finansowy',
    company: 'MDR PHILOSOPHY PSA',
    phone: '+48 600 456 789',
    avatar: null,
    status: UserStatus.ACTIVE,
    createdAt: new Date('2025-04-20'),
    lastLogin: new Date('2025-11-15')
  }
];

// Mock Shareholders
export const mockShareholders: Shareholder[] = [
  {
    id: 's1',
    name: 'Jan Kowalski',
    shares: 5000,
    percentage: 50,
    email: 'jan.kowalski@example.com',
    phone: '+48 600 111 222',
    address: 'ul. Główna 1, 00-001 Warszawa',
    kycStatus: 'verified',
    type: 'individual',
    addedAt: new Date('2025-01-10')
  },
  {
    id: 's2',
    name: 'Anna Nowak',
    shares: 3000,
    percentage: 30,
    email: 'anna.nowak@example.com',
    phone: '+48 600 222 333',
    address: 'ul. Kwiatowa 5, 30-001 Kraków',
    kycStatus: 'verified',
    type: 'individual',
    addedAt: new Date('2025-01-15')
  },
  {
    id: 's3',
    name: 'Piotr Lewandowski',
    shares: 2000,
    percentage: 20,
    email: 'piotr.lewandowski@example.com',
    phone: '+48 600 333 444',
    address: 'ul. Parkowa 10, 50-001 Wrocław',
    kycStatus: 'verified',
    type: 'individual',
    addedAt: new Date('2025-02-01')
  }
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    from: 'Jan Kowalski',
    to: 'Anna Nowak',
    shares: 500,
    amount: 50000,
    type: TransactionType.TRANSFER,
    date: new Date('2025-11-15'),
    status: 'completed',
    description: 'Przeniesienie akcji zgodnie z umową'
  },
  {
    id: 't2',
    from: 'MDR PHILOSOPHY PSA',
    to: 'Piotr Lewandowski',
    shares: 1000,
    amount: 100000,
    type: TransactionType.EMISSION,
    date: new Date('2025-11-10'),
    status: 'completed',
    description: 'Emisja nowych akcji - podwyższenie kapitału'
  },
  {
    id: 't3',
    from: 'Anna Nowak',
    to: 'Jan Kowalski',
    shares: 200,
    amount: 20000,
    type: TransactionType.TRANSFER,
    date: new Date('2025-11-05'),
    status: 'completed',
    description: 'Sprzedaż akcji'
  },
  {
    id: 't4',
    from: 'Piotr Lewandowski',
    to: 'Anna Nowak',
    shares: 300,
    amount: 30000,
    type: TransactionType.SELL,
    date: new Date('2025-10-28'),
    status: 'completed',
    description: 'Transakcja sprzedaży'
  },
  {
    id: 't5',
    from: 'Jan Kowalski',
    to: 'Piotr Lewandowski',
    shares: 150,
    amount: 15000,
    type: TransactionType.TRANSFER,
    date: new Date('2025-10-20'),
    status: 'pending',
    description: 'Oczekująca transakcja - wymaga zatwierdzenia'
  }
];

// Mock Timeline Events
export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 'tl1',
    type: 'emission',
    title: 'Emisja nowych akcji',
    description: 'Podwyższenie kapitału zakładowego o 1000 akcji',
    date: new Date('2025-11-10'),
    icon: 'fa-chart-line',
    color: 'bg-green-500'
  },
  {
    id: 'tl2',
    type: 'meeting',
    title: 'Walne Zgromadzenie Akcjonariuszy',
    description: 'Zwyczajne WZA - zatwierdzenie sprawozdań finansowych',
    date: new Date('2025-10-15'),
    icon: 'fa-users',
    color: 'bg-blue-500'
  },
  {
    id: 'tl3',
    type: 'transaction',
    title: 'Transakcja akcji',
    description: 'Przeniesienie 500 akcji: Jan Kowalski → Anna Nowak',
    date: new Date('2025-11-15'),
    icon: 'fa-exchange-alt',
    color: 'bg-purple-500'
  },
  {
    id: 'tl4',
    type: 'document',
    title: 'Nowy dokument',
    description: 'Uchwała nr 5/2025 - zatwierdzona',
    date: new Date('2025-11-01'),
    icon: 'fa-file-alt',
    color: 'bg-yellow-500'
  }
];

// Mock Documents
export const mockDocuments: Document[] = [
  {
    id: 'd1',
    title: 'Uchwała nr 1/2025 - Zatwierdzenie sprawozdań',
    type: 'resolution',
    status: DocumentStatus.APPROVED,
    createdBy: 'Dorota Płoskoń',
    createdAt: new Date('2025-10-15'),
    approvedBy: 'Jan Kowalski',
    approvedAt: new Date('2025-10-16'),
    fileUrl: '/documents/resolution-1-2025.pdf'
  },
  {
    id: 'd2',
    title: 'Umowa cesji akcji - Jan Kowalski',
    type: 'agreement',
    status: DocumentStatus.APPROVED,
    createdBy: 'Anna Nowak',
    createdAt: new Date('2025-11-05'),
    approvedBy: 'Dorota Płoskoń',
    approvedAt: new Date('2025-11-06'),
    fileUrl: '/documents/agreement-kowalski.pdf'
  },
  {
    id: 'd3',
    title: 'Certyfikat akcji - seria A',
    type: 'certificate',
    status: DocumentStatus.PENDING,
    createdBy: 'Piotr Lewandowski',
    createdAt: new Date('2025-11-12'),
    fileUrl: '/documents/certificate-a.pdf'
  },
  {
    id: 'd4',
    title: 'Raport kwartalny Q3 2025',
    type: 'report',
    status: DocumentStatus.DRAFT,
    createdBy: 'Anna Nowak',
    createdAt: new Date('2025-11-17'),
  }
];

// Helper function to get user initials for avatar
export const getUserInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN'
  }).format(amount);
};

// Helper function to format date
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Helper function to format short date
export const formatShortDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
};
