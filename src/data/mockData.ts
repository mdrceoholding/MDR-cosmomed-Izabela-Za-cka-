import {
  User,
  Shareholder,
  Dividend,
  CalendarEvent,
  VestingSchedule,
  VDRDocument,
  Transaction,
  DocumentTemplate,
  Analytics,
} from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@psa.pl',
    name: 'Jan Kowalski',
    role: 'admin',
  },
  {
    id: '2',
    email: 'manager@psa.pl',
    name: 'Anna Nowak',
    role: 'manager',
  },
  {
    id: '3',
    email: 'viewer@psa.pl',
    name: 'Piotr Wiśniewski',
    role: 'viewer',
  },
  {
    id: '4',
    email: 'guest@psa.pl',
    name: 'Maria Kowalczyk',
    role: 'guest',
  },
];

// Mock Shareholders (including Artur Fijołek)
export const mockShareholders: Shareholder[] = [
  {
    id: '1',
    name: 'Artur Fijołek',
    email: 'artur.fijolek@psa.pl',
    shares: 13999,
    sharePercentage: 69.995,
    joinDate: '2023-01-15',
    type: 'know-how',
    value: 13999000,
    documents: ['kontrakt-1.pdf', 'wycena-knowhow.pdf'],
  },
  {
    id: '2',
    name: 'Jan Kowalski',
    email: 'jan.kowalski@psa.pl',
    shares: 3000,
    sharePercentage: 15.0,
    joinDate: '2023-02-01',
    type: 'cash',
    value: 3000000,
    documents: ['umowa-nabycia.pdf'],
  },
  {
    id: '3',
    name: 'Anna Nowak',
    email: 'anna.nowak@psa.pl',
    shares: 2000,
    sharePercentage: 10.0,
    joinDate: '2023-03-15',
    type: 'cash',
    value: 2000000,
    documents: ['umowa-nabycia-2.pdf'],
  },
  {
    id: '4',
    name: 'Piotr Wiśniewski',
    email: 'piotr.wisniewski@psa.pl',
    shares: 1001,
    sharePercentage: 5.005,
    joinDate: '2023-06-01',
    type: 'other',
    value: 1001000,
    documents: ['umowa-wklad.pdf'],
  },
];

// Mock Dividends
export const mockDividends: Dividend[] = [
  {
    id: '1',
    amount: 500000,
    date: '2024-12-31',
    type: 'regular',
    status: 'planned',
    description: 'Dywidenda kwartalna Q4 2024',
    payments: mockShareholders.map(sh => ({
      shareholderId: sh.id,
      shareholderName: sh.name,
      shares: sh.shares,
      amount: Math.round(500000 * (sh.sharePercentage / 100)),
      paid: false,
    })),
    createdAt: '2024-11-01',
    updatedAt: '2024-11-01',
  },
  {
    id: '2',
    amount: 300000,
    date: '2024-09-30',
    type: 'regular',
    status: 'completed',
    description: 'Dywidenda kwartalna Q3 2024',
    payments: mockShareholders.map(sh => ({
      shareholderId: sh.id,
      shareholderName: sh.name,
      shares: sh.shares,
      amount: Math.round(300000 * (sh.sharePercentage / 100)),
      paid: true,
      paymentDate: '2024-10-05',
    })),
    createdAt: '2024-08-15',
    updatedAt: '2024-10-05',
  },
  {
    id: '3',
    amount: 750000,
    date: '2024-06-30',
    type: 'special',
    status: 'completed',
    description: 'Dywidenda nadzwyczajna - sprzedaż aktywów',
    payments: mockShareholders.map(sh => ({
      shareholderId: sh.id,
      shareholderName: sh.name,
      shares: sh.shares,
      amount: Math.round(750000 * (sh.sharePercentage / 100)),
      paid: true,
      paymentDate: '2024-07-10',
    })),
    createdAt: '2024-05-20',
    updatedAt: '2024-07-10',
  },
];

