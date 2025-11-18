import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { OblastChecklist } from '../../types/compliance';
import { StatusIndicator } from './StatusIndicator';
import { cn } from '../../lib/utils';

interface ChecklistSectionProps {
  oblast: OblastChecklist;
  onPunktEdit?: (punktId: string) => void;
}

export const ChecklistSection: React.FC<ChecklistSectionProps> = ({
  oblast,
  onPunktEdit,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const takCount = oblast.punkty.filter((p) => p.status === 'TAK').length;
  const totalCount = oblast.punkty.length;
  const compliance = Math.round((takCount / totalCount) * 100);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div
        className="bg-gray-50 dark:bg-gray-800 p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            <h3 className="text-lg font-semibold">
              {oblast.numer} {oblast.tytul}
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {takCount}/{totalCount} punktów
            </span>
            <div
              className={cn(
                'px-3 py-1 rounded-full text-sm font-medium',
                compliance >= 80
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : compliance >= 60
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
              )}
            >
              {compliance}%
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {oblast.punkty.map((punkt) => (
            <div
              key={punkt.id}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <StatusIndicator status={punkt.status} />
                    <h4 className="font-medium">
                      {punkt.numer} {punkt.tytul}
                    </h4>
                  </div>
                  {punkt.uwagi && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 ml-10 mt-2">
                      {punkt.uwagi}
                    </p>
                  )}
                  <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-500 ml-10 mt-2">
                    <span>Odpowiedzialny: {punkt.odpowiedzialny}</span>
                    <span>Weryfikacja: {punkt.dataWeryfikacji}</span>
                  </div>
                </div>
                {onPunktEdit && (
                  <button
                    onClick={() => onPunktEdit(punkt.id)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                  >
                    Edytuj
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
