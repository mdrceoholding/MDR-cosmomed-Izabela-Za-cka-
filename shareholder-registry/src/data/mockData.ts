import { Shareholder, CompanyData, Transaction, Emission } from '../types';

export const companyMock: CompanyData = {
  NAZWA_SPOLKI: "TechStart PSA",
  NIP: "1234567890",
  KRS: "0000123456",
  Akcjonariusze: 4,
  Akcje: 10000,
  Kapital: 10000
};

export const shareholdersMock: Shareholder[] = [
  {
    id: 1,
    name: "Jan Kowalski",
    shares: 4000,
    percentage: 40,
    email: "jan.kowalski@example.com",
    phone: "+48 123 456 789",
    joinDate: "2023-01-15"
  },
  {
    id: 2,
    name: "Anna Nowak",
    shares: 3000,
    percentage: 30,
    email: "anna.nowak@example.com",
    phone: "+48 234 567 890",
    joinDate: "2023-02-20"
  },
  {
    id: 3,
    name: "Piotr Wiśniewski",
    shares: 2000,
    percentage: 20,
    email: "piotr.wisniewski@example.com",
    phone: "+48 345 678 901",
    joinDate: "2023-03-10"
  },
  {
    id: 4,
    name: "Maria Dąbrowska",
    shares: 1000,
    percentage: 10,
    email: "maria.dabrowska@example.com",
    phone: "+48 456 789 012",
    joinDate: "2023-04-05"
  }
];

export const transactionsMock: Transaction[] = [
  {
    id: 1,
    date: "2025-01-15",
    type: "Nabycie",
    from: "Spółka",
    to: "Jan Kowalski",
    shares: 2000,
    price: 1.0,
    total: 2000
  },
  {
    id: 2,
    date: "2025-02-01",
    type: "Przeniesienie",
    from: "Jan Kowalski",
    to: "Anna Nowak",
    shares: 500,
    price: 1.2,
    total: 600
  },
  {
    id: 3,
    date: "2025-03-12",
    type: "Nabycie",
    from: "Spółka",
    to: "Piotr Wiśniewski",
    shares: 1500,
    price: 1.1,
    total: 1650
  }
];

export const emissionsMock: Emission[] = [
  {
    id: 1,
    series: "A",
    date: "2023-01-10",
    shares: 5000,
    priceNominal: 1.0,
    priceEmission: 1.0,
    totalValue: 5000,
    status: "Zakończona"
  },
  {
    id: 2,
    series: "B",
    date: "2023-06-15",
    shares: 3000,
    priceNominal: 1.0,
    priceEmission: 1.2,
    totalValue: 3600,
    status: "Zakończona"
  },
  {
    id: 3,
    series: "C",
    date: "2024-01-20",
    shares: 2000,
    priceNominal: 1.0,
    priceEmission: 1.5,
    totalValue: 3000,
    status: "W trakcie"
  }
];
