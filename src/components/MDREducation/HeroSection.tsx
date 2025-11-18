import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-white">MDR INSURANCE™</h1>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="/" className="text-slate-300 hover:text-white transition">Home</a>
              <a href="/about" className="text-slate-300 hover:text-white transition">O nas</a>
              <a href="/oc-syndicate" className="text-slate-300 hover:text-white transition">OC Syndicate™</a>
              <a href="/blog" className="text-slate-300 hover:text-white transition">Blog</a>
              <a href="/contact" className="text-slate-300 hover:text-white transition">Kontakt</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/mdr-education" className="text-blue-400 hover:text-blue-300 transition text-sm font-medium">
              MDR EDUCATION™
            </a>
            <a href="/hub" className="text-blue-400 hover:text-blue-300 transition text-sm font-medium">
              THE MDR HUB
            </a>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30">
              European Institute for Regulatory Science
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Innowacyjny System Edukacyjny<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              dla Profesjonalistów
            </span>
          </h2>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Medycyny Estetycznej i Kosmetologii.<br />
            Kompleksowe wsparcie zgodności z MDR 2017/745.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg">
              Rozpocznij Naukę
            </button>
            <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-all border border-white/20">
              Centrum Wiedzy
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <i className="fas fa-laptop text-blue-400 text-xl"></i>
              </div>
              <h3 className="text-white font-semibold mb-2">Platforma E-learningowa</h3>
              <p className="text-slate-400 text-sm">Całodobowy dostęp z każdego urządzenia</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <i className="fas fa-certificate text-green-400 text-xl"></i>
              </div>
              <h3 className="text-white font-semibold mb-2">MDR Ready™ Certyfikacja</h3>
              <p className="text-slate-400 text-sm">Zgodność z MDR 2017/745</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <i className="fas fa-users text-purple-400 text-xl"></i>
              </div>
              <h3 className="text-white font-semibold mb-2">Wsparcie Ekspertów</h3>
              <p className="text-slate-400 text-sm">Forum dyskusyjne i konsultacje</p>
            </div>
          </div>

          {/* Blockchain Badge */}
          <div className="mt-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-full px-6 py-3">
              <i className="fas fa-shield-alt text-purple-400"></i>
              <span className="text-white font-medium">Certyfikacja Blockchain</span>
              <span className="text-purple-400 font-semibold">BlockchainMedConsent™</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
