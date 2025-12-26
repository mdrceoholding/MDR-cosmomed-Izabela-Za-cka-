# EU Grants Hub - Backend API Documentation

## 🚀 Przegląd

Backend API dla systemu zarządzania dotacjami UE w branży MedTech. System umożliwia przeglądanie dostępnych grantów, zarządzanie aplikacjami, wyszukiwanie partnerów oraz monitoring postępów.

## 📋 Spis treści

- [Technologie](#technologie)
- [Instalacja](#instalacja)
- [Konfiguracja](#konfiguracja)
- [Uruchomienie](#uruchomienie)
- [Struktura projektu](#struktura-projektu)
- [API Endpoints](#api-endpoints)
- [Autoryzacja](#autoryzacja)
- [Rate Limiting](#rate-limiting)
- [Deployment](#deployment)

## 🛠 Technologie

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Język**: TypeScript
- **Baza danych**: PostgreSQL 14+
- **Cache**: Redis 7+
- **Autoryzacja**: JWT
- **Walidacja**: Zod
- **Dokumentacja**: Swagger/OpenAPI

## 📦 Instalacja

### Wymagania

- Node.js >= 18.0.0
- PostgreSQL >= 14
- Redis >= 7 (opcjonalnie)
- Docker i Docker Compose (opcjonalnie)

### Instalacja zależności

```bash
npm install
```

## ⚙️ Konfiguracja

1. Skopiuj plik `.env.example` do `.env`:

```bash
cp .env.example .env
```

2. Edytuj plik `.env` i ustaw odpowiednie wartości:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=grants_medtech
DB_USER=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=your-super-secret-key

# Server
PORT=3000
NODE_ENV=development
```

## 🚀 Uruchomienie

### Metoda 1: Lokalne uruchomienie

1. Uruchom PostgreSQL i Redis
2. Utwórz bazę danych:

```bash
createdb grants_medtech
```

3. Zainicjalizuj schemat bazy:

```bash
psql -U postgres -d grants_medtech -f src/database/schema.sql
```

4. Uruchom serwer deweloperski:

```bash
npm run dev
```

Serwer będzie dostępny pod adresem: `http://localhost:3000`

### Metoda 2: Docker Compose

```bash
# Uruchom wszystkie serwisy
docker-compose up -d

# Sprawdź logi
docker-compose logs -f app

# Zatrzymaj serwisy
docker-compose down
```

### Metoda 3: Docker Compose z narzędziami (pgAdmin, Redis Commander)

```bash
docker-compose --profile tools up -d
```

Dostępne będą:
- **API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api-docs
- **pgAdmin**: http://localhost:5050 (admin@grantshub.eu / admin)
- **Redis Commander**: http://localhost:8081

## 📁 Struktura projektu

```
src/
├── api/
│   └── routes.ts              # Definicje endpointów API
├── config/
│   └── database.ts            # Konfiguracja PostgreSQL
├── data/
│   └── mockGrants.ts          # Dane testowe
├── middleware/
│   ├── auth.middleware.ts     # Autoryzacja JWT
│   ├── validation.middleware.ts # Walidacja Zod
│   ├── errorHandler.middleware.ts # Obsługa błędów
│   └── rateLimit.middleware.ts # Limit zapytań
├── services/
│   ├── GrantService.ts        # Logika dotacji
│   ├── ApplicationService.ts  # Logika aplikacji
│   ├── PartnerService.ts      # Logika partnerów
│   ├── DashboardService.ts    # Logika dashboardu
│   └── NotificationService.ts # Logika notyfikacji
├── types/
│   └── index.ts               # Definicje typów TS
├── database/
│   └── schema.sql             # Schemat PostgreSQL
└── index.ts                   # Główny plik serwera
```

## 🔌 API Endpoints

### Grants (Dotacje)

#### GET /api/grants
Pobierz listę dotacji z filtrami.

**Query parameters:**
- `status` - Status dotacji (Aktywny, Zamknięty, Planowany, Wznowiony)
- `category` - Kategoria (Badania, Innowacje, Edukacja, Infrastruktura)
- `country` - Kod kraju (PL, DE, FR, etc.)
- `deadline_from` - Data od (ISO 8601)
- `deadline_to` - Data do (ISO 8601)
- `search` - Wyszukiwanie w nazwie i opisie

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Horyzont Europa: AI w diagnostyce obrazowej",
      "status": { "id": "uuid", "name": "Aktywny" },
      "category": { "id": "uuid", "name": "Badania", "icon": "flask" },
      "amount_min": 2000000,
      "amount_max": 5000000,
      "currency": "EUR",
      "deadline": "2025-09-15T00:00:00Z",
      "success_rate": 72,
      "requirements": ["..."],
      "apply_link": "https://..."
    }
  ]
}
```

#### GET /api/grants/:id
Pobierz szczegóły dotacji.

#### POST /api/grants
Utwórz nową dotację (tylko Admin).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Body:**
```json
{
  "name": "Nazwa dotacji",
  "category_id": "uuid",
  "status_id": "uuid",
  "amount_min": 1000000,
  "amount_max": 5000000,
  "deadline": "2025-12-31",
  "description": "Opis dotacji",
  "requirements": ["Wymaganie 1", "Wymaganie 2"]
}
```

#### GET /api/grants/export
Eksport dotacji do CSV.

### Partners (Partnerzy)

#### GET /api/partners
Pobierz listę partnerów.

**Query parameters:**
- `country` - Kod kraju (PL, DE, FR, etc.)
- `type` - Typ (Przedsiębiorstwo, Instytut badawczy, Uniwersytet, Konsorcjum)
- `search` - Wyszukiwanie

#### GET /api/partners/:id
Pobierz profil partnera.

#### POST /api/partners
Dodaj nowego partnera (wymaga autoryzacji).

**Body:**
```json
{
  "name": "Nazwa partnera",
  "country": "PL",
  "type": "Uniwersytet",
  "specializations": ["AI", "MedTech"],
  "contact_info": {
    "email": "contact@partner.pl",
    "phone": "+48123456789",
    "website": "https://partner.pl"
  }
}
```

### Applications (Aplikacje)

#### GET /api/applications
Pobierz aplikacje użytkownika.

**Query parameters:**
- `user_id` - ID użytkownika (wymagane)

#### GET /api/applications/:id
Pobierz szczegóły aplikacji.

#### POST /api/applications
Utwórz nową aplikację.

**Body:**
```json
{
  "user_id": "uuid",
  "grant_id": "uuid",
  "partner_id": "uuid" // opcjonalnie
}
```

#### PUT /api/applications/:id
Aktualizuj aplikację.

**Body:**
```json
{
  "status": "Złożona",
  "progress": 75,
  "partner_id": "uuid"
}
```

#### POST /api/applications/:id/documents
Prześlij dokument do aplikacji.

### Dashboard (Panel)

#### GET /api/dashboard/kpis
Pobierz kluczowe wskaźniki wydajności.

**Response:**
```json
{
  "success": true,
  "data": {
    "total_grants": 450,
    "active_grants": 287,
    "total_funding_eur": 15000000000,
    "applications_submitted": 1234,
    "success_rate_avg": 68,
    "categories_breakdown": { "Badania": 120, "Innowacje": 85 },
    "deadlines_this_month": 12,
    "top_categories": [...],
    "timeline_deadlines": [...]
  }
}
```

### Notifications (Notyfikacje)

#### GET /api/notifications
Pobierz notyfikacje użytkownika.

**Query parameters:**
- `user_id` - ID użytkownika (wymagane)
- `limit` - Limit wyników (domyślnie 20)

#### POST /api/notifications/:id/read
Oznacz notyfikację jako przeczytaną.

### Categories & Statuses

#### GET /api/categories
Pobierz wszystkie kategorie.

#### GET /api/statuses
Pobierz wszystkie statusy.

## 🔐 Autoryzacja

System wykorzystuje JWT (JSON Web Tokens) do autoryzacji.

### Nagłówek autoryzacji

```
Authorization: Bearer <jwt_token>
```

### Role użytkowników

- **Admin** - Pełny dostęp, może tworzyć dotacje
- **Manager** - Może zarządzać aplikacjami
- **Viewer** - Tylko odczyt

### Generowanie tokenu

```typescript
import { generateToken } from './middleware/auth.middleware';

const token = generateToken({
  userId: 'uuid',
  email: 'user@example.com',
  roles: ['Manager']
});
```

## ⏱ Rate Limiting

API implementuje rate limiting:

- **Ogólne API**: 100 zapytań/minutę
- **Autoryzacja**: 10 prób/15 minut
- **Wrażliwe endpointy**: 5 zapytań/15 minut

Headery odpowiedzi:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 2025-01-15T10:30:00Z
```

## 🐳 Deployment

### Docker

```bash
# Build image
docker build -t grants-backend .

# Run container
docker run -p 3000:3000 \
  -e DB_HOST=postgres \
  -e DB_PASSWORD=secret \
  grants-backend
```

### Docker Compose (Production)

```bash
docker-compose -f docker-compose.yml up -d
```

### Zmienne środowiskowe (Production)

Ustaw następujące zmienne:
- `NODE_ENV=production`
- `JWT_SECRET` - Silny sekret (min. 32 znaki)
- `DB_PASSWORD` - Silne hasło do bazy
- `CORS_ORIGIN` - Lista dozwolonych origin
- `API_DOCS_ENABLED=false` - Wyłącz dokumentację w produkcji

## 📊 Monitorowanie

### Health Check

```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:00:00Z",
  "uptime": 3600,
  "environment": "production"
}
```

## 🧪 Testowanie

```bash
# Uruchom testy
npm test

# Testy w trybie watch
npm run test:watch
```

## 📝 Logowanie

Logi są zapisywane w formacie:
- **Development**: Morgan 'dev' format
- **Production**: Morgan 'combined' format

## 🛡 Bezpieczeństwo

System implementuje:
- ✅ Helmet.js - Zabezpieczenia HTTP headers
- ✅ CORS - Kontrola dostępu cross-origin
- ✅ Rate limiting - Ochrona przed DDoS
- ✅ JWT - Bezpieczna autoryzacja
- ✅ Walidacja danych - Zod schemas
- ✅ Prepared statements - Ochrona przed SQL injection

## 📞 Wsparcie

W razie problemów:
- Email: support@grantshub.eu
- Issues: GitHub Issues

## 📄 Licencja

MIT License
