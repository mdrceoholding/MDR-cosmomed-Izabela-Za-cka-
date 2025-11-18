import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, Cell } from 'recharts';
import { BubbleChartDataPoint } from '../../types/grantsHub';

interface ChartBubbleProps {
  data: BubbleChartDataPoint[];
}

const CATEGORY_COLORS: Record<string, string> = {
  'Badania': '#3477eb',
  'Innowacje': '#9cf7ff',
  'Infrastruktura': '#4caf50',
  'Cyfryzacja': '#ff9800',
  'Edukacja': '#9c27b0'
};

const ChartBubble: React.FC<ChartBubbleProps> = ({ data }) => {
  const formattedData = data.map(d => ({
    ...d,
    z: d.success_rate * 100 // Scale for bubble size
  }));

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis
            type="number"
            dataKey="amount"
            name="Kwota maks."
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
            label={{
              value: 'Kwota maksymalna (EUR)',
              position: 'insideBottom',
              offset: -10,
              fill: '#94a3b8'
            }}
            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
          />
          <YAxis
            type="number"
            dataKey="progress"
            name="Postęp"
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
            label={{
              value: 'Postęp (%)',
              angle: -90,
              position: 'insideLeft',
              fill: '#94a3b8'
            }}
          />
          <ZAxis type="number" dataKey="z" range={[50, 1000]} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f1f5f9'
            }}
            formatter={(value: any, name: string) => {
              if (name === 'Kwota maks.') return `${(value / 1000000).toFixed(2)}M EUR`;
              if (name === 'Postęp') return `${value}%`;
              if (name === 'Success Rate') return `${value}%`;
              return value;
            }}
            labelFormatter={(label) => {
              const point = data.find(d => d.name === label);
              return point ? point.name : label;
            }}
          />
          <Scatter name="Dotacje" data={formattedData}>
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CATEGORY_COLORS[entry.category] || '#64748b'}
                fillOpacity={0.7}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartBubble;
