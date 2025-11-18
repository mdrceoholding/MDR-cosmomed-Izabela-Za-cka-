# 📊 PSA - Rejestr Akcjonariuszy

Zaawansowany system zarządzania akcjonariuszami z modułami dywidend, raportów, kalendarza, vesting, analityki i wirtualnej sali danych.

## 🚀 Funkcje

### 1. **Moduł Dywidend** 💰
- Pełna historia wypłat dywidend
- Automatyczna kalkulacja proporcjonalnie do udziałów
- Statusy: Zaplanowana / W trakcie / Zakończona / Anulowana
- Filtry po dacie i akcjonariuszu
- Export do CSV
- KPI: Całkowita dywidenda (12m)

### 2. **Generator Raportów** 📄
- **Cap Table (PDF)** - Struktura własnościowa
- **Historia transakcji (Excel/CSV)**
- **Zestawienie dokumentów (PDF)**
- **Raport compliance (PDF)**
- Niestandardowy zakres dat
- Watermark z datą generacji
- Podgląd przed pobraniem

### 3. **Kalendarz Wydarzeń** 📅
- Widok miesięczny/tygodniowy
- Typy: WZA, Termin wpłaty, Deadline dokumentu, Wypłata dywidendy
- Kolorowe kategorie
- System przypomnień (7 dni, 1 dzień przed)
- Badge z liczbą nadchodzących wydarzeń

### 4. **Vesting & Lock-up** 🔒
- Time-based vesting
- Milestone-based vesting
- Cliff vesting
- Wizualizacja timeline
- Status: Zablokowane / Częściowo odblokowane / Pełny dostęp
- Alerty o nadchodzącym odblokowaniu

### 5. **Analityka Zaawansowana** 📈
- **Wskaźniki finansowe:** ROE, ROA, P/E ratio
- **Wykres wzrostu wartości** (line chart)
- **Podział kapitału** - gotówka vs know-how (pie chart)
- **Aktywność akcjonariuszy** (bar chart)
- **Prognoza dywidend na 12m**
- Filtry czasowe: 1M, 3M, 6M, 1Y, ALL
- Export wykresów jako PNG

### 6. **Wirtualna Sala Danych (VDR)** 🗂️
- Bezpieczne repozytorium dokumentów
- Kategorie: Due Diligence, Finansowe, Prawne, Techniczne
- Kontrola dostępu per użytkownik
- Watermarking dokumentów
- Audit trail (kto, kiedy, co oglądał)
- Sharing links z hasłem i expiry date

### 7. **Akcjonariusze** 👥
- Know-how Artura Fijołka: **13,999,000 PLN** (69.995%)
- Podział według typu wkładu
- Historia dokumentów
- Filtry i wyszukiwanie

### 8. **Szablony Dokumentów** 📝
- 13 szablonów (umowy, uchwały, protokoły, dywidendy, cesja)
- Zmienne do wypełnienia
- Podgląd i pobieranie

## 🛠️ Stack Technologiczny

- **React 18** + **TypeScript** (strict mode)
- **Vite** - build tool
- **React Router** - routing
- **Tailwind CSS** - styling (dark mode: slate/blue)
- **Recharts** - wykresy i wizualizacje
- **Font Awesome** - ikony
- **React Hot Toast** - powiadomienia
- **date-fns** - manipulacja datami
- **jsPDF** - generowanie PDF
- **LocalStorage** - persistence danych

## 📦 Instalacja

```bash
# Klonuj repozytorium
git clone https://github.com/mdrceoholding/MDR-cosmomed-Izabela-Za-cka-.git

# Przejdź do katalogu projektu
cd shareholder-registry

# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev

# Otwórz w przeglądarce
# http://localhost:5173
```

## 👤 Konta Demonstracyjne

| Email | Hasło | Rola | Uprawnienia |
|-------|-------|------|-------------|
| admin@psa.pl | admin | Admin | Pełny dostęp |
| manager@psa.pl | manager | Manager | Odczyt + dodawanie (bez usuwania) |
| viewer@psa.pl | viewer | Viewer | Tylko odczyt |
| guest@psa.pl | guest | Guest | Brak dostępu do VDR i Analityki |

## 🗂️ Struktura Projektu

