// EU Grants Hub - TypeScript Type Definitions

export type UserRole = 'Admin' | 'Manager' | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  organization?: string;
  roles: UserRole[];
  created_at: Date;
  updated_at: Date;
}

export type CategoryName = 'Badania' | 'Innowacje' | 'Edukacja' | 'Infrastruktura';

export interface Category {
  id: string;
  name: CategoryName;
  icon: string;
  description?: string;
}

export type StatusName = 'Aktywny' | 'Zamknięty' | 'Planowany' | 'Wznowiony';

export interface Status {
  id: string;
  name: StatusName;
}

export type Currency = 'EUR' | 'PLN';

export interface Grant {
  id: string;
  name: string;
  status_id: string;
  category_id: string;
  amount_min: number;
  amount_max: number;
  currency: Currency;
  deadline: Date;
  progress: number; // 0-100
  success_rate: number; // 0-100
  description?: string;
  requirements: string[];
  apply_link?: string;
  created_at: Date;
  updated_at: Date;
}

export interface GrantWithDetails extends Grant {
  status: Status;
  category: Category;
  related_partners?: Partner[];
}

export type PartnerType = 'Przedsiębiorstwo' | 'Instytut badawczy' | 'Uniwersytet' | 'Konsorcjum';

export interface Partner {
  id: string;
  name: string;
  country: string; // ISO code
  type: PartnerType;
  specializations: string[];
  contact_info: {
    email?: string;
    phone?: string;
    website?: string;
  };
  profile_link?: string;
  created_at: Date;
  updated_at: Date;
}

export interface PartnerWithApplications extends Partner {
  applications?: Application[];
}

export type ApplicationStatus = 'Szkic' | 'Złożona' | 'W ocenie' | 'Zatwierdzona' | 'Odrzucona';

export interface Application {
  id: string;
  user_id: string;
  grant_id: string;
  partner_id?: string;
  status: ApplicationStatus;
  submitted_at?: Date;
  progress: number; // 0-100
  created_at: Date;
  updated_at: Date;
}

export interface ApplicationWithDetails extends Application {
  grant?: Grant;
  partner?: Partner;
  documents?: Document[];
}

export type DocumentType = 'CV' | 'Budget' | 'Timeline' | 'Impact';

export interface Document {
  id: string;
  application_id: string;
  type: DocumentType;
  file_url: string;
  file_size: number; // in bytes
  created_at: Date;
}

export type NotificationType = 'Deadline' | 'StatusChange' | 'NewGrant' | 'ApplicationUpdate';

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  grant_id?: string;
  is_read: boolean;
  created_at: Date;
}

// Dashboard KPIs
export interface CategoryBreakdown {
  name: string;
  count: number;
  success_rate: number;
}

export interface CountryBreakdown {
  country: string;
  count: number;
}

export interface TimelineDeadline {
  date: string;
  grants_count: number;
  total_amount: number;
}

export interface DashboardKPIs {
  total_grants: number;
  active_grants: number;
  total_funding_eur: number;
  applications_submitted: number;
  success_rate_avg: number;
  categories_breakdown: Record<string, number>;
  countries_breakdown: Record<string, number>;
  deadlines_this_month: number;
  top_categories: CategoryBreakdown[];
  timeline_deadlines: TimelineDeadline[];
}

// API Request/Response types
export interface GrantFilters {
  status?: string;
  category?: string;
  country?: string;
  deadline_from?: string;
  deadline_to?: string;
  search?: string;
}

export interface PartnerFilters {
  country?: string;
  type?: PartnerType;
  search?: string;
}

export interface ApplicationFilters {
  user_id?: string;
  status?: ApplicationStatus;
}

export interface NotificationFilters {
  user_id: string;
  limit?: number;
  unread_only?: boolean;
}

export interface CreateGrantRequest {
  name: string;
  category_id: string;
  status_id: string;
  amount_min: number;
  amount_max: number;
  currency?: Currency;
  deadline: string;
  description?: string;
  requirements?: string[];
  apply_link?: string;
}

export interface CreatePartnerRequest {
  name: string;
  country: string;
  type: PartnerType;
  specializations?: string[];
  contact_info?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  profile_link?: string;
}

export interface CreateApplicationRequest {
  user_id: string;
  grant_id: string;
  partner_id?: string;
}

export interface UpdateApplicationRequest {
  status?: ApplicationStatus;
  progress?: number;
  partner_id?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

// Database pool types
export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  max?: number;
  idleTimeoutMillis?: number;
  connectionTimeoutMillis?: number;
}

// JWT payload
export interface JWTPayload {
  userId: string;
  email: string;
  roles: UserRole[];
  iat?: number;
  exp?: number;
}

// Request with authenticated user
export interface AuthenticatedRequest {
  user: JWTPayload;
}
