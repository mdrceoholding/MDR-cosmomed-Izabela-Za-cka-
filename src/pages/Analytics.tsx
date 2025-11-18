import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faShare } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockAnalytics } from '../data/mockData';
import toast from 'react-hot-toast';

const Analytics: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('1Y');
  const analytics = mockAnalytics;

  const timeFilters = ['1M', '3M', '6M', '1Y', 'ALL'];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const handleExport = () => {
    toast.success('Wykresy zostały wyeksportowane jako PNG');
  };

  const handleShare = () => {
    toast.success('Link udostępniający został skopiowany');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analityka</h1>
          <p className="text-slate-400">Zaawansowane wskaźniki i wizualizacje danych</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={handleExport} className="btn-secondary">
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Export PNG
          </button>
          <button onClick={handleShare} className="btn-primary">
            <FontAwesomeIcon icon={faShare} className="mr-2" />
            Udostępnij
          </button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-slate-400 text-sm mb-1">ROE (Return on Equity)</p>
          <p className="text-3xl font-bold text-white">{analytics.metrics.roe}%</p>
          <p className="text-green-400 text-sm mt-2">+2.3% vs poprzedni kwartał</p>
        </div>
        <div className="card">
          <p className="text-slate-400 text-sm mb-1">ROA (Return on Assets)</p>
          <p className="text-3xl font-bold text-white">{analytics.metrics.roa}%</p>
          <p className="text-green-400 text-sm mt-2">+1.8% vs poprzedni kwartał</p>
        </div>
        <div className="card">
          <p className="text-slate-400 text-sm mb-1">P/E Ratio</p>
          <p className="text-3xl font-bold text-white">{analytics.metrics.peRatio}</p>
          <p className="text-blue-400 text-sm mt-2">Branżowa średnia: 16.2</p>
        </div>
      </div>

      {/* Time Filter */}
      <div className="card">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Okres analizy</h2>
          <div className="flex space-x-2">
            {timeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-2 rounded-lg ${
                  timeFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Value Growth Chart */}
      <div className="card">
        <h2 className="text-xl font-semibold text-white mb-4">Wzrost wartości w czasie</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analytics.valueGrowth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Wartość (PLN)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Capital Breakdown and Shareholder Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Capital Breakdown */}
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-4">Podział kapitału</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.capitalBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.type}: ${entry.percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analytics.capitalBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {analytics.capitalBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-slate-300">{item.type}</span>
                </div>
                <span className="text-white font-semibold">
                  {(item.value / 1000000).toFixed(2)} M PLN
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shareholder Activity */}
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-4">Aktywność akcjonariuszy</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.shareholderActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="shareholderName" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend />
              <Bar dataKey="documentsUploaded" fill="#3b82f6" name="Dokumenty" />
              <Bar dataKey="transactions" fill="#10b981" name="Transakcje" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Dividend Forecast */}
      <div className="card">
        <h2 className="text-xl font-semibold text-white mb-4">Prognoza dywidend na 12m</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {analytics.dividendForecast.map((forecast) => (
            <div
              key={forecast.quarter}
              className="p-4 rounded-lg bg-slate-700"
            >
              <p className="text-slate-400 text-sm mb-2">{forecast.quarter}</p>
              <p className="text-2xl font-bold text-white mb-2">
                {(forecast.estimatedAmount / 1000).toLocaleString()} tys PLN
              </p>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-slate-600 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${forecast.confidence}%` }}
                  />
                </div>
                <span className="text-slate-400 text-xs">{forecast.confidence}%</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">pewność prognozy</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="card">
        <h2 className="text-xl font-semibold text-white mb-4">Podsumowanie</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-slate-400 text-sm mb-1">Całkowita wartość</p>
            <p className="text-2xl font-bold text-white">
              {(analytics.totalValue / 1000000).toFixed(2)} M PLN
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-1">Całkowita liczba akcji</p>
            <p className="text-2xl font-bold text-white">
              {analytics.totalShares.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-1">Średnia cena akcji</p>
            <p className="text-2xl font-bold text-white">
              {analytics.averageSharePrice.toLocaleString()} PLN
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
