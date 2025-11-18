import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileExcel, faFileCsv, faDownload, faEye } from '@fortawesome/free-solid-svg-icons';
import { ReportType, ReportFormat } from '../types';
import toast from 'react-hot-toast';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<ReportType>('cap_table');
  const [selectedFormat, setSelectedFormat] = useState<ReportFormat>('pdf');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [includeWatermark, setIncludeWatermark] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const reportTypes = [
    { value: 'cap_table', label: 'Raport struktury własnościowej (Cap Table)', icon: faFilePdf },
    { value: 'transactions', label: 'Historia transakcji', icon: faFileExcel },
    { value: 'documents', label: 'Zestawienie dokumentów', icon: faFilePdf },
    { value: 'compliance', label: 'Raport compliance', icon: faFilePdf },
  ];

  const formats = [
    { value: 'pdf', label: 'PDF', icon: faFilePdf, color: 'text-red-400' },
    { value: 'excel', label: 'Excel', icon: faFileExcel, color: 'text-green-400' },
    { value: 'csv', label: 'CSV', icon: faFileCsv, color: 'text-blue-400' },
  ];

  const handleGenerateReport = () => {
    toast.success('Raport został wygenerowany');
    setTimeout(() => {
      toast.success('Raport został pobrany');
    }, 1500);
  };

  const handlePreview = () => {
    setShowPreview(true);
    toast.success('Generowanie podglądu...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Raporty i Eksport</h1>
        <p className="text-slate-400">Generuj raporty i eksportuj dane w różnych formatach</p>
      </div>

      {/* Report Type Selection */}
      <div className="card">
        <h2 className="text-xl font-semibold text-white mb-4">Wybierz typ raportu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTypes.map((report) => (
            <div
              key={report.value}
              onClick={() => setSelectedReport(report.value as ReportType)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedReport === report.value
                  ? 'border-blue-500 bg-blue-900 bg-opacity-20'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={report.icon} className="text-2xl text-blue-400" />
                <span className="text-white font-medium">{report.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Format Selection */}
      <div className="card">
        <h2 className="text-xl font-semibold text-white mb-4">Format eksportu</h2>
        <div className="flex space-x-4">
          {formats.map((format) => (
            <button
              key={format.value}
              onClick={() => setSelectedFormat(format.value as ReportFormat)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-all ${
                selectedFormat === format.value
                  ? 'border-blue-500 bg-blue-900 bg-opacity-20'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              <FontAwesomeIcon icon={format.icon} className={`text-xl ${format.color}`} />
              <span className="text-white font-medium">{format.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="card">
        <h2 className="text-xl font-semibold text-white mb-4">Zakres dat (opcjonalnie)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 mb-2">Od</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="input w-full"
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Do</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="input w-full"
            />
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="card">
        <h2 className="text-xl font-semibold text-white mb-4">Opcje</h2>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeWatermark}
              onChange={(e) => setIncludeWatermark(e.target.checked)}
              className="w-5 h-5 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
            />
            <span className="text-white">Dodaj watermark z datą generacji</span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="card">
        <div className="flex space-x-4">
          <button onClick={handlePreview} className="btn-secondary flex-1">
            <FontAwesomeIcon icon={faEye} className="mr-2" />
            Podgląd
          </button>
          <button onClick={handleGenerateReport} className="btn-primary flex-1">
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Generuj i pobierz raport
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="card">
        <h2 className="text-xl font-semibold text-white mb-4">Ostatnio generowane raporty</h2>
        <div className="space-y-3">
          {[
            { name: 'Cap Table Q3 2024.pdf', date: '2024-10-15', type: 'PDF', size: '245 KB' },
            { name: 'Transactions 2024.xlsx', date: '2024-10-10', type: 'Excel', size: '180 KB' },
            { name: 'Compliance Report.pdf', date: '2024-09-28', type: 'PDF', size: '520 KB' },
          ].map((report, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-slate-700 hover:bg-slate-650 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon
                  icon={report.type === 'PDF' ? faFilePdf : faFileExcel}
                  className={`text-2xl ${report.type === 'PDF' ? 'text-red-400' : 'text-green-400'}`}
                />
                <div>
                  <p className="text-white font-medium">{report.name}</p>
                  <p className="text-slate-400 text-sm">
                    {new Date(report.date).toLocaleDateString('pl-PL')} • {report.size}
                  </p>
                </div>
              </div>
              <button className="text-blue-400 hover:text-blue-300">
                <FontAwesomeIcon icon={faDownload} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Podgląd raportu</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <div className="bg-white rounded-lg p-8 text-black min-h-[500px]">
              <h1 className="text-3xl font-bold mb-4">Cap Table - Struktura własnościowa</h1>
              <p className="text-sm text-gray-600 mb-6">
                Wygenerowano: {new Date().toLocaleString('pl-PL')}
              </p>
              {includeWatermark && (
                <div className="text-center text-gray-400 text-xs mb-4">
                  WATERMARK: {new Date().toLocaleDateString('pl-PL')}
                </div>
              )}
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2 text-left">Akcjonariusz</th>
                    <th className="border p-2 text-right">Akcje</th>
                    <th className="border p-2 text-right">Udział %</th>
                    <th className="border p-2 text-right">Wartość</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Artur Fijołek</td>
                    <td className="border p-2 text-right">13,999</td>
                    <td className="border p-2 text-right">69.995%</td>
                    <td className="border p-2 text-right">13,999,000 PLN</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Jan Kowalski</td>
                    <td className="border p-2 text-right">3,000</td>
                    <td className="border p-2 text-right">15.00%</td>
                    <td className="border p-2 text-right">3,000,000 PLN</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setShowPreview(false)} className="btn-secondary">
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
