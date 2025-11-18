import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot } from 'recharts';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { TimelineDataPoint } from '../../types/grantsHub';

interface ChartTimelineProps {
  data: TimelineDataPoint[];
}

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={6}
      fill="#3477eb"
      stroke="#9cf7ff"
      strokeWidth={2}
      style={{ cursor: 'pointer' }}
    />
  );
};

const ChartTimeline: React.FC<ChartTimelineProps> = ({ data }) => {
  const formattedData = data.map(d => ({
    ...d,
    dateFormatted: format(new Date(d.date), 'dd MMM yyyy', { locale: pl }),
    timestamp: new Date(d.date).getTime()
  }));

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis
            dataKey="dateFormatted"
            stroke="#94a3b8"
            angle={-45}
            textAnchor="end"
            height={80}
            style={{ fontSize: '11px' }}
          />
          <YAxis
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
            label={{
              value: 'Kwota (EUR)',
              angle: -90,
              position: 'insideLeft',
              fill: '#94a3b8'
            }}
            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f1f5f9'
            }}
            labelStyle={{ color: '#9cf7ff', fontWeight: 'bold' }}
            formatter={(value: any) => [`${(value / 1000000).toFixed(2)}M EUR`, 'Kwota']}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                return payload[0].payload.grant_name;
              }
              return label;
            }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3477eb"
            strokeWidth={3}
            dot={<CustomDot />}
            activeDot={{ r: 8, fill: '#9cf7ff', stroke: '#3477eb', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartTimeline;
