// ============================================
// EU GRANTS HUB - MOCK DATA
// ============================================

import { Category, Grant, Partner } from '../types/grantsHub';

// ============================================
// KATEGORIE
// ============================================
export const categories: Category[] = [
  {
    id: 'cat_research',
    name: 'Badania',
    icon: 'microscope',
    color: '#3477eb'
  },
  {
    id: 'cat_innovation',
    name: 'Innowacje',
    icon: 'lightbulb',
    color: '#9cf7ff'
  },
  {
    id: 'cat_infrastructure',
    name: 'Infrastruktura',
    icon: 'building',
    color: '#4caf50'
  },
  {
    id: 'cat_digitalization',
    name: 'Cyfryzacja',
    icon: 'microchip',
    color: '#ff9800'
  },
  {
    id: 'cat_education',
    name: 'Edukacja',
    icon: 'graduation-cap',
    color: '#9c27b0'
  }
];

// ============================================
// 20 GRANTÓW
// ============================================
export const grants: Grant[] = [
  {
    id: 'EU/HE/HEALTH/2025/01',
    name: 'Horyzont Europa - Klaster Zdrowie',
    status: 'Aktywny',
    category: categories[0],
    amount_min: 500000,
    amount_max: 15000000,
    currency: 'EUR',
    deadline: '2025-03-15',
    progress: 65,
    success_rate: 73,
    description: 'Program wspierający badania i innowacje w sektorze zdrowia, ze szczególnym uwzględnieniem technologii medycznych i wyrobów diagnostycznych.',
    requirements: [
      'Przedsiębiorstwa MedTech',
      'Konsorcja międzynarodowe (min. 3 kraje UE)',
      'Projektowanie wyrobów medycznych',
      'Zgodność z MDR/IVDR'
    ],
    apply_link: 'https://ec.europa.eu/info/funding-tenders/opportunities',
    program_type: 'Horyzont Europa',
    target_beneficiary: ['Przedsiębiorstwa', 'Instytuty badawcze', 'Uczelnie'],
    country_region: ['UE-27', 'Kraje stowarzyszone'],
    created_at: '2024-11-01T10:00:00Z',
    updated_at: '2025-01-15T14:30:00Z'
  },
  {
    id: 'EU/LIFE/HEALTH/2025/02',
    name: 'LIFE+ Zdrowie',
    status: 'Wkrótce',
    category: categories[1],
    amount_min: 200000,
    amount_max: 5000000,
    currency: 'EUR',
    deadline: '2025-04-30',
    progress: 30,
    success_rate: 68,
    description: 'Wsparcie dla innowacyjnych projektów w dziedzinie zdrowia publicznego i rozwiązań medycznych przyjaznych środowisku.',
    requirements: [
      'Innowacyjne rozwiązania MedTech',
      'Zrównoważony rozwój',
      'Projekty pilotażowe',
      'KPI środowiskowe'
    ],
    apply_link: 'https://cinea.ec.europa.eu/life_en',
    program_type: 'LIFE+',
    target_beneficiary: ['Przedsiębiorstwa', 'NGO', 'Samorządy'],
    country_region: ['UE-27'],
    created_at: '2024-12-01T09:00:00Z',
    updated_at: '2025-01-10T11:20:00Z'
  },
  {
    id: 'EU/EIT/HEALTH/2025/03',
    name: 'EIT Health',
    status: 'Aktywny',
    category: categories[2],
    amount_min: 100000,
    amount_max: 2000000,
    currency: 'EUR',
    deadline: '2025-02-28',
    progress: 80,
    success_rate: 81,
    description: 'Europejski Instytut Innowacji i Technologii - wsparcie infrastruktury badawczej i rozwojowej w sektorze zdrowia.',
    requirements: [
      'Infrastruktura badawcza',
      'Laboratoria certyfikowane',
      'Sprzęt medyczny',
      'Partnerstwo biznes-nauka'
    ],
    apply_link: 'https://eithealth.eu',
    program_type: 'EIT Health',
    target_beneficiary: ['Uczelnie', 'Instytuty', 'Centra badawcze'],
    country_region: ['UE-27', 'UK', 'Norwegia', 'Szwajcaria'],
    created_at: '2024-10-15T08:00:00Z',
    updated_at: '2025-01-20T16:45:00Z'
  },
  {
    id: 'EU/DG/SANTE/2025/04',
    name: 'DG SANTE - Zdrowie dla wszystkich',
    status: 'Aktywny',
    category: categories[0],
    amount_min: 300000,
    amount_max: 8000000,
    currency: 'EUR',
    deadline: '2025-05-20',
    progress: 45,
    success_rate: 71,
    description: 'Program Dyrekcji Generalnej ds. Zdrowia i Bezpieczeństwa Żywności wspierający dostępność opieki zdrowotnej.',
    requirements: [
      'Telemedycyna',
      'Diagnostyka zdalna',
      'E-zdrowie',
      'Dostępność dla seniorów'
    ],
    apply_link: 'https://health.ec.europa.eu/funding',
    program_type: 'DG SANTE',
    target_beneficiary: ['Przedsiębiorstwa', 'Szpitale', 'Uczelnie'],
    country_region: ['UE-27'],
    created_at: '2024-11-20T10:30:00Z',
    updated_at: '2025-01-18T09:15:00Z'
  },
  {
    id: 'EU/DIGITAL/HEALTH/2025/05',
    name: 'Europa Cyfrowa - Digital Health',
    status: 'Aktywny',
    category: categories[3],
    amount_min: 150000,
    amount_max: 4000000,
    currency: 'EUR',
    deadline: '2025-03-31',
    progress: 55,
    success_rate: 76,
    description: 'Wsparcie cyfryzacji sektora zdrowia, AI w diagnostyce, big data medyczny.',
    requirements: [
      'AI/Machine Learning',
      'Big Data medyczny',
      'Cyberbezpieczeństwo',
      'RODO/GDPR compliance'
    ],
    apply_link: 'https://digital-strategy.ec.europa.eu/en/activities/digital-programme',
    program_type: 'Europa Cyfrowa',
    target_beneficiary: ['Start-upy', 'Przedsiębiorstwa', 'Instytuty IT'],
    country_region: ['UE-27'],
    created_at: '2024-11-10T12:00:00Z',
    updated_at: '2025-01-12T14:00:00Z'
  },
  {
    id: 'EU/COSME/MEDTECH/2025/06',
    name: 'COSME - Konkurencyjność MedTech',
    status: 'Wkrótce',
    category: categories[1],
    amount_min: 75000,
    amount_max: 1500000,
    currency: 'EUR',
    deadline: '2025-06-15',
    progress: 20,
    success_rate: 64,
    description: 'Program wspierający konkurencyjność małych i średnich przedsiębiorstw w branży MedTech.',
    requirements: [
      'MŚP (max 250 pracowników)',
      'Innowacyjny produkt',
      'Certyfikacja CE',
      'Strategia komercjalizacji'
    ],
    apply_link: 'https://single-market-economy.ec.europa.eu/smes/cosme_en',
    program_type: 'COSME',
    target_beneficiary: ['MŚP', 'Start-upy'],
    country_region: ['UE-27', 'Kraje COSME'],
    created_at: '2024-12-05T11:00:00Z',
    updated_at: '2025-01-08T10:30:00Z'
  },
  {
    id: 'EU/ERDF/REGIONAL/2025/07',
    name: 'EFRR - Rozwój Regionalny MedTech',
    status: 'Aktywny',
    category: categories[2],
    amount_min: 250000,
    amount_max: 6000000,
    currency: 'EUR',
    deadline: '2025-04-10',
    progress: 60,
    success_rate: 69,
    description: 'Europejski Fundusz Rozwoju Regionalnego - inwestycje w infrastrukturę MedTech.',
    requirements: [
      'Lokalizacja w regionie objętym wsparciem',
      'Infrastruktura produkcyjna',
      'Tworzenie miejsc pracy',
      'Współpraca z samorządem'
    ],
    apply_link: 'https://ec.europa.eu/regional_policy/funding/erdf_en',
    program_type: 'EFRR',
    target_beneficiary: ['Przedsiębiorstwa', 'Klastry', 'Parki technologiczne'],
    country_region: ['Regiony NUTS2'],
    created_at: '2024-10-25T09:30:00Z',
    updated_at: '2025-01-14T15:20:00Z'
  },
  {
    id: 'EU/MSCA/DOCTORAL/2025/08',
    name: 'Marie Skłodowska-Curie - Doktoraty Przemysłowe',
    status: 'Aktywny',
    category: categories[4],
    amount_min: 50000,
    amount_max: 800000,
    currency: 'EUR',
    deadline: '2025-03-05',
    progress: 70,
    success_rate: 79,
    description: 'Wsparcie dla programów doktorskich w partnerstwie biznes-nauka w dziedzinie MedTech.',
    requirements: [
      'Program doktorancki',
      'Partnerstwo uczelnia-firma',
      'Badania aplikacyjne',
      'Mobilność międzynarodowa'
    ],
    apply_link: 'https://marie-sklodowska-curie-actions.ec.europa.eu',
    program_type: 'MSCA',
    target_beneficiary: ['Uczelnie', 'Przedsiębiorstwa', 'Doktoranci'],
    country_region: ['UE-27', 'Kraje stowarzyszone'],
    created_at: '2024-11-15T10:00:00Z',
    updated_at: '2025-01-16T11:00:00Z'
  },
  {
    id: 'EU/INVEST/EU/2025/09',
    name: 'InvestEU - Inwestycje w MedTech',
    status: 'Aktywny',
    category: categories[1],
    amount_min: 1000000,
    amount_max: 25000000,
    currency: 'EUR',
    deadline: '2025-07-30',
    progress: 35,
    success_rate: 72,
    description: 'Gwarancje i finansowanie dla dużych projektów inwestycyjnych w sektorze MedTech.',
    requirements: [
      'Projekt inwestycyjny >1M EUR',
      'Model biznesowy',
      'Due diligence',
      'Współfinansowanie prywatne'
    ],
    apply_link: 'https://investeu.europa.eu',
    program_type: 'InvestEU',
    target_beneficiary: ['Przedsiębiorstwa', 'Fundusze VC', 'Banki'],
    country_region: ['UE-27'],
    created_at: '2024-12-10T08:00:00Z',
    updated_at: '2025-01-05T13:45:00Z'
  },
  {
    id: 'EU/ESF/SKILLS/2025/10',
    name: 'EFS+ Kompetencje Cyfrowe w Zdrowiu',
    status: 'Wkrótce',
    category: categories[4],
    amount_min: 100000,
    amount_max: 2500000,
    currency: 'EUR',
    deadline: '2025-05-25',
    progress: 25,
    success_rate: 66,
    description: 'Europejski Fundusz Społeczny Plus - rozwój kompetencji cyfrowych w sektorze zdrowia.',
    requirements: [
      'Programy szkoleniowe',
      'Certyfikacje branżowe',
      'E-learning',
      'Min. 50 uczestników'
    ],
    apply_link: 'https://ec.europa.eu/european-social-fund-plus',
    program_type: 'EFS+',
    target_beneficiary: ['Uczelnie', 'Centra szkoleniowe', 'Przedsiębiorstwa'],
    country_region: ['UE-27'],
    created_at: '2024-11-28T09:00:00Z',
    updated_at: '2025-01-11T10:15:00Z'
  },
  {
    id: 'EU/CEF/EHEALTH/2025/11',
    name: 'CEF - e-Zdrowie i Interoperacyjność',
    status: 'Aktywny',
    category: categories[3],
    amount_min: 200000,
    amount_max: 5000000,
    currency: 'EUR',
    deadline: '2025-04-15',
    progress: 50,
    success_rate: 74,
    description: 'Connecting Europe Facility - infrastruktura cyfrowa dla systemów e-zdrowia.',
    requirements: [
      'Interoperacyjność systemów',
      'HL7 FHIR',
      'Wymiana danych medycznych',
      'Cross-border services'
    ],
    apply_link: 'https://cinea.ec.europa.eu/connecting-europe-facility_en',
    program_type: 'CEF',
    target_beneficiary: ['Przedsiębiorstwa IT', 'Szpitale', 'Instytucje publiczne'],
    country_region: ['UE-27'],
    created_at: '2024-10-20T11:30:00Z',
    updated_at: '2025-01-17T14:20:00Z'
  },
  {
    id: 'EU/EUROSTARS/2025/12',
    name: 'Eurostars - Innowacyjne MedTech SME',
    status: 'Aktywny',
    category: categories[1],
    amount_min: 300000,
    amount_max: 3000000,
    currency: 'EUR',
    deadline: '2025-02-20',
    progress: 75,
    success_rate: 77,
    description: 'Program Eureka dla innowacyjnych MŚP prowadzących prace B+R w MedTech.',
    requirements: [
      'MŚP z działem B+R',
      'Konsorcjum międzynarodowe',
      'TRL 3-7',
      'Innowacja produktowa'
    ],
    apply_link: 'https://www.eurostars-eureka.eu',
    program_type: 'Eurostars',
    target_beneficiary: ['MŚP', 'Start-upy'],
    country_region: ['Eureka countries'],
    created_at: '2024-11-05T10:00:00Z',
    updated_at: '2025-01-19T12:30:00Z'
  },
  {
    id: 'EU/CHAFEA/HEALTH/2025/13',
    name: 'EU4Health - Transformacja Cyfrowa',
    status: 'Aktywny',
    category: categories[3],
    amount_min: 400000,
    amount_max: 10000000,
    currency: 'EUR',
    deadline: '2025-06-30',
    progress: 40,
    success_rate: 70,
    description: 'Program EU4Health wspierający transformację cyfrową systemów opieki zdrowotnej.',
    requirements: [
      'Rozwiązania e-health',
      'Tele-konsultacje',
      'Elektroniczna Dokumentacja Medyczna',
      'Skalowlność EU-wide'
    ],
    apply_link: 'https://health.ec.europa.eu/funding/eu4health_en',
    program_type: 'EU4Health',
    target_beneficiary: ['Przedsiębiorstwa', 'NFZ', 'Szpitale'],
    country_region: ['UE-27'],
    created_at: '2024-12-01T09:30:00Z',
    updated_at: '2025-01-13T11:45:00Z'
  },
  {
    id: 'EU/INTERREG/BALTICA/2025/14',
    name: 'Interreg Baltic - Cross-border MedTech',
    status: 'Zamknięty',
    category: categories[0],
    amount_min: 150000,
    amount_max: 3500000,
    currency: 'EUR',
    deadline: '2025-01-31',
    progress: 95,
    success_rate: 65,
    description: 'Współpraca transgraniczna w regionie Morza Bałtyckiego w zakresie technologii medycznych.',
    requirements: [
      'Partnerstwo międzynarodowe (kraje bałtyckie)',
      'Wymiana wiedzy',
      'Projekty pilotażowe',
      'Lokalizacja w regionie Bałtyku'
    ],
    apply_link: 'https://interreg-baltic.eu',
    program_type: 'Interreg',
    target_beneficiary: ['Przedsiębiorstwa', 'Uczelnie', 'Instytuty'],
    country_region: ['PL', 'DE', 'SE', 'DK', 'FI', 'EE', 'LV', 'LT'],
    created_at: '2024-09-15T08:00:00Z',
    updated_at: '2025-01-25T16:00:00Z'
  },
  {
    id: 'EU/JUST/RARE/2025/15',
    name: 'RDI - Choroby Rzadkie',
    status: 'Aktywny',
    category: categories[0],
    amount_min: 500000,
    amount_max: 12000000,
    currency: 'EUR',
    deadline: '2025-08-15',
    progress: 30,
    success_rate: 82,
    description: 'Badania i innowacje w diagnostyce i leczeniu chorób rzadkich.',
    requirements: [
      'Diagnostyka chorób rzadkich',
      'Leki sierocze',
      'Testy genetyczne',
      'Współpraca z organizacjami pacjentów'
    ],
    apply_link: 'https://research-and-innovation.ec.europa.eu/funding/funding-opportunities',
    program_type: 'Horyzont Europa',
    target_beneficiary: ['Instytuty badawcze', 'Przedsiębiorstwa biotech', 'Szpitale'],
    country_region: ['UE-27', 'Kraje stowarzyszone'],
    created_at: '2024-12-15T10:00:00Z',
    updated_at: '2025-01-20T09:00:00Z'
  },
  {
    id: 'EU/RURAL/HEALTH/2025/16',
    name: 'EFRROW - Zdrowie na obszarach wiejskich',
    status: 'Wkrótce',
    category: categories[2],
    amount_min: 100000,
    amount_max: 2000000,
    currency: 'EUR',
    deadline: '2025-07-10',
    progress: 15,
    success_rate: 61,
    description: 'Europejski Fundusz Rolny na rzecz Rozwoju Obszarów Wiejskich - opieka zdrowotna na wsi.',
    requirements: [
      'Lokalizacja na obszarach wiejskich',
      'Mobilne punkty medyczne',
      'Telemedycyna dla seniorów',
      'Współpraca z gminami'
    ],
    apply_link: 'https://agriculture.ec.europa.eu/common-agricultural-policy/rural-development_en',
    program_type: 'EFRROW',
    target_beneficiary: ['Samorządy', 'NGO', 'Przedsiębiorstwa społeczne'],
    country_region: ['Obszary wiejskie UE'],
    created_at: '2024-12-20T11:00:00Z',
    updated_at: '2025-01-10T13:30:00Z'
  },
  {
    id: 'EU/CLIMATE/HEALTH/2025/17',
    name: 'LIFE Climate - Zdrowie i Klimat',
    status: 'Aktywny',
    category: categories[1],
    amount_min: 200000,
    amount_max: 4500000,
    currency: 'EUR',
    deadline: '2025-05-05',
    progress: 55,
    success_rate: 67,
    description: 'Wpływ zmian klimatu na zdrowie - monitoring, diagnostyka, adaptacja.',
    requirements: [
      'Monitoring środowiskowy',
      'Wpływ zanieczyszczeń na zdrowie',
      'Systemy wczesnego ostrzegania',
      'KPI klimatyczne'
    ],
    apply_link: 'https://cinea.ec.europa.eu/programmes/life_en',
    program_type: 'LIFE',
    target_beneficiary: ['Instytuty', 'NGO', 'Przedsiębiorstwa'],
    country_region: ['UE-27'],
    created_at: '2024-11-25T09:00:00Z',
    updated_at: '2025-01-15T10:00:00Z'
  },
  {
    id: 'EU/CYBER/MEDTECH/2025/18',
    name: 'Digital Europe - Cyberbezpieczeństwo MedTech',
    status: 'Aktywny',
    category: categories[3],
    amount_min: 300000,
    amount_max: 7000000,
    currency: 'EUR',
    deadline: '2025-04-20',
    progress: 48,
    success_rate: 75,
    description: 'Cyberbezpieczeństwo urządzeń medycznych i systemów e-zdrowia.',
    requirements: [
      'Certyfikacja cyberbezpieczeństwa',
      'Testy penetracyjne',
      'NIS2 Directive compliance',
      'Incident response'
    ],
    apply_link: 'https://digital-strategy.ec.europa.eu/en/activities/cybersecurity',
    program_type: 'Europa Cyfrowa',
    target_beneficiary: ['Przedsiębiorstwa MedTech', 'Firmy IT security', 'Szpitale'],
    country_region: ['UE-27'],
    created_at: '2024-11-30T10:30:00Z',
    updated_at: '2025-01-18T14:15:00Z'
  },
  {
    id: 'EU/STARTUP/HEALTHTECH/2025/19',
    name: 'EIC Accelerator - HealthTech Scale-up',
    status: 'Aktywny',
    category: categories[1],
    amount_min: 500000,
    amount_max: 17500000,
    currency: 'EUR',
    deadline: '2025-03-25',
    progress: 42,
    success_rate: 78,
    description: 'European Innovation Council - wsparcie dla przełomowych innowacji HealthTech.',
    requirements: [
      'Deep-tech innovation',
      'TRL 6-8',
      'Potencjał unicorn',
      'Equity investment możliwy'
    ],
    apply_link: 'https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en',
    program_type: 'EIC',
    target_beneficiary: ['Start-upy', 'Scale-upy', 'MŚP innowacyjne'],
    country_region: ['UE-27', 'Kraje stowarzyszone'],
    created_at: '2024-12-05T09:00:00Z',
    updated_at: '2025-01-22T11:30:00Z'
  },
  {
    id: 'EU/REHAB/ASSISTIVE/2025/20',
    name: 'AAL - Assisted Living MedTech',
    status: 'Zawieszony',
    category: categories[1],
    amount_min: 150000,
    amount_max: 2500000,
    currency: 'EUR',
    deadline: '2025-09-30',
    progress: 10,
    success_rate: 63,
    description: 'Active and Assisted Living - technologie wspomagające dla seniorów i osób z niepełnosprawnościami.',
    requirements: [
      'User-centered design',
      'Testy z użytkownikami końcowymi',
      'Dostępność (WCAG)',
      'Partnerstwo z organizacjami seniorów'
    ],
    apply_link: 'https://www.aal-europe.eu',
    program_type: 'AAL',
    target_beneficiary: ['MŚP', 'Organizacje społeczne', 'Uczelnie'],
    country_region: ['AAL member states'],
    created_at: '2024-10-01T08:00:00Z',
    updated_at: '2025-01-05T15:00:00Z'
  }
];

