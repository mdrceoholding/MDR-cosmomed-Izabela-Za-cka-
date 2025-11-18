# Rejestr Akcjonariuszy PSA

Aplikacja webowa do zarządzania rejestrem akcjonariuszy dla Prostej Spółki Akcyjnej (PSA).

## 🚀 Funkcjonalności

### Główne moduły (w planach)
- **Dashboard** - Podsumowanie kluczowych informacji
- **Cap Table** - Struktura kapitałowa spółki
- **Emisje** - Zarządzanie emisjami akcji
- **Transakcje** - Historia transakcji akcjami
- **WZA/Głosowania** - Walne Zgromadzenia Akcjonariuszy
- **Dokumenty** - Repozytorium dokumentów spółki
- **Wzory dokumentów** - Gotowe szablony dokumentów (dostępne teraz!)
- **KYC/AML** - Weryfikacja akcjonariuszy
- **Audyt** - Dziennik audytowy
- **Ustawienia** - Konfiguracja systemu

### Wzory dokumentów (gotowe do użycia)

Aplikacja zawiera 10 gotowych szablonów dokumentów podzielonych na kategorie:

#### 📜 Uchwały
1. **Uchwała emisji akcji** - Wzór uchwały o emisji nowych akcji w PSA (pełny edytor!)
2. **Uchwała zmiany statutu** - Wzór uchwały zmieniającej statut spółki
3. **Uchwała podziału zysku** - Wzór uchwały dotyczącej podziału zysku

#### 📋 Protokoły
4. **Protokół z WZA** - Protokół z Walnego Zgromadzenia Akcjonariuszy
5. **Protokół zarządu** - Protokół z posiedzenia zarządu PSA

#### 🤝 Umowy
6. **Umowa zbycia akcji** - Wzór umowy zbycia akcji PSA
7. **Umowa lock-up** - Wzór umowy ograniczającej sprzedaż akcji
8. **Umowa użyczenia lokalu** - Wzór umowy użyczenia lokalu dla PSA

#### 📊 Raporty
9. **Raport cap table** - Szablon raportu dotyczącego struktury kapitałowej
10. **Statut PSA** - Wzór statutu prostej spółki akcyjnej

## 🎯 Funkcje edytora uchwały emisji akcji

Szablon "Uchwała emisji akcji" posiada w pełni funkcjonalny edytor z następującymi możliwościami:

### ✨ Podstawowe funkcje
- **Live preview** - Podgląd dokumentu w czasie rzeczywistym
- **Automatyczne kalkulacje** - Kwota podwyższenia kapitału obliczana automatycznie
- **Walidacja formularza** - Sprawdzanie wymaganych pól
- **Responsywność** - Tryb pełnoekranowy na desktopie, zakładki na mobile
- **Autofill** - Automatyczne wypełnianie przykładowymi danymi

### 🎨 Dodatkowe funkcje
- **Upload logo** - Możliwość dodania logo spółki do dokumentu
- **Eksport PDF** - Zapis gotowego dokumentu (funkcja demonstracyjna)
- **Zapisywanie** - Zapis wypełnionych danych (funkcja demonstracyjna)

### 📝 Pola formularza
- Nazwa spółki
- NIP
- KRS
- Numer uchwały
- Data WZA
- Seria akcji
- Liczba akcji
- Wartość nominalna akcji
- Cena emisyjna akcji
- Kwota podwyższenia kapitału (obliczana automatycznie)
- Przewodniczący WZA
- Protokolant

## 🛠️ Technologie

- **React 18.2.0** - Framework UI
- **Tailwind CSS** - Stylizacja
- **Font Awesome 6.5** - Ikony
- **Babel Standalone** - Transpilacja JSX w przeglądarce

## 📦 Instalacja i uruchomienie

### Metoda 1: Bezpośrednie otwarcie w przeglądarce

Aplikacja nie wymaga instalacji ani serwera. Wystarczy:

```bash
# Otwórz plik w przeglądarce
open rejestr-akcjonariuszy.html
```

lub po prostu kliknij dwukrotnie na plik `rejestr-akcjonariuszy.html`

### Metoda 2: Lokalny serwer (opcjonalne)

Jeśli chcesz uruchomić aplikację na lokalnym serwerze:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx http-server

# PHP
php -S localhost:8000
```

Następnie otwórz przeglądarkę i przejdź do `http://localhost:8000/rejestr-akcjonariuszy.html`

## 📖 Jak używać

1. **Otwórz aplikację** w przeglądarce
2. **Wybierz moduł** "Wzory dokumentów" z menu bocznego (domyślnie aktywny)
3. **Przefiltruj dokumenty** według kategorii (Wszystkie, Uchwały, Protokoły, Umowy, Raporty)
4. **Kliknij "Użyj wzoru"** na wybranym szablonie
5. **Wypełnij formularz** lub użyj przycisku "Wypełnij przykładowymi danymi"
6. **Podgląd na żywo** - dokument aktualizuje się automatycznie
7. **Dodaj logo** (opcjonalnie) - kliknij "Dodaj logo" i wybierz plik
8. **Eksportuj** - kliknij "Eksport PDF" (funkcja demonstracyjna)

## 🎨 Interfejs użytkownika

### Nawigacja
- **Sidebar** - Nawigacja między modułami z ikonami i wyróżnieniem aktywnego modułu
- **Filtry kategorii** - Szybkie filtrowanie dokumentów według typu
- **Karty dokumentów** - Przejrzyste kafelki z emoji, opisem i kategorią

### Edytor dokumentów
- **Split screen** (desktop) - Formularz po lewej, podgląd po prawej
- **Tabs** (mobile) - Przełączanie między formularzem a podglądem
- **Sticky preview** - Podgląd dokumentu przewija się wraz z użytkownikiem
- **Walidacja** - Czerwone obramowanie dla niewypełnionych wymaganych pól

## 🔮 Plany rozwoju

- Implementacja pozostałych edytorów dokumentów (ID 2-10)
- Funkcja rzeczywistego zapisu do PDF
- Backend do zapisywania danych
- Integracja z bazą danych
- System użytkowników i uprawnień
- Pełna funkcjonalność modułów Dashboard, Cap Table, Emisje, etc.
- API do integracji z systemami księgowymi
- Elektroniczne podpisy dokumentów
- Generator raportów

## 📄 Licencja

© 2025 TechStart PSA. All rights reserved.

## 🤝 Wkład w projekt

Projekt jest w fazie rozwoju. Sugestie i uwagi mile widziane!

## 📞 Kontakt

W razie pytań lub problemów, skontaktuj się z zespołem deweloperskim.

---

**Wersja:** 1.0.0
**Data:** 2025-11-18
**Status:** Demo/Prototyp
