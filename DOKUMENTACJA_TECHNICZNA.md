# Dokumentacja Techniczna - Rejestr Akcjonariuszy PSA

## Spis treści

1. [Przegląd systemu](#przegląd-systemu)
2. [Architektura](#architektura)
3. [Technologie](#technologie)
4. [Struktura projektu](#struktura-projektu)
5. [Komponenty](#komponenty)
6. [Typy danych](#typy-danych)
7. [Funkcjonalności](#funkcjonalności)
8. [Instalacja i uruchomienie](#instalacja-i-uruchomienie)
9. [Testowanie](#testowanie)
10. [Deployment](#deployment)

---

## Przegląd systemu

**Rejestr Akcjonariuszy PSA** to kompleksowa aplikacja webowa do zarządzania akcjonariuszami Prostej Spółki Akcyjnej (PSA) z zaawansowanym modułem generowania dokumentów prawnych.

### Główne funkcjonalności

- **Dashboard** z wykresami interaktywnymi (Recharts)
- **Zarządzanie akcjonariuszami** (CRUD, sortowanie, filtry, paginacja)
- **Cap Table** - wizualizacja struktury kapitałowej
- **Moduł dokumentów** - 10 gotowych szablonów prawnych
- **Edytor dokumentów** - split-screen z live preview
- **Eksport do PDF** - dokumenty w formacie A4
- **Toast notifications** - powiadomienia w czasie rzeczywistym
- **Loading skeletons** - płynne UX podczas ładowania

---

## Architektura

### Model MVC/MVVM

```
┌─────────────────┐
│      View       │  ← React Components (UI)
│   (Components)  │
└────────┬────────┘
         │
┌────────▼────────┐
│   ViewModel     │  ← useState, useMemo, useEffect
│  (State/Hooks)  │
└────────┬────────┘
         │
┌────────▼────────┐
│     Model       │  ← Types, Data (companyData, templates)
│   (Data/Types)  │
└─────────────────┘
```

### Flow danych

```
User Interaction
      ↓
  Event Handler
      ↓
  State Update
      ↓
   Re-render
      ↓
  Updated UI
```

---

## Technologie

### Frontend Framework
- **React 18.2.0** - Biblioteka UI
- **TypeScript 5.2.2** - Typowanie statyczne
- **Vite 5.0.8** - Build tool i dev server

### UI & Styling
- **Tailwind CSS 3.3.6** - Utility-first CSS framework
- **Font Awesome 6.4.2** - Ikony
- **Dark Mode** - Domyślny motyw ciemny

### Wykresy & Wizualizacje
- **Recharts 2.10.3** - Responsywne wykresy (Pie, Bar, Line)

### Notifications
- **React Hot Toast 2.4.1** - Toast notifications

### PDF Generation
- **html2pdf.js 0.10.1** - Eksport HTML → PDF

### Dev Tools
- **ESLint 8.55.0** - Linting
- **PostCSS 8.4.32** - CSS processing
- **Autoprefixer 10.4.16** - CSS vendor prefixes

---

## Struktura projektu

```
MDR-cosmomed-Izabela-Za-cka-/
│
├── public/                      # Pliki statyczne
│
├── src/
│   ├── components/              # Komponenty React
│   │   ├── Dashboard.tsx        # Dashboard z wykresami
│   │   ├── Shareholders.tsx     # Moduł akcjonariuszy
│   │   ├── DocumentTemplates.tsx # Biblioteka wzorów
│   │   ├── DocumentEditor.tsx   # Edytor dokumentów
│   │   ├── Sidebar.tsx          # Nawigacja boczna
│   │   └── LoadingSkeleton.tsx  # Loading states
│   │
│   ├── data/                    # Dane aplikacji
│   │   ├── companyData.ts       # Dane spółki i akcjonariuszy
│   │   └── templates.ts         # 10 wzorów dokumentów HTML
│   │
│   ├── types/                   # Definicje TypeScript
│   │   └── index.ts             # Wszystkie typy i enum'y
│   │
│   ├── App.tsx                  # Główny komponent
│   ├── main.tsx                 # Entry point
│   └── index.css                # Tailwind + custom styles
│
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.js           # Tailwind config
├── vite.config.ts               # Vite config
└── README_APP.md                # Dokumentacja użytkownika
```

---

## Komponenty

### 1. **Dashboard.tsx**

**Opis:** Główny panel z statystykami i wykresami

**Props:** Brak

**State:**
- `loading: boolean` - Status ładowania

**Funkcjonalności:**
- 4 karty statystyczne (Akcjonariusze, Akcje, Kapitał, Dokumenty)
- **Pie Chart** - Struktura akcjonariatu (Recharts)
- **Bar Chart** - Liczba akcji na akcjonariusza
- **Line Chart** - Wartość akcji w czasie (6 miesięcy)
- Informacje o spółce
- Lista ostatniej aktywności

**Zależności:**
- `recharts`
- `react-hot-toast`
- `LoadingSkeleton`

---

### 2. **Shareholders.tsx**

**Opis:** Moduł zarządzania akcjonariuszami

**Props:** Brak

**State:**
- `loading: boolean` - Status ładowania
- `shareholders: Shareholder[]` - Lista akcjonariuszy
- `searchQuery: string` - Fraza wyszukiwania
- `sortField: SortField` - Pole sortowania (name | shares | percentage)
- `sortOrder: SortOrder` - Kierunek (asc | desc)
- `filterType: FilterType` - Filtr typu (all | physical | legal)
- `currentPage: number` - Aktualna strona paginacji

**Funkcjonalności:**
- **Wyszukiwanie** - po nazwie i adresie
- **Filtry** - Wszyscy / Osoby fizyczne / Osoby prawne
- **Sortowanie** - po nazwie, liczbie akcji, udziale %
- **Paginacja** - 5 elementów na stronę
- **CRUD** - Placeholder dla dodawania/edycji/usuwania
- **Eksport** - Placeholder dla eksportu CSV

**Hooks:**
- `useMemo` - Optymalizacja filtrowania i sortowania

---

### 3. **DocumentTemplates.tsx**

**Opis:** Biblioteka 10 wzorów dokumentów

**Props:**
- `onSelectTemplate: (template: DocumentTemplate) => void`

**State:**
- `selectedCategory: TemplateCategory | 'all'` - Aktywny filtr

**Funkcjonalności:**
- Filtry po kategorii (Uchwały, Protokoły, Umowy, Raporty)
- Grid responsywny (1/2/3 kolumny)
- Każdy kafelek:
  - Ikona Font Awesome
  - Nazwa i opis
  - Kategoria (badge)
  - Liczba pól do wypełnienia
  - Przycisk "Użyj wzoru"

**Kategorie:**
- **Uchwały** (3): Emisja akcji, Zmiana statutu, Podział zysku
- **Protokoły** (2): WZA, Zarząd
- **Umowy** (3): Zbycie akcji, Lock-up, Użyczenie lokalu
- **Raporty** (2): Cap Table, Statut PSA

---

### 4. **DocumentEditor.tsx**

**Opis:** Split-screen edytor dokumentów z live preview

**Props:**
- `template: DocumentTemplate` - Wybrany szablon
- `onBack: () => void` - Callback powrotu

**State:**
- `formData: FormFieldValue` - Dane formularza
- `logoFile: string` - Base64 logo
- `htmlContent: string` - Wygenerowany HTML
- `errors: Record<string, string>` - Błędy walidacji

**Funkcjonalności:**
- **Auto-fill** - Automatyczne wypełnianie danych spółki
- **Live preview** - Podgląd A4 w czasie rzeczywistym
- **Upload logo** - Obsługa plików graficznych
- **Walidacja** - Pola wymagane, pattern, min/max
- **Toolbar**:
  - Eksport PDF (html2pdf.js)
  - Zapisz szkic (localStorage)
  - Drukuj (window.print)

**Typy pól:**
- TEXT, NUMBER, DATE
- TEXTAREA, SELECT
- IMAGE (upload)
- SHAREHOLDER_SELECT (dropdown z akcjonariuszami)

**Effects:**
- Auto-fill przy montowaniu komponentu
- Generowanie HTML preview przy każdej zmianie formData

---

### 5. **Sidebar.tsx**

**Opis:** Nawigacja boczna

**Props:**
- `currentView: string` - Aktywny widok
- `onNavigate: (view: string) => void` - Callback nawigacji

**Nawigacja:**
1. Dashboard (fa-home)
2. Akcjonariusze (fa-users)
3. Cap Table (fa-chart-pie)
4. **Wzory dokumentów** (fa-file-invoice)
5. Raporty (fa-file-chart-line)
6. Ustawienia (fa-cog)

**Styling:**
- Dark mode (bg-gray-900)
- Aktywny element: bg-blue-600
- Hover effects
- Ikony Font Awesome

---

### 6. **LoadingSkeleton.tsx**

**Opis:** Komponenty skeleton dla loading states

**Props:**
- `type?: 'card' | 'table' | 'chart' | 'text'` - Typ skeleton
- `count?: number` - Liczba elementów

**Warianty:**
- **card** - Karty statystyczne
- **table** - Tabele danych
- **chart** - Wykresy
- **text** - Linie tekstu

**Animacja:** `animate-pulse` (Tailwind)

---

## Typy danych

### Enums

```typescript
enum TemplateCategory {
  RESOLUTIONS = 'Uchwały',
  PROTOCOLS = 'Protokoły',
  CONTRACTS = 'Umowy',
  REPORTS = 'Raporty'
}

enum TemplateFieldType {
  TEXT = 'text',
  DATE = 'date',
  NUMBER = 'number',
  SELECT = 'select',
  TEXTAREA = 'textarea',
  IMAGE = 'image',
  SHAREHOLDER_SELECT = 'shareholder_select'
}
```

### Interfaces

```typescript
interface CompanyData {
  name: string;
  krs: string;
  nip: string;
  address: string;
  logoUrl?: string;
}

interface Shareholder {
  id: string;
  name: string;
  shares: number;
  percentage: number;
  type: 'physical' | 'legal';
  address?: string;
  pesel?: string;
  nip?: string;
}

interface TemplateVariable {
  key: string;
  label: string;
  type: TemplateFieldType;
  required: boolean;
  defaultValue?: string | number;
  options?: string[];
  placeholder?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  icon: string;
  htmlTemplate: string;
  variables: TemplateVariable[];
  previewImage?: string;
}

interface FilledDocument {
  id: string;
  templateId: string;
  templateName: string;
  createdAt: Date;
  updatedAt: Date;
  data: Record<string, any>;
  htmlContent: string;
  status: 'draft' | 'final';
}
```

---

## Funkcjonalności

### 1. Dashboard

#### Wykresy Recharts

**Pie Chart - Struktura akcjonariatu:**
```typescript
<PieChart>
  <Pie
    data={pieData}
    dataKey="value"
    label={({ name, value }) => `${name}: ${value}%`}
  />
  <Tooltip />
</PieChart>
```

**Bar Chart - Liczba akcji:**
```typescript
<BarChart data={barData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="akcje" fill="#10b981" />
</BarChart>
```

**Line Chart - Wartość w czasie:**
```typescript
<LineChart data={lineData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="miesiac" />
  <YAxis />
  <Line type="monotone" dataKey="wartosc" stroke="#8b5cf6" />
</LineChart>
```

---

### 2. Akcjonariusze - Sortowanie i filtry

#### useMemo Hook

```typescript
const filteredAndSortedShareholders = useMemo(() => {
  let result = [...shareholders];

  // Filtrowanie po typie
  if (filterType !== 'all') {
    result = result.filter(sh => sh.type === filterType);
  }

  // Wyszukiwanie
  if (searchQuery) {
    result = result.filter(sh =>
      sh.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sh.address?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Sortowanie
  result.sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  return result;
}, [shareholders, searchQuery, sortField, sortOrder, filterType]);
```

#### Paginacja

```typescript
const totalPages = Math.ceil(filteredAndSortedShareholders.length / itemsPerPage);
const paginatedShareholders = useMemo(() => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return filteredAndSortedShareholders.slice(startIndex, startIndex + itemsPerPage);
}, [filteredAndSortedShareholders, currentPage]);
```

---

### 3. Edytor dokumentów

#### Generowanie HTML Preview

```typescript
useEffect(() => {
  let html = template.htmlTemplate;

  // Replace variables
  Object.keys(formData).forEach(key => {
    const value = formData[key];
    const regex = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(regex, String(value || ''));
  });

  // Handle logo
  if (logoFile) {
    html = html.replace(/{{LOGO_SPOLKI}}/g, logoFile);
    html = html.replace(/{{#if LOGO_SPOLKI}}/g, '');
    html = html.replace(/{{\/if}}/g, '');
  } else {
    html = html.replace(/{{#if LOGO_SPOLKI}}.*?{{\/if}}/gs, '');
  }

  // Add current year
  html = html.replace(/{{YEAR}}/g, new Date().getFullYear().toString());

  setHtmlContent(html);
}, [formData, logoFile, template]);
```

#### Eksport PDF

```typescript
const handleExportPDF = () => {
  if (!validateForm()) {
    alert('Proszę poprawić błędy w formularzu');
    return;
  }

  const element = document.getElementById('document-preview');
  const opt = {
    margin: 20,
    filename: `${template.name.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
};
```

#### Zapis szkicu

```typescript
const handleSaveDraft = () => {
  const draft = {
    templateId: template.id,
    templateName: template.name,
    data: formData,
    savedAt: new Date().toISOString()
  };

  const drafts = JSON.parse(localStorage.getItem('documentDrafts') || '[]');
  drafts.push(draft);
  localStorage.setItem('documentDrafts', JSON.stringify(drafts));

  toast.success('Szkic zapisany pomyślnie!');
};
```

---

### 4. Toast Notifications

```typescript
import toast from 'react-hot-toast';

// Success
toast.success('Dane załadowane pomyślnie!');

// Error
toast.error('Wystąpił błąd!');

// Custom
toast('Funkcja będzie dostępna wkrótce!', { icon: '🚀' });

// Configuration w App.tsx
<Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      background: '#1f2937',
      color: '#fff',
      borderRadius: '8px',
      padding: '16px',
    },
    success: {
      iconTheme: {
        primary: '#10b981',
        secondary: '#fff',
      },
    },
  }}
/>
```

---

## Instalacja i uruchomienie

### Wymagania

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0 lub **yarn** >= 1.22.0

### Instalacja zależności

```bash
npm install
```

### Development

```bash
npm run dev
# Aplikacja dostępna na http://localhost:5173
```

### Production Build

```bash
npm run build
# Build w folderze dist/
```

### Preview Production

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

---

## Testowanie

### Testy manualne

1. **Dashboard:**
   - [ ] Wykresy renderują się poprawnie
   - [ ] Loading skeletons działają
   - [ ] Toast notification przy ładowaniu

2. **Akcjonariusze:**
   - [ ] Wyszukiwanie działa
   - [ ] Sortowanie po kolumnach
   - [ ] Filtry (wszystkie/fizyczne/prawne)
   - [ ] Paginacja (poprzednia/następna/numery stron)
   - [ ] Toast przy akcjach (dodaj/usuń/edytuj)

3. **Wzory dokumentów:**
   - [ ] Filtry kategorii
   - [ ] Przycisk "Użyj wzoru" otwiera edytor

4. **Edytor dokumentów:**
   - [ ] Auto-fill danych spółki
   - [ ] Live preview działa
   - [ ] Walidacja pól
   - [ ] Upload logo
   - [ ] Eksport PDF
   - [ ] Zapis szkicu
   - [ ] Drukowanie

### Test Cases

#### TC01: Sortowanie akcjonariuszy

**Kroki:**
1. Przejdź do "Akcjonariusze"
2. Kliknij nagłówek "Nazwa"
3. Sprawdź sortowanie ASC
4. Kliknij ponownie
5. Sprawdź sortowanie DESC

**Oczekiwany wynik:**
Lista jest sortowana alfabetycznie / odwrotnie alfabetycznie

#### TC02: Eksport dokumentu do PDF

**Kroki:**
1. Przejdź do "Wzory dokumentów"
2. Wybierz "Uchwała emisji akcji"
3. Wypełnij wszystkie pola
4. Kliknij "Eksport PDF"

**Oczekiwany wynik:**
Pobiera się plik PDF z wypełnionym dokumentem

---

## Deployment

### Vite Static Build

```bash
npm run build
```

Folder `dist/` zawiera:
- `index.html`
- `assets/` (JS, CSS bundles)

### Deploy na Netlify

1. **Build command:** `npm run build`
2. **Publish directory:** `dist`

### Deploy na Vercel

```bash
vercel --prod
```

### Environment Variables

Brak - aplikacja działa 100% po stronie klienta (no backend).

---

## Performance

### Optymalizacje

1. **useMemo** - Cachowanie filtrowania i sortowania
2. **useEffect cleanup** - Czyszczenie timerów
3. **Lazy loading** - Obrazy i komponenty (do zaimplementowania)
4. **Code splitting** - Vite automatycznie
5. **Tree shaking** - Tailwind purge unused CSS

### Lighthouse Scores (Target)

- **Performance:** > 90
- **Accessibility:** > 95
- **Best Practices:** > 90
- **SEO:** > 85

---

## Bezpieczeństwo

### Potencjalne zagrożenia

1. **XSS** - `dangerouslySetInnerHTML` w DocumentEditor
   - Mitigation: Sanityzacja input przed render

2. **Storage** - localStorage przechowuje szkice
   - Mitigation: Nie przechowywać danych wrażliwych

3. **File Upload** - Upload logo bez walidacji
   - Mitigation: Dodać walidację rozmiaru i typu pliku

### Rekomendacje

- [ ] Dodać CSP (Content Security Policy)
- [ ] Implementować input sanitization
- [ ] Limit rozmiaru uploadowanych plików (max 2MB)
- [ ] HTTPS only w production

---

## Roadmap

### v1.1 (Q2 2025)
- [ ] Backend API (Node.js + Express)
- [ ] Baza danych (PostgreSQL/MongoDB)
- [ ] Autentykacja (JWT)
- [ ] Edycja i usuwanie akcjonariuszy
- [ ] Historia transakcji

### v1.2 (Q3 2025)
- [ ] Multi-user support
- [ ] Role-based access control
- [ ] Email notifications
- [ ] Eksport Cap Table do Excel
- [ ] Dark/Light mode toggle

### v2.0 (Q4 2025)
- [ ] Mobile app (React Native)
- [ ] Real-time collaboration
- [ ] E-signature integration
- [ ] Multi-language support (EN, PL, DE)

---

## Kontakt

**Projekt:** Rejestr Akcjonariuszy PSA
**Client:** MDR Cosmo Med / IAM POLAND SP Z O.O.
**Wersja:** 1.0.0
**Data:** 2025-01-18

---

*Dokumentacja wygenerowana automatycznie dla wersji 1.0.0*
