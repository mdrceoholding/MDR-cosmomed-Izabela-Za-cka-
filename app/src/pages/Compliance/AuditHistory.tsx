import React, { useState } from 'react';
import { Calendar, TrendingUp, FileText, Download } from 'lucide-react';
import { mockAudits } from '../../data/complianceData';
import { formatShortDate } from '../../utils/complianceCalculations';
import { cn } from '../../lib/utils';

export const AuditHistory: React.FC = () => {
  const [sortBy, setSortBy] = useState<'date' | 'result'>('date');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Otwarty' | 'Zamknięty'>('all');

  const filteredAudits = mockAudits
    .filter((audit) => filterStatus === 'all' || audit.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.data).getTime() - new Date(a.data).getTime();
      }
      return b.wynikProcentowy - a.wynikProcentowy;
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Historia Audytów</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Przegląd wszystkich audytów zgodności MDR
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Sortuj:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Data</option>
              <option value="result">Wynik</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Wszystkie</option>
              <option value="Otwarty">Otwarty</option>
              <option value="Zamknięty">Zamknięty</option>
            </select>
          </div>

          <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
            Znaleziono: {filteredAudits.length} audytów
          </div>
        </div>
      </div>

      {/* Audit List */}
      <div className="space-y-4">
        {filteredAudits.map((audit) => (
          <div
            key={audit.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar size={20} className="text-gray-600 dark:text-gray-400" />
                  <h3 className="text-lg font-semibold">
                    Audyt z dnia {formatShortDate(audit.data)}
                  </h3>
                  <span
                    className={cn(
                      'px-2 py-1 rounded text-sm font-medium',
                      audit.status === 'Zamknięty'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    )}
                  >
                    {audit.status}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Audytor: {audit.audytor}
                </p>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-1">
                  <TrendingUp size={20} className="text-blue-600 dark:text-blue-400" />
                  <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {audit.wynikProcentowy}%
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Wynik audytu</p>
              </div>
            </div>

            {/* Compliance Numbers */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">TAK</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {audit.liczbaZgodnosci.tak}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">NIE</div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {audit.liczbaZgodnosci.nie}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">ND</div>
                <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                  {audit.liczbaZgodnosci.nd}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={18} />
                <h4 className="font-semibold">Zalecenia:</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {audit.zalecenia}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                <Download size={18} />
                Pobierz raport
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAudits.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Brak audytów spełniających kryteria filtrowania
          </p>
        </div>
      )}
    </div>
  );
};
