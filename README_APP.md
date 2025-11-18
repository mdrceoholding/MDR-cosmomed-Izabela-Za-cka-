# Rejestr Akcjonariuszy PSA

Kompleksowa aplikacja do zarządzania akcjonariuszami Prostej Spółki Akcyjnej z modułem wzorów dokumentów.

## Funkcjonalności

### 📊 Dashboard
- Przegląd kluczowych statystyk
- Informacje o spółce
- Liczba akcjonariuszy i akcji

### 👥 Akcjonariusze
- Lista wszystkich akcjonariuszy
- Podział na osoby fizyczne i prawne
- Szczegółowe dane kontaktowe

### 📈 Cap Table
- Wizualizacja struktury akcjonariatu
- Procentowy udział każdego akcjonariusza
- Podsumowanie kapitału zakładowego

### 📄 Wzory Dokumentów (10 szablonów)

#### Uchwały (3)
1. **Uchwała w sprawie emisji akcji** - Uchwała WZA o emisji nowych akcji imiennych
2. **Uchwała w sprawie zmiany statutu** - Zmiana postanowień statutu spółki
3. **Uchwała w sprawie podziału zysku** - Podział zysku netto z dywidendą

#### Protokoły (2)
4. **Protokół Walnego Zgromadzenia** - Protokół WZA z listą obecności i przebiegiem obrad
5. **Protokół posiedzenia Zarządu** - Protokół z posiedzenia Zarządu

#### Umowy (3)
6. **Umowa zbycia akcji** - Przeniesienie własności akcji imiennych
7. **Umowa lock-up** - Ograniczenie zbywalności akcji z karą umowną
8. **Umowa użyczenia lokalu** - Z klauzulami RODO i wymogami ubezpieczenia

#### Raporty (2)
9. **Raport Cap Table** - Raport struktury akcjonariatu z tabelą
10. **Statut PSA** - Kompletny wzór Statutu Prostej Spółki Akcyjnej

### ✨ Funkcje edytora dokumentów

- **Split-screen**: Formularz (lewa strona) + Podgląd A4 (prawa strona)
- **Live preview**: Podgląd dokumentu w czasie rzeczywistym
- **Auto-fill**: Automatyczne wypełnianie danych spółki (nazwa, KRS, NIP)
- **Upload logo**: Możliwość dodania logo spółki
- **Walidacja**: Walidacja pól z komunikatami błędów
- **Dropdown**: Lista akcjonariuszy do wyboru
- **Eksport PDF**: Generowanie PDF za pomocą html2pdf.js
- **Zapis szkicu**: Zapisywanie wypełnionych formularzy w localStorage
- **Drukowanie**: Bezpośrednie drukowanie dokumentu

## Technologie

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **html2pdf.js** - Eksport do PDF
- **Font Awesome** - Ikony

## Instalacja

```bash
# Instalacja zależności
npm install

# Uruchomienie w trybie deweloperskim
npm run dev

# Build produkcyjny
npm run build

# Preview buildu produkcyjnego
npm run preview
```

## Struktura projektu

```
src/
├── components/
│   ├── Sidebar.tsx              # Nawigacja boczna
│   ├── DocumentTemplates.tsx    # Biblioteka wzorów (grid 3 kolumny)
│   └── DocumentEditor.tsx       # Edytor z split-screen
├── data/
│   ├── companyData.ts           # Dane spółki i akcjonariuszy
│   └── templates.ts             # 10 wzorów dokumentów HTML
├── types/
│   └── index.ts                 # Typy TypeScript
├── App.tsx                      # Główny komponent z routingiem
├── main.tsx                     # Entry point
└── index.css                    # Tailwind + custom styles
```

## Dane testowe

### Spółka
- **Nazwa**: TechStart PSA
- **KRS**: 0000123456
- **NIP**: 1234567890
- **Adres**: ul. Startupowa 15, 00-001 Warszawa

### Akcjonariusze
1. **Jan Kowalski** - 500 akcji (50%)
2. **Anna Nowak** - 300 akcji (30%)
3. **Investment Fund Sp. z o.o.** - 200 akcji (20%)

## Dark Mode

Aplikacja domyślnie uruchamia się w trybie ciemnym (dark mode). Wszystkie komponenty są w pełni responsywne i zoptymalizowane pod kątem dark mode.

## Eksport do PDF

Format eksportu:
- **Rozmiar**: A4
- **Marginesy**: 20mm
- **Nazwa pliku**: `{typ_dokumentu}_{data}.pdf`
- **Jakość**: High quality (scale: 2)

## Rozwój

Do zrobienia w przyszłości:
- [ ] Edycja i usuwanie akcjonariuszy
- [ ] Baza danych (Firebase/Supabase)
- [ ] Autentykacja użytkowników
- [ ] Historia transakcji akcji
- [ ] Eksport Cap Table do Excel
- [ ] E-mail notifications
- [ ] Multi-language support

## Autor

Aplikacja stworzona dla MDR Cosmo Med / IAM POLAND SP Z O.O.

## Licencja

Proprietary - Wszystkie prawa zastrzeżone
