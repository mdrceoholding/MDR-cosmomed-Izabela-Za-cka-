import React from 'react';
import { KPICardProps } from '../../types/grantsHub';

const KPICard: React.FC<KPICardProps> = ({ title, value, icon, trend, color }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-all duration-200 shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-medium mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-slate-100 mb-3">{value}</h3>
          {trend && (
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? 'text-green-400' : 'text-red-400'
                }`}
              >
                <i className={`fa fa-arrow-${trend.isPositive ? 'up' : 'down'} mr-1`}></i>
                {Math.abs(trend.value)}%
              </span>
              <span className="text-slate-500 text-xs">vs. poprzedni miesiąc</span>
            </div>
          )}
        </div>
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20`, color: color }}
        >
          <i className={`fa fa-${icon} text-2xl`}></i>
        </div>
      </div>
    </div>
  );
};

export default KPICard;
