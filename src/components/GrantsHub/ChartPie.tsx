import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface ChartPieProps {
  data: Array<{ name: string; value: number }>;
}

const STATUS_COLORS: Record<string, string> = {
  'Aktywny': '#4caf50',
  'Wkrótce': '#3477eb',
  'Zamknięty': '#64748b',
  'Zawieszony': '#ff9800'
};

const ChartPie: React.FC<ChartPieProps> = ({ data }) => {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || '#64748b'} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f1f5f9'
            }}
          />
          <Legend
            wrapperStyle={{ color: '#f1f5f9', fontSize: '12px' }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPie;
