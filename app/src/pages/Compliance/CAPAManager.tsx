import React, { useState } from 'react';
import { Plus, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { mockCAPAs } from '../../data/complianceData';
import type { CAPA } from '../../types/compliance';
import {
  formatShortDate,
  getPriorityColor,
  getCAPAStatusColor,
} from '../../utils/complianceCalculations';
import { cn } from '../../lib/utils';

export const CAPAManager: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<'all' | CAPA['status']>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | CAPA['priorytet']>('all');

  const filteredCAPAs = mockCAPAs.filter((capa) => {
    if (filterStatus !== 'all' && capa.status !== filterStatus) return false;
    if (filterPriority !== 'all' && capa.priorytet !== filterPriority) return false;
    return true;
  });

  const openCAPAs = mockCAPAs.filter((c) => c.status === 'Open').length;
  const inProgressCAPAs = mockCAPAs.filter((c) => c.status === 'In Progress').length;
  const closedCAPAs = mockCAPAs.filter((c) => c.status === 'Closed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">CAPA Manager</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Zarządzanie działaniami korygującymi i zapobiegawczymi
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Nowy CAPA
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Wszystkie</p>
              <p className="text-2xl font-bold">{mockCAPAs.length}</p>
            </div>
            <AlertCircle className="text-gray-400" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Otwarte</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {openCAPAs}
              </p>
            </div>
            <AlertCircle className="text-blue-400" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">W trakcie</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {inProgressCAPAs}
              </p>
            </div>
            <Clock className="text-yellow-400" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Zamknięte</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {closedCAPAs}
              </p>
            </div>
            <CheckCircle2 className="text-green-400" size={32} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Wszystkie</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Verification">Verification</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Priorytet:</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as any)}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Wszystkie</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
            Znaleziono: {filteredCAPAs.length} CAPAs
          </div>
        </div>
      </div>

      {/* CAPA List */}
      <div className="space-y-3">
        {filteredCAPAs.map((capa) => (
          <div
            key={capa.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-mono text-gray-500 dark:text-gray-500">
                    {capa.id}
                  </span>
                  <span className={cn('px-2 py-1 rounded text-xs font-medium', getCAPAStatusColor(capa.status))}>
                    {capa.status}
                  </span>
                  <span className={cn('px-2 py-1 rounded text-xs font-medium', getPriorityColor(capa.priorytet))}>
                    {capa.priorytet}
                  </span>
                  {capa.rodzaj === 'Corrective' ? (
                    <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded text-xs font-medium">
                      Corrective
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded text-xs font-medium">
                      Preventive
                    </span>
                  )}
                </div>
                <h3 className="font-semibold mb-2">{capa.opisNiezgodnosci}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <span className="text-xs">Obszar:</span>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {capa.obszar}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs">Odpowiedzialny:</span>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {capa.odpowiedzialny}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs">Zgłoszono:</span>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {formatShortDate(capa.dataZgloszenia)}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs">Termin:</span>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {formatShortDate(capa.targetDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {capa.pozycjaWChecklistie && (
              <div className="text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">
                  Powiązane z punktem checklisty:
                </span>{' '}
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {capa.pozycjaWChecklistie}
                </span>
              </div>
            )}

            {capa.dzialaniaKorygujace && (
              <div className="text-sm mb-2 p-3 bg-gray-50 dark:bg-gray-900/50 rounded">
                <span className="font-medium">Działania: </span>
                {capa.dzialaniaKorygujace}
              </div>
            )}

            {capa.weryfikacja && (
              <div className="text-sm mb-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                <span className="font-medium">Weryfikacja: </span>
                {capa.weryfikacja}
              </div>
            )}

            {capa.dataZamkniecia && (
              <div className="text-sm text-green-600 dark:text-green-400">
                Zamknięto: {formatShortDate(capa.dataZamkniecia)}
              </div>
            )}

            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Edytuj
              </button>
              {capa.status !== 'Closed' && (
                <button className="text-sm text-green-600 dark:text-green-400 hover:underline">
                  Zmień status
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredCAPAs.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Brak CAPAs spełniających kryteria filtrowania
          </p>
        </div>
      )}
    </div>
  );
};
