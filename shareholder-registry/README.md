# Rejestr Akcjonariuszy PSA 📊

Kompletna aplikacja React + TypeScript do zarządzania rejestrem akcjonariuszy Prostej Spółki Akcyjnej.

## 🎯 Funkcjonalności

### ✅ Zaimplementowane

1. **Dashboard z wykresami Recharts**
   - Statystyki spółki (akcjonariusze, akcje, kapitał, emisje)
   - Wykres kołowy struktury akcjonariatu
   - Wykres słupkowy emisji akcji
   - Wykres liniowy aktywności miesięcznej
   - Ostatnia aktywność

2. **Toast Notifications + Loading Skeletons**
   - System powiadomień toast (react-hot-toast)
   - Skeletony ładowania dla kart, tabel i list
   - Animacje ładowania danych

3. **Moduł Akcjonariusze**
   - Sortowanie wielokryterialne (nazwa, akcje, procent, data)
   - Filtry i wyszukiwanie
   - Paginacja z wyborem ilości rekordów
   - Modal szczegółów akcjonariusza
   - Akcje edycji/usuwania (symulowane)

4. **Moduł Wzory Dokumentów**
   - 10 wzorów dokumentów (uchwały, protokoły, umowy, raporty)
   - Filtry kategorii
   - Edytor dokumentów z live preview
   - Formularz z walidacją
   - Auto-calculate dla pól
   - Upload logo
   - Eksport PDF (symulowany)
   - Responsywność (zakładki na mobile)

5. **Pozostałe moduły (Placeholder)**
   - Cap Table
   - Emisje
   - Transakcje
   - WZA/Głosowania
   - Dokumenty
   - KYC/AML
   - Audyt
   - Ustawienia

## 🛠️ Stack technologiczny

- **Frontend Framework:** React 18.2
- **Język:** TypeScript 5.2
- **Build Tool:** Vite 5.0
- **Styling:** Tailwind CSS 3.3
- **Wykresy:** Recharts 2.10
- **Notifications:** React Hot Toast 2.4
- **Icons:** Font Awesome 6.5
- **Utilities:** clsx

## 📁 Struktura projektu

```
shareholder-registry/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx          # Dashboard z wykresami
│   │   ├── Shareholders.tsx       # Moduł akcjonariusze
│   │   ├── DocumentTemplates.tsx  # Biblioteka wzorów
│   │   ├── DocEditor.tsx          # Edytor dokumentów
│   │   ├── Sidebar.tsx            # Sidebar nawigacji
│   │   ├── LoadingSkeleton.tsx    # Skeletony ładowania
│   │   └── PlaceholderView.tsx    # Placeholder modułów
│   ├── data/
│   │   ├── mockData.ts            # Mock dane
│   │   └── templates.ts           # Szablony dokumentów
│   ├── types/
│   │   └── index.ts               # Typy TypeScript
│   ├── utils/
│   │   └── helpers.ts             # Funkcje pomocnicze
│   ├── App.tsx                    # Główny komponent
│   ├── main.tsx                   # Punkt wejścia
│   ├── index.css                  # Style globalne
│   └── vite-env.d.ts              # Typy Vite
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Instalacja i uruchomienie

### Wymagania

- Node.js >= 18.0.0
- npm >= 9.0.0

### Instalacja zależności

```bash
cd shareholder-registry
npm install
```

### Uruchomienie w trybie deweloperskim

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

### Build produkcyjny

```bash
npm run build
```

Pliki produkcyjne znajdą się w folderze `dist/`

### Podgląd buildu

```bash
npm run preview
```

## 📖 Szczegóły implementacji

### Dashboard

Wykorzystuje bibliotekę Recharts do wizualizacji danych:
- **PieChart** - struktura akcjonariatu
- **BarChart** - emisje akcji
- **LineChart** - aktywność miesięczna

### Akcjonariusze

Pełna funkcjonalność zarządzania:
- Sortowanie ASC/DESC dla wszystkich kolumn
- Wyszukiwanie po nazwisku i emailu
- Paginacja z konfigurowalnymi limitami (5, 10, 25, 50)
- Modal szczegółów z pełnymi informacjami

### Wzory Dokumentów

Edytor z live preview:
- Formularz z walidacją pól wymaganych
- Auto-kalkulacja pól zależnych
- Upload i preview logo
- Responsywny layout (split-screen na desktop, zakładki na mobile)

### Toast Notifications

Wykorzystuje react-hot-toast:
- Powiadomienia success/error
- Customowy styling (dark mode)
- Automatyczne zamykanie

### Loading Skeletons

Trzy typy skeletonów:
- `card` - dla kafelek
- `table` - dla tabel
- `list` - dla list

## 🎨 Design System

### Kolory

- **Background:** slate-900 (#0f172a)
- **Cards:** slate-800 (#1e293b)
- **Borders:** slate-700 (#334155)
- **Primary:** blue-600 (#2563eb)
- **Text:** slate-100 (#f1f5f9)

### Typography

- Font: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- Nagłówki: font-bold
- Tekst: font-normal/medium/semibold

### Spacing

Wykorzystuje system Tailwind (4px base unit):
- Padding: p-4, p-6, p-8
- Margin: m-4, m-6, m-8
- Gap: gap-2, gap-4, gap-6

## 📱 Responsywność

Aplikacja w pełni responsywna:
- **Desktop (>1024px):** pełny layout z sidebar i split-screen
- **Tablet (768-1024px):** adaptacyjny layout
- **Mobile (<768px):** zakładki zamiast split-screen, stackowany layout

## 🔐 Dane mock

Aplikacja wykorzystuje statyczne dane mock:
- 4 akcjonariuszy (10,000 akcji)
- 3 transakcje
- 3 emisje

Dane znajdują się w `src/data/mockData.ts`

## 🚧 Przyszłe rozszerzenia

- [ ] Backend API integration
- [ ] Autentykacja i autoryzacja
- [ ] Rzeczywisty eksport PDF
- [ ] Edycja i usuwanie akcjonariuszy
- [ ] Moduły Cap Table, Emisje, Transakcje
- [ ] System uprawnień
- [ ] Historia zmian
- [ ] Export danych (CSV, Excel)

## 📄 Licencja

© 2025 TechStart PSA. All rights reserved.

## 👨‍💻 Autor

Projekt stworzony dla MDR Cosmo Med - Rejestr Akcjonariuszy PSA

## 🐛 Zgłaszanie błędów

W przypadku znalezienia błędów lub propozycji ulepszeń, prosimy o kontakt z zespołem developerskim.

---

**Wersja:** 1.0.0
**Data ostatniej aktualizacji:** 2025-11-18
