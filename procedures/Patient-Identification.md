# Procedura: Identyfikacja Pacjenta
## SOP-001: Patient Identification Procedure

**Numer dokumentu:** MDR-SOP-001/2025
**Data:** 2025-12-26
**Status:** OBOWIĄZUJĄCY
**Kategoria:** Standard Operating Procedure

---

## 1. CEL PROCEDURY

### 1.1 Wymóg Regulacyjny

**Podstawa prawna:** Art. 15 Rozporządzenia (UE) 2017/745 (MDR)

**"Podmioty lecznicze muszą być w stanie zidentyfikować każdego pacjenta, któremu wszczepiono wyrób medyczny."**

### 1.2 Cel Operacyjny

Zapewnienie precyzyjnej identyfikacji pacjenta przy każdym zabiegu z użyciem wyrobu medycznego w celu:
- Spełnienia wymogów MDR Art. 15
- Zapewnienia pełnej traceability (Patient → Device → Procedure)
- Umożliwienia raportowania incydentów (MDR Art. 61)
- Ochrony prawnej kliniki i pacjenta

---

## 2. ZAKRES STOSOWANIA

### 2.1 Kiedy Stosujemy?

**ZAWSZE** gdy:
- Wykonujemy zabieg z użyciem wyrobu medycznego
- Wszczepienie wyrobu (fillery, implanty, nici)
- Aplikacja wyrobu na skórę (lasery, urządzenia RF)
- **Szczególnie:** wyroby z Aneksu XVI (medycyna estetyczna)

### 2.2 Kto Jest Odpowiedzialny?

| Rola | Odpowiedzialność |
|------|------------------|
| **Lekarz wykonujący zabieg** | Weryfikacja tożsamości pacjenta (dokument), podpisanie protokołu |
| **Recepcjonistka/Clinic Manager** | Rejestracja pacjenta w systemie, generowanie Patient ID |
| **Personel medyczny** | Skanowanie wyrobu (UDI), dokumentacja medyczna |
| **System BLOCKCHAINMEDCONSENT™** | Automatyczna rejestracja na blockchainie (immutable record) |

---

## 3. PROCEDURA KROK PO KROKU

### 3.1 KROK 1: Rejestracja Pacjenta (Recepcja)

**Gdzie:** Recepcja kliniki
**Kto:** Recepcjonistka / Clinic Manager
**System:** Claude AI + BLOCKCHAINMEDCONSENT™

#### 3.1.1 Weryfikacja Tożsamości

**Pacjent przedstawia:**
- [ ] Dowód osobisty / Paszport
- [ ] Lub inny dokument tożsamości ze zdjęciem

**Recepcjonistka weryfikuje:**
- [ ] Imię i nazwisko (zgodne z dokumentem)
- [ ] PESEL (zgodny z dokumentem)
- [ ] Data urodzenia (zgodna z dokumentem)
- [ ] Zdjęcie (zgodne z wyglądem pacjenta)

**System zapisuje:**
```
Patient Record:
- Imię: [...]
- Nazwisko: [...]
- PESEL: [...]
- Data urodzenia: [...]
- Adres: [...]
- Telefon: [...]
- Email: [...]
```

#### 3.1.2 Generowanie Patient ID

**System automatycznie generuje:**

```python
Patient_ID = SHA-256(PESEL + timestamp + clinic_salt)

Przykład:
PESEL: 90010112345
Timestamp: 2025-12-26T10:30:00Z
Clinic_Salt: "PiechockaMed2025"

Patient_ID = SHA-256("90010112345" + "2025-12-26T10:30:00Z" + "PiechockaMed2025")
           = "a7f3b9c2d5e1f8a4b6c3d9e2f5a1b8c4d7e3f6a2b5c8d1e4f7a3b6c9d2e5f8a1"
```

**Patient ID jest:**
- ✅ Unikalny (SHA-256 collision-resistant)
- ✅ Pseudonymizowany (nie zawiera danych osobowych)
- ✅ Nieodwracalny (nie można odzyskać PESEL z hash)
- ✅ RODO-compliant (pseudonymizacja zgodna z Art. 4(5) RODO)

#### 3.1.3 Generowanie QR Code

