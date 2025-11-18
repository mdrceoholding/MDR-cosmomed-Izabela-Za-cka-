import { useState, useEffect, useMemo } from 'react';
import { shareholdersMock } from '../data/mockData';
import { Shareholder } from '../types';
import { formatDate } from '../utils/helpers';
import { classNames } from '../utils/helpers';
import LoadingSkeleton from './LoadingSkeleton';
import toast from 'react-hot-toast';

type SortField = 'name' | 'shares' | 'percentage' | 'joinDate';
type SortOrder = 'asc' | 'desc';

export default function Shareholders() {
  const [loading, setLoading] = useState(true);
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('shares');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedShareholder, setSelectedShareholder] = useState<Shareholder | null>(null);

  useEffect(() => {
    // Symulacja ładowania danych
    const timer = setTimeout(() => {
      setShareholders(shareholdersMock);
      setLoading(false);
      toast.success('Dane akcjonariuszy załadowane');
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Sortowanie i filtrowanie
  const filteredAndSorted = useMemo(() => {
    let result = [...shareholders];

    // Filtrowanie
    if (searchTerm) {
      result = result.filter(sh =>
        sh.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sh.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sortowanie
    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });

    return result;
  }, [shareholders, searchTerm, sortField, sortOrder]);

  // Paginacja
  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredAndSorted.slice(start, end);
  }, [filteredAndSorted, currentPage, itemsPerPage]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <i className="fa-solid fa-sort text-slate-500"></i>;
    return sortOrder === 'asc'
      ? <i className="fa-solid fa-sort-up text-blue-400"></i>
      : <i className="fa-solid fa-sort-down text-blue-400"></i>;
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Akcjonariusze</h1>
        <LoadingSkeleton type="table" count={5} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">👥 Akcjonariusze</h1>
          <p className="text-slate-400">
            Zarządzaj akcjonariuszami spółki ({filteredAndSorted.length} rekordów)
          </p>
        </div>
        <button
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
          onClick={() => toast.success('Funkcja dodawania w przygotowaniu')}
        >
          <i className="fa-solid fa-plus mr-2"></i>
          Dodaj akcjonariusza
        </button>
      </div>

      {/* Filtry i wyszukiwanie */}
      <div className="bg-slate-800 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Szukaj</label>
            <div className="relative">
              <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                placeholder="Szukaj po nazwisku, emailu..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Wyników na stronie</label>
            <select
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-2 font-semibold hover:text-blue-400 transition"
                  >
                    Akcjonariusz
                    <SortIcon field="name" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">Kontakt</th>
                <th className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleSort('shares')}
                    className="flex items-center gap-2 font-semibold hover:text-blue-400 transition ml-auto"
                  >
                    Akcje
                    <SortIcon field="shares" />
                  </button>
                </th>
                <th className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleSort('percentage')}
                    className="flex items-center gap-2 font-semibold hover:text-blue-400 transition ml-auto"
                  >
                    Udział %
                    <SortIcon field="percentage" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('joinDate')}
                    className="flex items-center gap-2 font-semibold hover:text-blue-400 transition"
                  >
                    Data dołączenia
                    <SortIcon field="joinDate" />
                  </button>
                </th>
                <th className="px-6 py-4 text-center">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <i className="fa-solid fa-search text-4xl mb-4 block"></i>
                    Nie znaleziono akcjonariuszy
                  </td>
                </tr>
              ) : (
                paginatedData.map((shareholder) => (
                  <tr
                    key={shareholder.id}
                    className="hover:bg-slate-700 transition cursor-pointer"
                    onClick={() => setSelectedShareholder(shareholder)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                          {shareholder.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="font-semibold">{shareholder.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-slate-300">
                          <i className="fa-solid fa-envelope mr-2 text-slate-500"></i>
                          {shareholder.email}
                        </div>
                        <div className="text-slate-400 mt-1">
                          <i className="fa-solid fa-phone mr-2 text-slate-500"></i>
                          {shareholder.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold">
                      {shareholder.shares.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-block px-3 py-1 bg-blue-600 rounded-full text-sm font-semibold">
                        {shareholder.percentage}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {formatDate(shareholder.joinDate)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.success('Edycja w przygotowaniu');
                          }}
                        >
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        <button
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.error('Usuwanie wyłączone');
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginacja */}
        {totalPages > 1 && (
          <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-t border-slate-700">
            <div className="text-sm text-slate-400">
              Strona {currentPage} z {totalPages} ({filteredAndSorted.length} rekordów)
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className={classNames(
                  "px-3 py-1 rounded transition",
                  currentPage === 1
                    ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                    : "bg-slate-700 hover:bg-slate-600"
                )}
              >
                <i className="fa-solid fa-angles-left"></i>
              </button>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={classNames(
                  "px-3 py-1 rounded transition",
                  currentPage === 1
                    ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                    : "bg-slate-700 hover:bg-slate-600"
                )}
              >
                <i className="fa-solid fa-angle-left"></i>
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={classNames(
                      "px-3 py-1 rounded transition",
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 hover:bg-slate-600"
                    )}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={classNames(
                  "px-3 py-1 rounded transition",
                  currentPage === totalPages
                    ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                    : "bg-slate-700 hover:bg-slate-600"
                )}
              >
                <i className="fa-solid fa-angle-right"></i>
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className={classNames(
                  "px-3 py-1 rounded transition",
                  currentPage === totalPages
                    ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                    : "bg-slate-700 hover:bg-slate-600"
                )}
              >
                <i className="fa-solid fa-angles-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal szczegółów */}
      {selectedShareholder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedShareholder(null)}
        >
          <div
            className="bg-slate-800 rounded-xl max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Szczegóły akcjonariusza</h2>
              <button
                onClick={() => setSelectedShareholder(null)}
                className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-full transition"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-bold">
                  {selectedShareholder.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-2xl font-bold">{selectedShareholder.name}</div>
                  <div className="text-slate-400">ID: {selectedShareholder.id}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg">
                  <div className="text-sm text-slate-400 mb-1">Akcje</div>
                  <div className="text-2xl font-bold">{selectedShareholder.shares.toLocaleString()}</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <div className="text-sm text-slate-400 mb-1">Udział</div>
                  <div className="text-2xl font-bold">{selectedShareholder.percentage}%</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <div className="text-sm text-slate-400 mb-1">Email</div>
                  <div className="text-sm">{selectedShareholder.email}</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <div className="text-sm text-slate-400 mb-1">Telefon</div>
                  <div className="text-sm">{selectedShareholder.phone}</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg col-span-2">
                  <div className="text-sm text-slate-400 mb-1">Data dołączenia</div>
                  <div className="text-sm">{formatDate(selectedShareholder.joinDate)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