// Mock Calendar Events
export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Walne Zgromadzenie Akcjonariuszy',
    description: 'Roczne WZA - zatwierdzenie sprawozdań finansowych',
    date: '2024-12-15',
    type: 'wza',
    color: '#ef4444',
    reminders: [7, 1],
    createdBy: '1',
  },
  {
    id: '2',
    title: 'Wypłata dywidendy Q4',
    description: 'Termin wypłaty dywidendy kwartalnej',
    date: '2024-12-31',
    type: 'dividend_payment',
    color: '#22c55e',
    reminders: [7],
    createdBy: '1',
    relatedTo: '1',
  },
  {
    id: '3',
    title: 'Deadline dokumentów podatkowych',
    description: 'Termin złożenia deklaracji CIT',
    date: '2025-01-31',
    type: 'document_deadline',
    color: '#f59e0b',
    reminders: [14, 7, 1],
    createdBy: '2',
  },
  {
    id: '4',
    title: 'Termin wpłaty kapitału',
    description: 'Wpłata na poczet podwyższenia kapitału',
    date: '2024-11-30',
    type: 'payment_deadline',
    color: '#3b82f6',
    reminders: [7, 3],
    createdBy: '1',
  },
  {
    id: '5',
    title: 'Spotkanie zarządu',
    description: 'Comiesięczne spotkanie zarządu - przegląd wyników',
    date: '2024-11-25',
    type: 'custom',
    color: '#8b5cf6',
    reminders: [3, 1],
    createdBy: '1',
  },
];

// Mock Vesting Schedules
export const mockVestingSchedules: VestingSchedule[] = [
  {
    id: '1',
    shareholderId: '2',
    shareholderName: 'Jan Kowalski',
    totalShares: 3000,
    vestedShares: 1500,
    unvestedShares: 1500,
    type: 'time_based',
    status: 'partially_unlocked',
    startDate: '2023-02-01',
    endDate: '2027-02-01',
    cliffDate: '2024-02-01',
    vestingPeriodMonths: 48,
    lockupEndDate: '2025-02-01',
  },
  {
    id: '2',
    shareholderId: '4',
    shareholderName: 'Piotr Wiśniewski',
    totalShares: 1001,
    vestedShares: 250,
    unvestedShares: 751,
    type: 'milestone_based',
    status: 'partially_unlocked',
    startDate: '2023-06-01',
    endDate: '2026-06-01',
    vestingPeriodMonths: 36,
    milestones: [
      {
        id: 'm1',
        description: 'Osiągnięcie przychodu 1M PLN',
        achieved: true,
        achievedDate: '2023-12-15',
        sharesUnlocked: 250,
      },
      {
        id: 'm2',
        description: 'Wprowadzenie nowego produktu',
        achieved: false,
        sharesUnlocked: 250,
      },
      {
        id: 'm3',
        description: 'Ekspansja na rynek europejski',
        achieved: false,
        sharesUnlocked: 251,
      },
      {
        id: 'm4',
        description: 'Osiągnięcie rentowności',
        achieved: false,
        sharesUnlocked: 250,
      },
    ],
  },
];

