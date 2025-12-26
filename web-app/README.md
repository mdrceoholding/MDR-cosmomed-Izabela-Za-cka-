# MDR Philosophy - Website & Web Application

> Kompleksowa platforma webowa dla usług compliance MDR (UE) 2017/745

## 📁 Struktura projektu

```
web-app/
├── public/
│   └── index.html              # 🚀 Standalone HTML version (gotowa do użycia!)
├── src/
│   └── MDRPhilosophyWebsite.jsx   # React component (zaawansowana wersja)
├── docs/
│   └── FUNKCJONALNOSC.md       # Pełna dokumentacja funkcjonalności
└── README.md                    # Ten plik
```

---

## 🎯 Dwie wersje strony

### 1️⃣ **HTML Version** (Standalone)

**Lokalizacja:** `public/index.html`

**Zalety:**
- ✅ **Zero dependencies** - działa bez instalacji czegokolwiek
- ✅ **Instant preview** - otwórz w przeglądarce i gotowe
- ✅ **Szybka** - < 100KB, ładuje się w < 1s
- ✅ **SEO-friendly** - statyczny HTML indeksowany przez Google

**Jak uruchomić:**
```bash
# Opcja 1: Bezpośrednio w przeglądarce
open public/index.html

# Opcja 2: Lokalny serwer (lepsze dla testów)
cd public
python3 -m http.server 8000
# Otwórz: http://localhost:8000

# Opcja 3: Live Server (VS Code extension)
# Kliknij prawym na index.html → "Open with Live Server"
```

**Funkcjonalność:**
- Hero section z animacjami
- Usługi (4 pakiety)
- Case Studies (3 studia przypadków)
- Formularz kontaktowy
- Responsywny design (mobile + desktop)
- Smooth scrolling

---

### 2️⃣ **React Version** (Zaawansowana)

**Lokalizacja:** `src/MDRPhilosophyWebsite.jsx`

**Dodatkowe funkcje:**
- ✅ **Interaktywny quiz** - ocena compliance MDR
- ✅ **Kalkulator ROI** - obliczanie zwrotu z inwestycji
- ✅ **System bookingu** - 3-stepowy flow rezerwacji
- ✅ **Blog z filtrowaniem** - 12 artykułów w 3 kategoriach
- ✅ **Szczegółowe case studies** - timeline, wykresy, testimonials
- ✅ **FAQ accordion** - 8 pytań w kategoriach
- ✅ **State management** - React hooks

**Jak uruchomić:**

**Krok 1: Setup projektu React**
```bash
# Utwórz nowy projekt React (jeśli jeszcze nie istnieje)
npx create-react-app mdr-philosophy-app
cd mdr-philosophy-app

# Zainstaluj dependencies
npm install lucide-react
```

**Krok 2: Skopiuj komponent**
```bash
# Skopiuj plik do src/
cp ../web-app/src/MDRPhilosophyWebsite.jsx src/

# Zamień App.js
echo "import MDRPhilosophyWebsite from './MDRPhilosophyWebsite';\nexport default MDRPhilosophyWebsite;" > src/App.js
```

**Krok 3: Uruchom**
```bash
npm start
# Otwiera się automatycznie na http://localhost:3000
```

**Build produkcyjny:**
```bash
npm run build
# Output w build/ - gotowe do deploy na hosting
```

---

## 📊 Porównanie wersji

| Feature | HTML Version | React Version |
|---------|--------------|---------------|
| **Instalacja** | Żadna | Node.js + npm |
| **Czas ładowania** | < 1s | 2-3s (first load) |
| **Rozmiar** | ~80KB | ~200KB (minified) |
| **SEO** | ★★★★★ | ★★★☆☆ (wymaga SSR) |
| **Interaktywność** | Podstawowa | Zaawansowana |
| **Quiz compliance** | ❌ | ✅ |
| **Kalkulator ROI** | ❌ | ✅ |
| **Booking flow** | Prosty form | 3-step wizard |
| **Blog** | Statyczny | Filtrowanie + detail view |
| **Case Studies** | Basic | Timeline + wykresy |
| **Maintenance** | Edycja HTML | Component updates |

**Rekomendacja:**
- **HTML version** - dla szybkiego MVP, landing page, SEO
- **React version** - dla pełnej aplikacji z zaawansowanymi funkcjami

---

## 🎨 Design System

### Typography
- **Font:** Inter (Google Fonts)
- **H1:** 64px / 700 weight (hero)
- **H2:** 48px / 700 weight (section titles)
- **H3:** 24px / 700 weight (subsections)
- **Body:** 16px / 400 weight
- **Small:** 14px / 400 weight

