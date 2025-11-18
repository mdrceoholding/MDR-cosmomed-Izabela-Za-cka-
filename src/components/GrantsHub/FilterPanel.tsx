import React, { useState } from 'react';
import { FilterPanelProps, GrantFilters } from '../../types/grantsHub';
import {
  getAvailableStatuses,
  getAvailableProgramTypes,
  getAvailableBeneficiaries,
  getAvailableRegions
} from '../../utils/grantsApi';

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onChange, categories }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const statuses = getAvailableStatuses();
  const programTypes = getAvailableProgramTypes();
  const beneficiaries = getAvailableBeneficiaries();
  const regions = getAvailableRegions();

  const handleCategoryToggle = (categoryId: string) => {
    const current = filters.categories || [];
    const updated = current.includes(categoryId)
      ? current.filter(id => id !== categoryId)
      : [...current, categoryId];
    onChange({ ...filters, categories: updated });
  };

  const handleStatusToggle = (status: string) => {
    const current = filters.statuses || [];
    const updated = current.includes(status as any)
      ? current.filter(s => s !== status)
      : [...current, status as any];
    onChange({ ...filters, statuses: updated });
  };

  const handleProgramTypeToggle = (programType: string) => {
    const current = filters.program_types || [];
    const updated = current.includes(programType)
      ? current.filter(p => p !== programType)
      : [...current, programType];
    onChange({ ...filters, program_types: updated });
  };

  const handleBeneficiaryToggle = (beneficiary: string) => {
    const current = filters.target_beneficiary || [];
    const updated = current.includes(beneficiary)
      ? current.filter(b => b !== beneficiary)
      : [...current, beneficiary];
    onChange({ ...filters, target_beneficiary: updated });
  };

  const handleAmountChange = (min: number, max: number) => {
    onChange({ ...filters, amount_range: [min, max] });
  };

  const handleSuccessRateChange = (min: number, max: number) => {
    onChange({ ...filters, success_rate_range: [min, max] });
  };

  const handleReset = () => {
    onChange({});
  };

  const activeFiltersCount = [
    filters.categories?.length || 0,
    filters.statuses?.length || 0,
    filters.program_types?.length || 0,
    filters.target_beneficiary?.length || 0,
    filters.amount_range ? 1 : 0,
    filters.success_rate_range ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-lg h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-slate-800 z-10">
        <div className="flex items-center gap-2">
          <i className="fa fa-filter text-blue-400"></i>
          <h3 className="text-slate-100 font-semibold">Filtry</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-blue-400 text-xs"
          >
            Reset
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-slate-300"
          >
            <i className={`fa fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Kategorie */}
          <div>
            <h4 className="text-slate-300 text-sm font-semibold mb-3">Kategoria</h4>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category.id} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.categories?.includes(category.id) || false}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                  />
                  <span
                    className="w-6 h-6 rounded flex items-center justify-center text-xs"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    <i className={`fa fa-${category.icon}`}></i>
                  </span>
                  <span className="text-slate-300 text-sm group-hover:text-blue-400">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="border-t border-slate-700 pt-6">
            <h4 className="text-slate-300 text-sm font-semibold mb-3">Status naboru</h4>
            <div className="space-y-2">
              {statuses.map(status => (
                <label key={status} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.statuses?.includes(status as any) || false}
                    onChange={() => handleStatusToggle(status)}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-slate-300 text-sm group-hover:text-blue-400">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Kwota */}
          <div className="border-t border-slate-700 pt-6">
            <h4 className="text-slate-300 text-sm font-semibold mb-3">Kwota (EUR)</h4>
            <div className="space-y-3">
              <div>
                <label className="text-slate-400 text-xs">Min: {((filters.amount_range?.[0] || 0) / 1000000).toFixed(1)}M</label>
                <input
                  type="range"
                  min="0"
                  max="15000000"
                  step="100000"
                  value={filters.amount_range?.[0] || 0}
                  onChange={(e) => handleAmountChange(Number(e.target.value), filters.amount_range?.[1] || 15000000)}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs">Max: {((filters.amount_range?.[1] || 15000000) / 1000000).toFixed(1)}M</label>
                <input
                  type="range"
                  min="0"
                  max="15000000"
                  step="100000"
                  value={filters.amount_range?.[1] || 15000000}
                  onChange={(e) => handleAmountChange(filters.amount_range?.[0] || 0, Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
              </div>
            </div>
          </div>

          {/* Success Rate */}
          <div className="border-t border-slate-700 pt-6">
            <h4 className="text-slate-300 text-sm font-semibold mb-3">Wskaźnik sukcesu (%)</h4>
            <div className="space-y-3">
              <div>
                <label className="text-slate-400 text-xs">Min: {filters.success_rate_range?.[0] || 0}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={filters.success_rate_range?.[0] || 0}
                  onChange={(e) => handleSuccessRateChange(Number(e.target.value), filters.success_rate_range?.[1] || 100)}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs">Max: {filters.success_rate_range?.[1] || 100}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={filters.success_rate_range?.[1] || 100}
                  onChange={(e) => handleSuccessRateChange(filters.success_rate_range?.[0] || 0, Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
              </div>
            </div>
          </div>

          {/* Typ programu */}
          <div className="border-t border-slate-700 pt-6">
            <h4 className="text-slate-300 text-sm font-semibold mb-3">Typ programu</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {programTypes.map(programType => (
                <label key={programType} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.program_types?.includes(programType) || false}
                    onChange={() => handleProgramTypeToggle(programType)}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-slate-300 text-sm group-hover:text-blue-400">{programType}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Typ beneficjenta */}
          <div className="border-t border-slate-700 pt-6">
            <h4 className="text-slate-300 text-sm font-semibold mb-3">Typ beneficjenta</h4>
            <div className="space-y-2">
              {beneficiaries.map(beneficiary => (
                <label key={beneficiary} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.target_beneficiary?.includes(beneficiary) || false}
                    onChange={() => handleBeneficiaryToggle(beneficiary)}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-slate-300 text-sm group-hover:text-blue-400">{beneficiary}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
