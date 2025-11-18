import React, { useState } from 'react';
import { PartnerListProps } from '../../types/grantsHub';
import PartnerCard from './PartnerCard';

const PartnerList: React.FC<PartnerListProps> = ({ partners, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterCountry, setFilterCountry] = useState<string>('');

  const filteredPartners = partners.filter(partner => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.specializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = !filterType || partner.type === filterType;
    const matchesCountry = !filterCountry || partner.country === filterCountry;

    return matchesSearch && matchesType && matchesCountry;
  });

  const availableTypes = Array.from(new Set(partners.map(p => p.type)));
  const availableCountries = Array.from(new Set(partners.map(p => p.country)));

  const handleContact = (partner: any) => {
    window.location.href = `mailto:${partner.contact_info.email}`;
  };

  const handleViewProfile = (partner: any) => {
    onSelect(partner);
  };

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative md:col-span-1">
            <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
            <input
              type="text"
              placeholder="Szukaj partnera..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Wszystkie typy</option>
              {availableTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Country Filter */}
          <div className="relative">
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Wszystkie kraje</option>
              {availableCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-3 pt-3 border-t border-slate-700">
          <p className="text-slate-400 text-sm">
            Znaleziono <span className="text-blue-400 font-semibold">{filteredPartners.length}</span> partnerów
          </p>
        </div>
      </div>

      {/* Partners Grid */}
      {filteredPartners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPartners.map(partner => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              onContact={handleContact}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
          <i className="fa fa-search text-slate-600 text-4xl mb-4"></i>
          <p className="text-slate-400 text-lg mb-2">Nie znaleziono partnerów</p>
          <p className="text-slate-500 text-sm">Spróbuj zmienić kryteria wyszukiwania</p>
        </div>
      )}
    </div>
  );
};

export default PartnerList;
