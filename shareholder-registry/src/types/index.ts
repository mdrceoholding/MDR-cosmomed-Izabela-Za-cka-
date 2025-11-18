export interface Shareholder {
  id: number;
  name: string;
  shares: number;
  percentage: number;
  email: string;
  phone: string;
  joinDate: string;
}

export interface SidebarItem {
  name: string;
  icon: string;
  highlight?: boolean;
}

export interface DocumentTemplate {
  id: number;
  icon: string;
  emoji: string;
  name: string;
  desc: string;
  category: string;
}

export interface FormField {
  key: string;
  label: string;
  type: string;
  required?: boolean;
  readonly?: boolean;
  placeholder?: string;
}

export interface TemplateData {
  fields: FormField[];
  autofill: Record<string, any>;
  preview: (data: Record<string, any>) => string;
}

export interface CompanyData {
  NAZWA_SPOLKI: string;
  NIP: string;
  KRS: string;
  Akcjonariusze: number;
  Akcje: number;
  Kapital: number;
}

export interface Transaction {
  id: number;
  date: string;
  type: string;
  from: string;
  to: string;
  shares: number;
  price: number;
  total: number;
}

export interface Emission {
  id: number;
  series: string;
  date: string;
  shares: number;
  priceNominal: number;
  priceEmission: number;
  totalValue: number;
  status: string;
}
