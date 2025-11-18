import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockShareholders, mockTransactions, mockTimelineEvents, mockDocuments, formatCurrency, formatShortDate } from '../data/mockData';
import { KPICard } from '../types';
import { DashboardSkeleton } from './LoadingSkeleton';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // Calculate KPIs
  const totalShares = mockShareholders.reduce((sum, sh) => sum + sh.shares, 0);
  const totalShareholders = mockShareholders.length;
  const recentTransactions = mockTransactions.filter(
    t => new Date(t.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ).length;
  const pendingDocuments = mockDocuments.filter(d => d.status === 'pending').length;
  const totalKnowHowValue = mockShareholders.reduce((sum, sh) => sum + (sh.knowHow?.value || 0), 0);

  // Prepare pie chart data
  const pieChartData = mockShareholders.map(sh => ({
    name: sh.name,
    value: sh.shares,
    percentage: sh.percentage
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const kpiCards: KPICard[] = [
    {
      title: 'Łączna liczba akcji',
      value: totalShares.toLocaleString('pl-PL'),
      change: '+5%',
      changeType: 'increase',
      icon: 'fa-chart-line',
      color: 'blue'
    },
    {
      title: 'Akcjonariusze',
      value: totalShareholders,
      change: '+1',
      changeType: 'increase',
      icon: 'fa-users',
      color: 'green'
    },
    {
      title: 'Transakcje (30 dni)',
      value: recentTransactions,
      change: '±0',
      changeType: 'neutral',
      icon: 'fa-exchange-alt',
      color: 'purple'
    },
    {
      title: 'Know-how Assets',
      value: formatCurrency(totalKnowHowValue),
      change: 'Nowy',
      changeType: 'increase',
      icon: 'fa-lightbulb',
      color: 'yellow'
    }
  ];

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <KPICardComponent key={index} kpi={kpi} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Shareholder Structure */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <i className="fas fa-chart-pie text-blue-400"></i>
            Struktura akcjonariatu
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#fff'
                }}
                formatter={(value: number) => [`${value.toLocaleString('pl-PL')} akcji`, 'Liczba akcji']}
              />
              <Legend
                wrapperStyle={{ color: '#fff' }}
                formatter={(value) => <span style={{ color: '#fff' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <i className="fas fa-history text-green-400"></i>
            Ostatnie transakcje
          </h3>
          <div className="space-y-3">
            {mockTransactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="bg-gray-700 rounded-lg p-4 hover:bg-gray-650 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      {transaction.from} → {transaction.to}
                    </p>
                    <p className="text-sm text-gray-400">{transaction.description}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium
                    ${transaction.status === 'completed' ? 'bg-green-600' : 'bg-yellow-600'}`}
                  >
                    {transaction.status === 'completed' ? 'Zakończona' : 'Oczekująca'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-400">{transaction.shares} akcji</span>
                  <span className="text-gray-400">{formatShortDate(transaction.date)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <i className="fas fa-clock text-purple-400"></i>
          Ostatnie wydarzenia
        </h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>
          <div className="space-y-6">
            {mockTimelineEvents.map((event) => (
              <div key={event.id} className="relative pl-12">
                <div className={`absolute left-0 w-8 h-8 rounded-full ${event.color} flex items-center justify-center`}>
                  <i className={`fas ${event.icon} text-white text-sm`}></i>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-semibold">{event.title}</h4>
                    <span className="text-sm text-gray-400">{formatShortDate(event.date)}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// KPI Card Component
interface KPICardComponentProps {
  kpi: KPICard;
}

const KPICardComponent: React.FC<KPICardComponentProps> = ({ kpi }) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'from-blue-600 to-blue-700';
      case 'green':
        return 'from-green-600 to-green-700';
      case 'purple':
        return 'from-purple-600 to-purple-700';
      case 'yellow':
        return 'from-yellow-600 to-yellow-700';
      case 'red':
        return 'from-red-600 to-red-700';
      default:
        return 'from-gray-600 to-gray-700';
    }
  };

  const getChangeIcon = () => {
    if (!kpi.changeType) return null;
    switch (kpi.changeType) {
      case 'increase':
        return <i className="fas fa-arrow-up text-green-400"></i>;
      case 'decrease':
        return <i className="fas fa-arrow-down text-red-400"></i>;
      case 'neutral':
        return <i className="fas fa-minus text-gray-400"></i>;
    }
  };

  return (
    <div className={`bg-gradient-to-br ${getColorClasses(kpi.color)} rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow`}>
      <div className="flex items-center justify-between mb-4">
        <div className="bg-white bg-opacity-20 rounded-full p-3">
          <i className={`fas ${kpi.icon} text-2xl text-white`}></i>
        </div>
        {kpi.change && (
          <div className="flex items-center gap-1 text-sm">
            {getChangeIcon()}
            <span className="text-white font-medium">{kpi.change}</span>
          </div>
        )}
      </div>
      <h3 className="text-white text-opacity-90 text-sm font-medium mb-1">{kpi.title}</h3>
      <p className="text-white text-3xl font-bold">{kpi.value}</p>
    </div>
  );
};

export default Dashboard;
