import { DocumentTemplate, TemplateData } from '../types';

export const docTemplates: DocumentTemplate[] = [
  {
    id: 1,
    icon: "fa-scroll",
    emoji: "📜",
    name: "Uchwała emisji akcji",
    desc: "Wzór uchwały o emisji nowych akcji w PSA.",
    category: "Uchwały"
  },
  {
    id: 2,
    icon: "fa-pen-to-square",
    emoji: "📝",
    name: "Uchwała zmiany statutu",
    desc: "Wzór uchwały zmieniającej statut spółki.",
    category: "Uchwały"
  },
  {
    id: 3,
    icon: "fa-sack-dollar",
    emoji: "💰",
    name: "Uchwała podziału zysku",
    desc: "Wzór uchwały dotyczącej podziału zysku.",
    category: "Uchwały"
  },
  {
    id: 4,
    icon: "fa-clipboard",
    emoji: "📋",
    name: "Protokół z WZA",
    desc: "Protokół z Walnego Zgromadzenia Akcjonariuszy.",
    category: "Protokoły"
  },
  {
    id: 5,
    icon: "fa-file-alt",
    emoji: "📄",
    name: "Protokół zarządu",
    desc: "Protokół z posiedzenia zarządu PSA.",
    category: "Protokoły"
  },
  {
    id: 6,
    icon: "fa-handshake",
    emoji: "🤝",
    name: "Umowa zbycia akcji",
    desc: "Wzór umowy zbycia akcji PSA.",
    category: "Umowy"
  },
  {
    id: 7,
    icon: "fa-lock",
    emoji: "🔒",
    name: "Umowa lock-up",
    desc: "Wzór umowy ograniczającej sprzedaż akcji.",
    category: "Umowy"
  },
  {
    id: 8,
    icon: "fa-house",
    emoji: "🏠",
    name: "Umowa użyczenia lokalu",
    desc: "Wzór umowy użyczenia lokalu dla PSA.",
    category: "Umowy"
  },
  {
    id: 9,
    icon: "fa-chart-bar",
    emoji: "📊",
    name: "Raport cap table",
    desc: "Szablon raportu dotyczącego struktury kapitałowej.",
    category: "Raporty"
  },
  {
    id: 10,
    icon: "fa-book",
    emoji: "📖",
    name: "Statut PSA",
    desc: "Wzór statutu prostej spółki akcyjnej.",
    category: "Raporty"
  }
];

