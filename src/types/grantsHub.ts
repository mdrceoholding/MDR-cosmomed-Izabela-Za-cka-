// ============================================
// EU GRANTS HUB - TYPY TYPESCRIPT
// ============================================

export type GrantStatus = 'Aktywny' | 'Wkrótce' | 'Zamknięty' | 'Zawieszony';

export type PartnerType = 'Przedsiębiorstwo' | 'Uczelnia' | 'Instytut' | 'NGO';

export type ApplicationStatus = 'Draft' | 'Submitted' | 'In Review' | 'Approved' | 'Rejected';

export type UserRole = 'Admin' | 'Manager' | 'Viewer';

// ============================================
// ENCJA: CATEGORY
// ============================================
export interface Category {
  id: string;
  name: string;
  icon: string; // FontAwesome icon name
  color: string; // hex color
}

// ============================================
// ENCJA: GRANT (Dotacja)
// ============================================
export interface Grant {
  id: string; // "EU/MedTech/HEALTH/2025/01"
  name: string;
  status: GrantStatus;
  category: Category;
  amount_min: number; // EUR
  amount_max: number; // EUR
  currency: string; // "EUR"
  deadline: string; // ISO date string
  progress: number; // 0-100%
  success_rate: number; // 0-100%
  description: string;
  requirements: string[];
  apply_link: string; // URL
  program_type: string; // "Horyzont Europa", "LIFE+", etc.
  target_beneficiary: string[];
  country_region: string[];
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

// ============================================
// ENCJA: PARTNER (Partner konsorcjum)
// ============================================
export interface Partner {
  id: string;
  name: string;
  country: string; // ISO 3166
  type: PartnerType;
  specializations: string[];
  contact_info: {
    email: string;
    phone: string;
    website: string;
  };
  profile_link: string; // URL
  success_projects: number;
  rating: number; // 1-5
  verified: boolean;
  created_at: string; // ISO timestamp
}

// ============================================
// ENCJA: DOCUMENT
// ============================================
export interface Document {
  id: string;
  application_id: string;
  filename: string;
  file_url: string;
  type: string;
  uploaded_at: string; // ISO timestamp
}

// ============================================
// ENCJA: APPLICATION (Aplikacja/projekt)
// ============================================
export interface Application {
  id: string;
  user_id: string;
  grant_id: string;
  partner_ids: string[];
  status: ApplicationStatus;
  submitted_at: string | null; // ISO timestamp
  progress: number; // 0-100%
  documents: Document[];
  notes: string;
}

// ============================================
// ENCJA: USER (Użytkownik)
// ============================================
export interface User {
  id: string;
  name: string;
  email: string; // unique
  organization: string;
  roles: UserRole[];
  preferences: Record<string, unknown>;
}

// ============================================
// DASHBOARD KPI
// ============================================
export interface DashboardKPI {
  total_grants: number;
  active_grants: number;
  deadlines_30d: number;
  avg_success_rate: number;
}

// ============================================
// CHART DATA TYPES
// ============================================
export interface BarChartData {
  categories: string[];
  counts: number[];
}

export interface PieChartData {
  statuses: GrantStatus[];
  percentages: number[];
}

export interface BubbleChartDataPoint {
  amount: number;
  progress: number;
  success_rate: number;
  name: string;
  category: string;
}

export interface TimelineDataPoint {
  date: string;
  grant_name: string;
  amount: number;
}

export interface HeatmapData {
  category: string;
  success_rate: number;
  count: number;
}

// ============================================
// FILTER OPTIONS
// ============================================
export interface GrantFilters {
  categories?: string[];
  statuses?: GrantStatus[];
  amount_range?: [number, number];
  deadline_range?: [string, string];
  target_beneficiary?: string[];
  country_region?: string[];
  program_types?: string[];
  success_rate_range?: [number, number];
  search?: string;
}

// ============================================
// COMPONENT PROPS
// ============================================
export interface KPICardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: string;
}

export interface GrantCardProps {
  grant: Grant;
  onClick: (grant: Grant) => void;
}

export interface GrantTableProps {
  grants: Grant[];
  onSort?: (field: keyof Grant) => void;
  onFilter?: (filters: GrantFilters) => void;
  onRowClick?: (grant: Grant) => void;
}

export interface GrantDetailsModalProps {
  grant: Grant | null;
  open: boolean;
  onClose: () => void;
}

export interface FilterPanelProps {
  filters: GrantFilters;
  onChange: (filters: GrantFilters) => void;
  categories: Category[];
}

export interface PartnerListProps {
  partners: Partner[];
  onSelect: (partner: Partner) => void;
}

export interface PartnerCardProps {
  partner: Partner;
  onContact: (partner: Partner) => void;
  onViewProfile: (partner: Partner) => void;
}