**System generuje QR Code zawierający:**
- Patient ID (pseudonymized)
- Consent ID (UUID)
- Clinic ID
- Timestamp

**Pacjent otrzymuje:**
- QR Code (wydruk lub SMS)
- Instrukcja: "Proszę zeskanować QR Code przed zabiegiem"

---

### 3.2 KROK 2: Weryfikacja Przed Zabiegiem (Gabinet)

**Gdzie:** Gabinet zabiegowy
**Kto:** Lekarz wykonujący zabieg
**System:** BLOCKCHAINMEDCONSENT™

#### 3.2.1 Double-Check Identity

**Lekarz pyta pacjenta:**
- "Proszę podać imię i nazwisko"
- "Proszę podać datę urodzenia"

**Lekarz weryfikuje:**
- [ ] Odpowiedź pacjenta zgodna z dokumentacją medyczną
- [ ] QR Code odpowiada pacjentowi (Patient ID match)

**ZASADA:**
```
Nigdy nie wykonuj zabiegu bez weryfikacji tożsamości!
Double-check = patient safety.
```

#### 3.2.2 Skanowanie QR Code

**Lekarz skanuje QR Code pacjenta:**
- Tablet / Smartphone (aplikacja BLOCKCHAINMEDCONSENT™)
- System wyświetla dane pacjenta (imię, nazwisko, data urodzenia)
- Lekarz potwierdza: "To jest właściwy pacjent"

**System loguje:**
```
Audit Log:
- Timestamp: 2025-12-26T11:00:00Z
- Doctor: Dr. Jan Kowalski
- Patient ID: a7f3b9c2d5e1f8a4...
- Action: QR Code scanned
- Location: Gabinet 3
```

---

### 3.3 KROK 3: Podpisanie Zgody (BLOCKCHAINMEDCONSENT™)

**Gdzie:** Gabinet zabiegowy
**Kto:** Pacjent + Lekarz
**System:** BLOCKCHAINMEDCONSENT™ (Smart Contract)

#### 3.3.1 Informacja o Zabiegu

**Lekarz wyjaśnia pacjentowi:**
- Typ zabiegu (np. "Wypełnianie zmarszczek kwasem hialuronowym")
- Wyrób medyczny użyty (nazwa, UDI)
- Ryzyka i powikłania
- Alternatywy
- Rezultaty (efekty, czas trwania)

**System wyświetla:**
```
Consent Form (digital):

Zabieg: Wypełnianie zmarszczek nosowo-wargowych
Wyrób: Juvederm Ultra 3 (UDI: 01234567890123)
Producent: Allergan
Ryzyka:
  - Obrzęk (common, 2-7 dni)
  - Siniaki (common, 3-10 dni)
  - Infekcja (rare, <1%)
  - Reakcja alergiczna (very rare, <0.1%)

Lekarz: Dr. Jan Kowalski
Data: 2025-12-26
```

#### 3.3.2 Podpisanie Zgody

**Pacjent:**
- [ ] Czyta informację o zabiegu
- [ ] Zadaje pytania (jeśli ma wątpliwości)
- [ ] Zaznacza checkboxy:
  - ☑ Wyrażam zgodę na zabieg
  - ☑ Zapoznałem się z ryzykami
  - ☑ Akceptuję przetwarzanie danych (RODO Art. 6(1)(a))
- [ ] Podpisuje cyfrowo:
  - **OPCJA A:** Digital signature (eIDAS qualified)
  - **OPCJA B:** Biometric signature (odcisk palca)
  - **OPCJA C:** SMS OTP (one-time password)

**Lekarz:**
- [ ] Potwierdza przyjęcie zgody
- [ ] Podpisuje cyfrowo (eIDAS qualified signature)

**System:**
- [ ] Generuje Consent ID (UUID)
- [ ] Wywołuje Smart Contract: `ConsentRegistry.registerConsent()`
- [ ] Zapisuje na blockchain (immutable record)
- [ ] Zwraca Transaction Hash (TxHash)

