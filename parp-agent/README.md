# Agent PARP v3.1

Agent do automatycznego zbierania danych z portalu usług rozwojowych PARP (Polska Agencja Rozwoju Przedsiębiorczości).

## Opis

Agent PARP v3.1 to narzędzie JavaScript działające w przeglądarce, które automatyzuje proces zbierania informacji o dofinansowanych usługach szkoleniowych z portalu https://uslugirozwojowe.parp.gov.pl.

### Główne funkcje

- **Automatyczne filtrowanie**: Ustawia filtr "Tylko dofinansowane"
- **Obsługa paginacji**: Automatycznie przechodzi przez wszystkie strony wyników
- **Przetwarzanie wsadowe**: Przetwarza usługi w paczkach (batch) z konfigurowalnymi opóźnieniami
- **Ekstrakcja danych**: Wydobywa kluczowe informacje o każdej usłudze:
  - Tytuł usługi
  - Dostawca
  - Cena
  - Liczba godzin
  - Lokalizacja
  - Data rozpoczęcia
  - Link do karty PDF
- **Eksport CSV**: Generuje plik CSV z zebranymi danymi (z kodowaniem UTF-8 + BOM)
- **Pobieranie PDF**: Automatycznie inicjuje pobieranie kart usług w formacie PDF
- **Interfejs graficzny**: Wygodny panel kontrolny z paskiem postępu
- **Throttling i odporność**: Zabezpieczenia przed przeciążeniem serwera i blokowaniem

## Jak używać

### Krok 1: Przejdź na stronę PARP

Otwórz w przeglądarce:
```
https://uslugirozwojowe.parp.gov.pl/uslugi/search
```

### Krok 2: Otwórz konsolę przeglądarki

