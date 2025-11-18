import React from 'react';
import { communityStats, mentorshipPrograms, webinars } from '../../data/mdr/mdrData';

const CommunitySection: React.FC = () => {
  return (
    <section className="bg-slate-800 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Wsparcie Rozwoju & Społeczność Ekspertów
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Programy mentorskie, webinary live, certyfikacje zawodowe i społeczność najlepszych ekspertów w medycynie estetycznej.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
              {communityStats.totalMembers.toLocaleString()}
            </div>
            <div className="text-slate-400 text-sm">Członków społeczności</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
              {communityStats.activeThisMonth.toLocaleString()}
            </div>
            <div className="text-slate-400 text-sm">Aktywnych w tym miesiącu</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">
              {communityStats.expertsOnline}
            </div>
            <div className="text-slate-400 text-sm">Ekspertów online</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">
              {communityStats.questionsAnswered.toLocaleString()}
            </div>
            <div className="text-slate-400 text-sm">Pytań udzielonych</div>
          </div>
        </div>

        {/* Mentorship Programs */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Programy Mentorskie</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentorshipPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-slate-900 border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    program.level === 'Początkujący'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  }`}>
                    {program.level}
                  </span>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Od</div>
                    <div className="text-2xl font-bold text-white">{program.price.toLocaleString()} PLN</div>
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white mb-2">{program.name}</h4>
                <p className="text-slate-400 text-sm mb-4">{program.description}</p>

                <div className="flex items-center gap-4 text-sm text-slate-300 mb-6">
                  <span><i className="fas fa-clock mr-2 text-blue-400"></i>{program.duration}</span>
                  <span><i className="fas fa-users mr-2 text-blue-400"></i>Max {program.maxParticipants} osób</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                      <i className="fas fa-check text-green-400 mt-1"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
                  Dołącz do programu
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Webinars */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">Nadchodzące Webinary</h3>
            <button className="text-blue-400 hover:text-blue-300 font-medium text-sm">
              Zobacz wszystkie <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {webinars.map((webinar) => (
              <div
                key={webinar.id}
                className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    webinar.type === 'Live Webinar'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : webinar.type === 'Workshop'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  }`}>
                    {webinar.type}
                  </span>
                  <span className="text-slate-400 text-xs">
                    <i className="fas fa-users mr-1"></i>
                    {webinar.registrations} zapisanych
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-3">{webinar.title}</h4>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <i className="fas fa-calendar text-blue-400 w-4"></i>
                    <span>{new Date(webinar.date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <i className="fas fa-clock text-blue-400 w-4"></i>
                    <span>{webinar.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <i className="fas fa-user text-blue-400 w-4"></i>
                    <span>{webinar.instructor.name}</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition">
                  Zapisz się
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Dołącz do społeczności ekspertów OC Syndicate™
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Podziel się swoją wiedzą i doświadczeniem. Zostań autorem w naszym centrum wiedzy i pomóż innym specjalistom rozwijać swoje kompetencje w medycynie estetycznej.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition">
              Wyślij artykuł
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition border border-white/20">
              Dołącz do społeczności
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