**Rezultat:**
```
Blockchain Record:
- Consent ID: 550e8400-e29b-41d4-a716-446655440000
- Patient ID: a7f3b9c2d5e1f8a4... (pseudonymized)
- Procedure: Filler injection (nasolabial folds)
- Device UDI: 01234567890123
- Timestamp: 2025-12-26T11:15:00.123Z
- Patient Signature: 0x3f5a2b1c... (cryptographic)
- Doctor Signature: 0x8d4c7e2a... (cryptographic)
- TxHash: 0xf3d8c5b2a9e7f1d4c6b3a8e5d2f9c1b7...

Status: ✅ Immutable (zapisane na blockchainie)
```

---

### 3.4 KROK 4: Rejestracja Wyrobu (UDI)

**Gdzie:** Gabinet zabiegowy
**Kto:** Personel medyczny / Lekarz
**System:** Claude AI + BLOCKCHAINMEDCONSENT™

#### 3.4.1 Skanowanie UDI

**Przed użyciem wyrobu:**
- [ ] Personel medyczny skanuje kod UDI (barcode/RFID)
- [ ] System weryfikuje wyrób:
  - ✅ Certyfikat CE (ważny?)
  - ✅ Data ważności (nie przeterminowany?)
  - ✅ Numer serii/partii (zgodny?)
  - ✅ Integralność opakowania (nie uszkodzony?)

**System pobiera z bazy:**
```
Device Information (z EUDAMED):
- UDI-DI: 01234567890123
- Nazwa: Juvederm Ultra 3
- Producent: Allergan Aesthetics
- Klasa ryzyka: III (Aneks XVI)
- Certyfikat CE: NB 0123 (ważny do 2027-05-26)
- Numer serii: ABC123456
- Data ważności: 2026-12-31
- Instrukcja użytkowania: [Link do IFU]
```

**Jeśli weryfikacja FAIL:**
- ❌ System blokuje zabieg
- ❌ Alert dla Compliance Officer
- ❌ Nie można kontynuować bez ważnego certyfikatu CE

#### 3.4.2 Link: Patient ↔ Device

**System automatycznie tworzy link:**

```
Traceability Chain:

Patient ID: a7f3b9c2d5e1f8a4...
  ↓
Consent ID: 550e8400-e29b-41d4-a716-446655440000
  ↓
Device UDI: 01234567890123
  ↓
Procedure: Filler injection (nasolabial folds)
  ↓
Doctor: Dr. Jan Kowalski (ID: DOC-001)
  ↓
Timestamp: 2025-12-26T11:20:00Z
  ↓
Blockchain TxHash: 0xf3d8c5b2a9e7f1d4c6b3a8e5d2f9c1b7...
```

**Rezultat:**
- ✅ Pełna identyfikowalność (MDR Art. 15)
- ✅ Immutable audit trail (blockchain)
- ✅ Możliwość natychmiastowego wyszukania (MDR Art. 61)

---

### 3.5 KROK 5: Dokumentacja Medyczna

**Gdzie:** Gabinet zabiegowy
**Kto:** Lekarz wykonujący zabieg
**System:** Claude AI (Document Generation)

#### 3.5.1 Protokół Zabiegu

**Lekarz wypełnia (lub Claude AI auto-generates):**

```markdown
PROTOKÓŁ ZABIEGU

Data: 2025-12-26
Godzina: 11:00 - 11:45
Pacjent: Anna Kowalska (Patient ID: a7f3b9c2d5e1...)
Lekarz: Dr. Jan Kowalski

ZABIEG:
Wypełnianie zmarszczek nosowo-wargowych kwasem hialuronowym

WYRÓB MEDYCZNY:
- Nazwa: Juvederm Ultra 3
- UDI: 01234567890123
- Producent: Allergan Aesthetics
- Numer serii: ABC123456
- Data ważności: 2026-12-31
- Ilość użyta: 1.0 ml (prawa strona), 1.0 ml (lewa strona)

PRZEBIEG ZABIEGU:
1. Dezynfekcja pola zabiegowego (Octenisept)
2. Znieczulenie miejscowe (krem EMLA, 15 min)
3. Iniekcja fillera (technika liniowa, głębokość: subdermalna)
4. Masaż modelujący
5. Kompres chłodzący (10 min)

POWIKŁANIA PODCZAS ZABIEGU:
Brak

ZALECENIA PO ZABIEGU:
- Unikać dotykania miejsca iniekcji (24h)
- Unikać wysiłku fizycznego (48h)
- Kompres chłodzący w razie obrzęku
- Kontrola za 14 dni

PODPIS LEKARZA:
Dr. Jan Kowalski (Digital Signature)
```

