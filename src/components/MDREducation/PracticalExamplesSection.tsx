import React from 'react';
import { practicalExamples } from '../../data/mdr/mdrData';

const PracticalExamplesSection: React.FC = () => {
  return (
    <section className="bg-slate-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Przykłady Praktyczne & Elementy Interaktywne
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Studia przypadków rzeczywistych, protokoły krok po kroku, szablony dokumentacji i interaktywne narzędzia edukacyjne.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">
            Przykłady Praktyczne
          </button>
          <button className="bg-slate-800 text-slate-300 hover:bg-slate-700 px-6 py-2 rounded-lg font-medium transition">
            Elementy Interaktywne
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {practicalExamples.map((example) => (
            <div
              key={example.id}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition">
                <i className={`fas fa-${example.icon} text-blue-400 text-2xl`}></i>
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-lg mb-2">
                {example.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-sm mb-4">
                {example.description}
              </p>

              {/* Examples List */}
              <ul className="space-y-2 mb-6">
                {example.examples.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                    <i className="fas fa-check text-green-400 mt-1 text-xs"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-col gap-2">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition text-sm">
                  {example.ctaText}
                </button>
                <button className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-2 px-4 rounded-lg transition text-sm">
                  Pobierz szablony
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticalExamplesSection;
