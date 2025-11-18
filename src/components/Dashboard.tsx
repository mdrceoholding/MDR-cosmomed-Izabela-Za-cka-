import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { companyData, shareholders } from '../data/companyData';
import LoadingSkeleton from './LoadingSkeleton';
import toast from 'react-hot-toast';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Symulacja ładowania danych
    const timer = setTimeout(() => {
      setLoading(false);
      toast.success('Dashboard załadowany!', { duration: 2000 });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Dane dla wykresu kołowego (Cap Table)
  const pieData = shareholders.map(sh => ({
    name: sh.name,
    value: sh.percentage,
    shares: sh.shares
  }));

  // Dane dla wykresu słupkowego (liczba akcji)
  const barData = shareholders.map(sh => ({
    name: sh.name.split(' ')[0], // Tylko imię/pierwsza część nazwy
    akcje: sh.shares,
    procent: sh.percentage
  }));

  // Dane dla wykresu liniowego (historia wartości akcji - mock)
  const lineData = [
    { miesiac: 'Sty', wartosc: 95 },
    { miesiac: 'Lut', wartosc: 98 },
    { miesiac: 'Mar', wartosc: 100 },
    { miesiac: 'Kwi', wartosc: 105 },
    { miesiac: 'Maj', wartosc: 108 },
    { miesiac: 'Cze', wartosc: 110 }
  ];

  // Statystyki
  const totalShares = shareholders.reduce((sum, sh) => sum + sh.shares, 0);
  const totalValue = totalShares * 100; // Zakładając 100 PLN za akcję
  const physicalShareholders = shareholders.filter(sh => sh.type === 'physical').length;
  const legalShareholders = shareholders.filter(sh => sh.type === 'legal').length;

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <LoadingSkeleton type="card" count={3} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoadingSkeleton type="chart" count={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Przegląd kluczowych wskaźników spółki {companyData.name}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Akcjonariusze</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{shareholders.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {physicalShareholders} fizycznych, {legalShareholders} prawnych
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4">
              <i className="fas fa-users text-2xl text-blue-600 dark:text-blue-300"></i>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Łączna liczba akcji</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalShares.toLocaleString()}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                <i className="fas fa-arrow-up mr-1"></i>Kapitał w pełni opłacony
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 rounded-full p-4">
              <i className="fas fa-chart-line text-2xl text-green-600 dark:text-green-300"></i>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Kapitał zakładowy</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{(totalValue).toLocaleString()}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">PLN</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-4">
              <i className="fas fa-coins text-2xl text-purple-600 dark:text-purple-300"></i>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Wzory dokumentów</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">10</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Gotowe szablony</p>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900 rounded-full p-4">
              <i className="fas fa-file-invoice text-2xl text-orange-600 dark:text-orange-300"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart - Cap Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i className="fas fa-chart-pie text-blue-600"></i>
            Struktura akcjonariatu
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white'
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value}% (${props.payload.shares} akcji)`,
                  name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Liczba akcji */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i className="fas fa-chart-bar text-green-600"></i>
            Liczba akcji na akcjonariusza
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Legend />
              <Bar dataKey="akcje" fill="#10b981" name="Liczba akcji" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Wartość akcji w czasie */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i className="fas fa-chart-line text-purple-600"></i>
            Wartość akcji (ostatnie 6 miesięcy)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="miesiac" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white'
                }}
                formatter={(value: number) => [`${value} PLN`, 'Wartość']}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="wartosc"
                stroke="#8b5cf6"
                strokeWidth={3}
                name="Wartość (PLN)"
                dot={{ fill: '#8b5cf6', r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Company Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i className="fas fa-building text-orange-600"></i>
            Informacje o spółce
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">Nazwa</span>
              <span className="font-medium text-gray-900 dark:text-white">{companyData.name}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">KRS</span>
              <span className="font-medium text-gray-900 dark:text-white">{companyData.krs}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">NIP</span>
              <span className="font-medium text-gray-900 dark:text-white">{companyData.nip}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">Adres</span>
              <span className="font-medium text-gray-900 dark:text-white text-right">{companyData.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <i className="fas fa-history text-blue-600"></i>
          Ostatnia aktywność
        </h2>
        <div className="space-y-3">
          {[
            { icon: 'fa-file-alt', text: 'Wygenerowano Uchwałę emisji akcji', time: '2 godziny temu', color: 'blue' },
            { icon: 'fa-user-plus', text: 'Dodano nowego akcjonariusza: Investment Fund', time: '1 dzień temu', color: 'green' },
            { icon: 'fa-chart-pie', text: 'Zaktualizowano Cap Table', time: '3 dni temu', color: 'purple' },
            { icon: 'fa-file-pdf', text: 'Wyeksportowano raport roczny', time: '1 tydzień temu', color: 'orange' }
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className={`bg-${activity.color}-100 dark:bg-${activity.color}-900 rounded-full p-2`}>
                <i className={`fas ${activity.icon} text-${activity.color}-600 dark:text-${activity.color}-300`}></i>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.text}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
