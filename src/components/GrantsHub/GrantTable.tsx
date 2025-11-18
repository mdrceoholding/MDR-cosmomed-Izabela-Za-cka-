import React, { useState } from 'react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Grant } from '../../types/grantsHub';

interface GrantTableProps {
  grants: Grant[];
  onRowClick?: (grant: Grant) => void;
}

type SortField = 'name' | 'deadline' | 'amount_max' | 'success_rate' | 'progress';
type SortDirection = 'asc' | 'desc';

const STATUS_STYLES = {
  'Aktywny': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Wkrótce': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Zamknięty': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  'Zawieszony': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
};

const GrantTable: React.FC<GrantTableProps> = ({ grants, onRowClick }) => {
  const [sortField, setSortField] = useState<SortField>('deadline');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredGrants = grants.filter(grant =>
    grant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grant.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grant.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedGrants = [...filteredGrants].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    if (sortField === 'deadline') {
      aValue = new Date(a.deadline).getTime();
      bValue = new Date(b.deadline).getTime();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedGrants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedGrants = sortedGrants.slice(startIndex, startIndex + itemsPerPage);

  const SortIcon: React.FC<{ field: SortField }> = ({ field }) => {
    if (sortField !== field) {
      return <i className="fa fa-sort text-slate-600 ml-2"></i>;
    }
    return (
      <i
        className={`fa fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} text-blue-400 ml-2`}
      ></i>
    );
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-lg">
      {/* Search */}
      <div className="p-4 border-b border-slate-700">
        <div className="relative">
          <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input
            type="text"
            placeholder="Szukaj dotacji..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900 border-b border-slate-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                ID
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer hover:text-blue-400"
                onClick={() => handleSort('name')}
              >
                Nazwa
                <SortIcon field="name" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Kategoria
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer hover:text-blue-400"
                onClick={() => handleSort('amount_max')}
              >
                Kwota
                <SortIcon field="amount_max" />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer hover:text-blue-400"
                onClick={() => handleSort('deadline')}
              >
                Deadline
                <SortIcon field="deadline" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer hover:text-blue-400"
                onClick={() => handleSort('success_rate')}
              >
                Success Rate
                <SortIcon field="success_rate" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {paginatedGrants.map((grant) => (
              <tr
                key={grant.id}
                onClick={() => onRowClick?.(grant)}
                className="hover:bg-slate-700/50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 text-xs text-slate-400 font-mono">{grant.id}</td>
                <td className="px-4 py-3">
                  <p className="text-sm text-slate-100 font-medium">{grant.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{grant.program_type}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{ backgroundColor: `${grant.category.color}20`, color: grant.category.color }}
                  >
                    <i className={`fa fa-${grant.category.icon} mr-1`}></i>
                    {grant.category.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-100 font-medium">
                  {(grant.amount_min / 1000000).toFixed(1)}M - {(grant.amount_max / 1000000).toFixed(1)}M EUR
                </td>
                <td className="px-4 py-3 text-sm text-slate-100">
                  {format(new Date(grant.deadline), 'dd MMM yyyy', { locale: pl })}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${STATUS_STYLES[grant.status]}`}>
                    {grant.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-100 font-medium">{grant.success_rate}%</span>
                    <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                        style={{ width: `${grant.success_rate}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRowClick?.(grant);
                    }}
                    className="text-blue-400 hover:text-blue-300 text-xs font-medium"
                  >
                    <i className="fa fa-external-link mr-1"></i>
                    Szczegóły
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 border-t border-slate-700 flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Wyświetlono {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedGrants.length)} z {sortedGrants.length} dotacji
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-slate-700 text-slate-100 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
          >
            <i className="fa fa-chevron-left"></i>
          </button>
          <span className="text-sm text-slate-400">
            Strona {currentPage} z {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-slate-700 text-slate-100 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrantTable;
