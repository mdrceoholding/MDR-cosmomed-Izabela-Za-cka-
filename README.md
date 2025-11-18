# MDR PHILOSOPHY P.S.A. - System Zarządzania Uchwałami

Kompleksowy system zarządzania uchwałami i powiadomieniami dla MDR PHILOSOPHY PROSTA SPÓŁKA AKCYJNA.

## 🚀 Funkcjonalności

### 1. **Moduł Zarządzania Uchwałami**
- ✅ Dashboard z KPI i statystykami
- ✅ Lista uchwał z filtrowaniem i wyszukiwaniem
- ✅ Szczegóły uchwały z pełną treścią
- ✅ Formularze dodawania i edycji uchwał
- ✅ System statusów: Draft → Pending → Approved → Signed
- ✅ Workflow akceptacji i podpisów elektronicznych
- ✅ Eksport do PDF (przygotowane)
- ✅ Archiwum podpisanych uchwał

### 2. **Biblioteka Szablonów (13 wzorów)**
Kategorie szablonów:
- **Kapitał** (4 szablony):
  - Wniesienie wkładu niepieniężnego
  - Emisja akcji
  - Podwyższenie kapitału zakładowego
  - Zbycie składnika majątku

- **Finanse** (4 szablony):
  - Zatwierdzenie budżetu
  - Wypłata dywidendy
  - Zatwierdzenie sprawozdania finansowego
  - Zawarcie umowy kredytowej

- **Zarząd** (3 szablony):
  - Powołanie członka zarządu
  - Odwołanie członka zarządu
  - Udzielenie absolutorium

- **Organizacja** (2 szablony):
  - Zmiana siedziby spółki
  - Zmiana nazwy spółki

### 3. **System Powiadomień**
Automatyczne powiadomienia o:
- 🔔 Zbliżających się spotkaniach (7, 3, 1 dzień przed)
- ⏰ Terminach wymagających akcji
- ✅ Uchwałach oczekujących na akceptację (>3 dni)
- 📋 Projektach nieaktywnych (>7 dni)
- ✍️ Zmianach statusów uchwał

### 4. **Dashboard Główny**
- Statystyki (wszystkie, projekty, oczekujące, zatwierdzone, podpisane)
- Ostatnie uchwały
- Nadchodzące spotkania
- Ostatnie powiadomienia

## 🛠️ Stack Technologiczny

- **Frontend**: React 18.2 + TypeScript
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 6.21
- **State Management**: Zustand 4.4
- **Icons**: Lucide React
- **Date Handling**: date-fns 3.0

## 📦 Instalacja

```bash
# Instalacja zależności
npm install

# Uruchomienie dev server
npm run dev

# Build produkcyjny
npm run build

# Podgląd buildu
npm run preview
```

## 🏃 Uruchomienie

Po uruchomieniu `npm run dev` aplikacja dostępna pod adresem:
```
http://localhost:5173
```

## 📊 Struktura Projektu

```
src/
├── components/          # Komponenty UI
│   ├── Layout.tsx      # Layout aplikacji
│   ├── StatusBadge.tsx # Statusy uchwał
│   └── NotificationBell.tsx # Powiadomienia
│
├── pages/              # Strony aplikacji
│   ├── Dashboard.tsx
│   ├── ResolutionsPage.tsx
│   ├── ResolutionDetail.tsx
│   ├── NewResolution.tsx
│   ├── TemplatesPage.tsx
│   ├── ArchivePage.tsx
│   └── NotificationsPage.tsx
│
├── store/              # State management (Zustand)
│   └── useStore.ts
│
├── hooks/              # Custom React hooks
│   └── useNotificationChecker.ts
│
├── utils/              # Utility functions
│   └── notifications.ts
│
├── data/               # Mock data
│   └── mockData.ts
│
├── types/              # TypeScript types
│   └── index.ts
│
├── App.tsx             # Root component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 👥 Dane Testowe

System zawiera przykładowe dane:
- 3 uchwały testowe (różne statusy)
- 4 powiadomienia
- 13 szablonów dokumentów
- Dane spółki MDR PHILOSOPHY P.S.A.

## 🎯 Użytkowanie

### Tworzenie Nowej Uchwały

1. Przejdź do **Uchwały** → **Nowa uchwała**
2. Lub użyj szablonu z **Biblioteki szablonów**
3. Wypełnij formularz
4. Zapisz jako projekt

### Workflow Uchwały

1. **Draft** - Projekt uchwały
2. **Pending** - Oczekuje na akceptację
3. **Approved** - Zatwierdzona (możliwość podpisu)
4. **Signed** - Podpisana (archiwum)

### Powiadomienia

System automatycznie generuje powiadomienia:
- Co 1 godzinę sprawdza terminy
- Przy pierwszym załadowaniu aplikacji
- Można je oznaczać jako przeczytane lub usuwać

## 🔒 Bezpieczeństwo

- Wszystkie dane przechowywane lokalnie (Zustand)
- Brak połączenia z zewnętrznym API
- Gotowe do integracji z backendem

## 📝 Roadmap (Przyszłe Funkcjonalności)

- [ ] Integracja z API KRS
- [ ] Prawdziwy system podpisu elektronicznego (Profil Zaufany)
- [ ] Export PDF z podpisami
- [ ] Wysyłanie powiadomień email/SMS
- [ ] Multi-user auth
- [ ] Backend API (Node.js/PostgreSQL)
- [ ] Role i uprawnienia użytkowników

## 📄 Licencja

© 2025 MDR PHILOSOPHY P.S.A. Wszystkie prawa zastrzeżone.

---

**Spółka**: MDR PHILOSOPHY PROSTA SPÓŁKA AKCYJNA
**Siedziba**: ul. Sarmacka 4/70, 02-972 Warszawa
**KRS**: 0001116165
**NIP**: 9512600593
**REGON**: 529159975
