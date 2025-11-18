import { DocumentTemplate, TemplateCategory, TemplateFieldType } from '../types';

export const documentTemplates: DocumentTemplate[] = [
  // UCHWAŁY (3)
  {
    id: 'resolution-shares-issue',
    name: 'Uchwała w sprawie emisji akcji',
    description: 'Uchwała Walnego Zgromadzenia o emisji nowych akcji imiennych',
    category: TemplateCategory.RESOLUTIONS,
    icon: 'fa-file-signature',
    variables: [
      { key: 'NAZWA_SPOLKI', label: 'Nazwa spółki', type: TemplateFieldType.TEXT, required: true },
      { key: 'KRS', label: 'Numer KRS', type: TemplateFieldType.TEXT, required: true },
      { key: 'NIP', label: 'NIP', type: TemplateFieldType.TEXT, required: true },
      { key: 'DATA_WZA', label: 'Data Walnego Zgromadzenia', type: TemplateFieldType.DATE, required: true },
      { key: 'LICZBA_AKCJI', label: 'Liczba nowych akcji', type: TemplateFieldType.NUMBER, required: true },
      { key: 'WARTOSC_NOMINALNA', label: 'Wartość nominalna akcji (PLN)', type: TemplateFieldType.NUMBER, required: true },
      { key: 'CENA_EMISYJNA', label: 'Cena emisyjna akcji (PLN)', type: TemplateFieldType.NUMBER, required: true },
      { key: 'CEL_EMISJI', label: 'Cel emisji', type: TemplateFieldType.TEXTAREA, required: true },
      { key: 'LOGO_SPOLKI', label: 'Logo spółki', type: TemplateFieldType.IMAGE, required: false }
    ],
    htmlTemplate: `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; margin: 20mm; }
        .header { text-align: center; margin-bottom: 30px; }
        .header img { max-height: 60px; margin-bottom: 10px; }
        .header h1 { font-size: 14pt; margin: 5px 0; }
        .header p { font-size: 10pt; margin: 2px 0; }
        .title { text-align: center; font-weight: bold; margin: 30px 0; font-size: 14pt; }
        .content { text-align: justify; }
        .section { margin: 20px 0; }
        .signatures { margin-top: 60px; display: flex; justify-content: space-between; }
        .signature { text-align: center; width: 45%; }
        .signature-line { border-top: 1px solid #000; margin-top: 60px; padding-top: 5px; }
    </style>
</head>
<body>
    <div class="header">
        {{#if LOGO_SPOLKI}}<img src="{{LOGO_SPOLKI}}" alt="Logo">{{/if}}
        <h1>{{NAZWA_SPOLKI}}</h1>
        <p>KRS: {{KRS}} | NIP: {{NIP}}</p>
    </div>

    <div class="title">
        UCHWAŁA NR ___/{{YEAR}}<br>
        WALNEGO ZGROMADZENIA AKCJONARIUSZY<br>
        z dnia {{DATA_WZA}}<br>
        w sprawie emisji akcji
    </div>

    <div class="content">
        <div class="section">
            <p>Działając na podstawie art. 430 § 1 Kodeksu spółek handlowych oraz § ___ Statutu Spółki,
            Walne Zgromadzenie Akcjonariuszy {{NAZWA_SPOLKI}} z siedzibą w Warszawie,
            wpisanej do rejestru przedsiębiorców Krajowego Rejestru Sądowego pod numerem {{KRS}},
            uchwala, co następuje:</p>
        </div>

        <div class="section">
            <p><strong>§ 1</strong></p>
            <p>Walne Zgromadzenie postanawia o podwyższeniu kapitału zakładowego Spółki poprzez emisję
            <strong>{{LICZBA_AKCJI}}</strong> (słownie: ___________) akcji imiennych serii ___
            o wartości nominalnej <strong>{{WARTOSC_NOMINALNA}} PLN</strong> każda.</p>
        </div>

        <div class="section">
            <p><strong>§ 2</strong></p>
            <p>Cena emisyjna nowych akcji wynosi <strong>{{CENA_EMISYJNA}} PLN</strong> za jedną akcję.</p>
        </div>

        <div class="section">
            <p><strong>§ 3</strong></p>
            <p>Środki uzyskane z emisji akcji zostaną przeznaczone na: {{CEL_EMISJI}}</p>
        </div>

        <div class="section">
            <p><strong>§ 4</strong></p>
            <p>Nowe akcje uczestniczą w dywidendzie począwszy od roku obrotowego, w którym zostały objęte.</p>
        </div>

        <div class="section">
            <p><strong>§ 5</strong></p>
            <p>Uchwała wchodzi w życie z dniem podjęcia.</p>
        </div>
    </div>

    <div class="signatures">
        <div class="signature">
            <div class="signature-line">Przewodniczący Walnego Zgromadzenia</div>
        </div>
        <div class="signature">
            <div class="signature-line">Protokolant</div>
        </div>
    </div>
</body>
</html>
    `
  },

  {
    id: 'resolution-statute-change',
    name: 'Uchwała w sprawie zmiany statutu',
    description: 'Uchwała WZA o zmianie postanowień statutu spółki',
    category: TemplateCategory.RESOLUTIONS,
    icon: 'fa-file-contract',
    variables: [
      { key: 'NAZWA_SPOLKI', label: 'Nazwa spółki', type: TemplateFieldType.TEXT, required: true },
      { key: 'KRS', label: 'Numer KRS', type: TemplateFieldType.TEXT, required: true },
      { key: 'NIP', label: 'NIP', type: TemplateFieldType.TEXT, required: true },
      { key: 'DATA_WZA', label: 'Data WZA', type: TemplateFieldType.DATE, required: true },
      { key: 'PARAGRAF_STATUTU', label: 'Numer paragrafu do zmiany', type: TemplateFieldType.TEXT, required: true },
      { key: 'STARA_TRESC', label: 'Obecna treść paragrafu', type: TemplateFieldType.TEXTAREA, required: true },
      { key: 'NOWA_TRESC', label: 'Nowa treść paragrafu', type: TemplateFieldType.TEXTAREA, required: true },
      { key: 'UZASADNIENIE', label: 'Uzasadnienie zmiany', type: TemplateFieldType.TEXTAREA, required: true },
      { key: 'LOGO_SPOLKI', label: 'Logo spółki', type: TemplateFieldType.IMAGE, required: false }
    ],
    htmlTemplate: `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; margin: 20mm; }
        .header { text-align: center; margin-bottom: 30px; }
        .header img { max-height: 60px; margin-bottom: 10px; }
        .header h1 { font-size: 14pt; margin: 5px 0; }
        .header p { font-size: 10pt; margin: 2px 0; }
        .title { text-align: center; font-weight: bold; margin: 30px 0; font-size: 14pt; }
        .content { text-align: justify; }
        .section { margin: 20px 0; }
        .old-text { background-color: #ffe6e6; padding: 10px; margin: 10px 0; }
        .new-text { background-color: #e6ffe6; padding: 10px; margin: 10px 0; }
        .signatures { margin-top: 60px; display: flex; justify-content: space-between; }
        .signature { text-align: center; width: 45%; }
        .signature-line { border-top: 1px solid #000; margin-top: 60px; padding-top: 5px; }
    </style>
</head>
<body>
    <div class="header">
        {{#if LOGO_SPOLKI}}<img src="{{LOGO_SPOLKI}}" alt="Logo">{{/if}}
        <h1>{{NAZWA_SPOLKI}}</h1>
        <p>KRS: {{KRS}} | NIP: {{NIP}}</p>
    </div>

    <div class="title">
        UCHWAŁA NR ___/{{YEAR}}<br>
        WALNEGO ZGROMADZENIA AKCJONARIUSZY<br>
        z dnia {{DATA_WZA}}<br>
        w sprawie zmiany Statutu Spółki
    </div>

    <div class="content">
        <div class="section">
            <p>Na podstawie art. 430 § 1 Kodeksu spółek handlowych oraz § ___ Statutu Spółki,
            Walne Zgromadzenie Akcjonariuszy {{NAZWA_SPOLKI}} postanawia:</p>
        </div>

        <div class="section">
            <p><strong>§ 1</strong></p>
            <p>Zmienia się {{PARAGRAF_STATUTU}} Statutu Spółki.</p>
        </div>

        <div class="section">
            <p><strong>§ 2</strong></p>
            <p>Dotychczasowa treść:</p>
            <div class="old-text">{{STARA_TRESC}}</div>
        </div>

        <div class="section">
            <p><strong>§ 3</strong></p>
            <p>Nowa treść:</p>
            <div class="new-text">{{NOWA_TRESC}}</div>
        </div>

        <div class="section">
            <p><strong>§ 4</strong></p>
            <p><em>Uzasadnienie:</em></p>
            <p>{{UZASADNIENIE}}</p>
        </div>

        <div class="section">
            <p><strong>§ 5</strong></p>
            <p>Uchwała wchodzi w życie z dniem podjęcia, z zastrzeżeniem wpisania zmiany do KRS.</p>
        </div>
    </div>

    <div class="signatures">
        <div class="signature">
            <div class="signature-line">Przewodniczący WZA</div>
        </div>
        <div class="signature">
            <div class="signature-line">Protokolant</div>
        </div>
    </div>
</body>
</html>
    `
  },

  {
    id: 'resolution-profit-distribution',
    name: 'Uchwała w sprawie podziału zysku',
    description: 'Uchwała o podziale zysku netto za rok obrotowy',
    category: TemplateCategory.RESOLUTIONS,
    icon: 'fa-coins',
    variables: [
      { key: 'NAZWA_SPOLKI', label: 'Nazwa spółki', type: TemplateFieldType.TEXT, required: true },
      { key: 'KRS', label: 'Numer KRS', type: TemplateFieldType.TEXT, required: true },
      { key: 'NIP', label: 'NIP', type: TemplateFieldType.TEXT, required: true },
      { key: 'DATA_WZA', label: 'Data WZA', type: TemplateFieldType.DATE, required: true },
      { key: 'ROK_OBROTOWY', label: 'Rok obrotowy', type: TemplateFieldType.NUMBER, required: true },
      { key: 'ZYSK_NETTO', label: 'Zysk netto (PLN)', type: TemplateFieldType.NUMBER, required: true },
      { key: 'DYWIDENDA', label: 'Kwota na dywidendę (PLN)', type: TemplateFieldType.NUMBER, required: true },
      { key: 'KAPITAL_ZAPASOWY', label: 'Kwota na kapitał zapasowy (PLN)', type: TemplateFieldType.NUMBER, required: true },
      { key: 'DZIEN_DYWIDENDY', label: 'Dzień dywidendy', type: TemplateFieldType.DATE, required: true },
      { key: 'DATA_WYPLATY', label: 'Data wypłaty dywidendy', type: TemplateFieldType.DATE, required: true },
      { key: 'LOGO_SPOLKI', label: 'Logo spółki', type: TemplateFieldType.IMAGE, required: false }
    ],
    htmlTemplate: `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; margin: 20mm; }
        .header { text-align: center; margin-bottom: 30px; }
        .header img { max-height: 60px; margin-bottom: 10px; }
        .header h1 { font-size: 14pt; margin: 5px 0; }
        .header p { font-size: 10pt; margin: 2px 0; }
        .title { text-align: center; font-weight: bold; margin: 30px 0; font-size: 14pt; }
        .content { text-align: justify; }
        .section { margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        th { background-color: #f0f0f0; }
        .signatures { margin-top: 60px; display: flex; justify-content: space-between; }
        .signature { text-align: center; width: 45%; }
        .signature-line { border-top: 1px solid #000; margin-top: 60px; padding-top: 5px; }
    </style>
</head>
<body>
    <div class="header">
        {{#if LOGO_SPOLKI}}<img src="{{LOGO_SPOLKI}}" alt="Logo">{{/if}}
        <h1>{{NAZWA_SPOLKI}}</h1>
        <p>KRS: {{KRS}} | NIP: {{NIP}}</p>
    </div>

    <div class="title">
        UCHWAŁA NR ___/{{YEAR}}<br>
        WALNEGO ZGROMADZENIA AKCJONARIUSZY<br>
        z dnia {{DATA_WZA}}<br>
        w sprawie podziału zysku za rok {{ROK_OBROTOWY}}
    </div>

    <div class="content">
        <div class="section">
            <p>Działając na podstawie art. 395 § 2 pkt 2 Kodeksu spółek handlowych,
            Walne Zgromadzenie Akcjonariuszy {{NAZWA_SPOLKI}} uchwala:</p>
        </div>

        <div class="section">
            <p><strong>§ 1</strong></p>
            <p>Zysk netto Spółki za rok obrotowy {{ROK_OBROTOWY}} w kwocie <strong>{{ZYSK_NETTO}} PLN</strong>
            (słownie: ___________) podlega podziałowi w następujący sposób:</p>

            <table>
                <tr>
                    <th>Przeznaczenie</th>
                    <th>Kwota (PLN)</th>
                </tr>
                <tr>
                    <td>Dywidenda dla akcjonariuszy</td>
                    <td>{{DYWIDENDA}}</td>
                </tr>
                <tr>
                    <td>Kapitał zapasowy</td>
                    <td>{{KAPITAL_ZAPASOWY}}</td>
                </tr>
                <tr>
                    <th>Razem</th>
                    <th>{{ZYSK_NETTO}}</th>
                </tr>
            </table>
        </div>

        <div class="section">
            <p><strong>§ 2</strong></p>
            <p>Dniem dywidendy, tj. dniem, na który ustala się listę akcjonariuszy uprawnionych do dywidendy
            za rok {{ROK_OBROTOWY}}, jest <strong>{{DZIEN_DYWIDENDY}}</strong>.</p>
        </div>

        <div class="section">
            <p><strong>§ 3</strong></p>
            <p>Wypłata dywidendy nastąpi w dniu <strong>{{DATA_WYPLATY}}</strong>.</p>
        </div>

        <div class="section">
            <p><strong>§ 4</strong></p>
            <p>Uchwała wchodzi w życie z dniem podjęcia.</p>
        </div>
    </div>

    <div class="signatures">
        <div class="signature">
            <div class="signature-line">Przewodniczący WZA</div>
        </div>
        <div class="signature">
            <div class="signature-line">Protokolant</div>
        </div>
    </div>
</body>
</html>
    `
  },

  // PROTOKOŁY (2)
  {
    id: 'protocol-general-meeting',
    name: 'Protokół Walnego Zgromadzenia Akcjonariuszy',
    description: 'Protokół WZA z listą obecności i przebiegiem obrad',
    category: TemplateCategory.PROTOCOLS,
    icon: 'fa-file-alt',
    variables: [
      { key: 'NAZWA_SPOLKI', label: 'Nazwa spółki', type: TemplateFieldType.TEXT, required: true },
      { key: 'KRS', label: 'Numer KRS', type: TemplateFieldType.TEXT, required: true },
      { key: 'NIP', label: 'NIP', type: TemplateFieldType.TEXT, required: true },
      { key: 'DATA_WZA', label: 'Data WZA', type: TemplateFieldType.DATE, required: true },
      { key: 'GODZINA_ROZPOCZECIA', label: 'Godzina rozpoczęcia', type: TemplateFieldType.TEXT, required: true, placeholder: '10:00' },
      { key: 'GODZINA_ZAKONCZENIA', label: 'Godzina zakończenia', type: TemplateFieldType.TEXT, required: true, placeholder: '12:00' },
      { key: 'MIEJSCE', label: 'Miejsce obrad', type: TemplateFieldType.TEXT, required: true },
      { key: 'PRZEWODNICZACY', label: 'Przewodniczący', type: TemplateFieldType.TEXT, required: true },
      { key: 'PROTOKOLANT', label: 'Protokolant', type: TemplateFieldType.TEXT, required: true },
      { key: 'LISTA_OBECNOSCI', label: 'Lista obecności (każdy akcjonariusz w nowej linii)', type: TemplateFieldType.TEXTAREA, required: true },
      { key: 'PORZĄDEK_OBRAD', label: 'Porządek obrad', type: TemplateFieldType.TEXTAREA, required: true },
      { key: 'PRZEBIEG', label: 'Przebieg obrad', type: TemplateFieldType.TEXTAREA, required: true },
      { key: 'LOGO_SPOLKI', label: 'Logo spółki', type: TemplateFieldType.IMAGE, required: false }
    ],
    htmlTemplate: `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; margin: 20mm; }
        .header { text-align: center; margin-bottom: 30px; }
        .header img { max-height: 60px; margin-bottom: 10px; }
        .header h1 { font-size: 14pt; margin: 5px 0; }
        .header p { font-size: 10pt; margin: 2px 0; }
        .title { text-align: center; font-weight: bold; margin: 30px 0; font-size: 14pt; }
        .content { text-align: justify; }
        .section { margin: 20px 0; }
        .info-box { background-color: #f9f9f9; padding: 15px; margin: 15px 0; border-left: 4px solid #333; }
        .signatures { margin-top: 60px; display: flex; justify-content: space-between; }
        .signature { text-align: center; width: 45%; }
        .signature-line { border-top: 1px solid #000; margin-top: 60px; padding-top: 5px; }
        ol { padding-left: 25px; }
    </style>
</head>
<body>
    <div class="header">
        {{#if LOGO_SPOLKI}}<img src="{{LOGO_SPOLKI}}" alt="Logo">{{/if}}
        <h1>{{NAZWA_SPOLKI}}</h1>
        <p>KRS: {{KRS}} | NIP: {{NIP}}</p>
    </div>

    <div class="title">
        PROTOKÓŁ<br>
        WALNEGO ZGROMADZENIA AKCJONARIUSZY<br>
        z dnia {{DATA_WZA}}
    </div>

    <div class="content">
        <div class="info-box">
            <p><strong>Data:</strong> {{DATA_WZA}}</p>
            <p><strong>Godzina rozpoczęcia:</strong> {{GODZINA_ROZPOCZECIA}}</p>
            <p><strong>Godzina zakończenia:</strong> {{GODZINA_ZAKONCZENIA}}</p>
            <p><strong>Miejsce:</strong> {{MIEJSCE}}</p>
        </div>

        <div class="section">
            <p><strong>1. Otwarcie obrad i wybór przewodniczącego</strong></p>
            <p>Obrady Walnego Zgromadzenia Akcjonariuszy {{NAZWA_SPOLKI}} otworzył _______________,
            który zaproponował na przewodniczącego obrad: <strong>{{PRZEWODNICZACY}}</strong>.</p>
            <p>Walne Zgromadzenie jednogłośnie wybrało wskazaną osobę na przewodniczącego.</p>
        </div>

        <div class="section">
            <p><strong>2. Wybór protokolanta</strong></p>
            <p>Przewodniczący zaproponował na protokolanta: <strong>{{PROTOKOLANT}}</strong>.</p>
            <p>Walne Zgromadzenie jednogłośnie dokonało wyboru protokolanta.</p>
        </div>

        <div class="section">
            <p><strong>3. Lista obecności</strong></p>
            <p>Na Walnym Zgromadzeniu obecni byli:</p>
            <div style="white-space: pre-line; margin-left: 20px;">{{LISTA_OBECNOSCI}}</div>
        </div>

        <div class="section">
            <p><strong>4. Stwierdzenie prawidłowości zwołania i zdolności do podejmowania uchwał</strong></p>
            <p>Przewodniczący stwierdził, że Walne Zgromadzenie zostało zwołane prawidłowo i jest zdolne do podejmowania uchwał.</p>
        </div>

        <div class="section">
            <p><strong>5. Przyjęcie porządku obrad</strong></p>
            <p>Przewodniczący zaproponował następujący porządek obrad:</p>
            <div style="white-space: pre-line; margin-left: 20px;">{{PORZĄDEK_OBRAD}}</div>
            <p>Walne Zgromadzenie jednogłośnie przyjęło proponowany porządek obrad.</p>
        </div>

        <div class="section">
            <p><strong>6. Przebieg obrad</strong></p>
            <div style="white-space: pre-line;">{{PRZEBIEG}}</div>
        </div>

        <div class="section">
            <p><strong>7. Zamknięcie obrad</strong></p>
            <p>Po wyczerpaniu porządku obrad, przewodniczący zamknął obrady o godzinie {{GODZINA_ZAKONCZENIA}}.</p>
        </div>
    </div>

    <div class="signatures">
        <div class="signature">
            <div class="signature-line">{{PRZEWODNICZACY}}<br>Przewodniczący WZA</div>
        </div>
        <div class="signature">
            <div class="signature-line">{{PROTOKOLANT}}<br>Protokolant</div>
        </div>
    </div>
</body>
</html>
    `
  },

  {
    id: 'protocol-board-meeting',
    name: 'Protokół posiedzenia Zarządu',
    description: 'Protokół z posiedzenia Zarządu spółki',
    category: TemplateCategory.PROTOCOLS,
    icon: 'fa-users',
    variables: [
      { key: 'NAZWA_SPOLKI', label: 'Nazwa spółki', type: TemplateFieldType.TEXT, required: true },
      { key: 'KRS', label: 'Numer KRS', type: TemplateFieldType.TEXT, required: true },
      { key: 'NIP', label: 'NIP', type: TemplateFieldType.TEXT, required: true },
      { key: 'DATA_POSIEDZENIA', label: 'Data posiedzenia', type: TemplateFieldType.DATE, required: true },
      { key: 'MIEJSCE', label: 'Miejsce posiedzenia', type: TemplateFieldType.TEXT, required: true },
      { key: 'OBECNI', label: 'Lista obecnych członków Zarządu', type: TemplateFieldType.TEXTAREA, required: true },
      { key: 'TEMATYKA', label: 'Tematyka posiedzenia', type: TemplateFieldType.TEXTAREA, required: true },
      { key: 'PODJETE_DECYZJE', label: 'Podjęte decyzje', type: TemplateFieldType.TEXTAREA, required: true },
      { key: 'LOGO_SPOLKI', label: 'Logo spółki', type: TemplateFieldType.IMAGE, required: false }
    ],
    htmlTemplate: `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; margin: 20mm; }
        .header { text-align: center; margin-bottom: 30px; }
        .header img { max-height: 60px; margin-bottom: 10px; }
        .header h1 { font-size: 14pt; margin: 5px 0; }
        .header p { font-size: 10pt; margin: 2px 0; }
        .title { text-align: center; font-weight: bold; margin: 30px 0; font-size: 14pt; }
        .content { text-align: justify; }
        .section { margin: 20px 0; }
        .info-box { background-color: #f9f9f9; padding: 15px; margin: 15px 0; border-left: 4px solid #333; }
        .signatures { margin-top: 60px; }
        .signature { margin: 40px 0; }
        .signature-line { border-top: 1px solid #000; display: inline-block; min-width: 300px; padding-top: 5px; }
    </style>
</head>
<body>
    <div class="header">
        {{#if LOGO_SPOLKI}}<img src="{{LOGO_SPOLKI}}" alt="Logo">{{/if}}
        <h1>{{NAZWA_SPOLKI}}</h1>
        <p>KRS: {{KRS}} | NIP: {{NIP}}</p>
    </div>

    <div class="title">
        PROTOKÓŁ<br>
        POSIEDZENIA ZARZĄDU<br>
        z dnia {{DATA_POSIEDZENIA}}
    </div>

    <div class="content">
        <div class="info-box">
            <p><strong>Data:</strong> {{DATA_POSIEDZENIA}}</p>
            <p><strong>Miejsce:</strong> {{MIEJSCE}}</p>
        </div>

        <div class="section">
            <p><strong>1. Obecni członkowie Zarządu:</strong></p>
            <div style="white-space: pre-line; margin-left: 20px;">{{OBECNI}}</div>
        </div>

        <div class="section">
            <p><strong>2. Tematyka posiedzenia:</strong></p>
            <div style="white-space: pre-line;">{{TEMATYKA}}</div>
        </div>

        <div class="section">
            <p><strong>3. Podjęte decyzje:</strong></p>
            <div style="white-space: pre-line;">{{PODJETE_DECYZJE}}</div>
        </div>

        <div class="section">
            <p>Protokół sporządzono w dniu {{DATA_POSIEDZENIA}}.</p>
        </div>
    </div>

    <div class="signatures">
        <p><strong>Podpisy członków Zarządu:</strong></p>
        <div class="signature">
            <span class="signature-line"></span>
        </div>
        <div class="signature">
            <span class="signature-line"></span>
        </div>
    </div>
</body>
</html>
    `
  },

  // UMOWY (3)
  {
    id: 'contract-share-transfer',
    name: 'Umowa zbycia akcji',
    description: 'Umowa przeniesienia własności akcji imiennych',
    category: TemplateCategory.CONTRACTS,
    icon: 'fa-handshake',
    variables: [
      { key: 'NAZWA_SPOLKI', label: 'Nazwa spółki (której dotyczy)', type: TemplateFieldType.TEXT, required: true },
      { key: 'DATA_UMOWY', label: 'Data zawarcia umowy', type: TemplateFieldType.DATE, required: true },
      { key: 'ZBYWCA_IMIE', label: 'Zbywca - imię i nazwisko', type: TemplateFieldType.TEXT, required: true },
      { key: 'ZBYWCA_PESEL', label: 'Zbywca - PESEL', type: TemplateFieldType.TEXT, required: true },
      { key: 'ZBYWCA_ADRES', label: 'Zbywca - adres', type: TemplateFieldType.TEXT, required: true },
      { key: 'NABYWCA_IMIE', label: 'Nabywca - imię i nazwisko', type: TemplateFieldType.TEXT, required: true },
      { key: 'NABYWCA_PESEL', label: 'Nabywca - PESEL', type: TemplateFieldType.TEXT, required: true },
      { key: 'NABYWCA_ADRES', label: 'Nabywca - adres', type: TemplateFieldType.TEXT, required: true },
      { key: 'LICZBA_AKCJI', label: 'Liczba akcji', type: TemplateFieldType.NUMBER, required: true },
      { key: 'SERIA_AKCJI', label: 'Seria akcji', type: TemplateFieldType.TEXT, required: true },
      { key: 'CENA_LACZNA', label: 'Cena łączna (PLN)', type: TemplateFieldType.NUMBER, required: true },
      { key: 'DATA_PLATNOSCI', label: 'Termin płatności', type: TemplateFieldType.DATE, required: true }
    ],
    htmlTemplate: `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; margin: 20mm; }
        .title { text-align: center; font-weight: bold; margin: 30px 0; font-size: 14pt; }
        .content { text-align: justify; }
        .section { margin: 20px 0; }
        .parties { margin: 20px 0; }
        .party { margin: 15px 0; padding: 10px; background-color: #f9f9f9; }
        .signatures { margin-top: 80px; display: flex; justify-content: space-between; }
        .signature { text-align: center; width: 45%; }
        .signature-line { border-top: 1px solid #000; margin-top: 60px; padding-top: 5px; }
    </style>
</head>
<body>
    <div class="title">
        UMOWA ZBYCIA AKCJI<br>
        zawarta w dniu {{DATA_UMOWY}}
    </div>

    <div class="parties">
        <div class="party">
            <strong>ZBYWCA:</strong><br>
            {{ZBYWCA_IMIE}}<br>
            PESEL: {{ZBYWCA_PESEL}}<br>
            Adres: {{ZBYWCA_ADRES}}
        </div>

        <div class="party">
            <strong>NABYWCA:</strong><br>
            {{NABYWCA_IMIE}}<br>
            PESEL: {{NABYWCA_PESEL}}<br>
            Adres: {{NABYWCA_ADRES}}
        </div>
    </div>

    <div class="content">
        <div class="section">
            <p><strong>§ 1. Przedmiot umowy</strong></p>
            <p>1. Zbywca oświadcza, że jest właścicielem <strong>{{LICZBA_AKCJI}}</strong> akcji imiennych
            serii <strong>{{SERIA_AKCJI}}</strong> spółki <strong>{{NAZWA_SPOLKI}}</strong>.</p>
            <p>2. Zbywca przenosi na rzecz Nabywcy, a Nabywca nabywa własność akcji wskazanych w ust. 1
            (zwanych dalej "Akcjami").</p>
        </div>

        <div class="section">
            <p><strong>§ 2. Cena</strong></p>
            <p>1. Strony ustalają cenę zbycia Akcji na kwotę <strong>{{CENA_LACZNA}} PLN</strong>
            (słownie: ___________).</p>
            <p>2. Nabywca zobowiązuje się zapłacić cenę w terminie do <strong>{{DATA_PLATNOSCI}}</strong>
            przelewem na rachunek bankowy Zbywcy.</p>
        </div>

        <div class="section">
            <p><strong>§ 3. Przeniesienie własności</strong></p>
            <p>1. Własność Akcji przechodzi na Nabywcę z chwilą zapłaty ceny w całości.</p>
            <p>2. Zbywca zobowiązuje się dokonać wszelkich czynności niezbędnych do przeniesienia Akcji
            w księdze akcyjnej Spółki.</p>
        </div>

        <div class="section">
            <p><strong>§ 4. Oświadczenia Zbywcy</strong></p>
            <p>1. Zbywca oświadcza, że Akcje nie są obciążone żadnymi prawami osób trzecich.</p>
            <p>2. Zbywca oświadcza, że ma pełne prawo do rozporządzania Akcjami.</p>
        </div>

        <div class="section">
            <p><strong>§ 5. Koszty</strong></p>
            <p>Koszty związane z zawarciem niniejszej umowy i przeniesieniem Akcji ponoszą Strony po połowie.</p>
        </div>

        <div class="section">
            <p><strong>§ 6. Postanowienia końcowe</strong></p>
            <p>1. W sprawach nieuregulowanych niniejszą umową zastosowanie mają przepisy Kodeksu cywilnego
            oraz Kodeksu spółek handlowych.</p>
            <p>2. Umowę sporządzono w dwóch jednobrzmiących egzemplarzach, po jednym dla każdej ze Stron.</p>
        </div>
    </div>

    <div class="signatures">
        <div class="signature">
            <div class="signature-line">{{ZBYWCA_IMIE}}<br>ZBYWCA</div>
        </div>
        <div class="signature">
            <div class="signature-line">{{NABYWCA_IMIE}}<br>NABYWCA</div>
        </div>
    </div>
</body>
</html>
    `
  },

  {
    id: 'contract-lockup',
    name: 'Umowa lock-up',
    description: 'Umowa ograniczająca zbywalność akcji (lock-up agreement)',
    category: TemplateCategory.CONTRACTS,
    icon: 'fa-lock',
    variables: [
      { key: 'NAZWA_SPOLKI', label: 'Nazwa spółki', type: TemplateFieldType.TEXT, required: true },
      { key: 'DATA_UMOWY', label: 'Data zawarcia umowy', type: TemplateFieldType.DATE, required: true },
      { key: 'AKCJONARIUSZ', label: 'Akcjonariusz (imię i nazwisko/nazwa)', type: TemplateFieldType.TEXT, required: true },
      { key: 'AKCJONARIUSZ_ADRES', label: 'Adres akcjonariusza', type: TemplateFieldType.TEXT, required: true },
      { key: 'LICZBA_AKCJI', label: 'Liczba akcji objętych lock-up', type: TemplateFieldType.NUMBER, required: true },
      { key: 'OKRES_LOCKUP', label: 'Okres lock-up (w miesiącach)', type: TemplateFieldType.NUMBER, required: true },
      { key: 'DATA_ROZPOCZECIA', label: 'Data rozpoczęcia okresu lock-up', type: TemplateFieldType.DATE, required: true },
      { key: 'KARA_UMOWNA', label: 'Kara umowna (PLN)', type: TemplateFieldType.NUMBER, required: true },
      { key: 'WYJATKI', label: 'Wyjątki od zakazu (opcjonalne)', type: TemplateFieldType.TEXTAREA, required: false }
    ],
    htmlTemplate: `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; margin: 20mm; }
        .title { text-align: center; font-weight: bold; margin: 30px 0; font-size: 14pt; }
        .content { text-align: justify; }
        .section { margin: 20px 0; }
        .warning { background-color: #fff3cd; padding: 15px; margin: 15px 0; border-left: 4px solid #ffc107; }
        .signatures { margin-top: 80px; display: flex; justify-content: space-between; }
        .signature { text-align: center; width: 45%; }
        .signature-line { border-top: 1px solid #000; margin-top: 60px; padding-top: 5px; }
    </style>
</head>
<body>
    <div class="title">
        UMOWA LOCK-UP<br>
        (ograniczenia w rozporządzaniu akcjami)<br>
        zawarta w dniu {{DATA_UMOWY}}
    </div>

    <div class="content">
        <div class="section">
            <p>pomiędzy:</p>
            <p><strong>{{NAZWA_SPOLKI}}</strong> (dalej: "Spółka")</p>
            <p>a</p>
            <p><strong>{{AKCJONARIUSZ}}</strong><br>
            Adres: {{AKCJONARIUSZ_ADRES}}<br>
            (dalej: "Akcjonariusz")</p>
        </div>

        <div class="section">
            <p><strong>§ 1. Przedmiot umowy</strong></p>
            <p>1. Akcjonariusz zobowiązuje się wobec Spółki, że przez okres <strong>{{OKRES_LOCKUP}} miesięcy</strong>
            od dnia {{DATA_ROZPOCZECIA}} nie będzie zbywał, obciążał ani w inny sposób rozporządzał posiadanymi akcjami Spółki.</p>
            <p>2. Zobowiązanie, o którym mowa w ust. 1, dotyczy <strong>{{LICZBA_AKCJI}}</strong> akcji Spółki
            (dalej: "Akcje Objęte Lock-up").</p>
        </div>

        <div class="warning">
            <p><strong>UWAGA:</strong> Niniejsza umowa ogranicza możliwość rozporządzania akcjami przez okres {{OKRES_LOCKUP}} miesięcy!</p>
        </div>

        <div class="section">
            <p><strong>§ 2. Zakres zakazu</strong></p>
            <p>Akcjonariusz zobowiązuje się, że przez okres określony w § 1 ust. 1 nie będzie:</p>
            <p>a) zbywał Akcji Objętych Lock-up,</p>
            <p>b) obciążał Akcji Objętych Lock-up zastawem, hipoteką lub innymi prawami rzeczowymi,</p>
            <p>c) ustanawiał na Akcjach Objętych Lock-up użytkowania lub służebności,</p>
            <p>d) przenosił Akcji Objętych Lock-up do aportu,</p>
            <p>e) zawierał umów dotyczących przeniesienia ekonomicznych korzyści związanych z Akcjami Objętymi Lock-up.</p>
        </div>

        {{#if WYJATKI}}
        <div class="section">
            <p><strong>§ 3. Wyjątki</strong></p>
            <p>Zakaz określony w § 2 nie ma zastosowania w następujących przypadkach:</p>
            <div style="white-space: pre-line;">{{WYJATKI}}</div>
        </div>
        {{/if}}

        <div class="section">
            <p><strong>§ 4. Kara umowna</strong></p>
            <p>1. W przypadku naruszenia zobowiązań wynikających z niniejszej umowy, Akcjonariusz zobowiązuje się
            zapłacić na rzecz Spółki karę umowną w wysokości <strong>{{KARA_UMOWNA}} PLN</strong> za każde naruszenie.</p>
            <p>2. Zapłata kary umownej nie wyłącza prawa Spółki do dochodzenia odszkodowania przewyższającego
            wysokość kary umownej.</p>
        </div>

        <div class="section">
            <p><strong>§ 5. Postanowienia końcowe</strong></p>
            <p>1. Umowa wchodzi w życie z dniem podpisania.</p>
            <p>2. Zmiany umowy wymagają formy pisemnej pod rygorem nieważności.</p>
            <p>3. W sprawach nieuregulowanych stosuje się przepisy Kodeksu cywilnego.</p>
            <p>4. Umowę sporządzono w dwóch jednobrzmiących egzemplarzach, po jednym dla każdej ze Stron.</p>
        </div>
    </div>

    <div class="signatures">
        <div class="signature">
            <div class="signature-line">{{NAZWA_SPOLKI}}<br>SPÓŁKA</div>
        </div>
        <div class="signature">
            <div class="signature-line">{{AKCJONARIUSZ}}<br>AKCJONARIUSZ</div>
        </div>
    </div>
</body>
</html>
    `
  },

  {
    id: 'contract-premises-loan',
    name: 'Umowa użyczenia lokalu',
    description: 'Umowa nieodpłatnego użyczenia lokalu z klauzulami RODO i ubezpieczeniem',
    category: TemplateCategory.CONTRACTS,
    icon: 'fa-building',
    variables: [
      { key: 'DATA_UMOWY', label: 'Data zawarcia umowy', type: TemplateFieldType.DATE, required: true },
      { key: 'UZYCZAJACY', label: 'Użyczający (imię i nazwisko/nazwa)', type: TemplateFieldType.TEXT, required: true },
      { key: 'UZYCZAJACY_ADRES', label: 'Adres użyczającego', type: TemplateFieldType.TEXT, required: true },
      { key: 'BIORĄCY', label: 'Biorący (imię i nazwisko/nazwa)', type: TemplateFieldType.TEXT, required: true },
      { key: 'BIORĄCY_ADRES', label: 'Adres biorącego', type: TemplateFieldType.TEXT, required: true },
      { key: 'ADRES_LOKALU', label: 'Adres użyczanego lokalu', type: TemplateFieldType.TEXT, required: true },
      { key: 'POWIERZCHNIA', label: 'Powierzchnia lokalu (m²)', type: TemplateFieldType.NUMBER, required: true },
      { key: 'CEL_UZYCZENIA', label: 'Cel użyczenia', type: TemplateFieldType.TEXT, required: true },
      { key: 'OKRES_OD', label: 'Okres użyczenia od', type: TemplateFieldType.DATE, required: true },
      { key: 'OKRES_DO', label: 'Okres użyczenia do', type: TemplateFieldType.DATE, required: true },
      { key: 'OPLATY_EKSPLOATACYJNE', label: 'Kto ponosi opłaty eksploatacyjne', type: TemplateFieldType.SELECT, required: true, options: ['Użyczający', 'Biorący', 'Obie strony po połowie'] }
    ],
    htmlTemplate: `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.5; margin: 20mm; }
        .title { text-align: center; font-weight: bold; margin: 25px 0; font-size: 14pt; }
        .content { text-align: justify; }
        .section { margin: 18px 0; }
        .rodo-box { background-color: #e3f2fd; padding: 12px; margin: 15px 0; border-left: 4px solid #2196f3; font-size: 10pt; }
        .insurance-box { background-color: #fff3e0; padding: 12px; margin: 15px 0; border-left: 4px solid #ff9800; font-size: 10pt; }
        .signatures { margin-top: 70px; display: flex; justify-content: space-between; }
        .signature { text-align: center; width: 45%; }
        .signature-line { border-top: 1px solid #000; margin-top: 50px; padding-top: 5px; }
        .parties { background-color: #f5f5f5; padding: 15px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="title">
        UMOWA UŻYCZENIA LOKALU<br>
        zawarta w dniu {{DATA_UMOWY}}
    </div>

    <div class="parties">
        <p><strong>UŻYCZAJĄCY:</strong><br>
        {{UZYCZAJACY}}<br>
        Adres: {{UZYCZAJACY_ADRES}}</p>

        <p><strong>BIORĄCY:</strong><br>
        {{BIORĄCY}}<br>
        Adres: {{BIORĄCY_ADRES}}</p>
    </div>

    <div class="content">
        <div class="section">
            <p><strong>§ 1. Przedmiot umowy</strong></p>
            <p>1. Użyczający oddaje nieodpłatnie Biorącemu do używania lokal o powierzchni <strong>{{POWIERZCHNIA}} m²</strong>,
            położony pod adresem: <strong>{{ADRES_LOKALU}}</strong> (dalej: "Lokal").</p>
            <p>2. Lokal będzie używany w celu: <strong>{{CEL_UZYCZENIA}}</strong>.</p>
            <p>3. Użyczenie następuje na okres od <strong>{{OKRES_OD}}</strong> do <strong>{{OKRES_DO}}</strong>.</p>
        </div>

        <div class="section">
            <p><strong>§ 2. Obowiązki Biorącego</strong></p>
            <p>1. Biorący zobowiązuje się używać Lokalu zgodnie z jego przeznaczeniem i celem określonym w § 1 ust. 2.</p>
            <p>2. Biorący zobowiązuje się utrzymywać Lokal w należytym stanie.</p>
            <p>3. Biorący nie może oddawać Lokalu osobom trzecim bez zgody Użyczającego.</p>
            <p>4. Biorący nie może dokonywać zmian w Lokalu bez pisemnej zgody Użyczającego.</p>
        </div>

        <div class="section">
            <p><strong>§ 3. Koszty i opłaty</strong></p>
            <p>1. Umowa użyczenia jest nieodpłatna.</p>
            <p>2. Opłaty eksploatacyjne (energia, woda, ogrzewanie, wywóz śmieci) ponosi: <strong>{{OPLATY_EKSPLOATACYJNE}}</strong>.</p>
        </div>

        <div class="insurance-box">
            <p><strong>§ 4. Ubezpieczenie</strong></p>
            <p>1. Biorący zobowiązuje się do zawarcia umowy ubezpieczenia odpowiedzialności cywilnej oraz ubezpieczenia
            mienia znajdującego się w Lokalu.</p>
            <p>2. Kopia polisy ubezpieczeniowej zostanie przekazana Użyczającemu w terminie 14 dni od podpisania umowy.</p>
            <p>3. W przypadku szkody Biorący ponosi pełną odpowiedzialność do wysokości sumy ubezpieczenia.</p>
        </div>

        <div class="section">
            <p><strong>§ 5. Zwrot lokalu</strong></p>
            <p>1. Po zakończeniu okresu użyczenia Biorący zobowiązuje się zwrócić Lokal w stanie niepogorszonym,
            z uwzględnieniem normalnego zużycia.</p>
            <p>2. Zwrot Lokalu nastąpi protokolarnie z udziałem obu Stron.</p>
        </div>

        <div class="section">
            <p><strong>§ 6. Rozwiązanie umowy</strong></p>
            <p>1. Każda ze Stron może wypowiedzieć umowę z zachowaniem 30-dniowego okresu wypowiedzenia.</p>
            <p>2. Użyczający może rozwiązać umowę bez wypowiedzenia w przypadku używania Lokalu niezgodnie
            z przeznaczeniem lub rażącego naruszenia postanowień umowy przez Biorącego.</p>
        </div>

        <div class="rodo-box">
            <p><strong>§ 7. Klauzula informacyjna RODO</strong></p>
            <p>1. Administratorem danych osobowych przetwarzanych w związku z niniejszą umową jest Użyczający.</p>
            <p>2. Dane osobowe będą przetwarzane wyłącznie w celu wykonania niniejszej umowy użyczenia (art. 6 ust. 1 lit. b RODO).</p>
            <p>3. Dane osobowe będą przechowywane przez okres obowiązywania umowy oraz przez okres wymagany przepisami prawa
            (przepisy podatkowe - 5 lat).</p>
            <p>4. Osobie, której dane dotyczą, przysługuje prawo dostępu do danych, ich sprostowania, usunięcia lub ograniczenia
            przetwarzania, prawo do przenoszenia danych oraz prawo wniesienia skargi do organu nadzorczego (UODO).</p>
            <p>5. Podanie danych osobowych jest dobrowolne, ale niezbędne do zawarcia i wykonania umowy.</p>
        </div>

        <div class="section">
            <p><strong>§ 8. Postanowienia końcowe</strong></p>
            <p>1. W sprawach nieuregulowanych niniejszą umową stosuje się przepisy Kodeksu cywilnego, w szczególności
            art. 710-719 k.c. dotyczące umowy użyczenia.</p>
            <p>2. Zmiany umowy wymagają formy pisemnej pod rygorem nieważności.</p>
            <p>3. Umowę sporządzono w dwóch jednobrzmiących egzemplarzach, po jednym dla każdej ze Stron.</p>
        </div>
    </div>

    <div class="signatures">
        <div class="signature">
            <div class="signature-line">{{UZYCZAJACY}}<br>UŻYCZAJĄCY</div>
        </div>
        <div class="signature">
            <div class="signature-line">{{BIORĄCY}}<br>BIORĄCY</div>
        </div>
    </div>
</body>
</html>
    `
  },

  // RAPORTY (2)
  {
    id: 'report-cap-table',
    name: 'Raport Cap Table',
    description: 'Raport struktury akcjonariatu (Capitalization Table)',
    category: TemplateCategory.REPORTS,
    icon: 'fa-chart-pie',
    variables: [
      { key: 'NAZWA_SPOLKI', label: 'Nazwa spółki', type: TemplateFieldType.TEXT, required: true },
      { key: 'KRS', label: 'Numer KRS', type: TemplateFieldType.TEXT, required: true },
      { key: 'NIP', label: 'NIP', type: TemplateFieldType.TEXT, required: true },
      { key: 'DATA_RAPORTU', label: 'Data sporządzenia raportu', type: TemplateFieldType.DATE, required: true },
      { key: 'DATA_STANU', label: 'Stan na dzień', type: TemplateFieldType.DATE, required: true },
      { key: 'KAPITAL_ZAKLADOWY', label: 'Kapitał zakładowy (PLN)', type: TemplateFieldType.NUMBER, required: true },
      { key: 'LICZBA_AKCJI_LACZNA', label: 'Łączna liczba akcji', type: TemplateFieldType.NUMBER, required: true },
      { key: 'WARTOSC_NOMINALNA', label: 'Wartość nominalna akcji (PLN)', type: TemplateFieldType.NUMBER, required: true },
      { key: 'LOGO_SPOLKI', label: 'Logo spółki', type: TemplateFieldType.IMAGE, required: false }
    ],
    htmlTemplate: `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.5; margin: 20mm; }
        .header { text-align: center; margin-bottom: 30px; }
        .header img { max-height: 60px; margin-bottom: 10px; }
        .header h1 { font-size: 16pt; margin: 5px 0; color: #1a237e; }
        .header p { font-size: 10pt; margin: 2px 0; color: #666; }
        .title { text-align: center; font-weight: bold; margin: 30px 0; font-size: 14pt; background-color: #1a237e; color: white; padding: 15px; }
        .info-box { background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-left: 4px solid #1a237e; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background-color: #1a237e; color: white; padding: 12px; text-align: left; font-size: 10pt; }
        td { border: 1px solid #ddd; padding: 10px; font-size: 10pt; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .total-row { background-color: #e8eaf6 !important; font-weight: bold; }
        .summary { margin: 30px 0; padding: 20px; background-color: #e3f2fd; }
        .chart-placeholder { height: 300px; background-color: #f5f5f5; display: flex; align-items: center; justify-content: center; margin: 20px 0; border: 2px dashed #1a237e; }
        .footer { margin-top: 50px; text-align: center; font-size: 9pt; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        {{#if LOGO_SPOLKI}}<img src="{{LOGO_SPOLKI}}" alt="Logo">{{/if}}
        <h1>{{NAZWA_SPOLKI}}</h1>
        <p>KRS: {{KRS}} | NIP: {{NIP}}</p>
    </div>

    <div class="title">
        RAPORT STRUKTURY AKCJONARIATU<br>
        (CAPITALIZATION TABLE)
    </div>

    <div class="info-box">
        <p><strong>Data sporządzenia raportu:</strong> {{DATA_RAPORTU}}</p>
        <p><strong>Stan na dzień:</strong> {{DATA_STANU}}</p>
    </div>

    <div class="summary">
        <h3 style="margin-top: 0; color: #1a237e;">Podsumowanie</h3>
        <p><strong>Kapitał zakładowy:</strong> {{KAPITAL_ZAKLADOWY}} PLN</p>
        <p><strong>Łączna liczba akcji:</strong> {{LICZBA_AKCJI_LACZNA}}</p>
        <p><strong>Wartość nominalna jednej akcji:</strong> {{WARTOSC_NOMINALNA}} PLN</p>
    </div>

    <h3 style="color: #1a237e;">Struktura akcjonariatu</h3>
    <table>
        <thead>
            <tr>
                <th>Lp.</th>
                <th>Akcjonariusz</th>
                <th>Typ</th>
                <th>Liczba akcji</th>
                <th>Wartość nominalna (PLN)</th>
                <th>Udział (%)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Jan Kowalski</td>
                <td>Osoba fizyczna</td>
                <td>500</td>
                <td>50,000.00</td>
                <td>50.00%</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Anna Nowak</td>
                <td>Osoba fizyczna</td>
                <td>300</td>
                <td>30,000.00</td>
                <td>30.00%</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Investment Fund Sp. z o.o.</td>
                <td>Osoba prawna</td>
                <td>200</td>
                <td>20,000.00</td>
                <td>20.00%</td>
            </tr>
            <tr class="total-row">
                <td colspan="3"><strong>RAZEM</strong></td>
                <td><strong>1,000</strong></td>
                <td><strong>100,000.00</strong></td>
                <td><strong>100.00%</strong></td>
            </tr>
        </tbody>
    </table>

    <div class="chart-placeholder">
        <p style="color: #666; font-style: italic;">
            [Miejsce na wykres kołowy struktury akcjonariatu]<br>
            Wykres można dodać po wygenerowaniu dokumentu
        </p>
    </div>

    <h3 style="color: #1a237e;">Informacje dodatkowe</h3>
    <div style="background-color: #fff3e0; padding: 15px; margin: 15px 0; border-left: 4px solid #ff9800;">
        <p><strong>Uwagi:</strong></p>
        <ul>
            <li>Wszystkie akcje są akcjami imiennymi</li>
            <li>Akcje uczestniczą w pełni w podziale zysku</li>
            <li>Brak akcji uprzywilejowanych</li>
            <li>Brak obciążeń na akcjach</li>
        </ul>
    </div>

    <div class="footer">
        <p>Raport wygenerowany automatycznie przez system Rejestr Akcjonariuszy PSA</p>
        <p>Data wygenerowania: {{DATA_RAPORTU}}</p>
    </div>
</body>
</html>
    `
  },

  {
    id: 'statute-psa',
    name: 'Statut Prostej Spółki Akcyjnej',
    description: 'Wzór Statutu PSA zgodny z KSH',
    category: TemplateCategory.REPORTS,
    icon: 'fa-book',
    variables: [
      { key: 'NAZWA_SPOLKI', label: 'Nazwa spółki (pełna)', type: TemplateFieldType.TEXT, required: true },
      { key: 'SIEDZIBA', label: 'Siedziba spółki (miasto)', type: TemplateFieldType.TEXT, required: true },
      { key: 'ADRES', label: 'Adres siedziby', type: TemplateFieldType.TEXT, required: true },
      { key: 'PRZEDMIOT', label: 'Przedmiot działalności', type: TemplateFieldType.TEXTAREA, required: true },
      { key: 'KAPITAL_ZAKLADOWY', label: 'Kapitał zakładowy (PLN)', type: TemplateFieldType.NUMBER, required: true },
      { key: 'LICZBA_AKCJI', label: 'Liczba akcji', type: TemplateFieldType.NUMBER, required: true },
      { key: 'WARTOSC_NOMINALNA', label: 'Wartość nominalna akcji (PLN)', type: TemplateFieldType.NUMBER, required: true },
      { key: 'CZAS_TRWANIA', label: 'Czas trwania', type: TemplateFieldType.SELECT, required: true, options: ['Nieoznaczony', 'Oznaczony'] },
      { key: 'ROK_OBROTOWY', label: 'Rok obrotowy', type: TemplateFieldType.SELECT, required: true, options: ['Kalendarzowy', 'Od 1 lipca do 30 czerwca', 'Od 1 kwietnia do 31 marca'] }
    ],
    htmlTemplate: `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.8; margin: 20mm; }
        .title { text-align: center; font-weight: bold; margin: 40px 0; font-size: 16pt; text-transform: uppercase; }
        .subtitle { text-align: center; font-size: 14pt; margin: 20px 0; }
        .section { margin: 25px 0; }
        .section-title { font-weight: bold; margin: 20px 0 10px 0; font-size: 13pt; }
        .paragraph { margin: 15px 0; text-align: justify; }
        h2 { font-size: 14pt; margin: 30px 0 15px 0; }
        .toc { background-color: #f5f5f5; padding: 20px; margin: 30px 0; }
        .page-break { page-break-before: always; }
    </style>
</head>
<body>
    <div class="title">
        STATUT<br>
        {{NAZWA_SPOLKI}}<br>
        PROSTEJ SPÓŁKI AKCYJNEJ
    </div>

    <div class="subtitle">
        z siedzibą w {{SIEDZIBA}}
    </div>

    <div class="toc">
        <h3>Spis treści</h3>
        <ol>
            <li>Postanowienia ogólne</li>
            <li>Kapitał zakładowy i akcje</li>
            <li>Organy spółki</li>
            <li>Walne Zgromadzenie Akcjonariuszy</li>
            <li>Zarząd</li>
            <li>Rachunek zysków i strat. Podział zysku</li>
            <li>Postanowienia końcowe</li>
        </ol>
    </div>

    <h2>I. POSTANOWIENIA OGÓLNE</h2>

    <div class="paragraph">
        <strong>§ 1</strong><br>
        1. Spółka działa pod firmą: <strong>{{NAZWA_SPOLKI}}</strong> Prosta Spółka Akcyjna ({{NAZWA_SPOLKI}} P.S.A.).<br>
        2. Spółka może używać wyróżniającego ją oznaczenia w postaci skrótu: {{NAZWA_SPOLKI}} PSA.
    </div>

    <div class="paragraph">
        <strong>§ 2</strong><br>
        Siedzibą Spółki jest miasto <strong>{{SIEDZIBA}}</strong>.
    </div>

    <div class="paragraph">
        <strong>§ 3</strong><br>
        1. Spółka została utworzona na czas <strong>{{CZAS_TRWANIA}}</strong>.<br>
        2. Spółka działa na podstawie przepisów Kodeksu spółek handlowych oraz niniejszego Statutu.
    </div>

    <div class="paragraph">
        <strong>§ 4</strong><br>
        1. Przedmiotem działalności Spółki jest:<br>
        <div style="margin-left: 30px; white-space: pre-line;">{{PRZEDMIOT}}</div>
        2. Spółka może prowadzić działalność we wszystkich dziedzinach niesprzecznych z prawem.
    </div>

    <div class="paragraph">
        <strong>§ 5</strong><br>
        Spółka może tworzyć oddziały, zakłady, filie, przedstawicielstwa i inne jednostki organizacyjne
        w kraju i za granicą.
    </div>

    <h2>II. KAPITAŁ ZAKŁADOWY I AKCJE</h2>

    <div class="paragraph">
        <strong>§ 6</strong><br>
        1. Kapitał zakładowy Spółki wynosi <strong>{{KAPITAL_ZAKLADOWY}} PLN</strong>
        (słownie: ___________________ złotych).<br>
        2. Kapitał zakładowy dzieli się na <strong>{{LICZBA_AKCJI}}</strong> akcji imiennych
        o wartości nominalnej <strong>{{WARTOSC_NOMINALNA}} PLN</strong> każda.
    </div>

    <div class="paragraph">
        <strong>§ 7</strong><br>
        1. Akcje mogą być akcjami zwykłymi lub uprzywilejowanymi.<br>
        2. Akcje uprzywilejowane mogą być uprzywilejowane co do:<br>
        &nbsp;&nbsp;a) prawa głosu,<br>
        &nbsp;&nbsp;b) dywidendy,<br>
        &nbsp;&nbsp;c) pierwszeństwa w podziale majątku w przypadku likwidacji Spółki.
    </div>

    <div class="paragraph">
        <strong>§ 8</strong><br>
        1. Zbycie akcji wymaga zachowania formy pisemnej pod rygorem nieważności oraz zgody Zarządu.<br>
        2. Akcjonariuszom przysługuje prawo pierwszeństwa nabycia zbywanej akcji.<br>
        3. Zarząd powinien rozpatrzyć wniosek o wyrażenie zgody na zbycie akcji w terminie 30 dni.
    </div>

    <h2>III. ORGANY SPÓŁKI</h2>

    <div class="paragraph">
        <strong>§ 9</strong><br>
        Organami Spółki są:<br>
        1) Walne Zgromadzenie Akcjonariuszy,<br>
        2) Zarząd.
    </div>

    <h2>IV. WALNE ZGROMADZENIE AKCJONARIUSZY</h2>

    <div class="paragraph">
        <strong>§ 10</strong><br>
        1. Walne Zgromadzenie Akcjonariuszy może być zwyczajne lub nadzwyczajne.<br>
        2. Zwyczajne Walne Zgromadzenie powinno odbyć się w terminie 6 miesięcy po upływie każdego roku obrotowego.<br>
        3. Nadzwyczajne Walne Zgromadzenie zwołuje Zarząd z własnej inicjatywy lub na wniosek akcjonariuszy
        reprezentujących co najmniej 1/10 kapitału zakładowego.
    </div>

    <div class="paragraph">
        <strong>§ 11</strong><br>
        Do kompetencji Walnego Zgromadzenia należy:<br>
        1) rozpatrzenie i zatwierdzenie sprawozdania Zarządu z działalności Spółki,<br>
        2) rozpatrzenie i zatwierdzenie sprawozdania finansowego,<br>
        3) powołanie i odwołanie członków Zarządu,<br>
        4) udzielenie absolutorium członkom Zarządu,<br>
        5) podjęcie uchwały o podziale zysku lub pokryciu straty,<br>
        6) zmiana Statutu,<br>
        7) podwyższenie lub obniżenie kapitału zakładowego,<br>
        8) rozwiązanie i likwidacja Spółki.
    </div>

    <div class="paragraph">
        <strong>§ 12</strong><br>
        1. Walne Zgromadzenie zwołuje się przez ogłoszenie dokonane na stronie internetowej Spółki
        co najmniej na 2 tygodnie przed terminem Walnego Zgromadzenia.<br>
        2. Ogłoszenie powinno zawierać: datę, godzinę i miejsce Walnego Zgromadzenia oraz
        szczegółowy porządek obrad.
    </div>

    <div class="paragraph">
        <strong>§ 13</strong><br>
        1. Każda akcja daje prawo do jednego głosu na Walnym Zgromadzeniu,
        z zastrzeżeniem akcji uprzywilejowanych.<br>
        2. Uchwały Walnego Zgromadzenia zapadają bezwzględną większością głosów,
        o ile Statut lub przepisy prawa nie stanowią inaczej.
    </div>

    <h2>V. ZARZĄD</h2>

    <div class="paragraph">
        <strong>§ 14</strong><br>
        1. Zarząd składa się z jednego do trzech członków, w tym Prezesa.<br>
        2. Członków Zarządu powołuje i odwołuje Walne Zgromadzenie Akcjonariuszy.<br>
        3. Kadencja członków Zarządu jest wspólna i trwa 3 lata.
    </div>

    <div class="paragraph">
        <strong>§ 15</strong><br>
        1. Do składania oświadczeń w imieniu Spółki wymagane jest:<br>
        &nbsp;&nbsp;a) w przypadku Zarządu jednoosobowego - podpis Prezesa Zarządu,<br>
        &nbsp;&nbsp;b) w przypadku Zarządu wieloosobowego - podpisy dwóch członków Zarządu
        działających łącznie lub jednego członka Zarządu łącznie z prokurentem.<br>
        2. Zarząd może ustanowić prokurę.
    </div>

    <div class="paragraph">
        <strong>§ 16</strong><br>
        Do kompetencji Zarządu należą wszelkie sprawy Spółki niezastrzeżone dla Walnego Zgromadzenia,
        a w szczególności:<br>
        1) prowadzenie spraw Spółki i reprezentowanie Spółki,<br>
        2) ustalanie organizacji wewnętrznej Spółki,<br>
        3) przygotowywanie projektów uchwał Walnego Zgromadzenia,<br>
        4) sporządzanie sprawozdań i bilansu,<br>
        5) zwoływanie Walnego Zgromadzenia.
    </div>

    <h2>VI. RACHUNEK ZYSKÓW I STRAT. PODZIAŁ ZYSKU</h2>

    <div class="paragraph">
        <strong>§ 17</strong><br>
        1. Rokiem obrotowym Spółki jest rok <strong>{{ROK_OBROTOWY}}</strong>.<br>
        2. Pierwszy rok obrotowy Spółki kończy się dnia 31 grudnia roku założenia Spółki.
    </div>

    <div class="paragraph">
        <strong>§ 18</strong><br>
        1. Z czystego zysku Spółki tworzy się kapitał zapasowy, do którego przelewa się co najmniej 8%
        zysku za dany rok obrotowy, dopóki kapitał ten nie osiągnie co najmniej 1/3 kapitału zakładowego.<br>
        2. Pozostały zysk zostaje podzielony stosownie do uchwały Walnego Zgromadzenia.
    </div>

    <div class="paragraph">
        <strong>§ 19</strong><br>
        1. Dywidendę wypłaca się w terminie określonym w uchwale Walnego Zgromadzenia o podziale zysku.<br>
        2. Uprawnionymi do dywidendy są akcjonariusze, którym przysługiwały akcje w dniu dywidendy
        określonym w uchwale o podziale zysku.
    </div>

    <h2>VII. POSTANOWIENIA KOŃCOWE</h2>

    <div class="paragraph">
        <strong>§ 20</strong><br>
        1. Spółka może być rozwiązana na podstawie uchwały Walnego Zgromadzenia.<br>
        2. Uchwała o rozwiązaniu Spółki wymaga kwalifikowanej większości 3/4 głosów.<br>
        3. Rozwiązanie Spółki powoduje jej likwidację, chyba że ustawa stanowi inaczej.
    </div>

    <div class="paragraph">
        <strong>§ 21</strong><br>
        W sprawach nieuregulowanych Statutem mają zastosowanie odpowiednie przepisy
        Kodeksu spółek handlowych.
    </div>

    <div style="margin-top: 80px; text-align: center;">
        <p>___________________________________</p>
        <p>Podpisy założycieli</p>
    </div>
</body>
</html>
    `
  }
];
