import { Resolution, Notification, ResolutionTemplate } from '../types'

export const mockResolutions: Resolution[] = [
  {
    id: 'RES-001',
    number: '1/2025',
    title: 'Wniesienie wkładu niepieniężnego (know-how ZIP Console™)',
    type: 'Uchwała WZA',
    content: `Uchwała nr 1/2025
Walnego Zgromadzenia Akcjonariuszy
MDR PHILOSOPHY PROSTA SPÓŁKA AKCYJNA

Na podstawie art. 15 § 1 ustawy z dnia 19 lipca 2019 r. - Kodeks spółek handlowych, Walne Zgromadzenie Akcjonariuszy MDR PHILOSOPHY PROSTA SPÓŁKA AKCYJNA postanawia:

§ 1
Przyjąć wniesienie przez Pana Artura Fijołka wkładu niepieniężnego w postaci know-how technologicznego ZIP Console™ o wartości 13.999.000,00 PLN (słownie: trzynaście milionów dziewięćset dziewięćdziesiąt dziewięć tysięcy złotych).

§ 2
W zamian za wkład, o którym mowa w § 1, wyemitować na rzecz Pana Artura Fijołka 13.999 akcji zwykłych na okaziciela serii C.

§ 3
Uchwała wchodzi w życie z dniem podjęcia.`,
    status: 'approved',
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-15'),
    meetingDate: new Date('2025-01-20'),
    approvedDate: new Date('2025-01-15'),
    createdBy: 'Dorota Płoskoń',
    approvers: ['Jan Kowalski', 'Anna Nowak'],
    attachments: [],
    notes: 'Wymaga podpisu kwalifikowanego wszystkich akcjonariuszy',
  },
  {
    id: 'RES-002',
    number: '2/2025',
    title: 'Zatwierdzenie budżetu na 2025 rok',
    type: 'Uchwała Zarządu',
    content: 'Treść uchwały budżetowej...',
    status: 'pending',
    createdAt: new Date('2025-01-12'),
    updatedAt: new Date('2025-01-12'),
    meetingDate: new Date('2025-01-25'),
    createdBy: 'Jan Kowalski',
    approvers: ['Dorota Płoskoń'],
    attachments: [],
    notes: 'Wymaga akceptacji zarządu przed WZA',
  },
  {
    id: 'RES-003',
    number: '3/2025',
    title: 'Powołanie audytora zewnętrznego',
    type: 'Uchwała WZA',
    content: 'Treść uchwały o powołaniu audytora...',
    status: 'draft',
    createdAt: new Date('2025-01-14'),
    updatedAt: new Date('2025-01-14'),
    createdBy: 'Anna Nowak',
    approvers: [],
    attachments: [],
    notes: 'W trakcie przygotowania',
  },
]

export const mockNotifications: Notification[] = [
  {
    id: 'NOTIF-001',
    type: 'deadline',
    title: 'Zbliżający się termin WZA',
    message: 'WZA w sprawie uchwały nr 1/2025 odbędzie się za 5 dni (20.01.2025)',
    resolutionId: 'RES-001',
    read: false,
    createdAt: new Date('2025-01-15'),
    actionUrl: '/resolutions/RES-001',
  },
  {
    id: 'NOTIF-002',
    type: 'approval',
    title: 'Uchwała wymaga Twojej akceptacji',
    message: 'Uchwała nr 2/2025 "Zatwierdzenie budżetu" oczekuje na Twoją akceptację',
    resolutionId: 'RES-002',
    read: false,
    createdAt: new Date('2025-01-14'),
    actionUrl: '/resolutions/RES-002',
  },
  {
    id: 'NOTIF-003',
    type: 'info',
    title: 'Nowy szablon dodany',
    message: 'Dodano nowy szablon: Uchwała o zmianie siedziby spółki',
    read: true,
    createdAt: new Date('2025-01-13'),
    actionUrl: '/templates',
  },
  {
    id: 'NOTIF-004',
    type: 'signed',
    title: 'Uchwała podpisana',
    message: 'Uchwała nr 1/2025 została podpisana przez wszystkich akcjonariuszy',
    resolutionId: 'RES-001',
    read: true,
    createdAt: new Date('2025-01-15'),
    actionUrl: '/resolutions/RES-001',
  },
]