- **Chrome/Edge**: Naciśnij `F12` lub `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)
- **Firefox**: Naciśnij `F12` lub `Ctrl+Shift+K` (Windows/Linux) / `Cmd+Option+K` (Mac)
- **Safari**: Najpierw włącz menu deweloperskie w Preferencjach, potem `Cmd+Option+C`

### Krok 3: Wklej kod agenta

1. Skopiuj cały kod z pliku `parp-agent-v3.1.js`
2. Wklej do konsoli przeglądarki
3. Naciśnij `Enter`

### Krok 4: Uruchom agenta

Po wklejeniu kodu pojawi się panel "Agent PARP v3.1" w prawym górnym rogu strony.

1. Opcjonalnie dostosuj parametry:
   - **Batch size** (1-20): Liczba usług przetwarzanych jednocześnie w paczce
   - **Delay (s)**: Opóźnienie między paczkami (w sekundach)
2. Kliknij przycisk **"Uruchom"**

### Krok 5: Monitoruj postęp

Agent wyświetla na bieżąco:
- Aktualny krok przetwarzania
- Pasek postępu
- Licznik przetworzonych usług

### Krok 6: Pobierz dane

Po zakończeniu przetwarzania:
1. Pojawi się przycisk **"Pobierz dane (CSV)"**
2. Kliknij go, aby pobrać plik CSV z zebranymi danymi
3. PDF-y kart usług zostaną automatycznie pobrane podczas przetwarzania

## Konfiguracja

### Parametry w panelu UI

- **Batch size** (domyślnie: 5)
  - Liczba usług przetwarzanych równocześnie
  - Niższa wartość = wolniej, ale bezpieczniej
  - Wyższa wartość = szybciej, ale ryzyko blokady przez serwer

- **Delay** (domyślnie: 2.5s)
  - Opóźnienie między paczkami
  - Zwiększ, jeśli otrzymujesz błędy 429 (Too Many Requests)
  - Zmniejsz, jeśli chcesz przyspieszyć przetwarzanie

### Zaawansowane ustawienia (w kodzie)

W obiekcie `this.CONFIG` możesz dostosować:

```javascript
{
  searchUrl: 'https://uslugirozwojowe.parp.gov.pl/uslugi/search',
  batchSize: 5,                 // Rozmiar paczki
  delayBetweenBatches: 2500,    // Opóźnienie między paczkami (ms)
  requestDelayMs: 400,          // Throttling pojedynczych requestów
  pdfDelayMs: 800,              // Throttling pobrań PDF
  paginationMaxPages: 50,       // Maksymalna liczba stron wyników
  fetchTimeoutMs: 20000,        // Timeout na pobranie strony (ms)
  userAgentHeader: true         // Wysyłanie nagłówka User-Agent
}
```

## Format danych CSV

Wygenerowany plik CSV zawiera następujące kolumny (separator: średnik `;`):

| Kolumna | Opis |
|---------|------|
| `tytul` | Tytuł usługi szkoleniowej |
| `dostawca` | Nazwa dostawcy usługi |
| `cena` | Cena usługi (znormalizowana) |
| `godziny` | Liczba godzin szkolenia |
| `lokalizacja` | Miejsce świadczenia usługi |
| `data_rozpoczecia` | Data rozpoczęcia (format: DD.MM.RRRR lub RRRR-MM-DD) |
| `link_pdf` | URL do karty usługi w PDF |
| `link_uslugi` | URL do strony usługi |
| `status_przetworzenia` | Status: "Sukces" lub opis błędu |

## Rozwiązywanie problemów

### Błąd 429 (Too Many Requests)

Serwer blokuje za dużo zapytań. Rozwiązanie:
1. Zmniejsz **Batch size** (np. do 3)
2. Zwiększ **Delay** (np. do 4-5 sekund)
3. Uruchom ponownie

### "Nie znaleziono elementu"

Struktura strony mogła się zmienić. Sprawdź:
1. Czy jesteś na właściwej stronie (`/uslugi/search`)
2. Czy strona w pełni się załadowała
3. Czy nie ma komunikatów o błędach na stronie

### Brak niektórych danych

Agent korzysta z elastycznych selektorów, ale jeśli struktura HTML się zmieniła:
1. Sprawdź console log (F12 > Console) - mogą być tam ostrzeżenia
2. Niektóre usługi mogą nie mieć pełnych danych (np. brak PDF)
3. W CSV pojawi się "Nie znaleziono" dla brakujących pól

### PDF-y nie są pobierane

1. Sprawdź czy przeglądarka nie blokuje wielu pobierań (pojawi się komunikat)
2. Pozwól na pobieranie wielu plików z tej strony
3. Zwiększ `pdfDelayMs` w konfiguracji, jeśli serwer nie nadąża

## Uwagi prawne i etyczne

- **Zgodność z regulaminem**: Upewnij się, że automatyczne pobieranie danych jest zgodne z regulaminem portalu PARP
- **Ograniczenie obciążenia**: Agent ma wbudowane mechanizmy throttlingu, aby nie przeciążać serwera
- **Użytek prywatny**: Narzędzie przeznaczone do celów informacyjnych i analizy danych publicznych
- **Odpowiedzialność**: Użytkownik ponosi odpowiedzialność za sposób wykorzystania danych

## Wersje

### v3.1 (aktualna)
- Dodano obsługę paginacji wyników
- Ulepszono stabilność selektorów CSS (więcej wariantów)
- Dodano throttling dla requestów i PDF-ów
- Poprawiono detekcję dat (DD.MM.RRRR i RRRR-MM-DD)
- Dodano wsparcie CORS w fetch
- Ulepszono mechanizm timeout i retry
- Lepszy eksport CSV z BOM UTF-8
- Panel UI z konfigurowalnymi parametrami

## Technologie

- Vanilla JavaScript (ES6+)
- Fetch API z CORS
- DOMParser
- MutationObserver
- AbortController
- Blob API

## Autor

Narzędzie stworzone dla celów automatyzacji zbierania danych z publicznych źródeł.

## Licencja

Do użytku wewnętrznego. Przed wykorzystaniem komercyjnym skonsultuj się z właścicielem portalu PARP.