**System:**
- [ ] Claude AI auto-generates protokół (draft)
- [ ] Lekarz weryfikuje i zatwierdza
- [ ] Zapisanie w Encrypted Data Vault (AES-256)
- [ ] Hash protokołu zapisany na blockchain (immutable timestamp)

#### 3.5.2 Fotodokumentacja

**Przed zabiegiem:**
- [ ] Zdjęcia "przed" (frontal, profil lewy, profil prawy)

**Po zabiegu:**
- [ ] Zdjęcia "po" (frontal, profil lewy, profil prawy)

**System:**
- [ ] Zdjęcia zapisane w Encrypted Data Vault
- [ ] Watermark: Patient ID + Timestamp (proof of authenticity)
- [ ] Hash zdjęć na blockchain (immutable)

---

### 3.6 KROK 6: Archiwizacja

**Gdzie:** System IT
**Kto:** System Administrator (automatyczne)
**System:** Cloud 4.5 + Encrypted Vault + Blockchain

#### 3.6.1 Data Storage Architecture

```
┌─────────────────────────────────────────────────┐
│ CLOUD 4.5 DOCUMENT REPOSITORY (Centralne)      │
│                                                 │
│ /patient/{Patient_ID}/                          │
│   /consent/{Consent_ID}/                        │
│     - consent_form.pdf                          │
│     - protocol.pdf (protokół zabiegu)           │
│     - photos_before.zip                         │
│     - photos_after.zip                          │
│     - device_certificate.pdf (certyfikat CE)    │
│     - ifu.pdf (instrukcja użytkowania)          │
└─────────────────────────────────────────────────┘
           ↓ (encryption)
┌─────────────────────────────────────────────────┐
│ ENCRYPTED DATA VAULT (Szyfrowane)              │
│ Encryption: AES-256-GCM                         │
│ Key Management: AWS KMS                         │
└─────────────────────────────────────────────────┘
           ↓ (hash)
┌─────────────────────────────────────────────────┐
│ BLOCKCHAIN REGISTER (Immutable)                │
│                                                 │
│ Block N:                                        │
│  - Patient ID: a7f3b9c2... (pseudonymized)     │
│  - Consent ID: 550e8400...                      │
│  - Device UDI: 01234567890123                   │
│  - Timestamp: 2025-12-26T11:45:00Z              │
│  - Merkle Root: 0xf3d8c5b2... (hash plików)    │
└─────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────┐
│ AUDIT LOG (Tamper-Proof)                       │
│                                                 │
│ - Who: Dr. Jan Kowalski                         │
│ - What: Procedure completed                     │
│ - When: 2025-12-26T11:45:00Z                    │
│ - Where: Gabinet 3                              │
│ - How: BLOCKCHAINMEDCONSENT™ v1.0              │
└─────────────────────────────────────────────────┘
```

#### 3.6.2 Retencja Danych

**Zgodnie z:**
- MDR Art. 95: minimum 10 lat (15 lat dla wyrobów wszczepianych)
- Ustawa o wyrobach medycznych Art. 25: minimum 10 lat
- Prawo polskie (dokumentacja medyczna): 20 lat

**Nasza praktyka:**
- **Dokumenty medyczne pacjenta:** 20 lat
- **Dokumenty techniczne wyrobów:** 15 lat
- **Zgody pacjenta (blockchain):** permanent (immutable)
- **Audit Log:** permanent (compliance)

---

## 4. SZCZEGÓLNE PRZYPADKI

### 4.1 Pacjent Zagraniczny (Brak PESEL)

**Problem:** Pacjent nie ma PESEL (obcokrajowiec)

**Rozwiązanie:**
```python
# Zamiast PESEL użyj numeru paszportu
Patient_ID = SHA-256(Passport_Number + timestamp + clinic_salt)

Przykład:
Passport: AB1234567
Patient_ID = SHA-256("AB1234567" + "2025-12-26T10:30:00Z" + "PiechockaMed2025")
```

**Dokumentacja:**
- [ ] Kopia paszportu (skan w Encrypted Vault)
- [ ] Dane kontaktowe (email, telefon, adres zagraniczny)