export const docTemplatesDetails: Record<number, TemplateData> = {
  1: {
    fields: [
      {
        key: "NAZWA_SPOLKI",
        label: "Nazwa spółki",
        type: "text",
        required: true,
        placeholder: "TechStart PSA"
      },
      {
        key: "NIP",
        label: "NIP",
        type: "text",
        required: true,
        placeholder: "1234567890"
      },
      {
        key: "KRS",
        label: "KRS",
        type: "text",
        required: true,
        placeholder: "0000123456"
      },
      {
        key: "NUMER_UCHWALY",
        label: "Numer uchwały",
        type: "text",
        required: true,
        placeholder: "1/2025"
      },
      {
        key: "DATA_WZA",
        label: "Data WZA",
        type: "date",
        required: true
      },
      {
        key: "SERIA_AKCJI",
        label: "Seria akcji",
        type: "text",
        required: true,
        placeholder: "A"
      },
      {
        key: "LICZBA_AKCJI",
        label: "Liczba akcji",
        type: "number",
        required: true,
        placeholder: "1000"
      },
      {
        key: "WARTOSC_NOMINALNA",
        label: "Wartość nominalna akcji (PLN)",
        type: "number",
        required: true,
        placeholder: "1"
      },
      {
        key: "CENA_EMISYJNA",
        label: "Cena emisyjna akcji (PLN)",
        type: "number",
        required: true,
        placeholder: "1.1"
      },
      {
        key: "KWOTA_PODWYZSZENIA",
        label: "Kwota podwyższenia kapitału (PLN)",
        type: "number",
        required: true,
        readonly: true
      },
      {
        key: "PRZEWODNICZACY_WZA",
        label: "Przewodniczący WZA",
        type: "text",
        required: true,
        placeholder: "Jan Kowalski"
      },
      {
        key: "PROTOKOLANT",
        label: "Protokolant",
        type: "text",
        required: true,
        placeholder: "Anna Nowak"
      }
    ],
    autofill: {
      NAZWA_SPOLKI: "TechStart PSA",
      NIP: "1234567890",
      KRS: "0000123456",
      NUMER_UCHWALY: "1/2025",
      DATA_WZA: new Date().toISOString().slice(0, 10),
      SERIA_AKCJI: "A",
      LICZBA_AKCJI: 1000,
      WARTOSC_NOMINALNA: 1,
      CENA_EMISYJNA: 1.1,
      KWOTA_PODWYZSZENIA: 1000,
      PRZEWODNICZACY_WZA: "Jan Kowalski",
      PROTOKOLANT: "Anna Nowak"
    },
    preview: ({
      NAZWA_SPOLKI = "",
      NIP = "",
      KRS = "",
      NUMER_UCHWALY = "",
      DATA_WZA = "",
      SERIA_AKCJI = "",
      LICZBA_AKCJI = "",
      WARTOSC_NOMINALNA = "",
      CENA_EMISYJNA = "",
      KWOTA_PODWYZSZENIA = "",
      PRZEWODNICZACY_WZA = "",
      PROTOKOLANT = ""
    }) => `
<div class="document bg-white text-gray-900 p-16 max-w-[210mm] mx-auto shadow-2xl">
  <header class="text-center border-b-2 pb-6 mb-8">
    <div class="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
      <span class="text-white text-4xl">🏦</span>
    </div>
    <h1 class="text-2xl font-bold">${NAZWA_SPOLKI}</h1>
    <p class="text-sm text-gray-600">NIP: ${NIP} | KRS: ${KRS}</p>
  </header>
  <main class="space-y-6">
    <div class="text-center">
      <h2 class="text-xl font-bold">UCHWAŁA NR ${NUMER_UCHWALY}</h2>
      <p>Walnego Zgromadzenia Akcjonariuszy</p>
      <p class="text-sm text-gray-600">z dnia ${DATA_WZA}</p>
    </div>
    <h3 class="text-lg font-semibold mt-8">w sprawie: emisji nowych akcji serii ${SERIA_AKCJI}</h3>
    <div class="space-y-4">
      <div>
        <h4 class="font-semibold">§ 1</h4>
        <p>Walne Zgromadzenie Akcjonariuszy postanawia podwyższyć kapitał zakładowy spółki o kwotę <strong>${KWOTA_PODWYZSZENIA} PLN</strong> poprzez emisję <strong>${LICZBA_AKCJI}</strong> akcji zwykłych na okaziciela serii <strong>${SERIA_AKCJI}</strong> o wartości nominalnej <strong>${WARTOSC_NOMINALNA} PLN</strong> każda.</p>
      </div>
      <div>
        <h4 class="font-semibold">§ 2</h4>
        <p>Cena emisyjna jednej akcji serii ${SERIA_AKCJI} wynosi <strong>${CENA_EMISYJNA} PLN</strong>.</p>
      </div>
      <div>
        <h4 class="font-semibold">§ 3</h4>
        <p>Akcje serii ${SERIA_AKCJI} zostaną objęte w drodze subskrypcji prywatnej przez inwestorów wskazanych przez Zarząd Spółki.</p>
      </div>
      <div>
        <h4 class="font-semibold">§ 4</h4>
        <p>Uchwała wchodzi w życie z dniem podjęcia.</p>
      </div>
    </div>
  </main>
  <footer class="mt-16 pt-8 border-t-2">
    <div class="grid grid-cols-2 gap-8">
      <div class="text-center">
        <div class="border-t-2 border-gray-400 pt-2 mt-12">
          <p class="font-semibold">${PRZEWODNICZACY_WZA}</p>
          <p class="text-sm text-gray-600">Przewodniczący WZA</p>
        </div>
      </div>
      <div class="text-center">
        <div class="border-t-2 border-gray-400 pt-2 mt-12">
          <p class="font-semibold">${PROTOKOLANT}</p>
          <p class="text-sm text-gray-600">Protokolant</p>
        </div>
      </div>
    </div>
  </footer>
</div>
    `
  }
};

export const docCategories = ["Wszystkie", "Uchwały", "Protokoły", "Umowy", "Raporty"];
