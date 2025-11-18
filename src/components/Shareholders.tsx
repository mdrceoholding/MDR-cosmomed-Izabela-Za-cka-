import React, { useState } from 'react';
import { mockShareholders, formatCurrency, formatShortDate } from '../data/mockData';
import { Shareholder } from '../types';
import { useToast } from '../context/ToastContext';
import { TableSkeleton } from './LoadingSkeleton';

const Shareholders: React.FC = () => {
  const { addToast } = useToast();
  const [shareholders, setShareholders] = useState<Shareholder[]>(mockShareholders);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState<keyof Shareholder>('addedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<'all' | 'individual' | 'company'>('all');
  const [filterKYC, setFilterKYC] = useState<'all' | 'verified' | 'pending' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sort handler
  const handleSort = (field: keyof Shareholder) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort shareholders
  const filteredShareholders = shareholders
    .filter(sh => {
      const matchesType = filterType === 'all' || sh.type === filterType;
      const matchesKYC = filterKYC === 'all' || sh.kycStatus === filterKYC;
      const matchesSearch = searchTerm === '' ||
        sh.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sh.email.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesType && matchesKYC && matchesSearch;
    })
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal === bVal) return 0;

      const comparison = aVal < bVal ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const getKYCBadgeColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-600';
      case 'pending':
        return 'bg-yellow-600';
      case 'rejected':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getKYCLabel = (status: string) => {
    switch (status) {
      case 'verified':
        return 'Zweryfikowany';
      case 'pending':
        return 'Oczekujący';
      case 'rejected':
        return 'Odrzucony';
      default:
        return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'individual':
        return 'Osoba fizyczna';
      case 'company':
        return 'Firma';
      default:
        return type;
    }
  };

  const getTotalKnowHowValue = () => {
    return shareholders.reduce((sum, sh) => {
      return sum + (sh.knowHow?.value || 0);
    }, 0);
  };

  if (loading) {
    return <TableSkeleton rows={10} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Akcjonariusze</h2>
          <p className="text-gray-400 mt-1">
            Zarządzaj akcjonariuszami spółki ({filteredShareholders.length} z {shareholders.length})
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg
                           flex items-center gap-2 transition-colors">
            <i className="fas fa-user-plus"></i>
            Dodaj akcjonariusza
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg
                           flex items-center gap-2 transition-colors">
            <i className="fas fa-file-export"></i>
            Eksport
          </button>
        </div>
      </div>

      {/* Know-how Summary */}
      {getTotalKnowHowValue() > 0 && (
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <i className="fas fa-lightbulb text-3xl text-white"></i>
              </div>
              <div>
                <h3 className="text-white text-opacity-90 text-sm font-medium mb-1">
                  Łączna wartość Know-how
                </h3>
                <p className="text-white text-3xl font-bold">
                  {formatCurrency(getTotalKnowHowValue())}
                </p>
                <p className="text-white text-opacity-80 text-sm mt-1">
                  Aporty niepieniężne wniesione do spółki
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg text-sm font-medium">
                <i className="fas fa-clock mr-2"></i>
                Oczekuje na zatwierdzenie
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <i className="fas fa-search mr-2"></i>
              Szukaj
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Imię, nazwisko, email..."
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                       focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <i className="fas fa-filter mr-2"></i>
              Typ
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                       focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="all">Wszystkie</option>
              <option value="individual">Osoba fizyczna</option>
              <option value="company">Firma</option>
            </select>
          </div>

          {/* KYC Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <i className="fas fa-shield-alt mr-2"></i>
              Status KYC
            </label>
            <select
              value={filterKYC}
              onChange={(e) => setFilterKYC(e.target.value as any)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                       focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="all">Wszystkie</option>
              <option value="verified">Zweryfikowany</option>
              <option value="pending">Oczekujący</option>
              <option value="rejected">Odrzucony</option>
            </select>
          </div>
        </div>
      </div>

      {/* Shareholders Table */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white"
                  >
                    Akcjonariusz
                    {sortField === 'name' && (
                      <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} text-blue-400`}></i>
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('shares')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white"
                  >
                    Akcje
                    {sortField === 'shares' && (
                      <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} text-blue-400`}></i>
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('percentage')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white"
                  >
                    Udział
                    {sortField === 'percentage' && (
                      <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} text-blue-400`}></i>
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Typ
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Status KYC
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('addedAt')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white"
                  >
                    Data dodania
                    {sortField === 'addedAt' && (
                      <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} text-blue-400`}></i>
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredShareholders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                    <i className="fas fa-users text-4xl mb-2"></i>
                    <p>Nie znaleziono akcjonariuszy</p>
                  </td>
                </tr>
              ) : (
                filteredShareholders.map((shareholder) => (
                  <tr key={shareholder.id} className="hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center
                                      text-white font-semibold">
                          {shareholder.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-white font-medium">{shareholder.name}</p>
                            {shareholder.knowHow && (
                              <div className="group relative">
                                <span className="bg-yellow-600 px-2 py-0.5 rounded-full text-xs font-medium text-white
                                               flex items-center gap-1 cursor-help">
                                  <i className="fas fa-lightbulb"></i>
                                  Know-how
                                </span>
                                <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 border border-yellow-600
                                              rounded-lg p-4 shadow-xl opacity-0 invisible group-hover:opacity-100
                                              group-hover:visible transition-all z-10">
                                  <div className="flex items-start gap-3 mb-3">
                                    <i className="fas fa-lightbulb text-yellow-400 text-xl mt-1"></i>
                                    <div>
                                      <p className="text-white font-semibold mb-1">Aport niepieniężny</p>
                                      <p className="text-gray-300 text-sm">{shareholder.knowHow.description}</p>
                                    </div>
                                  </div>
                                  <div className="bg-gray-800 rounded p-3 space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-400">Wartość:</span>
                                      <span className="text-green-400 font-bold">
                                        {formatCurrency(shareholder.knowHow.value)}
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-400">Status:</span>
                                      <span className={`font-medium ${
                                        shareholder.knowHow.status === 'approved' ? 'text-green-400' :
                                        shareholder.knowHow.status === 'valued' ? 'text-blue-400' :
                                        'text-yellow-400'
                                      }`}>
                                        {shareholder.knowHow.status === 'approved' ? 'Zatwierdzony' :
                                         shareholder.knowHow.status === 'valued' ? 'Wyceniony' :
                                         'Oczekuje'}
                                      </span>
                                    </div>
                                    {shareholder.knowHow.valuationDate && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Data wyceny:</span>
                                        <span className="text-gray-300">
                                          {formatShortDate(shareholder.knowHow.valuationDate)}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">{shareholder.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">
                        {shareholder.shares > 0 ? shareholder.shares.toLocaleString('pl-PL') : '-'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-blue-500 h-full transition-all"
                            style={{ width: `${shareholder.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-medium text-sm w-12 text-right">
                          {shareholder.percentage > 0 ? `${shareholder.percentage}%` : '-'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300 text-sm">
                        {getTypeLabel(shareholder.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`${getKYCBadgeColor(shareholder.kycStatus)} px-3 py-1 rounded-full text-xs font-medium text-white`}>
                        {getKYCLabel(shareholder.kycStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {formatShortDate(shareholder.addedAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                          title="Zobacz szczegóły"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          className="text-green-400 hover:text-green-300 transition-colors"
                          title="Edytuj"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Usuń"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        {filteredShareholders.length > 0 && (
          <div className="bg-gray-700 px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Łączna liczba akcjonariuszy</p>
                <p className="text-white font-semibold text-lg">{filteredShareholders.length}</p>
              </div>
              <div>
                <p className="text-gray-400">Łączna liczba akcji</p>
                <p className="text-white font-semibold text-lg">
                  {filteredShareholders.reduce((sum, sh) => sum + sh.shares, 0).toLocaleString('pl-PL')}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Łączny udział</p>
                <p className="text-white font-semibold text-lg">
                  {filteredShareholders.reduce((sum, sh) => sum + sh.percentage, 0)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shareholders;
