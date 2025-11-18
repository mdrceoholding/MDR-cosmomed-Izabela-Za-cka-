# 🫁 Holotropic Breathwork - Aplikacja Mobilna

> Kompleksowa aplikacja PWA wspierająca holotropową terapię oddechową, łącząca tradycyjne metody pracy z oddechem z nowoczesną technologią.

![License](https://img.shields.io/badge/license-PROPRIETARY-blue)
![Node](https://img.shields.io/badge/node-18.x-green)
![React](https://img.shields.io/badge/react-18.2-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.2-blue)

## 📋 Spis treści

- [Opis projektu](#opis-projektu)
- [Funkcjonalności](#funkcjonalności)
- [Architektura](#architektura)
- [Wymagania](#wymagania)
- [Instalacja](#instalacja)
- [Konfiguracja](#konfiguracja)
- [Uruchomienie](#uruchomienie)
- [Dokumentacja API](#dokumentacja-api)
- [Bezpieczeństwo i RODO](#bezpieczeństwo-i-rodo)
- [Roadmap](#roadmap)
- [Licencja](#licencja)

## 🎯 Opis projektu

Aplikacja Holotropic Breathwork to nowoczesna platforma Progressive Web App (PWA) zaprojektowana dla:

- **Uczestników sesji** - eksplorujących świadomość przez oddech
- **Certyfikowanych facilitatorów** - prowadzących sesje grupowe i indywidualne

### Główne cele

✅ Bezpieczne praktykowanie holotropowego oddechu
✅ Personalizacja ścieżek oddechowych
✅ Profesjonalne wsparcie facilitatorów
✅ Pełna zgodność z RODO i polskimi standardami bezpieczeństwa
✅ Offline-first experience dzięki PWA

## ✨ Funkcjonalności

### Dla uczestników sesji

#### 🔄 Personalizowane ścieżki oddechowe
- 3 poziomy intensywności: **łagodna**, **średnia**, **głęboka**
- Dynamiczne czasy trwania: 30, 60, 90, 120 minut
- Wizualizacje oddechowe z animacjami w czasie rzeczywistym
- Adaptacyjne tempo oparte na wzorcach oddechowych

#### 🎵 Audio wizualizacje
- Przewodnictwo głosowe w języku polskim i angielskim
- Instrukcje prowadzące przez fazę aktywną, szczytową i integracyjną
- Możliwość włączenia/wyłączenia audio w trakcie sesji

#### 📊 Monitorowanie sesji
- Timer z wizualizacją czasu pozostałego
- Licznik cykli oddechowych
- Animowany krąg oddechowy pokazujący fazę (wdech/zatrzymanie/wydech)

#### 🆘 Bezpieczeństwo
- Przycisk SOS z natychmiastowym przerwaniem sesji
- Geolokalizacja dla służb pomocowych
- Automatyczne powiadomienia kontaktu awaryjnego
- Disclaimery i przeciwwskazania przed pierwszą sesją

#### 📔 Dziennik doświadczeń
- Prywatny notes tekstowy i głosowy
- Tagowanie emocji (15+ opcji) z intensywnością
- Katalogowanie symboli i tematów
- Wglądy i refleksje post-sesyjne
- Opcja udostępniania facilitatorowi

### Dla facilitatorów

#### 👥 Zarządzanie grupami
- Tworzenie wirtualnych pokoi sesji
- System zaproszeń dla uczestników
- Real-time dashboard z statusem każdego uczestnika
- Monitorowanie alertów biometrycznych (opcjonalnie)

#### 📋 System zgód RODO
- Cyfrowy proces kwalifikacji przedsesyjnej
- Automatyczna weryfikacja przeciwwskazań
- Generowanie PDF-ów zgodnie z polskimi standardami
- End-to-end encryption danych medycznych

## 🏗️ Architektura

### Stack technologiczny

**Frontend:** React 18.2 + TypeScript + Vite + TailwindCSS + Framer Motion
**Backend:** Node.js + Express + PostgreSQL + Sequelize
**Security:** JWT + bcrypt + AES-256-GCM encryption

## 📦 Wymagania

- Node.js >= 18.x
- PostgreSQL >= 14.x
- RAM: 2GB
- Disk: 500MB

## 🚀 Instalacja

### 1. Instalacja zależności

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 2. Konfiguracja bazy danych

```bash
createdb holotropic_breathwork
```

### 3. Zmienne środowiskowe

Skopiuj pliki `.env.example` i dostosuj wartości:

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

## ▶️ Uruchomienie

**Development:**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Aplikacja dostępna pod: `http://localhost:5173`

## 📡 Dokumentacja API

### Endpoints

- **Auth:** `/api/auth/*` - rejestracja, logowanie, profil
- **Sessions:** `/api/sessions/*` - zarządzanie sesjami
- **Journals:** `/api/journals/*` - dziennik doświadczeń
- **Medical Consent:** `/api/medical-consent/*` - zgody RODO
- **Facilitator:** `/api/facilitator/*` - panel facilitatora

Health check: `GET /api/health`

## 🔒 Bezpieczeństwo i RODO

- 🔐 JWT authentication z refresh tokens
- 🔒 Bcrypt password hashing
- 🛡️ Helmet.js security headers
- 🚫 Rate limiting (100 req/15min)
- 🔑 AES-256-GCM dla danych medycznych
- ✅ Pełna zgodność z RODO
- 📜 Automatyczna weryfikacja przeciwwskazań

## 📄 Licencja

© 2024 MDR Cosmomed. Wszystkie prawa zastrzeżone.

---

**⚠️ DISCLAIMER:** Aplikacja ma charakter edukacyjny i wspierający. Nie zastępuje profesjonalnej opieki medycznej ani psychoterapii
