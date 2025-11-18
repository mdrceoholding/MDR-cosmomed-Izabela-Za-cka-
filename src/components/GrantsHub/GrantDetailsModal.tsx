import React from 'react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { GrantDetailsModalProps } from '../../types/grantsHub';

const STATUS_STYLES = {
  'Aktywny': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Wkrótce': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Zamknięty': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  'Zawieszony': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
};

const GrantDetailsModal: React.FC<GrantDetailsModalProps> = ({ grant, open, onClose }) => {
  if (!open || !grant) return null;

  const formattedDeadline = format(new Date(grant.deadline), 'dd MMMM yyyy', { locale: pl });
  const daysLeft = Math.ceil((new Date(grant.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                  style={{ backgroundColor: `${grant.category.color}20`, color: grant.category.color }}
                >
                  <i className={`fa fa-${grant.category.icon}`}></i>
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">{grant.name}</h2>
                  <p className="text-slate-400 text-sm">{grant.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${STATUS_STYLES[grant.status]}`}
                >
                  {grant.status}
                </span>
                <span className="text-slate-400 text-sm">{grant.program_type}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-100 text-2xl"
            >
              <i className="fa fa-times"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-xs mb-1">Kwota dofinansowania</p>
              <p className="text-slate-100 font-bold text-xl">
                {(grant.amount_min / 1000000).toFixed(1)}M - {(grant.amount_max / 1000000).toFixed(1)}M {grant.currency}
              </p>
            </div>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-xs mb-1">Deadline</p>
              <p className="text-slate-100 font-bold text-lg">{formattedDeadline}</p>
              {daysLeft > 0 && daysLeft <= 30 && (
                <p className="text-orange-400 text-sm mt-1">
                  <i className="fa fa-clock mr-1"></i>
                  Pozostało {daysLeft} dni
                </p>
              )}
            </div>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-xs mb-1">Wskaźnik sukcesu</p>
              <div className="flex items-center gap-3">
                <p className="text-slate-100 font-bold text-xl">{grant.success_rate}%</p>
                <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                    style={{ width: `${grant.success_rate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-slate-100 font-semibold text-lg mb-3">Opis programu</h3>
            <p className="text-slate-300 leading-relaxed">{grant.description}</p>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-slate-100 font-semibold text-lg mb-3">Wymagania</h3>
            <ul className="space-y-2">
              {grant.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300">
                  <i className="fa fa-check-circle text-green-400 mt-1"></i>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Beneficiaries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-slate-100 font-semibold text-lg mb-3">Beneficjenci docelowi</h3>
              <div className="flex flex-wrap gap-2">
                {grant.target_beneficiary.map((beneficiary, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                  >
                    {beneficiary}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-slate-100 font-semibold text-lg mb-3">Kraje/Regiony</h3>
              <div className="flex flex-wrap gap-2">
                {grant.country_region.map((region, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-slate-100 font-semibold text-lg">Postęp naboru</h3>
              <span className="text-slate-300 font-medium">{grant.progress}%</span>
            </div>
            <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 transition-all"
                style={{ width: `${grant.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <a
              href={grant.apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
            >
              <i className="fa fa-external-link mr-2"></i>
              Aplikuj teraz
            </a>
            <button
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium rounded-lg transition-colors"
            >
              <i className="fa fa-bookmark mr-2"></i>
              Zapisz
            </button>
            <button
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium rounded-lg transition-colors"
            >
              <i className="fa fa-share-alt mr-2"></i>
              Udostępnij
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrantDetailsModal;
