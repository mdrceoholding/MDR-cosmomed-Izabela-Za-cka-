# Ustawa o Wyrobach Medycznych
## Fundament Prawny - Prawo Polskie

**Numer dokumentu:** MDR-FP-002/2025
**Data:** 2025-12-26
**Status:** OBOWIĄZUJĄCY
**Kategoria:** Fundament Prawny

---

## 1. PODSTAWOWE INFORMACJE

### 1.1 Pełna Nazwa

**Ustawa z dnia 7 kwietnia 2022 r. o wyrobach medycznych (Dz.U. 2022 poz. 974)**

### 1.2 Data Wejścia w Życie

- **Data publikacji:** 11 maja 2022 r.
- **Data wejścia w życie:** 26 maja 2022 r.

### 1.3 Cel Ustawy

Ustawa:
- Implementuje Rozporządzenie (UE) 2017/745 (MDR) do prawa polskiego
- Określa kompetencje Prezesa URPL (Urząd Rejestracji Produktów Leczniczych)
- Ustala sankcje za naruszenie przepisów MDR
- Reguluje nadzór rynku w Polsce

---

## 2. KLUCZOWE ARTYKUŁY DLA KLINIKI

### 2.1 Artykuł 25 - Przechowywanie Dokumentacji

#### 2.1.1 Treść Artykułu

**"Podmiot leczniczy jest obowiązany do przechowywania dokumentacji wyrobu medycznego przez okres co najmniej 10 lat od daty jego wytworzenia."**

#### 2.1.2 Praktyczna Implikacja

**Jesteśmy zobowiązani do przechowywania dokumentacji wyrobu przez minimum 10 lat od daty jego wytworzenia.**

**Dokumentacja obejmuje:**
- Certyfikat CE
- Deklaracja zgodności UE
- Instrukcja użytkowania (IFU - Instructions For Use)
- Dokumentacja techniczna producenta
- Faktura zakupu wyrobu
- **Dokumentacja medyczna pacjenta** (jeśli wyrób został wszczepiony/zastosowany)

**WAŻNE:** Dla wyrobów wszczepianych okres przechowywania wynosi **15 lat** (zgodnie z MDR Art. 95).

#### 2.1.3 Nasza Praktyka

**System archiwizacji:**
1. **Cloud 4.5 Document Repository** - skanowane dokumenty (PDF)
2. **Encrypted Data Vault** - dane medyczne pacjentów (szyfrowanie AES-256)
3. **Blockchain Register** - immutable timestamps (hash dokumentów)
4. **Audit Log** - logi dostępu do dokumentów

**Backup:**
- Codzienny backup do cloud (pełny + inkrementalny)
- Miesięczny backup offline (cold storage)
- Geograficznie rozproszony (multi-region)

---

### 2.2 Artykuł 28 - Raportowanie Incydentów do URPL

#### 2.2.1 Treść Artykułu

**"Podmiot leczniczy zgłasza Prezesowi URPL poważne incydenty związane z wyrobem medycznym w następujących terminach:**

**1) 15 dni** od dnia stwierdzenia incydentu poważnego,
**2) 2 dni** od dnia stwierdzenia incydentu poważnego, który spowodował lub mógł spowodować zagrożenie zdrowia publicznego."

#### 2.2.2 Praktyczna Implikacja

**Określa sztywne terminy raportowania incydentów do Prezesa URPL:**

| Typ Incydentu | Termin Zgłoszenia | Przykłady |
|---------------|-------------------|-----------|
| **Incydent poważny** | **15 dni** | Powikłanie po zabiegu wymagające hospitalizacji, infekcja po wszczepie |
| **Zagrożenie zdrowia publicznego** | **2 dni** | Skażenie partii produktu, śmierć pacjenta, masowe powikłania |

**UWAGA:** Liczenie terminu rozpoczyna się od dnia **stwierdzenia** incydentu, nie od dnia jego wystąpienia!

#### 2.2.3 Formularz Zgłoszenia

Zgłoszenie do URPL musi zawierać:
- Dane podmiotu zgłaszającego (klinika, NIP, adres)
- Dane pacjenta (zanonimizowane zgodnie z RODO)
- Opis incydentu (co, kiedy, gdzie, jak)
- Dane wyrobu medycznego (UDI, producent, numer serii)
- Zastosowane działania naprawcze
- Ocena ryzyka (Grok Risk Analysis)

**System:** Szablon formularza: `templates/Incident-Report-Template.md`

#### 2.2.4 Nasza Praktyka

**Workflow raportowania:**

