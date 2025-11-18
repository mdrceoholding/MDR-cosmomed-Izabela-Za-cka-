import React from 'react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { GrantCardProps } from '../../types/grantsHub';

const STATUS_STYLES = {
  'Aktywny': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Wkrótce': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Zamknięty': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  'Zawieszony': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
};

const GrantCard: React.FC<GrantCardProps> = ({ grant, onClick }) => {
  const formattedDeadline = format(new Date(grant.deadline), 'dd MMM yyyy', { locale: pl });
  const daysLeft = Math.ceil((new Date(grant.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div
      onClick={() => onClick(grant)}
      className="bg-slate-800 rounded-lg p-5 border border-slate-700 hover:border-blue-500/50 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02]"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{ backgroundColor: `${grant.category.color}20`, color: grant.category.color }}
            >
              <i className={`fa fa-${grant.category.icon}`}></i>
            </span>
            <span className="text-slate-400 text-xs font-medium">{grant.category.name}</span>
          </div>
          <h3 className="text-slate-100 font-semibold text-base leading-tight mb-1">
            {grant.name}
          </h3>
          <p className="text-slate-500 text-xs">{grant.id}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${
            STATUS_STYLES[grant.status]
          }`}
        >
          {grant.status}
        </span>
      </div>

      {/* Amount */}
      <div className="mb-3 pb-3 border-b border-slate-700">
        <p className="text-slate-400 text-xs mb-1">Kwota dofinansowania</p>
        <p className="text-slate-100 font-bold text-lg">
          {(grant.amount_min / 1000000).toFixed(1)}M - {(grant.amount_max / 1000000).toFixed(1)}M {grant.currency}
        </p>
      </div>

      {/* Deadline & Progress */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-slate-400 text-xs mb-1">Deadline</p>
          <p className="text-slate-100 text-sm font-medium">{formattedDeadline}</p>
          {daysLeft > 0 && daysLeft <= 30 && (
            <p className="text-orange-400 text-xs mt-1">
              <i className="fa fa-clock mr-1"></i>
              {daysLeft} dni
            </p>
          )}
        </div>
        <div>
          <p className="text-slate-400 text-xs mb-1">Success Rate</p>
          <div className="flex items-center gap-2">
            <p className="text-slate-100 text-sm font-medium">{grant.success_rate}%</p>
            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all"
                style={{ width: `${grant.success_rate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <p className="text-slate-400 text-xs">Postęp naboru</p>
          <p className="text-slate-300 text-xs font-medium">{grant.progress}%</p>
        </div>
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
            style={{ width: `${grant.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-700">
        <span className="text-slate-500 text-xs">{grant.program_type}</span>
        <button
          className="text-blue-400 hover:text-blue-300 text-xs font-medium flex items-center gap-1"
          onClick={(e) => {
            e.stopPropagation();
            onClick(grant);
          }}
        >
          Zobacz szczegóły
          <i className="fa fa-arrow-right text-xs"></i>
        </button>
      </div>
    </div>
  );
};

export default GrantCard;
