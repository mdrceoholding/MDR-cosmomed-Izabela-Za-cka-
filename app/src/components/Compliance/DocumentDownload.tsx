import React from 'react';
import { Download, FileText } from 'lucide-react';
import type { SzablonDokumentu } from '../../types/compliance';
import { formatShortDate } from '../../utils/complianceCalculations';

interface DocumentDownloadProps {
  szablon: SzablonDokumentu;
}

export const DocumentDownload: React.FC<DocumentDownloadProps> = ({ szablon }) => {
  const handleDownload = () => {
    // In a real app, this would trigger actual file download
    alert(`Pobieranie: ${szablon.nazwa}\nPlik: ${szablon.fileUrl}`);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3 flex-1">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <FileText className="text-blue-600 dark:text-blue-400" size={24} />
          </div>
          <div className="flex-1">
            <h4 className="font-medium mb-1">{szablon.nazwa}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {szablon.opis}
            </p>
            <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-500">
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                {szablon.kategoria}
              </span>
              <span>
                Aktualizacja: {formatShortDate(szablon.ostatniaAktualizacja)}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleDownload}
          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          title="Pobierz szablon"
        >
          <Download size={20} />
        </button>
      </div>
    </div>
  );
};
