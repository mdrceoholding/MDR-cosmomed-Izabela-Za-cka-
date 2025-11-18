# Rejestr Akcjonariuszy PSA - MDR PHILOSOPHY

Kompleksowy system zarządzania rejestrem akcjonariuszy dla Prostej Spółki Akcyjnej (PSA).

## 🚀 Funkcje

### ✅ System Autentykacji
- Logowanie z walidacją
- Rejestracja nowych użytkowników
- Resetowanie hasła
- Sesje użytkowników (localStorage)
- Role użytkowników: Admin, Manager, Viewer, Guest

### 📊 Dashboard
- 4 karty KPI (Total Shares, Shareholders, Transactions, Documents)
- Wykres kołowy struktury akcjonariatu (Recharts)
- Tabela ostatnich transakcji
- Timeline wydarzeń (emisje, WZA, transakcje)

### 👥 Zarządzanie Użytkownikami (Admin)
- Lista wszystkich użytkowników
- Sortowanie po dowolnej kolumnie
- Filtry: rola, status, wyszukiwanie
- Akcje: Edycja, Usuwanie, Aktywacja/Dezaktywacja
- Dodawanie nowych użytkowników

### 👤 Profil Użytkownika
- Wyświetlanie danych osobowych
- Edycja profilu
- Zmiana hasła (walidacja)
- Historia aktywności
- Avatar z inicjałami

### 🎨 UX/UI
- **Toast Notifications** - komunikaty sukcesu/błędu (auto-hide 4s)
- **Loading Skeletons** - shimmer effect zamiast spinnerów
- **Smooth Animations** - transitions, hover effects
- **Dark Mode** - ciemny motyw (gray-900, slate/blue)
- **Responsive Design** - mobile-first, hamburger menu
- **Global Search Bar** - z ikonką lupy

## 🛠️ Technologie

- **React 18** + TypeScript
- **Tailwind CSS** - styling
- **Recharts** - wykresy
- **Font Awesome** - ikony
- **CryptoJS** - hashowanie haseł
- **Vite** - build tool

## 📦 Instalacja

```bash
# Instalacja dependencies
npm install

# Uruchomienie dev server
npm run dev

# Build produkcyjny
npm run build

# Preview buildu
npm run preview
```

## 🔐 Dane Demo

### Konta testowe (hasło: `demo1234` dla wszystkich):

1. **Administrator**
   - Email: `dorota.ploskon@mdrphilosophy.pl`
   - Rola: Admin (pełny dostęp)

2. **Manager**
   - Email: `jan.kowalski@mdrphilosophy.pl`
   - Rola: Manager (tworzenie dokumentów, dodawanie akcjonariuszy)

3. **Viewer**
   - Email: `anna.nowak@mdrphilosophy.pl`
   - Rola: Viewer (tylko odczyt)

### Mockowe dane:
- **Akcjonariusze**: Jan Kowalski (50%), Anna Nowak (30%), Piotr Lewandowski (20%)
- **Transakcje**: 5 ostatnich transakcji
- **Wydarzenia**: Emisje, WZA, transakcje, dokumenty
- **Dokumenty**: Uchwały, umowy, certyfikaty, raporty

## 📁 Struktura Projektu

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── ForgotPassword.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── users/
│   │   ├── UsersList.tsx
│   │   └── UserProfile.tsx
│   ├── Dashboard.tsx
│   ├── Toast.tsx
│   └── LoadingSkeleton.tsx
├── context/
│   ├── AuthContext.tsx
│   └── ToastContext.tsx
├── data/
│   └── mockData.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🎯 Roadmap

- [ ] Moduł akcjonariuszy (CRUD)
- [ ] Moduł transakcji z walidacją
- [ ] Generator dokumentów PDF
- [ ] Moduł WZA (planowanie, voting)
- [ ] Raporty Excel/PDF
- [ ] Email notifications
- [ ] 2FA authentication
- [ ] Audit logs
- [ ] API integration
- [ ] Multi-language support

## 👨‍💻 Autor

**MDR PHILOSOPHY PSA**
- System zarządzania rejestrem akcjonariuszy
- Wersja: 1.0.0
- Data: 2025-11-18

## 📄 Licencja

Proprietary - MDR PHILOSOPHY PSA © 2025
