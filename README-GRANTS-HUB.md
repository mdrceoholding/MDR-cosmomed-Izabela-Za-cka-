# EU Grants Hub - MedTech

System zarządzania dotacjami i partnerstwami UE dla branży MedTech.

## 📋 Opis

EU Grants Hub to kompleksowy system do zarządzania projektami dotacyjnymi Unii Europejskiej dedykowany branży MedTech. System umożliwia:

- 📊 Monitoring dostępnych dotacji UE
- 🔍 Zaawansowane wyszukiwanie i filtrowanie
- 📈 Analitykę i wizualizację danych
- 🤝 Wyszukiwanie partnerów konsorcjum
- 📅 Śledzenie deadlinów i naborów
- 💼 Zarządzanie aplikacjami projektowymi

## 🚀 Funkcjonalności

### Dashboard
- 4 główne KPI karty (Dostępne dotacje, Aktywne nabory, Deadliny, Wskaźnik sukcesu)
- 5 interaktywnych wykresów:
  - Bar Chart - Liczba dotacji wg kategorii
  - Pie Chart - Statusy naborów (%)
  - Bubble Chart - Kwota vs Postęp vs Success Rate
  - Timeline - Deadliny w czasie
  - Heatmap - Skuteczność wg kategorii

### Baza Dotacji
- 20 przykładowych programów dotacyjnych UE
- Kategorie: Badania, Innowacje, Infrastruktura, Cyfryzacja, Edukacja
- Statusy: Aktywny, Wkrótce, Zamknięty, Zawieszony
- Kwoty: od 50k do 25M EUR

### Wyszukiwanie Dotacji
- Filtrowanie po kategorii, statusie, kwocie
- Filtrowanie po deadline, typie programu
- Filtrowanie po beneficjentach, regionach
- Filtrowanie po wskaźniku sukcesu
- Widok tabeli i siatki (grid)
- Export do CSV

### Partnerzy Konsorcjum
- 15 zweryfikowanych partnerów z UE
- Typy: Przedsiębiorstwa, Uczelnie, Instytuty, NGO
- Specjalizacje branżowe
- Oceny i liczba zrealizowanych projektów
- Dane kontaktowe

## 🛠️ Stack technologiczny

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS (dark mode)
- **Wykresy**: Recharts + D3.js
- **Build**: Vite
- **Icons**: Font Awesome 6
- **Fonts**: Inter

## 📦 Instalacja

```bash
# Instalacja zależności
npm install

# Uruchomienie dev server
npm run dev

# Build produkcyjny
npm run build

# Preview build
npm run preview
```

## 📁 Struktura projektu

```
src/
├── pages/
│   └── GrantsHub/
│       ├── GrantsDashboard.tsx      # Dashboard główny
│       ├── GrantsTablePage.tsx      # Lista dotacji
│       ├── PartnersSearch.tsx       # Wyszukiwanie partnerów
│       └── index.tsx                # Router
├── components/
│   └── GrantsHub/
│       ├── KPICard.tsx              # Karta KPI
│       ├── GrantCard.tsx            # Karta dotacji
│       ├── GrantTable.tsx           # Tabela dotacji
│       ├── GrantDetailsModal.tsx    # Modal szczegółów
│       ├── FilterPanel.tsx          # Panel filtrów
│       ├── PartnerCard.tsx          # Karta partnera
│       ├── PartnerList.tsx          # Lista partnerów
│       ├── ChartBar.tsx             # Wykres słupkowy
│       ├── ChartPie.tsx             # Wykres kołowy
│       ├── ChartBubble.tsx          # Wykres bąbelkowy
│       ├── ChartTimeline.tsx        # Wykres timeline
│       └── ChartHeatmap.tsx         # Heatmapa
├── types/
│   └── grantsHub.ts                 # Typy TypeScript
├── data/
│   └── grantsData.ts                # Mock data
├── utils/
│   └── grantsApi.ts                 # API i logika biznesowa
├── styles/
│   └── index.css                    # Style globalne
├── App.tsx                          # Root component
└── main.tsx                         # Entry point
```

## 🎨 Design System

### Kolory (Dark Mode)
- Primary: `#3477eb` (niebieski)
- Secondary: `#9cf7ff` (cyjan)
- Success: `#4caf50` (zielony)
- Warning: `#ff9800` (pomarańczowy)
- Error: `#f44336` (czerwony)
- Background: `#0f172a` (slate-900)
- Surface: `#1e293b` (slate-800)
- Text: `#f1f5f9` (slate-100)

### Breakpoints
- Mobile: 0-600px
- Tablet: 600-960px
- Desktop: 960-1280px
- HD: 1280-1920px
- 4K: 1920px+

## 📊 Dane

### Programy dotacyjne (20)
1. Horyzont Europa - Klaster Zdrowie
2. LIFE+ Zdrowie
3. EIT Health
4. DG SANTE - Zdrowie dla wszystkich
5. Europa Cyfrowa - Digital Health
6. COSME - Konkurencyjność MedTech
7. EFRR - Rozwój Regionalny MedTech
8. Marie Skłodowska-Curie - Doktoraty Przemysłowe
9. InvestEU - Inwestycje w MedTech
10. EFS+ Kompetencje Cyfrowe w Zdrowiu
... i więcej

### Partnerzy (15)
1. MedTech Innovation Hub (PL)
2. University of Warsaw - Medical Faculty (PL)
3. Charité - Universitätsmedizin Berlin (DE)
4. Fraunhofer Institute for Biomedical Engineering (DE)
5. Karolinska Institutet (SE)
... i więcej

## 🔐 Uprawnienia

- **Admin**: Pełny dostęp do wszystkich funkcji
- **Manager**: Dostęp do przeglądania i aplikowania
- **Viewer**: Tylko dostęp do odczytu

## 💾 LocalStorage

System zapisuje filtry użytkownika w localStorage dla lepszego UX:
- Wybrane kategorie
- Statusy
- Zakresy kwot i success rate
- Typy programów i beneficjentów

## 🌍 Języki

Obecnie dostępny w języku polskim. System przygotowany pod internacjonalizację.

## 📈 Roadmap

- [ ] Backend API (Node.js + Express)
- [ ] Baza danych (PostgreSQL)
- [ ] Autentykacja i autoryzacja
- [ ] System powiadomień (email, push)
- [ ] Integracja z zewnętrznymi API (Funding & Tenders Portal)
- [ ] AI/ML - rekomendacje dotacji
- [ ] Moduł zarządzania aplikacjami
- [ ] System dokumentów (upload, versioning)
- [ ] Kalendarz i przypomnienia
- [ ] Raporty i eksporty (PDF, Excel)

## 👥 Know-how

System opracowany z wykorzystaniem autorskiej metodologii zarządzania projektami europejskimi.

**Wartość know-how: 13.999.000 PLN**

## 📄 Licencja

Proprietary - Wszystkie prawa zastrzeżone

## 📞 Kontakt

Artur Fijołek
- Email: kontakt@grantshub.eu
- Web: https://grantshub.eu

---

**Wersja**: 1.0.0
**Data**: 2025-01-18
**Status**: Production Ready