```
shareholder-registry/
├── src/
│   ├── components/        # Komponenty wielokrotnego użytku
│   │   ├── Layout.tsx
│   │   └── Sidebar.tsx
│   ├── pages/            # Strony aplikacji
│   │   ├── Dashboard.tsx
│   │   ├── Dividends.tsx
│   │   ├── Reports.tsx
│   │   ├── Calendar.tsx
│   │   ├── Vesting.tsx
│   │   ├── Analytics.tsx
│   │   ├── VDR.tsx
│   │   ├── Shareholders.tsx
│   │   ├── Documents.tsx
│   │   └── Login.tsx
│   ├── contexts/         # React Context API
│   │   └── AuthContext.tsx
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── data/            # Mock data
│   │   └── mockData.ts
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Główny komponent
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Statyczne pliki
├── tailwind.config.js   # Konfiguracja Tailwind
├── vite.config.ts       # Konfiguracja Vite
└── package.json
```

## 🎨 Design System

### Kolory (Dark Mode)
- **Tło:** `slate-900` (#0f172a)
- **Karty:** `slate-800` (#1e293b)
- **Obramowania:** `slate-700` (#334155)
- **Tekst:** `slate-100` (#e2e8f0)
- **Akcent:** `blue-600` (#2563eb)

### Komponenty
- `.btn-primary` - Niebieski przycisk akcji
- `.btn-secondary` - Szary przycisk drugorzędny
- `.card` - Karta z tłem i obramowaniem
- `.input` - Input field z focus state
- `.table` - Responsywna tabela

## 📊 Przykładowe Dane

### Dywidendy
- 3 wypłaty dywidend w historii (zaplanowana, zakończone)
- Łączna dywidenda (12m): ~1,550,000 PLN

### Kalendarz
- 5 wydarzeń (WZA, wypłaty, deadline'y)

### Vesting
- 2 harmonogramy (time-based, milestone-based)
- Jan Kowalski: 50% odblokowane (1,500/3,000 akcji)
- Piotr Wiśniewski: 25% odblokowane (250/1,001 akcji)

### VDR
- 8 dokumentów w różnych kategoriach
- Audit trail z historią dostępu

## 🔐 Permissions (Role-Based Access)

| Feature | Admin | Manager | Viewer | Guest |
|---------|-------|---------|--------|-------|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| Akcjonariusze | ✅ | ✅ | ✅ | ✅ |
| Dywidendy (dodawanie) | ✅ | ✅ | ❌ | ❌ |
| Dywidendy (odczyt) | ✅ | ✅ | ✅ | ✅ |
| Raporty | ✅ | ✅ | ✅ | ✅ |
| Kalendarz | ✅ | ✅ | ✅ | ✅ |
| Vesting | ✅ | ✅ | ✅ | ✅ |
| Analityka | ✅ | ✅ | ❌ | ❌ |
| VDR | ✅ | ✅ | ✅ | ❌ |
| Dokumenty | ✅ | ✅ | ✅ | ✅ |

## 🐛 Known Issues

1. **Mock Data**: Wszystkie dane są przechowywane w LocalStorage - przy odświeżeniu strony nowe dodane elementy mogą zostać zresetowane
2. **Export PDF**: Obecnie mock - wymaga integracji z jsPDF lub podobną biblioteką
3. **Watermarking**: Obecnie tylko placeholder - wymaga implementacji PDF watermarking
4. **Email Notifications**: Nie zaimplementowane - wymaga backendu

## 📝 Scripts

```bash
npm run dev          # Uruchom dev server
npm run build        # Build produkcyjny
npm run preview      # Podgląd buildu
npm run lint         # Linting (ESLint)
```

## 👨‍💻 Autor

Developed for **PSA** - Professional Shareholder Administration

## 📄 Licencja

Proprietary - All rights reserved

---

**Note**: Ten projekt używa mock data dla celów demonstracyjnych. W środowisku produkcyjnym należy zintegrować z właściwym backendem i bazą danych.

## 🎯 Key Highlights

- ✅ **13,999,000 PLN** - Know-how Artura Fijołka zachowany
- ✅ **4 użytkowników** z różnymi rolami
- ✅ **13 szablonów** dokumentów
- ✅ **Dark mode UI** (slate/blue)
- ✅ **Responsive design** (desktop + mobile)
- ✅ **TypeScript strict mode**
- ✅ **Wszystkie 6 zaawansowanych modułów** zaimplementowane
