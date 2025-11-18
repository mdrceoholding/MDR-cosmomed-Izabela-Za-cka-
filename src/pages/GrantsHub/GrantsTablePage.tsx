import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GrantTable from '../../components/GrantsHub/GrantTable';
import FilterPanel from '../../components/GrantsHub/FilterPanel';
import GrantDetailsModal from '../../components/GrantsHub/GrantDetailsModal';
import {
  getGrants,
  getCategories,
  saveFiltersToStorage,
  loadFiltersFromStorage
} from '../../utils/grantsApi';
import { Grant, GrantFilters } from '../../types/grantsHub';

const GrantsTablePage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<GrantFilters>({});
  const [selectedGrant, setSelectedGrant] = useState<Grant | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const categories = getCategories();
  const filteredGrants = getGrants(filters);

  useEffect(() => {
    const savedFilters = loadFiltersFromStorage();
    if (savedFilters) {
      setFilters(savedFilters);
    }
  }, []);

  const handleFiltersChange = (newFilters: GrantFilters) => {
    setFilters(newFilters);
    saveFiltersToStorage(newFilters);
  };

  const handleGrantClick = (grant: Grant) => {
    setSelectedGrant(grant);
    setModalOpen(true);
  };

  const handleExport = () => {
    const csv = [
      ['ID', 'Nazwa', 'Kategoria', 'Status', 'Kwota Min', 'Kwota Max', 'Deadline', 'Success Rate', 'Program Type'],
      ...filteredGrants.map(g => [
        g.id,
        g.name,
        g.category.name,
        g.status,
        g.amount_min,
        g.amount_max,
        g.deadline,
        g.success_rate,
        g.program_type
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'eu-grants-export.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <button
                onClick={() => navigate('/grants-hub')}
                className="text-blue-400 hover:text-blue-300 text-sm mb-2 flex items-center gap-2"
              >
                <i className="fa fa-arrow-left"></i>
                Powrót do Dashboard
              </button>
              <h1 className="text-3xl font-bold text-slate-100">
                <i className="fa fa-list text-blue-400 mr-3"></i>
                Wszystkie dotacje UE
              </h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <i className="fa fa-download mr-2"></i>
                Eksportuj CSV
              </button>
              <div className="flex bg-slate-800 rounded-lg border border-slate-700">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-4 py-2 rounded-l-lg transition-colors ${
                    viewMode === 'table'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <i className="fa fa-table"></i>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-r-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <i className="fa fa-th"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-xs mb-1">Znalezione dotacje</p>
              <p className="text-slate-100 text-2xl font-bold">{filteredGrants.length}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-xs mb-1">Łączna kwota (max)</p>
              <p className="text-slate-100 text-2xl font-bold">
                {(filteredGrants.reduce((sum, g) => sum + g.amount_max, 0) / 1000000).toFixed(0)}M EUR
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-xs mb-1">Średni success rate</p>
              <p className="text-slate-100 text-2xl font-bold">
                {filteredGrants.length > 0
                  ? Math.round(filteredGrants.reduce((sum, g) => sum + g.success_rate, 0) / filteredGrants.length)
                  : 0}%
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-xs mb-1">Aktywnych filtrów</p>
              <p className="text-slate-100 text-2xl font-bold">
                {[
                  filters.categories?.length || 0,
                  filters.statuses?.length || 0,
                  filters.program_types?.length || 0,
                  filters.target_beneficiary?.length || 0,
                  filters.amount_range ? 1 : 0,
                  filters.success_rate_range ? 1 : 0
                ].reduce((a, b) => a + b, 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <FilterPanel
                filters={filters}
                onChange={handleFiltersChange}
                categories={categories}
              />
            </div>
          </div>

          {/* Table/Grid */}
          <div className="lg:col-span-3">
            {viewMode === 'table' ? (
              <GrantTable
                grants={filteredGrants}
                onRowClick={handleGrantClick}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredGrants.map(grant => (
                  <div key={grant.id} className="bg-slate-800 rounded-lg p-5 border border-slate-700">
                    <h3 className="text-slate-100 font-semibold mb-2">{grant.name}</h3>
                    <p className="text-slate-400 text-sm mb-3">{grant.description.slice(0, 150)}...</p>
                    <button
                      onClick={() => handleGrantClick(grant)}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      Zobacz szczegóły
                      <i className="fa fa-arrow-right ml-2"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grant Details Modal */}
      <GrantDetailsModal
        grant={selectedGrant}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default GrantsTablePage;