```
1. STWIERDZENIE INCYDENTU (Lekarz/Personel)
   ↓
2. NATYCHMIASTOWE POWIADOMIENIE Compliance Officer
   ↓
3. ANALIZA RYZYKA (Grok AI) - czy jest to incydent poważny?
   ↓
4. WYPEŁNIENIE FORMULARZA (Compliance Officer + Claude AI)
   ↓
5. WERYFIKACJA (Grok Risk Analysis) - czerwone flagi
   ↓
6. ZGŁOSZENIE DO URPL (e-URPL system)
   ↓
7. ZGŁOSZENIE DO PRODUCENTA (email + tracking)
   ↓
8. ARCHIWIZACJA (Encrypted Vault + Blockchain)
   ↓
9. FOLLOW-UP z pacjentem
```

**System:** Grok AI automatycznie wykrywa potencjalne incydenty i wysyła alerty compliance.

---

### 2.3 Artykuł 42 - Współpraca z URPL

#### 2.3.1 Treść Artykułu

**"Podmiot leczniczy jest obowiązany do współpracy z Prezesem URPL w zakresie nadzoru nad wyrobami medycznymi."**

#### 2.3.2 Praktyczna Implikacja

**Musimy współpracować z URPL w zakresie:**
- Kontroli wyrobów medycznych w klinice
- Dostępu do dokumentacji medycznej (na żądanie)
- Udostępnienia próbek wyrobów (w razie potrzeby)
- Wycofania wyrobu z użycia (w przypadku alertu bezpieczeństwa)

**Odmowa współpracy = sankcje karne + administracyjne.**

#### 2.3.3 Nasza Praktyka

**Przygotowanie do kontroli URPL:**
- Comiesięczny audyt wewnętrzny (self-assessment)
- Kontrola kompletności dokumentacji wyrobów
- Weryfikacja terminów ważności certyfikatów CE
- Checklist compliance (gotowość do kontroli w każdej chwili)

**System:** Gemini NotebookLM - analiza dokumentacji pod kątem compliance.

---

## 3. SANKCJE ZA NARUSZENIE USTAWY

### 3.1 Artykuły 106-112 - Kary Administracyjne

| Naruszenie | Artykuł | Kara Pieniężna |
|------------|---------|----------------|
| Nieraportowanie incydentu poważnego | Art. 107 | **Do 1 000 000 PLN** |
| Brak dokumentacji wyrobu | Art. 108 | **Do 500 000 PLN** |
| Stosowanie wyrobów bez certyfikatu CE | Art. 106 | **Do 1 000 000 PLN + zakaz działalności** |
| Brak identyfikowalności pacjenta | Art. 109 | **Do 200 000 PLN** |
| Odmowa współpracy z URPL | Art. 110 | **Do 500 000 PLN** |

### 3.2 Odpowiedzialność Karna

**Zgodnie z Art. 113-115:**

| Czyn | Kara |
|------|------|
| Świadome wprowadzenie do obrotu wyrobu niezgodnego z MDR | **Kara pozbawienia wolności do 3 lat** |
| Spowodowanie zagrożenia życia lub zdrowia pacjenta | **Kara pozbawienia wolności do 5 lat** |
| Śmierć pacjenta w wyniku naruszenia przepisów | **Kara pozbawienia wolności od 1 roku do 10 lat** |

**UWAGA:** Odpowiedzialność ponosi nie tylko klinika (osobą prawna), ale także **osoby fizyczne** (właściciel, compliance officer, lekarz wykonujący zabieg).

---

## 4. PREZES URPL - KOMPETENCJE I KONTAKT

### 4.1 Kompetencje Prezesa URPL

Prezes URPL (Urząd Rejestracji Produktów Leczniczych, Wyrobów Medycznych i Produktów Biobójczych) jest organem odpowiedzialnym za:

1. **Nadzór rynku** wyrobów medycznych w Polsce
2. **Przyjmowanie zgłoszeń incydentów** medycznych
3. **Kontrole podmiotów leczniczych** stosujących wyroby medyczne
4. **Wydawanie decyzji administracyjnych** (zakazy, wycofania)
5. **Prowadzenie rejestru** podmiotów wprowadzających wyroby do obrotu

### 4.2 Kontakt z URPL

**Adres:**
Urząd Rejestracji Produktów Leczniczych, Wyrobów Medycznych i Produktów Biobójczych
Al. Jerozolimskie 181C
02-222 Warszawa

**Telefon:** +48 22 49 21 301
**Email:** sekretariat@urpl.gov.pl
**Zgłaszanie incydentów:** incydenty@urpl.gov.pl

**System e-URPL:** https://e-urpl.urpl.gov.pl/ (zgłoszenia online)

### 4.3 Nasza Praktyka

**Designated Person dla kontaktu z URPL:**
- **Compliance Officer** - główny punkt kontaktu
- **Backup:** Clinic Manager

**Procedura:**
- Wszystkie zgłoszenia do URPL przez system e-URPL (elektronicznie)
- Kopia zgłoszenia w Encrypted Data Vault
- Tracking number w Audit Log
- Follow-up: monitoring statusu zgłoszenia

