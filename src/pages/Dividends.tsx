import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faDownload, faFilter } from '@fortawesome/free-solid-svg-icons';
import { mockDividends, mockShareholders, getTotalDividends12M } from '../data/mockData';
import { Dividend, DividendType, DividendStatus } from '../types';
import toast from 'react-hot-toast';

const Dividends: React.FC = () => {
  const [dividends, setDividends] = useState<Dividend[]>(mockDividends);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<DividendStatus | 'all'>('all');
  const [filterType, setFilterType] = useState<DividendType | 'all'>('all');

  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    type: 'regular' as DividendType,
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newDividend: Dividend = {
      id: Date.now().toString(),
      amount: parseFloat(formData.amount),
      date: formData.date,
      type: formData.type,
      status: 'planned',
      description: formData.description,
      payments: mockShareholders.map(sh => ({
        shareholderId: sh.id,
        shareholderName: sh.name,
        shares: sh.shares,
        amount: Math.round(parseFloat(formData.amount) * (sh.sharePercentage / 100)),
        paid: false,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setDividends([newDividend, ...dividends]);
    setShowModal(false);
    setFormData({ amount: '', date: '', type: 'regular', description: '' });
    toast.success('Dywidenda została dodana');
  };

  const exportToCSV = () => {
    const headers = ['Data', 'Typ', 'Kwota', 'Status', 'Opis'];
    const rows = filteredDividends.map(d => [
      new Date(d.date).toLocaleDateString('pl-PL'),
      d.type === 'regular' ? 'Zwykła' : 'Nadzwyczajna',
      d.amount,
      d.status,
      d.description,
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dywidendy.csv';
    a.click();
    toast.success('Export CSV został pobrany');
  };

  const filteredDividends = dividends.filter(d => {
    if (filterStatus !== 'all' && d.status !== filterStatus) return false;
    if (filterType !== 'all' && d.type !== filterType) return false;
    return true;
  });

  const totalDividends12M = getTotalDividends12M();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dywidendy</h1>
          <p className="text-slate-400">Zarządzaj wypłatami dywidend dla akcjonariuszy</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Nowa dywidenda
        </button>
      </div>

      {/* KPI */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">Całkowita dywidenda (12m)</p>
            <p className="text-3xl font-bold text-white">
              {(totalDividends12M / 1000).toLocaleString()} tys PLN
            </p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-sm mb-1">Średnia kwartalna</p>
            <p className="text-2xl font-bold text-blue-400">
              {(totalDividends12M / 4 / 1000).toLocaleString()} tys PLN
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <FontAwesomeIcon icon={faFilter} className="text-slate-400" />
          <div className="flex-1 flex space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="input"
            >
              <option value="all">Wszystkie statusy</option>
              <option value="planned">Zaplanowana</option>
              <option value="in_progress">W trakcie</option>
              <option value="completed">Zakończona</option>
              <option value="cancelled">Anulowana</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="input"
            >
              <option value="all">Wszystkie typy</option>
              <option value="regular">Zwykła</option>
              <option value="special">Nadzwyczajna</option>
            </select>
          </div>

          <button onClick={exportToCSV} className="btn-secondary">
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Dividends Table */}
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Typ</th>
                <th>Kwota całkowita</th>
                <th>Status</th>
                <th>Opis</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredDividends.map((dividend) => (
                <tr key={dividend.id} className="hover:bg-slate-700">
                  <td>{new Date(dividend.date).toLocaleDateString('pl-PL')}</td>
                  <td>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      dividend.type === 'regular'
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-purple-900 text-purple-200'
                    }`}>
                      {dividend.type === 'regular' ? 'Zwykła' : 'Nadzwyczajna'}
                    </span>
                  </td>
                  <td className="font-semibold text-green-400">
                    {(dividend.amount / 1000).toLocaleString()} tys PLN
                  </td>
                  <td>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      dividend.status === 'completed' ? 'bg-green-900 text-green-200' :
                      dividend.status === 'in_progress' ? 'bg-yellow-900 text-yellow-200' :
                      dividend.status === 'planned' ? 'bg-blue-900 text-blue-200' :
                      'bg-red-900 text-red-200'
                    }`}>
                      {
                        dividend.status === 'completed' ? 'Zakończona' :
                        dividend.status === 'in_progress' ? 'W trakcie' :
                        dividend.status === 'planned' ? 'Zaplanowana' :
                        'Anulowana'
                      }
                    </span>
                  </td>
                  <td className="text-slate-400">{dividend.description}</td>
                  <td>
                    <button className="text-blue-400 hover:text-blue-300 text-sm">
                      Szczegóły
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">Nowa dywidenda</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-2">Kwota całkowita (PLN)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Data wypłaty</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Typ</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as DividendType })}
                  className="input w-full"
                >
                  <option value="regular">Zwykła</option>
                  <option value="special">Nadzwyczajna</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Opis</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input w-full"
                  rows={3}
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button type="submit" className="btn-primary flex-1">
                  Dodaj dywidendę
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary flex-1"
                >
                  Anuluj
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dividends;
