// ============================================
// EU GRANTS HUB - API UTILITIES
// ============================================

import { grants, partners, categories } from '../data/grantsData';
import {
  Grant,
  Partner,
  GrantFilters,
  DashboardKPI,
  BarChartData,
  PieChartData,
  BubbleChartDataPoint,
  TimelineDataPoint,
  HeatmapData
} from '../types/grantsHub';

// ============================================
// GRANTS API
// ============================================

export const getGrants = (filters?: GrantFilters): Grant[] => {
  let filtered = [...grants];

  if (!filters) return filtered;

  // Filtrowanie po kategoriach
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(grant =>
      filters.categories!.includes(grant.category.id)
    );
  }

  // Filtrowanie po statusach
  if (filters.statuses && filters.statuses.length > 0) {
    filtered = filtered.filter(grant =>
      filters.statuses!.includes(grant.status)
    );
  }

  // Filtrowanie po kwocie
  if (filters.amount_range) {
    const [min, max] = filters.amount_range;
    filtered = filtered.filter(grant =>
      grant.amount_max >= min && grant.amount_min <= max
    );
  }

  // Filtrowanie po deadline
  if (filters.deadline_range) {
    const [start, end] = filters.deadline_range;
    filtered = filtered.filter(grant =>
      grant.deadline >= start && grant.deadline <= end
    );
  }

  // Filtrowanie po beneficjentach
  if (filters.target_beneficiary && filters.target_beneficiary.length > 0) {
    filtered = filtered.filter(grant =>
      grant.target_beneficiary.some(b =>
        filters.target_beneficiary!.includes(b)
      )
    );
  }

  // Filtrowanie po kraju/regionie
  if (filters.country_region && filters.country_region.length > 0) {
    filtered = filtered.filter(grant =>
      grant.country_region.some(c =>
        filters.country_region!.includes(c)
      )
    );
  }

  // Filtrowanie po typie programu
  if (filters.program_types && filters.program_types.length > 0) {
    filtered = filtered.filter(grant =>
      filters.program_types!.includes(grant.program_type)
    );
  }

  // Filtrowanie po success rate
  if (filters.success_rate_range) {
    const [min, max] = filters.success_rate_range;
    filtered = filtered.filter(grant =>
      grant.success_rate >= min && grant.success_rate <= max
    );
  }

  // Wyszukiwanie tekstowe
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(grant =>
      grant.name.toLowerCase().includes(searchLower) ||
      grant.description.toLowerCase().includes(searchLower) ||
      grant.id.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
};

export const getGrantById = (id: string): Grant | undefined => {
  return grants.find(grant => grant.id === id);
};

// ============================================
// PARTNERS API
// ============================================

export const getPartners = (filters?: {
  country?: string;
  type?: string;
  specialization?: string;
}): Partner[] => {
  let filtered = [...partners];

  if (!filters) return filtered;

  if (filters.country) {
    filtered = filtered.filter(p => p.country === filters.country);
  }

  if (filters.type) {
    filtered = filtered.filter(p => p.type === filters.type);
  }

  if (filters.specialization) {
    filtered = filtered.filter(p =>
      p.specializations.some(s =>
        s.toLowerCase().includes(filters.specialization!.toLowerCase())
      )
    );
  }

  return filtered;
};

export const getPartnerById = (id: string): Partner | undefined => {
  return partners.find(partner => partner.id === id);
};

// ============================================
// CATEGORIES API
// ============================================

export const getCategories = () => {
  return categories;
};

// ============================================
// DASHBOARD KPIs
// ============================================

export const getDashboardKPIs = (): DashboardKPI => {
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);

  const activeGrants = grants.filter(g => g.status === 'Aktywny').length;

  const deadlines30d = grants.filter(g => {
    const deadline = new Date(g.deadline);
    return deadline >= today && deadline <= thirtyDaysFromNow;
  }).length;

  const avgSuccessRate = grants.reduce((sum, g) => sum + g.success_rate, 0) / grants.length;

  return {
    total_grants: grants.length,
    active_grants: activeGrants,
    deadlines_30d: deadlines30d,
    avg_success_rate: Math.round(avgSuccessRate)
  };
};

// ============================================
// CHARTS DATA
// ============================================

export const getBarChartData = (): BarChartData => {
  const categoryCounts: Record<string, number> = {};

  categories.forEach(cat => {
    categoryCounts[cat.name] = grants.filter(g => g.category.id === cat.id).length;
  });

  return {
    categories: Object.keys(categoryCounts),
    counts: Object.values(categoryCounts)
  };
};

export const getPieChartData = (): PieChartData => {
  const statusCounts: Record<string, number> = {
    'Aktywny': 0,
    'Wkrótce': 0,
    'Zamknięty': 0,
    'Zawieszony': 0
  };

  grants.forEach(grant => {
    statusCounts[grant.status]++;
  });

  const total = grants.length;

  return {
    statuses: Object.keys(statusCounts) as any[],
    percentages: Object.values(statusCounts).map(count =>
      Math.round((count / total) * 100)
    )
  };
};

export const getBubbleChartData = (): BubbleChartDataPoint[] => {
  return grants.map(grant => ({
    amount: grant.amount_max,
    progress: grant.progress,
    success_rate: grant.success_rate,
    name: grant.name,
    category: grant.category.name
  }));
};

export const getTimelineData = (): TimelineDataPoint[] => {
  return grants
    .map(grant => ({
      date: grant.deadline,
      grant_name: grant.name,
      amount: grant.amount_max
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getHeatmapData = (): HeatmapData[] => {
  const heatmapData: HeatmapData[] = [];

  categories.forEach(category => {
    const categoryGrants = grants.filter(g => g.category.id === category.id);

    if (categoryGrants.length > 0) {
      const avgSuccessRate = categoryGrants.reduce((sum, g) => sum + g.success_rate, 0) / categoryGrants.length;

      heatmapData.push({
        category: category.name,
        success_rate: Math.round(avgSuccessRate),
        count: categoryGrants.length
      });
    }
  });

  return heatmapData;
};

// ============================================
// STATUSES & FILTER OPTIONS
// ============================================

export const getAvailableStatuses = () => {
  return ['Aktywny', 'Wkrótce', 'Zamknięty', 'Zawieszony'];
};

export const getAvailableProgramTypes = () => {
  const types = new Set(grants.map(g => g.program_type));
  return Array.from(types);
};

export const getAvailableBeneficiaries = () => {
  const beneficiaries = new Set<string>();
  grants.forEach(g => {
    g.target_beneficiary.forEach(b => beneficiaries.add(b));
  });
  return Array.from(beneficiaries);
};

export const getAvailableRegions = () => {
  const regions = new Set<string>();
  grants.forEach(g => {
    g.country_region.forEach(r => regions.add(r));
  });
  return Array.from(regions);
};

// ============================================
// LOCAL STORAGE PERSISTENCE
// ============================================

const STORAGE_KEY = 'grants_hub_filters';

export const saveFiltersToStorage = (filters: GrantFilters): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  } catch (error) {
    console.error('Failed to save filters to localStorage:', error);
  }
};

export const loadFiltersFromStorage = (): GrantFilters | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load filters from localStorage:', error);
    return null;
  }
};
