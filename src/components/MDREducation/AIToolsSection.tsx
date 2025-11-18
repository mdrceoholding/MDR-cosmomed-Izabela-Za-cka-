import React, { useState } from 'react';

const AIToolsSection: React.FC = () => {
  const [complianceQuestion, setComplianceQuestion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  return (
    <section className="bg-slate-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-4 py-2 rounded-full mb-4 border border-purple-500/30">
            <i className="fas fa-robot text-purple-400"></i>
            <span className="text-purple-400 font-semibold">Powered by AI</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Narzędzia AI dla Partnerów
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Wykorzystaj moc sztucznej inteligencji. Nasze narzędzia AI zapewniają natychmiastowe odpowiedzi na kluczowe pytania biznesowe dotyczące zgodności i analizy rynku.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-bolt text-blue-400 text-xl"></i>
            </div>
            <h3 className="text-white font-semibold mb-2">Analiza w Czasie Rzeczywistym</h3>
            <p className="text-slate-400 text-sm">Natychmiastowe odpowiedzi oparte na najnowszych danych</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-brain text-purple-400 text-xl"></i>
            </div>
            <h3 className="text-white font-semibold mb-2">Sztuczna Inteligencja</h3>
            <p className="text-slate-400 text-sm">Zaawansowane algorytmy uczenia maszynowego</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-user-graduate text-green-400 text-xl"></i>
            </div>
            <h3 className="text-white font-semibold mb-2">Ekspercka Wiedza</h3>
            <p className="text-slate-400 text-sm">Odpowiedzi oparte na najlepszych praktykach branżowych</p>
          </div>
        </div>

        {/* AI Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Compliance Assistant */}
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <i className="fas fa-search text-blue-400"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Asystent Zgodności</h3>
                <p className="text-slate-400 text-sm">Zadaj pytanie o regulacje MDR</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-slate-300 text-sm mb-2">
                Twoje pytanie o zgodność z MDR:
              </label>
              <textarea
                value={complianceQuestion}
                onChange={(e) => setComplianceQuestion(e.target.value)}
                placeholder="np. Jakie są wymagania dla urządzeń Załącznika XVI w kontekście zabiegów HIFU?"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 min-h-[120px] resize-none"
              />
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition mb-4">
              <i className="fas fa-magic mr-2"></i>
              Zapytaj AI
            </button>

            <p className="text-slate-500 text-xs text-center">
              Odpowiedzi bazują na aktualnych regulacjach MDR 2017/745 i orzecznictwie UE
            </p>
          </div>

          {/* Market Analyzer */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <i className="fas fa-chart-line text-purple-400"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Analizator Rynku</h3>
                <p className="text-slate-400 text-sm">Analiza potencjału rynkowego</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-slate-300 text-sm mb-2">Kraj:</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="">Wybierz kraj</option>
                  <option value="PL">Polska</option>
                  <option value="DE">Niemcy</option>
                  <option value="FR">Francja</option>
                  <option value="UK">Wielka Brytania</option>
                  <option value="IT">Włochy</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Produkt:</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="">Wybierz produkt</option>
                  <option value="HIFU">Urządzenia HIFU</option>
                  <option value="RF">Urządzenia RF</option>
                  <option value="Laser">Lasery medyczne</option>
                  <option value="Fillers">Wypełniacze</option>
                </select>
              </div>
            </div>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition mb-4">
              <i className="fas fa-chart-bar mr-2"></i>
              Analizuj Rynek
            </button>

            <p className="text-slate-500 text-xs text-center">
              Dane z europejskich baz regulacyjnych i raportów rynkowych
            </p>
          </div>
        </div>

        {/* Integration CTA */}
        <div className="mt-12 bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="fas fa-graduation-cap text-orange-400 text-2xl"></i>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">
                Korzyść dla instytucji szkoleniowych
              </h3>
              <p className="text-slate-300">
                Nasze narzędzia AI mogą zostać zintegrowane z Twoją platformą szkoleniową, podnosząc wartość oferowanych usług i zwiększając konkurencyjność na rynku szkoleń dofinansowanych z BUR/PARP.
              </p>
            </div>
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition flex-shrink-0">
              Dowiedz się o integracji
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIToolsSection;
