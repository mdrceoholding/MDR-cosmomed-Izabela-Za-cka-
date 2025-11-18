import React, { useState } from 'react';
import { FileText, Download, Printer } from 'lucide-react';
import { mockChecklistaMDR, mockSzablonyDokumentow } from '../../data/complianceData';
import { generateChecklistPDF } from '../../utils/pdfGenerator';
import { DocumentDownload } from '../../components/Compliance/DocumentDownload';

export const ReportGenerator: React.FC = () => {
  const [reportType, setReportType] = useState<'full' | 'summary' | 'audit' | 'changes'>(
    'full'
  );
  const [includeSignature, setIncludeSignature] = useState(true);

  const handleGenerateReport = () => {
    switch (reportType) {
      case 'full':
        generateChecklistPDF(mockChecklistaMDR, true);
        break;
      case 'summary':
        generateChecklistPDF(mockChecklistaMDR, false);
        break;
      case 'audit':
      case 'changes':
        alert(`Generator raportu: ${reportType} - W trakcie implementacji`);
        break;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Generator Raportów</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Generuj raporty zgodności MDR w formacie PDF
        </p>
      </div>

      {/* Report Configuration */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Konfiguracja raportu</h3>

        <div className="space-y-4">
          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Typ raportu</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  value: 'full' as const,
                  label: 'Raport Pełny',
                  desc: 'Wszystkie sekcje z pełną dokumentacją',
                },
                {
                  value: 'summary' as const,
                  label: 'Raport Streszczony',
                  desc: 'Tylko statusy i liczby zgodności',
                },
                {
                  value: 'audit' as const,
                  label: 'Raport Audytu',
                  desc: 'Z notatkami i dowodami audytu',
                },
                {
                  value: 'changes' as const,
                  label: 'Raport Zmian',
                  desc: 'Historia wersji i zmian',
                },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    reportType === option.value
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="reportType"
                    value={option.value}
                    checked={reportType === option.value}
                    onChange={(e) => setReportType(e.target.value as any)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {option.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeSignature}
                onChange={(e) => setIncludeSignature(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Dołącz podpis</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleGenerateReport}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download size={20} />
              Generuj PDF
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <Printer size={20} />
              Drukuj
            </button>
          </div>
        </div>
      </div>

      {/* Document Templates */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={24} />
          <h3 className="text-lg font-semibold">Szablony Dokumentów (Annexes)</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Pobierz gotowe szablony dokumentów do checklisty MDR
        </p>
        <div className="grid grid-cols-1 gap-3">
          {mockSzablonyDokumentow.map((szablon) => (
            <DocumentDownload key={szablon.id} szablon={szablon} />
          ))}
        </div>
      </div>
    </div>
  );
};