### 4.2 Pacjent Niepełnoletni

**Problem:** Pacjent <18 lat

**Wymóg prawny:**
- Zgoda **przedstawiciela ustawowego** (rodzic/opiekun)

**Procedura:**
1. Weryfikacja tożsamości rodzica/opiekuna (dowód osobisty)
2. Weryfikacja relacji (akt urodzenia lub dokument potwierdzający opiekę)
3. **Rodzic** podpisuje zgodę (nie pacjent!)
4. System zapisuje:
   - Patient ID (pacjent niepełnoletni)
   - Guardian ID (przedstawiciel ustawowy)
   - Link: Patient ↔ Guardian

**BLOCKCHAINMEDCONSENT™:**
```
Consent Record:
- Patient ID: a7f3b9c2... (pacjent, <18 lat)
- Guardian ID: b8f4c3d6... (rodzic)
- Guardian Signature: 0x9e5d8f3c... (cryptographic)
- Doctor Signature: 0x8d4c7e2a...
- Note: "Consent signed by legal guardian"
```

### 4.3 Zabieg Awaryjny (Emergency)

**Problem:** Pacjent w stanie nagłym, brak możliwości weryfikacji tożsamości

**Procedura:**
1. Lekarz wykonuje zabieg (ratowanie życia/zdrowia)
2. Dokumentacja **post factum** (po zabiegu)
3. Weryfikacja tożsamości jak najszybciej (gdy pacjent w stanie stabilnym)
4. System zapisuje:
   - Flag: "Emergency procedure"
   - Timestamp: kiedy zweryfikowano tożsamość

**UWAGA:** To wyjątek! Standardowo ZAWSZE weryfikujemy przed zabiegiem.

---

## 5. AUDYT I KONTROLA

### 5.1 Comiesięczny Audyt Wewnętrzny

**Compliance Officer sprawdza:**
- [ ] Czy 100% zabiegów ma zweryfikowaną tożsamość pacjenta?
- [ ] Czy wszystkie Patient IDs są zapisane w systemie?
- [ ] Czy linki Patient ↔ Device są kompletne?
- [ ] Czy dokumentacja jest archiwizowana zgodnie z procedurą?

**Raport:**
- % compliance (cel: 100%)
- Wykryte błędy (analiza przyczyn)
- Działania naprawcze

### 5.2 Przygotowanie do Kontroli URPL

**URPL może zażądać:**
- Lista wszystkich pacjentów z wszczepionym wyrobem UDI=X
- Dokumentacja konkretnego pacjenta (Patient ID=Y)
- Weryfikacja traceability

**Nasza gotowość:**
- Query blockchain: `getPatientsByUDI("01234567890123")` → wynik w sekundach
- Export dokumentacji pacjenta (Encrypted Vault → PDF)
- Raport compliance (Audit Log)

---

## 6. SZKOLENIE PERSONELU

### 6.1 Wymagania Szkoleniowe

**Częstotliwość:** Kwartalnie (4x/rok)

**Uczestnicy:**
- Wszyscy lekarze wykonujący zabiegi
- Personel medyczny
- Recepcjonistki / Clinic Managers

**Tematyka:**
- Wymogi MDR Art. 15 (identyfikacja pacjenta)
- Obsługa systemu BLOCKCHAINMEDCONSENT™
- Procedura krok po kroku
- Case studies (przykłady błędów)

**Test wiedzy:**
- Quiz (minimum 80% do zaliczenia)
- Certyfikat ukończenia szkolenia

### 6.2 Materiały Szkoleniowe

- Ten dokument (MDR-SOP-001)
- Video tutorial (BLOCKCHAINMEDCONSENT™)
- FAQ (najczęstsze pytania)
- Quick Reference Card (cheat sheet)

---

## 7. HISTORIA ZMIAN

| Wersja | Data | Autor | Opis zmian |
|--------|------|-------|------------|
| 1.0 | 2025-12-26 | Claude AI Agent | Utworzenie procedury identyfikacji pacjenta (MDR Art. 15) |

---

**Koniec dokumentu**

*Wygenerowano: 2025-12-26*
*System: MDR AI Ecosystem v1.0*