// ============================================
// 15 PARTNERÓW
// ============================================
export const partners: Partner[] = [
  {
    id: 'partner_001',
    name: 'MedTech Innovation Hub',
    country: 'PL',
    type: 'Przedsiębiorstwo',
    specializations: [
      'Urządzenia diagnostyczne',
      'AI w medycynie',
      'Telemedycyna',
      'Systemy monitoringu pacjenta'
    ],
    contact_info: {
      email: 'kontakt@medtechhub.pl',
      phone: '+48 22 123 4567',
      website: 'https://medtechhub.pl'
    },
    profile_link: '/partners/medtech-innovation-hub',
    success_projects: 12,
    rating: 4.8,
    verified: true,
    created_at: '2023-03-15T10:00:00Z'
  },
  {
    id: 'partner_002',
    name: 'University of Warsaw - Medical Faculty',
    country: 'PL',
    type: 'Uczelnia',
    specializations: [
      'Badania kliniczne',
      'Biotechnologia',
      'Farmakologia',
      'Medycyna regeneracyjna'
    ],
    contact_info: {
      email: 'research@med.uw.edu.pl',
      phone: '+48 22 999 8877',
      website: 'https://med.uw.edu.pl'
    },
    profile_link: '/partners/uw-medical',
    success_projects: 23,
    rating: 4.9,
    verified: true,
    created_at: '2022-06-10T09:00:00Z'
  },
  {
    id: 'partner_003',
    name: 'Charité - Universitätsmedizin Berlin',
    country: 'DE',
    type: 'Uczelnia',
    specializations: [
      'Kardiologia cyfrowa',
      'Neurologia',
      'Onkologia precyzyjna',
      'Diagnostyka obrazowa'
    ],
    contact_info: {
      email: 'innovation@charite.de',
      phone: '+49 30 450 0',
      website: 'https://www.charite.de'
    },
    profile_link: '/partners/charite',
    success_projects: 34,
    rating: 5.0,
    verified: true,
    created_at: '2021-09-20T11:30:00Z'
  },
  {
    id: 'partner_004',
    name: 'Fraunhofer Institute for Biomedical Engineering',
    country: 'DE',
    type: 'Instytut',
    specializations: [
      'Inżynieria biomedyczna',
      'Materiały biokompatybilne',
      'Protezy i implanty',
      'Technologie regeneracyjne'
    ],
    contact_info: {
      email: 'info@ibmt.fraunhofer.de',
      phone: '+49 6897 9071 0',
      website: 'https://www.ibmt.fraunhofer.de'
    },
    profile_link: '/partners/fraunhofer-ibmt',
    success_projects: 28,
    rating: 4.9,
    verified: true,
    created_at: '2022-01-15T08:00:00Z'
  },
  {
    id: 'partner_005',
    name: 'Karolinska Institutet',
    country: 'SE',
    type: 'Uczelnia',
    specializations: [
      'Medycyna molekularna',
      'Immunoterapia',
      'Genomika kliniczna',
      'Bioinformatyka medyczna'
    ],
    contact_info: {
      email: 'collaboration@ki.se',
      phone: '+46 8 524 800 00',
      website: 'https://ki.se'
    },
    profile_link: '/partners/karolinska',
    success_projects: 41,
    rating: 5.0,
    verified: true,
    created_at: '2021-11-05T10:00:00Z'
  },
  {
    id: 'partner_006',
    name: 'BioTech Ventures Poland',
    country: 'PL',
    type: 'Przedsiębiorstwo',
    specializations: [
      'Terapie komórkowe',
      'ATMP',
      'Diagnostyka molekularna',
      'Biomarkery'
    ],
    contact_info: {
      email: 'projects@biotechventures.pl',
      phone: '+48 12 345 6789',
      website: 'https://biotechventures.pl'
    },
    profile_link: '/partners/biotech-ventures',
    success_projects: 8,
    rating: 4.6,
    verified: true,
    created_at: '2023-05-20T09:30:00Z'
  },
  {
    id: 'partner_007',
    name: 'Netherlands Organisation for Applied Scientific Research (TNO)',
    country: 'NL',
    type: 'Instytut',
    specializations: [
      'Personalized Medicine',
      'Digital Health Solutions',
      'Medical Devices Validation',
      'Regulatory Affairs'
    ],
    contact_info: {
      email: 'healthtech@tno.nl',
      phone: '+31 88 866 60 00',
      website: 'https://www.tno.nl'
    },
    profile_link: '/partners/tno',
    success_projects: 52,
    rating: 4.9,
    verified: true,
    created_at: '2021-07-12T11:00:00Z'
  },
  {
    id: 'partner_008',
    name: 'HealthTech Nordic Cluster',
    country: 'DK',
    type: 'NGO',
    specializations: [
      'Klaster innowacji medycznych',
      'Komercjalizacja',
      'Networking międzynarodowy',
      'Regulatory consulting'
    ],
    contact_info: {
      email: 'cluster@healthtech-nordic.dk',
      phone: '+45 33 77 33 77',
      website: 'https://healthtech-nordic.dk'
    },
    profile_link: '/partners/healthtech-nordic',
    success_projects: 19,
    rating: 4.7,
    verified: true,
    created_at: '2022-03-08T10:30:00Z'
  },
  {
    id: 'partner_009',
    name: 'INSERM - Institut National de la Santé',
    country: 'FR',
    type: 'Instytut',
    specializations: [
      'Immunologia',
      'Choroby neurodegeneracyjne',
      'Epidemiologia',
      'Zdrowie publiczne'
    ],
    contact_info: {
      email: 'partnerships@inserm.fr',
      phone: '+33 1 44 23 60 00',
      website: 'https://www.inserm.fr'
    },
    profile_link: '/partners/inserm',
    success_projects: 67,
    rating: 5.0,
    verified: true,
    created_at: '2021-04-22T09:00:00Z'
  },
  {
    id: 'partner_010',
    name: 'MedTech Solutions Ireland',
    country: 'IE',
    type: 'Przedsiębiorstwo',
    specializations: [
      'Surgical instruments',
      'Minimally invasive surgery',
      'Robotic surgery systems',
      'OR integration'
    ],
    contact_info: {
      email: 'info@medtechsolutions.ie',
      phone: '+353 1 234 5678',
      website: 'https://medtechsolutions.ie'
    },
    profile_link: '/partners/medtech-ireland',
    success_projects: 15,
    rating: 4.8,
    verified: true,
    created_at: '2022-08-17T11:00:00Z'
  },
  {
    id: 'partner_011',
    name: 'Barcelona Biomedical Research Park (PRBB)',
    country: 'ES',
    type: 'Instytut',
    specializations: [
      'Badania translacyjne',
      'Onkologia eksperymentalna',
      'Choroby rzadkie',
      'Terapie genowe'
    ],
    contact_info: {
      email: 'collaboration@prbb.org',
      phone: '+34 93 316 0100',
      website: 'https://www.prbb.org'
    },
    profile_link: '/partners/prbb',
    success_projects: 31,
    rating: 4.9,
    verified: true,
    created_at: '2022-02-14T10:00:00Z'
  },
  {
    id: 'partner_012',
    name: 'HealthStart Incubator',
    country: 'PL',
    type: 'NGO',
    specializations: [
      'Inkubacja start-upów MedTech',
      'Mentoring',
      'Pitch training',
      'Investor relations'
    ],
    contact_info: {
      email: 'hello@healthstart.pl',
      phone: '+48 61 888 7766',
      website: 'https://healthstart.pl'
    },
    profile_link: '/partners/healthstart',
    success_projects: 22,
    rating: 4.7,
    verified: true,
    created_at: '2023-01-10T09:00:00Z'
  },
  {
    id: 'partner_013',
    name: 'Istituto Superiore di Sanità',
    country: 'IT',
    type: 'Instytut',
    specializations: [
      'Standardy jakości',
      'Walidacja metod diagnostycznych',
      'Nadzór epidemiologiczny',
      'Bezpieczeństwo produktów medycznych'
    ],
    contact_info: {
      email: 'progetti@iss.it',
      phone: '+39 06 4990 1',
      website: 'https://www.iss.it'
    },
    profile_link: '/partners/iss-italy',
    success_projects: 38,
    rating: 4.8,
    verified: true,
    created_at: '2021-10-30T08:30:00Z'
  },
  {
    id: 'partner_014',
    name: 'Medical University of Vienna',
    country: 'AT',
    type: 'Uczelnia',
    specializations: [
      'Radiologia interwencyjna',
      'Transplantologia',
      'Medycyna nuklearna',
      'Anestezjologia i intensywna terapia'
    ],
    contact_info: {
      email: 'research@meduniwien.ac.at',
      phone: '+43 1 40160 0',
      website: 'https://www.meduniwien.ac.at'
    },
    profile_link: '/partners/meduni-vienna',
    success_projects: 29,
    rating: 4.9,
    verified: true,
    created_at: '2022-04-18T10:30:00Z'
  },
  {
    id: 'partner_015',
    name: 'Cambridge Clinical Trials Unit',
    country: 'UK',
    type: 'Uczelnia',
    specializations: [
      'Badania kliniczne faza I-IV',
      'GCP compliance',
      'Biostatystyka',
      'Farmako-ekonomika'
    ],
    contact_info: {
      email: 'trials@cam.ac.uk',
      phone: '+44 1223 336 000',
      website: 'https://www.ctu.mrc.ac.uk'
    },
    profile_link: '/partners/cambridge-ctu',
    success_projects: 44,
    rating: 5.0,
    verified: true,
    created_at: '2021-12-05T09:00:00Z'
  }
];