---

## 5. INTEGRACJA Z MDR

### 5.1 Relacja Ustawa - MDR

| Element | MDR (UE) | Ustawa Polska |
|---------|----------|---------------|
| **Wymogi dla wyrobów** | Art. 1-120 MDR | **Bezpośrednio stosowane** (Rozporządzenie UE) |
| **Raportowanie incydentów** | Art. 61-92 MDR | **Art. 28 Ustawy** (terminy: 2/15 dni) |
| **Przechowywanie dokumentacji** | Art. 95 MDR | **Art. 25 Ustawy** (10 lat) |
| **Sankcje** | Pozostawione państwom członkowskim | **Art. 106-115 Ustawy** (kary do 1 mln PLN) |
| **Organ nadzoru** | Competent Authority | **Prezes URPL** |

**WAŻNE:**
- **MDR jest bezpośrednio stosowane** (nie wymaga implementacji do prawa krajowego)
- **Ustawa polska** uzupełnia MDR o sankcje i kompetencje URPL

---

## 6. CHECKLIST COMPLIANCE - USTAWA POLSKA

### 6.1 Obowiązki Dokumentacyjne

- [ ] Przechowywanie dokumentacji wyrobów min. 10 lat (Art. 25)
- [ ] System backupów (codzienny + miesięczny offline)
- [ ] Encrypted storage (RODO compliance)
- [ ] Audit log dostępu do dokumentów
- [ ] Geograficznie rozproszony backup (multi-region)

### 6.2 Raportowanie Incydentów

- [ ] Procedura wykrywania incydentów (Grok AI alerts)
- [ ] Szablon formularza raportowego (URPL)
- [ ] Designated Person (Compliance Officer)
- [ ] System tracking zgłoszeń (e-URPL)
- [ ] Follow-up z pacjentem (dokumentacja)

### 6.3 Współpraca z URPL

- [ ] Comiesięczny audyt wewnętrzny
- [ ] Kontrola kompletności dokumentacji
- [ ] Weryfikacja certyfikatów CE (ważność)
- [ ] Gotowość do kontroli w każdej chwili
- [ ] Designated Person dla kontaktu z URPL

### 6.4 Minimalizacja Ryzyka Sankcji

- [ ] Szkolenie personelu (kwartalnie)
- [ ] Procedury SOP (aktualizowane)
- [ ] Audyt compliance (kwartalny)
- [ ] Ubezpieczenie OC (min. 2 mln PLN)
- [ ] Radca prawny (konsultacje ad hoc)

---

## 7. RÓŻNICE MIĘDZY MDR A USTAWĄ POLSKĄ

### 7.1 Kluczowe Różnice

| Aspekt | MDR (UE) | Ustawa Polska |
|--------|----------|---------------|
| **Charakter prawny** | Rozporządzenie (bezpośrednio stosowane) | Ustawa krajowa (implementacja) |
| **Wymogi techniczne** | ✅ Pełna regulacja | ⚠️ Odesłanie do MDR |
| **Sankcje** | ❌ Brak (pozostawione państwom) | ✅ Kary do 1 mln PLN + kara kryminalna |
| **Organ nadzoru** | Competent Authority (ogólnie) | Prezes URPL (konkretnie) |
| **Terminy raportowania** | Art. 61-92 MDR | Art. 28 Ustawy (2/15 dni - konkretyzacja) |

### 7.2 Obszary Komplementarne

**MDR reguluje:**
- Wymogi techniczne dla wyrobów
- UDI i traceability
- Clinical evaluation
- Post-market surveillance

**Ustawa polska reguluje:**
- Sankcje za naruszenie MDR
- Kompetencje URPL
- Procedury kontroli
- Współpraca z organami UE

**Wniosek:** Musimy stosować **OBA** akty prawne jednocześnie.

---

## 8. LINKI I ZASOBY

### 8.1 Dokumenty Oficjalne

- **Ustawa pełny tekst:** https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20220000974
- **URPL:** https://www.urpl.gov.pl/
- **System e-URPL:** https://e-urpl.urpl.gov.pl/
- **Dziennik Ustaw:** https://dziennikustaw.gov.pl/

### 8.2 Wytyczne URPL

- **Wytyczne dot. raportowania incydentów** (URPL 2022)
- **FAQ - Wyroby medyczne** (URPL 2023)
- **Szkolenia dla podmiotów leczniczych** (URPL webinary)

---

## 9. HISTORIA ZMIAN

| Wersja | Data | Autor | Opis zmian |
|--------|------|-------|------------|
| 1.0 | 2025-12-26 | Claude AI Agent | Utworzenie dokumentu referencyjnego - Ustawa o wyrobach medycznych |

---

**Koniec dokumentu**

*Wygenerowano: 2025-12-26*
*System: MDR AI Ecosystem v1.0*
