import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KPICard from '../../components/GrantsHub/KPICard';
import ChartBar from '../../components/GrantsHub/ChartBar';
import ChartPie from '../../components/GrantsHub/ChartPie';
import ChartBubble from '../../components/GrantsHub/ChartBubble';
import ChartTimeline from '../../components/GrantsHub/ChartTimeline';
import ChartHeatmap from '../../components/GrantsHub/ChartHeatmap';
import GrantCard from '../../components/GrantsHub/GrantCard';
import GrantDetailsModal from '../../components/GrantsHub/GrantDetailsModal';
import {
  getDashboardKPIs,
  getBarChartData,
  getPieChartData,
  getBubbleChartData,
  getTimelineData,
  getHeatmapData,
  getGrants,
  getCategories
} from '../../utils/grantsApi';
import { Grant } from '../../types/grantsHub';

const GrantsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGrant, setSelectedGrant] = useState<Grant | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const kpis = getDashboardKPIs();
  const barChartData = getBarChartData();
  const pieChartData = getPieChartData();
  const bubbleChartData = getBubbleChartData();
  const timelineData = getTimelineData();
  const heatmapData = getHeatmapData();
  const categories = getCategories();

  const recentGrants = getGrants({ statuses: ['Aktywny', 'Wkrótce'] }).slice(0, 6);

  const handleGrantClick = (grant: Grant) => {
    setSelectedGrant(grant);
    setModalOpen(true);
  };

  const barData = barChartData.categories.map((category, index) => ({
    category,
    count: barChartData.counts[index],
    color: categories.find(c => c.name === category)?.color || '#64748b'
  }));

  const pieData = pieChartData.statuses.map((status, index) => ({
    name: status,
    value: pieChartData.percentages[index]
  }));

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100 mb-2">
              <i className="fa fa-euro-sign text-blue-400 mr-3"></i>
              EU Grants Hub - MedTech
            </h1>
            <p className="text-slate-400">System zarządzania dotacjami UE dla branży MedTech</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/grants-hub/grants')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <i className="fa fa-list mr-2"></i>
              Wszystkie dotacje
            </button>
            <button
              onClick={() => navigate('/grants-hub/partners')}
              className="bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <i className="fa fa-users mr-2"></i>
              Partnerzy
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Dostępne dotacje"
            value={kpis.total_grants}
            icon="database"
            color="#3477eb"
            trend={{ value: 12, isPositive: true }}
          />
          <KPICard
            title="Aktywne nabory"
            value={kpis.active_grants}
            icon="folder-open"
            color="#4caf50"
            trend={{ value: 8, isPositive: true }}
          />
          <KPICard
            title="Deadliny (30 dni)"
            value={kpis.deadlines_30d}
            icon="clock"
            color="#ff9800"
            trend={{ value: 3, isPositive: false }}
          />
          <KPICard
            title="Wskaźnik sukcesu"
            value={`${kpis.avg_success_rate}%`}
            icon="chart-line"
            color="#9cf7ff"
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-lg">
            <h3 className="text-slate-100 font-semibold text-lg mb-4">
              Liczba dotacji według kategorii
            </h3>
            <div className="h-80">
              <ChartBar data={barData} />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-lg">
            <h3 className="text-slate-100 font-semibold text-lg mb-4">
              Statusy naborów (%)
            </h3>
            <div className="h-80">
              <ChartPie data={pieData} />
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bubble Chart */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-lg">
            <h3 className="text-slate-100 font-semibold text-lg mb-4">
              Kwota vs Postęp vs Success Rate
            </h3>
            <div className="h-80">
              <ChartBubble data={bubbleChartData} />
            </div>
          </div>

          {/* Heatmap */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-lg">
            <h3 className="text-slate-100 font-semibold text-lg mb-4">
              Skuteczność według kategorii
            </h3>
            <div className="h-80">
              <ChartHeatmap data={heatmapData} />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-lg">
          <h3 className="text-slate-100 font-semibold text-lg mb-4">
            Deadliny w czasie
          </h3>
          <div className="h-80">
            <ChartTimeline data={timelineData} />
          </div>
        </div>

        {/* Recent Grants */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-100 font-semibold text-xl">
              Najnowsze aktywne dotacje
            </h3>
            <button
              onClick={() => navigate('/grants-hub/grants')}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              Zobacz wszystkie
              <i className="fa fa-arrow-right ml-2"></i>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentGrants.map(grant => (
              <GrantCard
                key={grant.id}
                grant={grant}
                onClick={handleGrantClick}
              />
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-6 border border-blue-800/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="fa fa-info-circle text-blue-400 text-2xl"></i>
            </div>
            <div>
              <h4 className="text-slate-100 font-semibold mb-2">Know-how Artura Fijołka</h4>
              <p className="text-slate-300 text-sm mb-2">
                System Grants Hub został opracowany z wykorzystaniem autorskiej metodologii zarządzania projektami europejskimi.
              </p>
              <p className="text-blue-400 font-bold text-lg">
                Wartość know-how: 13.999.000 PLN
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grant Details Modal */}
      <GrantDetailsModal
        grant={selectedGrant}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default GrantsDashboard;