export const mockTemplates: ResolutionTemplate[] = [
  {
    id: 'TPL-001',
    name: 'Uchwała o wniesienie wkładu niepieniężnego',
    category: 'Kapitał',
    description: 'Szablon uchwały WZA o przyjęciu wkładu niepieniężnego (aport)',
    content: `Uchwała nr {numer}
Walnego Zgromadzenia Akcjonariuszy
{nazwa_spolki}

Na podstawie art. 15 § 1 ustawy z dnia 19 lipca 2019 r. - Kodeks spółek handlowych, Walne Zgromadzenie Akcjonariuszy {nazwa_spolki} postanawia:

§ 1
Przyjąć wniesienie przez {aportujacy} wkładu niepieniężnego w postaci {opis_wkladu} o wartości {wartosc} PLN.

§ 2
W zamian za wkład, o którym mowa w § 1, wyemitować na rzecz {aportujacy} {liczba_akcji} akcji zwykłych na okaziciela serii {seria}.

§ 3
Uchwała wchodzi w życie z dniem podjęcia.`,
    variables: [
      { key: 'numer', label: 'Numer uchwały', type: 'text', required: true },
      { key: 'nazwa_spolki', label: 'Nazwa spółki', type: 'text', required: true },
      { key: 'aportujacy', label: 'Osoba wnosząca aport', type: 'text', required: true },
      { key: 'opis_wkladu', label: 'Opis wkładu', type: 'text', required: true },
      { key: 'wartosc', label: 'Wartość wkładu (PLN)', type: 'number', required: true },
      { key: 'liczba_akcji', label: 'Liczba akcji', type: 'number', required: true },
      { key: 'seria', label: 'Seria akcji', type: 'text', required: true },
    ],
  },
  {
    id: 'TPL-002',
    name: 'Uchwała o zatwierdzeniu budżetu',
    category: 'Finanse',
    description: 'Szablon uchwały o zatwierdzeniu rocznego budżetu spółki',
    content: `Uchwała nr {numer}
{organ}
{nazwa_spolki}

§ 1
Zatwierdza się budżet spółki na rok {rok} w wysokości {kwota} PLN.

§ 2
Budżet stanowi załącznik nr 1 do niniejszej uchwały.

§ 3
Uchwała wchodzi w życie z dniem podjęcia.`,
    variables: [
      { key: 'numer', label: 'Numer uchwały', type: 'text', required: true },
      { key: 'organ', label: 'Organ', type: 'select', required: true, options: ['Zarządu', 'Walnego Zgromadzenia Akcjonariuszy'] },
      { key: 'nazwa_spolki', label: 'Nazwa spółki', type: 'text', required: true },
      { key: 'rok', label: 'Rok budżetowy', type: 'number', required: true },
      { key: 'kwota', label: 'Kwota budżetu (PLN)', type: 'number', required: true },
    ],
  },
  {
    id: 'TPL-003',
    name: 'Uchwała o powołaniu członka zarządu',
    category: 'Zarząd',
    description: 'Szablon uchwały o powołaniu osoby na stanowisko w zarządzie',
    content: `Uchwała nr {numer}
Walnego Zgromadzenia Akcjonariuszy
{nazwa_spolki}

§ 1
Powołuje się {imie_nazwisko} na stanowisko {stanowisko} z dniem {data_poczatek}.

§ 2
Wynagrodzenie ustala się na kwotę {wynagrodzenie} PLN brutto miesięcznie.

§ 3
Uchwała wchodzi w życie z dniem podjęcia.`,
    variables: [
      { key: 'numer', label: 'Numer uchwały', type: 'text', required: true },
      { key: 'nazwa_spolki', label: 'Nazwa spółki', type: 'text', required: true },
      { key: 'imie_nazwisko', label: 'Imię i nazwisko', type: 'text', required: true },
      { key: 'stanowisko', label: 'Stanowisko', type: 'select', required: true, options: ['Prezesa Zarządu', 'Wiceprezesa Zarządu', 'Członka Zarządu'] },
      { key: 'data_poczatek', label: 'Data początkowa', type: 'date', required: true },
      { key: 'wynagrodzenie', label: 'Wynagrodzenie miesięczne brutto (PLN)', type: 'number', required: true },
    ],
  },
  {
    id: 'TPL-004',
    name: 'Uchwała o zmianie siedziby',
    category: 'Organizacja',
    description: 'Szablon uchwały o zmianie siedziby spółki',
    content: `Uchwała nr {numer}
Walnego Zgromadzenia Akcjonariuszy
{nazwa_spolki}

§ 1
Zmienia się siedzibę spółki z {stara_siedziba} na {nowa_siedziba}.

§ 2
Zarząd podejmie czynności związane z rejestracją zmiany w KRS.

§ 3
Uchwała wchodzi w życie z dniem podjęcia.`,
    variables: [
      { key: 'numer', label: 'Numer uchwały', type: 'text', required: true },
      { key: 'nazwa_spolki', label: 'Nazwa spółki', type: 'text', required: true },
      { key: 'stara_siedziba', label: 'Dotychczasowa siedziba', type: 'text', required: true },
      { key: 'nowa_siedziba', label: 'Nowa siedziba', type: 'text', required: true },
    ],
  },
  {
    id: 'TPL-005',
    name: 'Uchwała o wypłacie dywidendy',
    category: 'Finanse',
    description: 'Szablon uchwały o wypłacie dywidendy akcjonariuszom',
    content: `Uchwała nr {numer}
Walnego Zgromadzenia Akcjonariuszy
{nazwa_spolki}

§ 1
Wypłaca się dywidendę za rok {rok_obrachunkowy} w wysokości {kwota_na_akcje} PLN na jedną akcję.

§ 2
Dzień dywidendy ustala się na {dzien_dywidendy}.
Termin wypłaty dywidendy ustala się na {termin_wyplaty}.

§ 3
Uchwała wchodzi w życie z dniem podjęcia.`,
    variables: [
      { key: 'numer', label: 'Numer uchwały', type: 'text', required: true },
      { key: 'nazwa_spolki', label: 'Nazwa spółki', type: 'text', required: true },
      { key: 'rok_obrachunkowy', label: 'Rok obrachunkowy', type: 'number', required: true },
      { key: 'kwota_na_akcje', label: 'Kwota na akcję (PLN)', type: 'number', required: true },
      { key: 'dzien_dywidendy', label: 'Dzień dywidendy', type: 'date', required: true },
      { key: 'termin_wyplaty', label: 'Termin wypłaty', type: 'date', required: true },
    ],
  },
  {
    id: 'TPL-006',
    name: 'Uchwała o odwołaniu członka zarządu',
    category: 'Zarząd',
    description: 'Szablon uchwały o odwołaniu osoby ze stanowiska w zarządzie',
    content: `Uchwała nr {numer}
Walnego Zgromadzenia Akcjonariuszy
{nazwa_spolki}

§ 1
Odwołuje się {imie_nazwisko} ze stanowiska {stanowisko} z dniem {data_odwolania}.

§ 2
Zarząd podejmie czynności związane z rejestracją zmiany w KRS.

§ 3
Uchwała wchodzi w życie z dniem podjęcia.`,
    variables: [
      { key: 'numer', label: 'Numer uchwały', type: 'text', required: true },
      { key: 'nazwa_spolki', label: 'Nazwa spółki', type: 'text', required: true },
      { key: 'imie_nazwisko', label: 'Imię i nazwisko', type: 'text', required: true },
      { key: 'stanowisko', label: 'Stanowisko', type: 'text', required: true },
      { key: 'data_odwolania', label: 'Data odwołania', type: 'date', required: true },
    ],
  },
  {
    id: 'TPL-007',
    name: 'Uchwała o zatwierdzeniu sprawozdania finansowego',
    category: 'Finanse',
    description: 'Szablon uchwały o zatwierdzeniu rocznego sprawozdania finansowego',
    content: `Uchwała nr {numer}
Walnego Zgromadzenia Akcjonariuszy
{nazwa_spolki}

§ 1
Zatwierdza się sprawozdanie finansowe spółki za rok {rok_obrachunkowy}.

§ 2
Sprawozdanie wykazuje:
- przychody: {przychody} PLN
- koszty: {koszty} PLN
- zysk netto: {zysk} PLN

§ 3
Uchwała wchodzi w życie z dniem podjęcia.`,
    variables: [
      { key: 'numer', label: 'Numer uchwały', type: 'text', required: true },
      { key: 'nazwa_spolki', label: 'Nazwa spółki', type: 'text', required: true },
      { key: 'rok_obrachunkowy', label: 'Rok obrachunkowy', type: 'number', required: true },
      { key: 'przychody', label: 'Przychody (PLN)', type: 'number', required: true },
      { key: 'koszty', label: 'Koszty (PLN)', type: 'number', required: true },
      { key: 'zysk', label: 'Zysk netto (PLN)', type: 'number', required: true },
    ],
  },
  {
    id: 'TPL-008',
    name: 'Uchwała o udzieleniu absolutorium',
    category: 'Zarząd',
    description: 'Szablon uchwały o udzieleniu absolutorium członkom zarządu',
    content: `Uchwała nr {numer}
Walnego Zgromadzenia Akcjonariuszy
{nazwa_spolki}

§ 1
Udziela się absolutorium {imie_nazwisko} z wykonywania obowiązków {stanowisko} za rok {rok}.

§ 2
Uchwała wchodzi w życie z dniem podjęcia.`,
    variables: [
      { key: 'numer', label: 'Numer uchwały', type: 'text', required: true },
      { key: 'nazwa_spolki', label: 'Nazwa spółki', type: 'text', required: true },
      { key: 'imie_nazwisko', label: 'Imię i nazwisko', type: 'text', required: true },
      { key: 'stanowisko', label: 'Stanowisko', type: 'text', required: true },
      { key: 'rok', label: 'Rok', type: 'number', required: true },
    ],
  },
  {
    id: 'TPL-009',
    name: 'Uchwała o emisji akcji',
    category: 'Kapitał',
    description: 'Szablon uchwały o emisji nowych akcji',
    content: `Uchwała nr {numer}
Walnego Zgromadzenia Akcjonariuszy
{nazwa_spolki}

§ 1
Postanawia się o emisji {liczba_akcji} akcji zwykłych na okaziciela serii {seria} o wartości nominalnej {wartosc_nominalna} PLN każda.

§ 2
Cena emisyjna jednej akcji wynosi {cena_emisyjna} PLN.

§ 3
Akcje oferowane są w drodze subskrypcji prywatnej.

§ 4
Uchwała wchodzi w życie z dniem podjęcia.`,
    variables: [
      { key: 'numer', label: 'Numer uchwały', type: 'text', required: true },
      { key: 'nazwa_spolki', label: 'Nazwa spółki', type: 'text', required: true },
      { key: 'liczba_akcji', label: 'Liczba akcji', type: 'number', required: true },
      { key: 'seria', label: 'Seria akcji', type: 'text', required: true },
      { key: 'wartosc_nominalna', label: 'Wartość nominalna (PLN)', type: 'number', required: true },
      { key: 'cena_emisyjna', label: 'Cena emisyjna (PLN)', type: 'number', required: true },
    ],
  },
  {
    id: 'TPL-010',
    name: 'Uchwała o zmianie nazwy spółki',
    category: 'Organizacja',
    description: 'Szablon uchwały o zmianie nazwy (firmy) spółki',
    content: `Uchwała nr {numer}
Walnego Zgromadzenia Akcjonariuszy
{nazwa_spolki}

§ 1
Zmienia się nazwę spółki z "{stara_nazwa}" na "{nowa_nazwa}".

§ 2
Zarząd podejmie czynności związane z rejestracją zmiany w KRS oraz aktualizacją dokumentów spółki.

§ 3
Uchwała wchodzi w życie z dniem podjęcia.`,
    variables: [
      { key: 'numer', label: 'Numer uchwały', type: 'text', required: true },
      { key: 'nazwa_spolki', label: 'Obecna nazwa spółki', type: 'text', required: true },
      { key: 'stara_nazwa', label: 'Stara nazwa (pełna)', type: 'text', required: true },
      { key: 'nowa_nazwa', label: 'Nowa nazwa (pełna)', type: 'text', required: true },
    ],
  },
  {
    id: 'TPL-011',
    name: 'Uchwała o zawarciu umowy kredytowej',
    category: 'Finanse',
    description: 'Szablon uchwały o wyrażeniu zgody na zaciągnięcie kredytu',
    content: `Uchwała nr {numer}
{organ}
{nazwa_spolki}

§ 1
Wyraża się zgodę na zawarcie umowy kredytowej z {bank} na kwotę {kwota} PLN.

§ 2
Okres kredytowania wynosi {okres} miesięcy.

§ 3
Upoważnia się Zarząd do podpisania umowy kredytowej oraz wszystkich dokumentów z nią związanych.

§ 4
Uchwała wchodzi w życie z dniem podjęcia.`,
    variables: [
      { key: 'numer', label: 'Numer uchwały', type: 'text', required: true },
      { key: 'organ', label: 'Organ', type: 'select', required: true, options: ['Zarządu', 'Walnego Zgromadzenia Akcjonariuszy'] },
      { key: 'nazwa_spolki', label: 'Nazwa spółki', type: 'text', required: true },
      { key: 'bank', label: 'Nazwa banku', type: 'text', required: true },
      { key: 'kwota', label: 'Kwota kredytu (PLN)', type: 'number', required: true },
      { key: 'okres', label: 'Okres kredytowania (miesiące)', type: 'number', required: true },
    ],
  },
  {
    id: 'TPL-012',
    name: 'Uchwała o podwyższeniu kapitału zakładowego',
    category: 'Kapitał',
    description: 'Szablon uchwały o podwyższeniu kapitału zakładowego spółki',
    content: `Uchwała nr {numer}
Walnego Zgromadzenia Akcjonariuszy
{nazwa_spolki}

§ 1
Podwyższa się kapitał zakładowy spółki z kwoty {kapital_stary} PLN do kwoty {kapital_nowy} PLN, tj. o kwotę {roznica} PLN.

§ 2
Podwyższenie kapitału następuje przez emisję {liczba_akcji} akcji zwykłych na okaziciela serii {seria} o wartości nominalnej {wartosc_nominalna} PLN każda.

§ 3
Zarząd podejmie czynności związane z rejestracją podwyższenia kapitału w KRS.

§ 4
Uchwała wchodzi w życie z dniem podjęcia.`,
    variables: [
      { key: 'numer', label: 'Numer uchwały', type: 'text', required: true },
      { key: 'nazwa_spolki', label: 'Nazwa spółki', type: 'text', required: true },
      { key: 'kapital_stary', label: 'Kapitał obecny (PLN)', type: 'number', required: true },
      { key: 'kapital_nowy', label: 'Kapitał nowy (PLN)', type: 'number', required: true },
      { key: 'roznica', label: 'Różnica (PLN)', type: 'number', required: true },
      { key: 'liczba_akcji', label: 'Liczba nowych akcji', type: 'number', required: true },
      { key: 'seria', label: 'Seria akcji', type: 'text', required: true },
      { key: 'wartosc_nominalna', label: 'Wartość nominalna akcji (PLN)', type: 'number', required: true },
    ],
  },
  {
    id: 'TPL-013',
    name: 'Uchwała o zbyciu składnika majątku',
    category: 'Majątek',
    description: 'Szablon uchwały o wyrażeniu zgody na zbycie istotnego składnika majątku',
    content: `Uchwała nr {numer}
Walnego Zgromadzenia Akcjonariuszy
{nazwa_spolki}

§ 1
Wyraża się zgodę na zbycie składnika majątku: {opis_majatku} o wartości {wartosc} PLN.

§ 2
Nabywcą składnika majątku jest {nabywca}.

§ 3
Upoważnia się Zarząd do podpisania umowy zbycia oraz wszelkich dokumentów z tym związanych.

§ 4
Uchwała wchodzi w życie z dniem podjęcia.`,
    variables: [
      { key: 'numer', label: 'Numer uchwały', type: 'text', required: true },
      { key: 'nazwa_spolki', label: 'Nazwa spółki', type: 'text', required: true },
      { key: 'opis_majatku', label: 'Opis składnika majątku', type: 'text', required: true },
      { key: 'wartosc', label: 'Wartość (PLN)', type: 'number', required: true },
      { key: 'nabywca', label: 'Nabywca', type: 'text', required: true },
    ],
  },
]