### Colors
```css
--black: #000000          /* Primary CTA, headers */
--dark-gray: #1a1a1a      /* Body text */
--medium-gray: #666666    /* Secondary text */
--light-gray: #e5e5e5     /* Borders */
--background: #f9f9f9     /* Section backgrounds */
--white: #ffffff          /* Cards */
--blue: #2563eb           /* Accents (recommended badge) */
```

### Layout
- **Container:** max-width 1200px
- **Grid:** 12-column Swiss grid
- **Gaps:** 24px standard
- **Sections:** 80-120px padding (vertical)
- **Breakpoints:** 768px (mobile), 1024px (desktop)

### Components
- **Buttons:** 16px padding, font-weight 500, hover transitions
- **Cards:** 1px border, hover effects (shadow + border color)
- **Forms:** Full-width inputs, 12px padding, focus states
- **Navigation:** Sticky, underline on hover (::after animation)

---

## 📄 Sekcje strony

### 1. **Home** (Hero)
- H1: "Compliance MDR dla medycyny estetycznej"
- 2 CTA buttons: Ocena + Usługi
- Stats: 60+ kliniki, 100% compliance, Blockchain
- Zaufali nam: 4 klientów
- Dlaczego MDR Philosophy: 3 benefits
- Black CTA box: Umów konsultację

### 2. **O Nas**
- Opis firmy (P.S.A., specjalizacja)
- Struktura organizacyjna (team)
- Statystyki (kliniki, szkolenia, wartość)

### 3. **Usługi**
- 4 typy usług (karty):
  - Doradztwo MDR
  - Szkolenia NCKU IAM Poland
  - System Franchisowy
  - Badania PMCF

- **Pakiety doradztwa:**
  - Audyt MDR: 5 000 PLN
  - Standard: 30 000 PLN ⭐
  - Premium + AI: 50 000 PLN
  - Franczyza: 150 000 PLN + 5k/mies

### 4. **Blog** (React only)
- 12 postów w 3 kategoriach
- Filtrowanie: All / Regulations / Courses / Case Studies
- Full article view
- CTA w artykułach

### 5. **Ocena Compliance** (React only)
- Quiz 5 pytań
- Scoring algorithm
- Rekomendacja pakietu
- CTA: Zobacz pakiet

### 6. **Case Studies**
- **#1:** Estetic Group - 5 klinik, 90 dni, 100% compliance
- **#2:** BeautyMed - audyt 14 dni, 47 niezgodności, 0 PLN kar
- **#3:** Lumiere - franczyza Kraków, break-even M4
- Szczegóły: timeline, metrics, testimonials

### 7. **ROI Calculator** (React only)
- Inputy: przychód, ryzyko kar, koszty szkoleń, czas, franczyzy
- Output: Total cost vs Benefits, ROI%, Break-even
- Breakdown korzyści
- Auto-rekomendacja pakietu

### 8. **FAQ**
- 8 pytań w kategoriach
- Accordion style
- Najczęstsze objections

### 9. **Kontakt**
- Formularz: name, email, phone, clinic, service, message
- Dane kontaktowe: email, tel, adres, godziny
- Downloadable PDFs (broszura, cennik, model franczyzowy)

---

## 🚀 Deployment

### HTML Version

**GitHub Pages:**
```bash
# Push do repo
git add public/index.html
git commit -m "Add MDR Philosophy website"
git push origin main

# Włącz GitHub Pages w Settings
# Source: main branch / docs folder
# Rename public/ → docs/ (GitHub Pages wymaga)
mv public docs
git add docs
git commit -m "Rename for GitHub Pages"
git push
```

**Netlify Drop:**
1. Otwórz https://app.netlify.com/drop
2. Przeciągnij folder `public/`
3. Gotowe! (URL: random-name.netlify.app)

