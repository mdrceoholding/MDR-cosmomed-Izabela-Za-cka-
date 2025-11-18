import { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { shareholdersMock, companyMock, emissionsMock } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';
import LoadingSkeleton from './LoadingSkeleton';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Symulacja ładowania danych
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton type="card" count={4} />
        <LoadingSkeleton type="table" count={3} />
      </div>
    );
  }

  const shareholderData = shareholdersMock.map(sh => ({
    name: sh.name,
    value: sh.shares,
    percentage: sh.percentage
  }));

  const emissionData = emissionsMock.map(em => ({
    series: `Seria ${em.series}`,
    shares: em.shares,
    value: em.totalValue
  }));

  const monthlyData = [
    { month: 'Sty', transactions: 12, value: 15000 },
    { month: 'Lut', transactions: 19, value: 22000 },
    { month: 'Mar', transactions: 15, value: 18000 },
    { month: 'Kwi', transactions: 25, value: 30000 },
    { month: 'Maj', transactions: 22, value: 27000 },
    { month: 'Cze', transactions: 30, value: 35000 }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">📊 Dashboard</h1>
      <p className="mb-8 text-slate-400">
        Przegląd kluczowych wskaźników i statystyk spółki
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium opacity-90">Akcjonariusze</span>
            <i className="fa-solid fa-users text-2xl opacity-70"></i>
          </div>
          <div className="text-3xl font-bold">{companyMock.Akcjonariusze}</div>
          <div className="text-xs mt-2 opacity-75">Wszyscy zarejestrowani</div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium opacity-90">Akcje</span>
            <i className="fa-solid fa-chart-pie text-2xl opacity-70"></i>
          </div>
          <div className="text-3xl font-bold">{companyMock.Akcje.toLocaleString()}</div>
          <div className="text-xs mt-2 opacity-75">Łącznie wyemitowane</div>
        </div>

        <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium opacity-90">Kapitał</span>
            <i className="fa-solid fa-sack-dollar text-2xl opacity-70"></i>
          </div>
          <div className="text-3xl font-bold">{formatCurrency(companyMock.Kapital)}</div>
          <div className="text-xs mt-2 opacity-75">Kapitał zakładowy</div>
        </div>

        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium opacity-90">Emisje</span>
            <i className="fa-solid fa-coins text-2xl opacity-70"></i>
          </div>
          <div className="text-3xl font-bold">{emissionsMock.length}</div>
          <div className="text-xs mt-2 opacity-75">Seria akcji</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart - Struktura akcjonariatu */}
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Struktura akcjonariatu</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={shareholderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {shareholderData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Emisje */}
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Emisje akcji</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={emissionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="series" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="shares" fill="#3b82f6" name="Liczba akcji" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart - Miesięczne transakcje */}
      <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4">Aktywność miesięczna</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis yAxisId="left" stroke="#94a3b8" />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="transactions"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Liczba transakcji"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="value"
              stroke="#ec4899"
              strokeWidth={2}
              name="Wartość (PLN)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-slate-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4">Ostatnia aktywność</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-3 bg-slate-700 rounded-lg">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-plus text-white"></i>
            </div>
            <div className="flex-1">
              <div className="font-semibold">Nowa emisja akcji serii C</div>
              <div className="text-sm text-slate-400">2 dni temu</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-slate-700 rounded-lg">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-arrow-right-arrow-left text-white"></i>
            </div>
            <div className="flex-1">
              <div className="font-semibold">Transfer 500 akcji</div>
              <div className="text-sm text-slate-400">5 dni temu</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-slate-700 rounded-lg">
            <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-file-signature text-white"></i>
            </div>
            <div className="flex-1">
              <div className="font-semibold">Nowa uchwała WZA</div>
              <div className="text-sm text-slate-400">1 tydzień temu</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
