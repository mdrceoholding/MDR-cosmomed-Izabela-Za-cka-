import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ChartBarProps {
  data: Array<{ category: string; count: number; color: string }>;
}

const ChartBar: React.FC<ChartBarProps> = ({ data }) => {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3477eb" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3477eb" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis
            dataKey="category"
            stroke="#94a3b8"
            angle={-45}
            textAnchor="end"
            height={80}
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f1f5f9'
            }}
            labelStyle={{ color: '#9cf7ff', fontWeight: 'bold' }}
          />
          <Bar dataKey="count" fill="url(#barGradient)" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartBar;
