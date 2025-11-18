// Enums
export enum TemplateCategory {
  RESOLUTIONS = 'Uchwały',
  PROTOCOLS = 'Protokoły',
  CONTRACTS = 'Umowy',
  REPORTS = 'Raporty'
}

export enum TemplateFieldType {
  TEXT = 'text',
  DATE = 'date',
  NUMBER = 'number',
  SELECT = 'select',
  TEXTAREA = 'textarea',
  IMAGE = 'image',
  SHAREHOLDER_SELECT = 'shareholder_select'
}

// Company data
export interface CompanyData {
  name: string;
  krs: string;
  nip: string;
  address: string;
  logoUrl?: string;
}

// Shareholder
export interface Shareholder {
  id: string;
  name: string;
  shares: number;
  percentage: number;
  type: 'physical' | 'legal';
  address?: string;
  pesel?: string;
  nip?: string;
}

// Template variable
export interface TemplateVariable {
  key: string;
  label: string;
  type: TemplateFieldType;
  required: boolean;
  defaultValue?: string | number;
  options?: string[]; // For select fields
  placeholder?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// Document template
export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  icon: string;
  htmlTemplate: string;
  variables: TemplateVariable[];
  previewImage?: string;
}

// Filled document
export interface FilledDocument {
  id: string;
  templateId: string;
  templateName: string;
  createdAt: Date;
  updatedAt: Date;
  data: Record<string, any>;
  htmlContent: string;
  status: 'draft' | 'final';
}

// Form field value
export interface FormFieldValue {
  [key: string]: string | number | File | null;
}

// Navigation item
export interface NavItem {
  id: string;
  name: string;
  icon: string;
  path: string;
}