**Custom domain:**
- Dodaj CNAME: www.mdrphilosophy.pl → netlify-site.netlify.app
- Netlify auto-SSL (Let's Encrypt)

---

### React Version

**Vercel (zalecane dla React):**
```bash
# Install Vercel CLI
npm i -g vercel

# Build
npm run build

# Deploy
vercel build
vercel --prod
```

**Netlify:**
```bash
# Build settings
Build command: npm run build
Publish directory: build/

# Deploy
netlify deploy --prod
```

**Custom domain:**
- Vercel/Netlify panel → Add custom domain
- DNS: CNAME www → vercel.app/netlify.app

---

## 📈 Analytics & Tracking

### Google Analytics 4

**HTML version:**
```html
<!-- Dodaj przed </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**React version:**
```bash
npm install react-ga4

# W App.js / index.js
import ReactGA from 'react-ga4';
ReactGA.initialize('G-XXXXXXXXXX');
```

### Event Tracking (kluczowe konwersje)

```javascript
// Contact form submit
gtag('event', 'contact_form_submit', {
  service: 'audit_mdr',
  value: 0
});

// Quiz completed
gtag('event', 'quiz_completed', {
  score: 75,
  recommendation: 'standard'
});

// ROI calculator used
gtag('event', 'roi_calculated', {
  roi_percentage: 180,
  breakeven_months: 6
});

// Case study viewed
gtag('event', 'case_study_view', {
  case_id: 1,
  case_name: 'Estetic Group'
});

// Package selected
gtag('event', 'package_selected', {
  package: 'standard',
  price: 30000
});
```

---

## 🔧 Customizacja

### Zmiana kolorów

**HTML version:** Edytuj CSS w `<style>` tag
```css
/* Znajdź i zamień */
#000 → Twój kolor (np. #2563eb dla niebieskiego)
#666 → Twój secondary text color
```

**React version:** Edytuj `<style>{...}</style>` w komponencie

### Zmiana contentu

**Kontakt:**
```javascript
// Znajdź sekcję Contact
Email: compliance@mdrcosmomed.pl → twoj@email.pl
Telefon: +48 22 222 22 22 → twój numer
Adres: ul. Przykładowa 123, Warszawa → twój adres
```

**Pakiety (ceny):**
```javascript
// Znajdź const packages = {...}
packages.standard.price = '30 000' → Twoja cena
```

**Blog posty:**
```javascript
// Znajdź const blogPosts = [...]
// Dodaj nowy post:
{
  id: 13,
  category: 'regulations',
  title: 'Twój tytuł',
  date: '01.01.2025',
  excerpt: 'Krótki opis...',
  readTime: '5 min',
  content: 'Pełna treść artykułu...'
}
```

**Case Studies:**
```javascript
// Znajdź const caseStudies = [...]
// Edytuj istniejące lub dodaj nowe według struktury
```

---

## 🐛 Troubleshooting

### Problem: Formularz nie wysyła

**HTML version:**
Formularz używa `alert()` jako placeholder. Aby podłączyć backend:

```javascript
// Zamień w <script>
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  const response = await fetch('https://your-api.com/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    alert('Dziękujemy! Odezwiemy się wkrótce.');
    this.reset();
  }
});
```

**React version:**
Podobnie - dodaj fetch() do handleru submit.

---

### Problem: Icons nie ładują się

**React version:**
Upewnij się że zainstalowałeś lucide-react:
```bash
npm install lucide-react
```

**HTML version:**
Ikony są jako Unicode emoji (📧 📞 📍 🕐), nie wymagają biblioteki.

---

### Problem: Animacje nie działają

Sprawdź czy skrypt IntersectionObserver jest załadowany:

```javascript
// Powinien być na końcu <body>
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);
```

---

## 📚 Dokumentacja

- **[FUNKCJONALNOSC.md](docs/FUNKCJONALNOSC.md)** - Pełna dokumentacja wszystkich sekcji i funkcji
- **[KOMPLETNY-KOD-OPERACYJNY.md](../compliance-mdr/KOMPLETNY-KOD-OPERACYJNY.md)** - Business plan i oferta MDR
- **[EXECUTIVE-SUMMARY.md](../compliance-mdr/EXECUTIVE-SUMMARY.md)** - Streszczenie projektu

---

## 🤝 Contributing

Jeśli chcesz dodać nowe funkcje lub poprawić istniejące:

1. **Fork** tego repo
2. **Create branch:** `git checkout -b feature/amazing-feature`
3. **Commit:** `git commit -m 'Add amazing feature'`
4. **Push:** `git push origin feature/amazing-feature`
5. **Open Pull Request**

---

## 📝 Changelog

### v1.0 (26.12.2025)
- ✅ HTML standalone version (podstawowa)
- ✅ React component version (zaawansowana)
- ✅ Pełna dokumentacja funkcjonalności
- ✅ 9 głównych sekcji
- ✅ 12 blog posts
- ✅ 3 case studies
- ✅ Responsive design
- ✅ Animacje scroll
- ✅ Formularz kontaktowy
- ✅ Quiz compliance (React)
- ✅ Kalkulator ROI (React)
- ✅ Booking flow (React)

---

## 📧 Support

Pytania techniczne:
- Email: dev@mdrphilosophy.pl
- GitHub Issues: [Link]

Pytania biznesowe:
- Email: compliance@mdrcosmomed.pl
- Tel: +48 22 222 22 22

---

## 📄 License

© 2024 MDR Philosophy P.S.A. - Wszelkie prawa zastrzeżone.

Kod źródłowy dostępny dla klientów i partnerów MDR Philosophy.

---

**Wersja:** 1.0
**Data:** 26.12.2025
**Status:** Production Ready ✅