// Mock VDR Documents
export const mockVDRDocuments: VDRDocument[] = [
  {
    id: '1',
    name: 'Sprawozdanie finansowe 2023.pdf',
    category: 'financial',
    accessLevel: 'restricted',
    uploadedBy: 'Jan Kowalski',
    uploadedAt: '2024-01-15T10:30:00',
    size: 2456789,
    fileType: 'pdf',
    watermarked: true,
    accessLog: [
      { userId: '1', userName: 'Jan Kowalski', viewedAt: '2024-01-15T11:00:00' },
      { userId: '2', userName: 'Anna Nowak', viewedAt: '2024-01-16T09:15:00', downloadedAt: '2024-01-16T09:20:00' },
    ],
    allowedUsers: ['1', '2', '3'],
  },
  {
    id: '2',
    name: 'Umowa akcjonariuszy.pdf',
    category: 'legal',
    accessLevel: 'confidential',
    uploadedBy: 'Anna Nowak',
    uploadedAt: '2024-02-01T14:20:00',
    size: 1234567,
    fileType: 'pdf',
    watermarked: true,
    accessLog: [
      { userId: '1', userName: 'Jan Kowalski', viewedAt: '2024-02-01T15:00:00' },
    ],
    allowedUsers: ['1', '2'],
  },
  {
    id: '3',
    name: 'Biznesplan 2024-2026.xlsx',
    category: 'due_diligence',
    accessLevel: 'restricted',
    uploadedBy: 'Jan Kowalski',
    uploadedAt: '2024-03-10T09:00:00',
    size: 987654,
    fileType: 'xlsx',
    watermarked: false,
    accessLog: [],
    allowedUsers: ['1', '2', '3'],
  },
  {
    id: '4',
    name: 'Dokumentacja techniczna produktu.pdf',
    category: 'technical',
    accessLevel: 'public',
    uploadedBy: 'Piotr Wiśniewski',
    uploadedAt: '2024-04-05T16:45:00',
    size: 5678901,
    fileType: 'pdf',
    watermarked: true,
    accessLog: [
      { userId: '3', userName: 'Piotr Wiśniewski', viewedAt: '2024-04-06T10:00:00' },
      { userId: '1', userName: 'Jan Kowalski', viewedAt: '2024-04-07T11:30:00' },
    ],
    allowedUsers: ['1', '2', '3', '4'],
  },
  {
    id: '5',
    name: 'Due Diligence Report Q1 2024.pdf',
    category: 'due_diligence',
    accessLevel: 'confidential',
    uploadedBy: 'Anna Nowak',
    uploadedAt: '2024-04-30T12:00:00',
    size: 3456789,
    fileType: 'pdf',
    watermarked: true,
    accessLog: [
      { userId: '1', userName: 'Jan Kowalski', viewedAt: '2024-05-01T09:00:00', downloadedAt: '2024-05-01T09:05:00' },
    ],
    allowedUsers: ['1', '2'],
  },
  {
    id: '6',
    name: 'Analiza rynku - raport.docx',
    category: 'due_diligence',
    accessLevel: 'public',
    uploadedBy: 'Jan Kowalski',
    uploadedAt: '2024-05-15T14:30:00',
    size: 1567890,
    fileType: 'docx',
    watermarked: false,
    accessLog: [],
    allowedUsers: ['1', '2', '3', '4'],
  },
  {
    id: '7',
    name: 'Kontrakt z dostawcą.pdf',
    category: 'legal',
    accessLevel: 'restricted',
    uploadedBy: 'Anna Nowak',
    uploadedAt: '2024-06-01T10:15:00',
    size: 890123,
    fileType: 'pdf',
    watermarked: true,
    accessLog: [
      { userId: '2', userName: 'Anna Nowak', viewedAt: '2024-06-01T10:20:00' },
    ],
    allowedUsers: ['1', '2'],
  },
  {
    id: '8',
    name: 'Specyfikacja techniczna v2.pdf',
    category: 'technical',
    accessLevel: 'restricted',
    uploadedBy: 'Piotr Wiśniewski',
    uploadedAt: '2024-07-20T11:00:00',
    size: 4567890,
    fileType: 'pdf',
    watermarked: true,
    accessLog: [
      { userId: '3', userName: 'Piotr Wiśniewski', viewedAt: '2024-07-20T11:05:00' },
      { userId: '1', userName: 'Jan Kowalski', viewedAt: '2024-07-21T09:00:00' },
    ],
    allowedUsers: ['1', '3'],
  },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2023-01-15',
    type: 'grant',
    toShareholder: 'Artur Fijołek',
    shares: 13999,
    pricePerShare: 1000,
    totalValue: 13999000,
    status: 'completed',
    notes: 'Wkład w postaci know-how',
  },
  {
    id: '2',
    date: '2023-02-01',
    type: 'buy',
    toShareholder: 'Jan Kowalski',
    shares: 3000,
    pricePerShare: 1000,
    totalValue: 3000000,
    status: 'completed',
    notes: 'Wpłata gotówkowa',
  },
  {
    id: '3',
    date: '2023-03-15',
    type: 'buy',
    toShareholder: 'Anna Nowak',
    shares: 2000,
    pricePerShare: 1000,
    totalValue: 2000000,
    status: 'completed',
  },
  {
    id: '4',
    date: '2023-06-01',
    type: 'grant',
    toShareholder: 'Piotr Wiśniewski',
    shares: 1001,
    pricePerShare: 1000,
    totalValue: 1001000,
    status: 'completed',
    notes: 'Wkład niepieniężny',
  },
];

