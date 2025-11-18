import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            COSMOMED Sp. z o.o.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            System Zarządzania Zgodnością MDR
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Compliance Card */}
          <Link
            to="/compliance"
            className="group bg-white dark:bg-gray-800 rounded-xl p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <ShieldCheck className="text-blue-600 dark:text-blue-400" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Compliance & Audyt
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Zarządzaj checklistą zgodności MDR, przeprowadzaj audyty, generuj raporty i
              śledź działania korygujące (CAPA).
            </p>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium group-hover:gap-4 transition-all">
              Przejdź do modułu <ArrowRight size={20} />
            </div>
          </Link>

          {/* Info Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">O systemie</h3>
            <ul className="space-y-3 text-blue-50">
              <li className="flex items-start gap-2">
                <ShieldCheck size={20} className="mt-0.5 flex-shrink-0" />
                <span>Pełna zgodność z MDR 2017/745</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck size={20} className="mt-0.5 flex-shrink-0" />
                <span>22 punkty kontrolne w 7 obszarach</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck size={20} className="mt-0.5 flex-shrink-0" />
                <span>Generowanie raportów PDF</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck size={20} className="mt-0.5 flex-shrink-0" />
                <span>System CAPA i historia audytów</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck size={20} className="mt-0.5 flex-shrink-0" />
                <span>Szablony dokumentów zgodnych z normami</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            Kierownik: <span className="font-semibold">Dr Izabela Zającka</span>
          </p>
          <p className="text-sm mt-2">
            ul. Medyczna 15, 00-001 Warszawa, Polska
          </p>
        </div>
      </div>
    </div>
  );
};
