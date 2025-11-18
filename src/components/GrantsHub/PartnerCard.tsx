import React from 'react';
import { PartnerCardProps } from '../../types/grantsHub';

const TYPE_COLORS: Record<string, string> = {
  'Przedsiębiorstwo': '#3477eb',
  'Uczelnia': '#9c27b0',
  'Instytut': '#4caf50',
  'NGO': '#ff9800'
};

const COUNTRY_FLAGS: Record<string, string> = {
  'PL': '🇵🇱',
  'DE': '🇩🇪',
  'SE': '🇸🇪',
  'DK': '🇩🇰',
  'NL': '🇳🇱',
  'FR': '🇫🇷',
  'IE': '🇮🇪',
  'ES': '🇪🇸',
  'IT': '🇮🇹',
  'AT': '🇦🇹',
  'UK': '🇬🇧'
};

const PartnerCard: React.FC<PartnerCardProps> = ({ partner, onContact, onViewProfile }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fa fa-star ${i < rating ? 'text-yellow-400' : 'text-slate-600'}`}
      ></i>
    ));
  };

  return (
    <div className="bg-slate-800 rounded-lg p-5 border border-slate-700 hover:border-blue-500/50 transition-all duration-200 shadow-lg hover:shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{COUNTRY_FLAGS[partner.country] || '🌍'}</span>
            <span
              className="px-2 py-1 rounded text-xs font-medium"
              style={{ backgroundColor: `${TYPE_COLORS[partner.type]}20`, color: TYPE_COLORS[partner.type] }}
            >
              {partner.type}
            </span>
            {partner.verified && (
              <span className="text-blue-400" title="Zweryfikowany partner">
                <i className="fa fa-certificate"></i>
              </span>
            )}
          </div>
          <h3 className="text-slate-100 font-semibold text-base leading-tight mb-1">
            {partner.name}
          </h3>
          <div className="flex items-center gap-1 mb-2">
            {renderStars(partner.rating)}
            <span className="text-slate-400 text-xs ml-2">{partner.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Specializations */}
      <div className="mb-4">
        <p className="text-slate-400 text-xs mb-2">Specjalizacje:</p>
        <div className="flex flex-wrap gap-1">
          {partner.specializations.slice(0, 3).map((spec, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded"
            >
              {spec}
            </span>
          ))}
          {partner.specializations.length > 3 && (
            <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded">
              +{partner.specializations.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-700">
        <div>
          <p className="text-slate-400 text-xs mb-1">Projekty</p>
          <p className="text-slate-100 text-lg font-bold">{partner.success_projects}</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs mb-1">Kraj</p>
          <p className="text-slate-100 text-sm font-medium">{partner.country}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <i className="fa fa-envelope text-slate-500 w-4"></i>
            <a
              href={`mailto:${partner.contact_info.email}`}
              className="text-blue-400 hover:text-blue-300 truncate"
              onClick={(e) => e.stopPropagation()}
            >
              {partner.contact_info.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <i className="fa fa-phone text-slate-500 w-4"></i>
            <span className="text-slate-300">{partner.contact_info.phone}</span>
          </div>
          {partner.contact_info.website && (
            <div className="flex items-center gap-2 text-xs">
              <i className="fa fa-globe text-slate-500 w-4"></i>
              <a
                href={partner.contact_info.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 truncate"
                onClick={(e) => e.stopPropagation()}
              >
                {partner.contact_info.website}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onViewProfile(partner)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors"
        >
          <i className="fa fa-user mr-2"></i>
          Profil
        </button>
        <button
          onClick={() => onContact(partner)}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-100 text-sm font-medium py-2 px-3 rounded transition-colors"
        >
          <i className="fa fa-envelope mr-2"></i>
          Kontakt
        </button>
      </div>
    </div>
  );
};

export default PartnerCard;
