import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faCoins,
  faChartLine,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import { mockShareholders, mockDividends, getTotalDividends12M, getUpcomingEvents } from '../data/mockData';
import { KPI } from '../types';

const Dashboard: React.FC = () => {
  const totalShareholders = mockShareholders.length;
  const totalShares = mockShareholders.reduce((sum, sh) => sum + sh.shares, 0);
  const totalValue = mockShareholders.reduce((sum, sh) => sum + sh.value, 0);
  const totalDividends12M = getTotalDividends12M();
  const upcomingEvents = getUpcomingEvents(7);
  const pendingDividends = mockDividends.filter(d => d.status === 'planned' || d.status === 'in_progress');

  const kpis: KPI[] = [
    {
      label: 'Całkowita wartość kapitału',
      value: `${(totalValue / 1000000).toFixed(2)} M PLN`,
      change: 12.5,
      trend: 'up',
    },
    {
      label: 'Liczba akcjonariuszy',
      value: totalShareholders,
      change: 0,
      trend: 'stable',
    },
    {
      label: 'Całkowita dywidenda (12m)',
      value: `${(totalDividends12M / 1000).toFixed(0)} tys PLN`,
      change: 8.3,
      trend: 'up',
    },
    {
      label: 'Całkowita liczba akcji',
      value: totalShares.toLocaleString(),
      change: 0,
      trend: 'stable',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Przegląd rejestru akcjonariuszy PSA</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-white">{kpi.value}</p>
              </div>
              {kpi.trend !== 'stable' && (
                <div className={`flex items-center space-x-1 ${
                  kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  <FontAwesomeIcon
                    icon={kpi.trend === 'up' ? faArrowUp : faArrowDown}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">{kpi.change}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/shareholders" className="card hover:border-blue-500 transition-colors cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faUsers} className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Akcjonariusze</h3>
              <p className="text-slate-400 text-sm">{totalShareholders} akcjonariuszy</p>
            </div>
          </div>
        </Link>

        <Link to="/dividends" className="card hover:border-blue-500 transition-colors cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faCoins} className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Dywidendy</h3>
              <p className="text-slate-400 text-sm">{pendingDividends.length} oczekujące</p>
            </div>
          </div>
        </Link>

        <Link to="/analytics" className="card hover:border-blue-500 transition-colors cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faChartLine} className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Analityka</h3>
              <p className="text-slate-400 text-sm">Raporty i wykresy</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Shareholders */}
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-4">Top Akcjonariusze</h3>
          <div className="space-y-3">
            {mockShareholders
              .sort((a, b) => b.sharePercentage - a.sharePercentage)
              .slice(0, 5)
              .map((shareholder) => (
                <div key={shareholder.id} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                  <div>
                    <p className="text-white font-medium">{shareholder.name}</p>
                    <p className="text-slate-400 text-sm">{shareholder.shares.toLocaleString()} akcji</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-400 font-semibold">{shareholder.sharePercentage.toFixed(2)}%</p>
                    <p className="text-slate-500 text-xs capitalize">{shareholder.type}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-4">Nadchodzące wydarzenia</h3>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.slice(0, 5).map((event) => (
                <div key={event.id} className="flex items-start space-x-3 py-2 border-b border-slate-700 last:border-0">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: event.color }} />
                  <div className="flex-1">
                    <p className="text-white font-medium">{event.title}</p>
                    <p className="text-slate-400 text-sm">{new Date(event.date).toLocaleDateString('pl-PL')}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-center py-4">Brak nadchodzących wydarzeń</p>
          )}
          <Link to="/calendar" className="block mt-4 text-center text-blue-400 hover:text-blue-300 text-sm">
            Zobacz wszystkie →
          </Link>
        </div>
      </div>

      {/* Pending Dividends */}
      {pendingDividends.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-4">Oczekujące dywidendy</h3>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Typ</th>
                  <th>Kwota</th>
                  <th>Status</th>
                  <th>Opis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {pendingDividends.map((dividend) => (
                  <tr key={dividend.id} className="hover:bg-slate-700">
                    <td>{new Date(dividend.date).toLocaleDateString('pl-PL')}</td>
                    <td>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        dividend.type === 'regular' ? 'bg-blue-900 text-blue-200' : 'bg-purple-900 text-purple-200'
                      }`}>
                        {dividend.type === 'regular' ? 'Zwykła' : 'Nadzwyczajna'}
                      </span>
                    </td>
                    <td className="font-semibold">{(dividend.amount / 1000).toLocaleString()} tys PLN</td>
                    <td>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        dividend.status === 'planned' ? 'bg-yellow-900 text-yellow-200' : 'bg-green-900 text-green-200'
                      }`}>
                        {dividend.status === 'planned' ? 'Zaplanowana' : 'W trakcie'}
                      </span>
                    </td>
                    <td className="text-slate-400">{dividend.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
