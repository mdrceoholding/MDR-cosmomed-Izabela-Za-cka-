import React, { useMemo } from 'react';
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  MinusCircle,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import { mockChecklistaMDR, mockAudits } from '../../data/complianceData';
import { calculateComplianceStats, formatShortDate } from '../../utils/complianceCalculations';
import { cn } from '../../lib/utils';

export const ComplianceDashboard: React.FC = () => {
  const stats = useMemo(() => calculateComplianceStats(mockChecklistaMDR), []);
  const lastAudit = mockAudits[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Dashboard Compliance</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Przegląd stanu zgodności z MDR dla {mockChecklistaMDR.companyData.nazwa}
        </p>
      </div>

      {/* Overall Compliance Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={32} />
              <h3 className="text-xl font-semibold">Ogólny Stan Zgodności</h3>
            </div>
            <p className="text-blue-100 text-sm">
              Wersja checklisty: {mockChecklistaMDR.companyData.numerWersji}
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold">{stats.ogolnyStanZgodnosci}%</div>
            <p className="text-blue-100 text-sm mt-1">
              {stats.liczbaPunktow.tak}/{stats.liczbaPunktow.razem} punktów
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Zgodne (TAK)
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.liczbaPunktow.tak}
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Niezgodne (NIE)
              </p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {stats.liczbaPunktow.nie}
              </p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <XCircle className="text-red-600 dark:text-red-400" size={32} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Nie dotyczy (ND)
              </p>
              <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">
                {stats.liczbaPunktow.nd}
              </p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <MinusCircle className="text-gray-600 dark:text-gray-400" size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Status Obszarów */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={24} />
          <h3 className="text-lg font-semibold">Status Obszarów (7 sekcji)</h3>
        </div>
        <div className="space-y-3">
          {stats.statusObszarow.map((obszar, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{obszar.obszar}</span>
                <span className="text-sm font-semibold">{obszar.zgodnosc}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={cn(
                    'h-2 rounded-full transition-all',
                    obszar.zgodnosc >= 80
                      ? 'bg-green-500'
                      : obszar.zgodnosc >= 60
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  )}
                  style={{ width: `${obszar.zgodnosc}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Last Audit */}
      {lastAudit && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={24} />
            <h3 className="text-lg font-semibold">Ostatni Audyt</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Data audytu</p>
              <p className="font-semibold">{formatShortDate(lastAudit.data)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Audytor</p>
              <p className="font-semibold">{lastAudit.audytor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Wynik</p>
              <p className="font-semibold text-2xl text-blue-600 dark:text-blue-400">
                {lastAudit.wynikProcentowy}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
              <p className="font-semibold">
                <span
                  className={cn(
                    'px-2 py-1 rounded text-sm',
                    lastAudit.status === 'Zamknięty'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  )}
                >
                  {lastAudit.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Timeline / Historia */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Historia Zmian</h3>
        <div className="space-y-4">
          {mockChecklistaMDR.historiaZmian.map((zmiana) => (
            <div key={zmiana.id} className="flex gap-4 border-l-2 border-blue-500 pl-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">Wersja {zmiana.numerWersji}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {formatShortDate(zmiana.data)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  {zmiana.opisZmian}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Podpis: {zmiana.podpis}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