// Mock Document Templates
export const mockDocumentTemplates: DocumentTemplate[] = [
  {
    id: '1',
    name: 'Umowa sprzedaży akcji',
    category: 'Legal',
    description: 'Szablon umowy sprzedaży akcji między akcjonariuszami',
    fileUrl: '/templates/umowa-sprzedazy.docx',
    variables: ['seller_name', 'buyer_name', 'shares_count', 'price', 'date'],
    createdAt: '2023-01-10',
    updatedAt: '2024-03-15',
  },
  {
    id: '2',
    name: 'Uchwała WZA',
    category: 'Corporate',
    description: 'Szablon uchwały Walnego Zgromadzenia Akcjonariuszy',
    fileUrl: '/templates/uchwala-wza.docx',
    variables: ['date', 'resolution_number', 'topic', 'voting_results'],
    createdAt: '2023-01-10',
    updatedAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Protokół z WZA',
    category: 'Corporate',
    description: 'Protokół z Walnego Zgromadzenia Akcjonariuszy',
    fileUrl: '/templates/protokol-wza.docx',
    variables: ['date', 'attendees', 'agenda', 'resolutions'],
    createdAt: '2023-01-10',
    updatedAt: '2024-01-15',
  },
  {
    id: '4',
    name: 'Dywidenda - zawiadomienie',
    category: 'Financial',
    description: 'Zawiadomienie o wypłacie dywidendy',
    fileUrl: '/templates/dywidenda-zawiadomienie.docx',
    variables: ['shareholder_name', 'dividend_amount', 'payment_date'],
    createdAt: '2023-02-01',
    updatedAt: '2024-05-10',
  },
  {
    id: '5',
    name: 'Cesja akcji',
    category: 'Legal',
    description: 'Umowa cesji akcji',
    fileUrl: '/templates/cesja-akcji.docx',
    variables: ['transferor', 'transferee', 'shares', 'consideration'],
    createdAt: '2023-02-15',
    updatedAt: '2024-04-01',
  },
];

// Mock Analytics Data
export const mockAnalytics: Analytics = {
  metrics: {
    roe: 15.2,
    roa: 12.8,
    peRatio: 18.5,
  },
  valueGrowth: [
    { date: '2023-01', value: 20000000 },
    { date: '2023-04', value: 21500000 },
    { date: '2023-07', value: 22800000 },
    { date: '2023-10', value: 24200000 },
    { date: '2024-01', value: 25500000 },
    { date: '2024-04', value: 27100000 },
    { date: '2024-07', value: 28900000 },
    { date: '2024-10', value: 30500000 },
  ],
  capitalBreakdown: [
    { type: 'Gotówka', value: 6000000, percentage: 30 },
    { type: 'Know-how', value: 13999000, percentage: 69.995 },
    { type: 'Inne', value: 1000, percentage: 0.005 },
  ],
  shareholderActivity: [
    { shareholderName: 'Artur Fijołek', transactions: 1, documentsUploaded: 2, lastActivity: '2024-10-15' },
    { shareholderName: 'Jan Kowalski', transactions: 1, documentsUploaded: 5, lastActivity: '2024-11-01' },
    { shareholderName: 'Anna Nowak', transactions: 1, documentsUploaded: 8, lastActivity: '2024-11-10' },
    { shareholderName: 'Piotr Wiśniewski', transactions: 1, documentsUploaded: 3, lastActivity: '2024-10-28' },
  ],
  dividendForecast: [
    { quarter: 'Q4 2024', estimatedAmount: 500000, confidence: 95 },
    { quarter: 'Q1 2025', estimatedAmount: 450000, confidence: 80 },
    { quarter: 'Q2 2025', estimatedAmount: 520000, confidence: 70 },
    { quarter: 'Q3 2025', estimatedAmount: 550000, confidence: 60 },
  ],
  totalValue: 20000000,
  totalShares: 20000,
  averageSharePrice: 1000,
};

// Helper function to calculate total dividends in last 12 months
export const getTotalDividends12M = (): number => {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  return mockDividends
    .filter(d => new Date(d.date) >= oneYearAgo && d.status === 'completed')
    .reduce((sum, d) => sum + d.amount, 0);
};

// Helper function to get upcoming events
export const getUpcomingEvents = (days: number = 30): CalendarEvent[] => {
  const now = new Date();
  const future = new Date();
  future.setDate(future.getDate() + days);

  return mockCalendarEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= now && eventDate <= future;
  });
};
