import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PartnerList from '../../components/GrantsHub/PartnerList';
import { getPartners } from '../../utils/grantsApi';
import { Partner } from '../../types/grantsHub';

const PartnersSearch: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const allPartners = getPartners();

  const handlePartnerSelect = (partner: Partner) => {
    setSelectedPartner(partner);
  };

  const typeDistribution = allPartners.reduce((acc, partner) => {
    acc[partner.type] = (acc[partner.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const countryDistribution = allPartners.reduce((acc, partner) => {
    acc[partner.country] = (acc[partner.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const avgRating = allPartners.reduce((sum, p) => sum + p.rating, 0) / allPartners.length;
  const totalProjects = allPartners.reduce((sum, p) => sum + p.success_projects, 0);
  const verifiedCount = allPartners.filter(p => p.verified).length;

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/grants-hub')}
            className="text-blue-400 hover:text-blue-300 text-sm mb-2 flex items-center gap-2"
          >
            <i className="fa fa-arrow-left"></i>
            Powrót do Dashboard
          </button>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">
            <i className="fa fa-users text-blue-400 mr-3"></i>
            Wyszukiwanie Partnerów Konsorcjum
          </h1>
          <p className="text-slate-400">
            Znajdź odpowiednich partnerów do projektów dotacyjnych UE w branży MedTech
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-xs">Dostępni partnerzy</p>
              <i className="fa fa-building text-blue-400 text-xl"></i>
            </div>
            <p className="text-slate-100 text-3xl font-bold">{allPartners.length}</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-xs">Średnia ocena</p>
              <i className="fa fa-star text-yellow-400 text-xl"></i>
            </div>
            <p className="text-slate-100 text-3xl font-bold">{avgRating.toFixed(1)}</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-xs">Zrealizowane projekty</p>
              <i className="fa fa-project-diagram text-green-400 text-xl"></i>
            </div>
            <p className="text-slate-100 text-3xl font-bold">{totalProjects}</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-xs">Zweryfikowani</p>
              <i className="fa fa-certificate text-blue-400 text-xl"></i>
            </div>
            <p className="text-slate-100 text-3xl font-bold">{verifiedCount}</p>
          </div>
        </div>

        {/* Distribution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Type Distribution */}
          <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">
            <h3 className="text-slate-100 font-semibold text-lg mb-4">
              Partnerzy według typu
            </h3>
            <div className="space-y-3">
              {Object.entries(typeDistribution).map(([type, count]) => (
                <div key={type}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-300 text-sm">{type}</span>
                    <span className="text-slate-400 text-sm">{count}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${(count / allPartners.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Country Distribution */}
          <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">
            <h3 className="text-slate-100 font-semibold text-lg mb-4">
              Partnerzy według krajów
            </h3>
            <div className="space-y-3">
              {Object.entries(countryDistribution)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([country, count]) => (
                  <div key={country}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-300 text-sm">{country}</span>
                      <span className="text-slate-400 text-sm">{count}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${(count / allPartners.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-5 border border-blue-800/30 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="fa fa-lightbulb text-blue-400 text-2xl"></i>
            </div>
            <div>
              <h4 className="text-slate-100 font-semibold mb-2">Jak znaleźć idealnego partnera?</h4>
              <ul className="text-slate-300 text-sm space-y-1">
                <li><i className="fa fa-check text-green-400 mr-2"></i>Sprawdź specjalizacje partnera</li>
                <li><i className="fa fa-check text-green-400 mr-2"></i>Zobacz dotychczasowe projekty i ich sukces</li>
                <li><i className="fa fa-check text-green-400 mr-2"></i>Wybieraj zweryfikowanych partnerów</li>
                <li><i className="fa fa-check text-green-400 mr-2"></i>Skontaktuj się bezpośrednio przez formularz</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Partners List */}
        <PartnerList
          partners={allPartners}
          onSelect={handlePartnerSelect}
        />

        {/* Selected Partner Detail (if needed) */}
        {selectedPartner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-100 mb-2">{selectedPartner.name}</h2>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                        {selectedPartner.type}
                      </span>
                      <span className="text-slate-400 text-sm">{selectedPartner.country}</span>
                      {selectedPartner.verified && (
                        <span className="text-blue-400">
                          <i className="fa fa-certificate mr-1"></i>
                          Zweryfikowany
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPartner(null)}
                    className="text-slate-400 hover:text-slate-100 text-2xl"
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-slate-100 font-semibold mb-3">Specjalizacje</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPartner.specializations.map((spec, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-slate-700 text-slate-300 text-sm rounded"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 rounded-lg p-4">
                      <p className="text-slate-400 text-xs mb-1">Zrealizowane projekty</p>
                      <p className="text-slate-100 text-2xl font-bold">{selectedPartner.success_projects}</p>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-4">
                      <p className="text-slate-400 text-xs mb-1">Ocena</p>
                      <p className="text-slate-100 text-2xl font-bold">{selectedPartner.rating.toFixed(1)} / 5.0</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-slate-100 font-semibold mb-3">Dane kontaktowe</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <i className="fa fa-envelope text-slate-500 w-5"></i>
                        <a href={`mailto:${selectedPartner.contact_info.email}`} className="text-blue-400 hover:text-blue-300">
                          {selectedPartner.contact_info.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa fa-phone text-slate-500 w-5"></i>
                        <span className="text-slate-300">{selectedPartner.contact_info.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa fa-globe text-slate-500 w-5"></i>
                        <a
                          href={selectedPartner.contact_info.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          {selectedPartner.contact_info.website}
                        </a>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => window.location.href = `mailto:${selectedPartner.contact_info.email}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    <i className="fa fa-envelope mr-2"></i>
                    Wyślij wiadomość
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnersSearch;
