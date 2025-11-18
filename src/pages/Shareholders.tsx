import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faEnvelope, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { mockShareholders } from '../data/mockData';

const Shareholders: React.FC = () => {
  const shareholders = mockShareholders;
  const totalShares = shareholders.reduce((sum, sh) => sum + sh.shares, 0);
  const totalValue = shareholders.reduce((sum, sh) => sum + sh.value, 0);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cash':
        return 'bg-green-900 text-green-200';
      case 'know-how':
        return 'bg-blue-900 text-blue-200';
      case 'other':
        return 'bg-purple-900 text-purple-200';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'cash':
        return 'Gotówka';
      case 'know-how':
        return 'Know-how';
      case 'other':
        return 'Inne';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Akcjonariusze</h1>
        <p className="text-slate-400">Zarządzaj akcjonariuszami i ich udziałami</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faUsers} className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Liczba akcjonariuszy</p>
              <p className="text-2xl font-bold text-white">{shareholders.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div>
            <p className="text-slate-400 text-sm mb-1">Całkowita liczba akcji</p>
            <p className="text-2xl font-bold text-white">{totalShares.toLocaleString()}</p>
          </div>
        </div>

        <div className="card">
          <div>
            <p className="text-slate-400 text-sm mb-1">Całkowita wartość</p>
            <p className="text-2xl font-bold text-white">
              {(totalValue / 1000000).toFixed(2)} M PLN
            </p>
          </div>
        </div>
      </div>

      {/* Shareholders Table */}
      <div className="card">
        <h2 className="text-xl font-semibold text-white mb-4">Lista akcjonariuszy</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Akcjonariusz</th>
                <th>Email</th>
                <th>Akcje</th>
                <th>Udział %</th>
                <th>Wartość</th>
                <th>Typ wkładu</th>
                <th>Data dołączenia</th>
                <th>Dokumenty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {shareholders
                .sort((a, b) => b.sharePercentage - a.sharePercentage)
                .map((shareholder) => (
                  <tr key={shareholder.id} className="hover:bg-slate-700">
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {shareholder.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-white">{shareholder.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2 text-slate-300">
                        <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-slate-500" />
                        <span>{shareholder.email}</span>
                      </div>
                    </td>
                    <td className="font-semibold">{shareholder.shares.toLocaleString()}</td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-blue-400">
                          {shareholder.sharePercentage.toFixed(3)}%
                        </span>
                        <div className="w-16 bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${Math.min(shareholder.sharePercentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold text-green-400">
                      {(shareholder.value / 1000000).toFixed(2)} M PLN
                    </td>
                    <td>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(shareholder.type)}`}>
                        {getTypeLabel(shareholder.type)}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2 text-slate-300">
                        <FontAwesomeIcon icon={faCalendar} className="w-4 h-4 text-slate-500" />
                        <span>{new Date(shareholder.joinDate).toLocaleDateString('pl-PL')}</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-blue-400">{shareholder.documents.length} plików</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Breakdown by Type */}
      <div className="card">
        <h2 className="text-xl font-semibold text-white mb-4">Podział według typu wkładu</h2>
        <div className="space-y-4">
          {['cash', 'know-how', 'other'].map((type) => {
            const shareholdersOfType = shareholders.filter(sh => sh.type === type);
            const valueOfType = shareholdersOfType.reduce((sum, sh) => sum + sh.value, 0);
            const percentage = (valueOfType / totalValue) * 100;

            if (shareholdersOfType.length === 0) return null;

            return (
              <div key={type}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded text-sm font-medium ${getTypeColor(type)}`}>
                      {getTypeLabel(type)}
                    </span>
                    <span className="text-slate-400">{shareholdersOfType.length} akcjonariuszy</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">
                      {(valueOfType / 1000000).toFixed(2)} M PLN
                    </p>
                    <p className="text-slate-400 text-sm">{percentage.toFixed(2)}%</p>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shareholders;
