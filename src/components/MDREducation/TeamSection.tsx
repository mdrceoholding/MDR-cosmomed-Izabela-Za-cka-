import React from 'react';
import { teamMembers } from '../../data/mdr/mdrData';

const TeamSection: React.FC = () => {
  const stats = [
    { label: 'Lat doświadczenia', value: '15+' },
    { label: 'Certyfikacji', value: '200+' },
    { label: 'Zadowolonych klientów', value: '2847+' },
    { label: 'Wsparcie eksperckie', value: '24/7' }
  ];

  return (
    <section className="bg-slate-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Zespół OC Syndicate™
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Poznaj ekspertów, którzy zapewniają najwyższy poziom ochrony ubezpieczeniowej i wsparcia dla specjalistów medycyny estetycznej.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition group"
            >
              {/* Avatar & Initials */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {member.initials}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 text-sm font-medium mb-1">{member.role}</p>
                  <p className="text-slate-400 text-xs">{member.specialization}</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                {member.bio}
              </p>

              {/* Qualifications */}
              <div className="mb-4">
                <h4 className="text-white text-sm font-semibold mb-2">Kwalifikacje i osiągnięcia</h4>
                <ul className="space-y-1">
                  {member.qualifications.map((qual, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-slate-400">
                      <i className="fas fa-medal text-yellow-400 mt-0.5"></i>
                      <span>{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="space-y-2 pt-4 border-t border-slate-700">
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition"
                >
                  <i className="fas fa-envelope w-4"></i>
                  <span className="text-xs">{member.email}</span>
                </a>
                <a
                  href={`tel:${member.phone}`}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition"
                >
                  <i className="fas fa-phone w-4"></i>
                  <span className="text-xs">{member.phone}</span>
                </a>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition"
                  >
                    <i className="fab fa-linkedin w-4"></i>
                    <span className="text-xs">LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-book text-blue-400 text-xl"></i>
            </div>
            <h4 className="text-white font-semibold mb-2">Przykłady praktyczne</h4>
            <p className="text-slate-400 text-sm mb-4">Studia przypadków rzeczywistych</p>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              Zobacz więcej <i className="fas fa-arrow-right ml-1"></i>
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-users text-purple-400 text-xl"></i>
            </div>
            <h4 className="text-white font-semibold mb-2">Wsparcie rozwoju</h4>
            <p className="text-slate-400 text-sm mb-4">Programy mentorskie</p>
            <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
              Dołącz <i className="fas fa-arrow-right ml-1"></i>
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-comments text-green-400 text-xl"></i>
            </div>
            <h4 className="text-white font-semibold mb-2">Społeczność ekspertów</h4>
            <p className="text-slate-400 text-sm mb-4">Dołącz do OC Syndicate™</p>
            <button className="text-green-400 hover:text-green-300 text-sm font-medium">
              Wyślij artykuł <i className="fas fa-arrow-right ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
