/**
 * Mock data for EU Grants Hub
 * Contains test data for grants, partners, applications, and notifications
 */

export const mockUsers = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Jan Kowalski',
    email: 'jan.kowalski@medtech.pl',
    organization: 'MedTech Innovations Sp. z o.o.',
    roles: ['Admin', 'Manager'],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Anna Nowak',
    email: 'anna.nowak@research.pl',
    organization: 'Instytut Badań Medycznych',
    roles: ['Manager'],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Piotr Wiśniewski',
    email: 'piotr.wisniewski@university.pl',
    organization: 'Uniwersytet Warszawski',
    roles: ['Viewer'],
  },
];

export const mockGrants = [
  // Horyzont Europa - Cluster Health (20 grants)
  {
    name: 'Horyzont Europa: AI w diagnostyce obrazowej',
    program: 'Horyzont Europa - Klaster Zdrowie',
    category: 'Badania',
    status: 'Aktywny',
    amount_min: 2000000,
    amount_max: 5000000,
    currency: 'EUR',
    deadline: '2025-09-15',
    success_rate: 72,
    description: 'Rozwój systemów sztucznej inteligencji do automatycznej diagnostyki obrazowej w radiologii i patologii.',
    requirements: [
      'Konsorcjum min. 3 partnerów z różnych krajów UE',
      'Doświadczenie w projektach badawczych AI',
      'Publikacje naukowe w obszarze medycyny i AI',
      'Infrastruktura badawcza do testowania rozwiązań',
    ],
    apply_link: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/horizon-hlth-2024-tool-01',
  },
  {
    name: 'Horyzont Europa: Personalizowana medycyna molekularna',
    program: 'Horyzont Europa - Klaster Zdrowie',
    category: 'Badania',
    status: 'Aktywny',
    amount_min: 3000000,
    amount_max: 7000000,
    currency: 'EUR',
    deadline: '2025-08-20',
    success_rate: 65,
    description: 'Badania nad terapiami personalizowanymi opartymi na profilowaniu molekularnym pacjentów.',
    requirements: [
      'Multidyscyplinarny zespół badawczy',
      'Dostęp do biobanków i danych klinicznych',
      'Doświadczenie w genomice i proteomice',
      'Partnerzy z sektora przemysłowego',
    ],
    apply_link: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/horizon-hlth-2024-disease-01',
  },
  {
    name: 'Horyzont Europa: Urządzenia medyczne nowej generacji',
    program: 'Horyzont Europa - Klaster Zdrowie',
    category: 'Innowacje',
    status: 'Aktywny',
    amount_min: 1500000,
    amount_max: 4000000,
    currency: 'EUR',
    deadline: '2025-10-30',
    success_rate: 58,
    description: 'Rozwój innowacyjnych urządzeń medycznych wykorzystujących technologie IoT i AI.',
    requirements: [
      'Prototyp urządzenia w fazie TRL 4-6',
      'Certyfikacja CE lub plan certyfikacji',
      'Partner przemysłowy z doświadczeniem w produkcji',
      'Plan komercjalizacji',
    ],
    apply_link: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/horizon-hlth-2024-tool-02',
  },
  {
    name: 'Horyzont Europa: Telemedycyna i zdalna opieka',
    program: 'Horyzont Europa - Klaster Zdrowie',
    category: 'Innowacje',
    status: 'Aktywny',
    amount_min: 2500000,
    amount_max: 6000000,
    currency: 'EUR',
    deadline: '2025-07-25',
    success_rate: 70,
    description: 'Rozwój platform telemedycznych do zdalnego monitorowania i opieki nad pacjentami.',
    requirements: [
      'Rozwiązanie spełniające wymogi RODO',
      'Interoperacyjność z systemami szpitalnymi',
      'Testy kliniczne lub pilotaż',
      'Model biznesowy B2B lub B2C',
    ],
    apply_link: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/horizon-hlth-2024-care-01',
  },
  {
    name: 'Horyzont Europa: Biomarkery w chorobach neurodegeneracyjnych',
    program: 'Horyzont Europa - Klaster Zdrowie',
    category: 'Badania',
    status: 'Aktywny',
    amount_min: 3500000,
    amount_max: 8000000,
    currency: 'EUR',
    deadline: '2025-11-10',
    success_rate: 62,
    description: 'Identyfikacja i walidacja biomarkerów dla wczesnej diagnostyki chorób neurodegeneracyjnych.',
    requirements: [
      'Zespół neuronauki i biologii molekularnej',
      'Dostęp do kohort pacjentów',
      'Technologie omics',
      'Współpraca z klinikami neurologicznymi',
    ],
    apply_link: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/horizon-hlth-2024-disease-02',
  },
  {
    name: 'Horyzont Europa: Terapie komórkowe CAR-T',
    program: 'Horyzont Europa - Klaster Zdrowie',
    category: 'Badania',
    status: 'Planowany',
    amount_min: 4000000,
    amount_max: 10000000,
    currency: 'EUR',
    deadline: '2026-02-15',
    success_rate: 55,
    description: 'Rozwój terapii CAR-T dla nowotworów litych i chorób autoimmunologicznych.',
    requirements: [
      'Doświadczenie w terapiach komórkowych',
      'Laboratorium GMP',
      'Badania kliniczne fazy I/II',
      'Konsorcjum akademicko-przemysłowe',
    ],
    apply_link: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/horizon-hlth-2026-treat-01',
  },

  // POIR - Program Operacyjny Inteligentny Rozwój (15 grants)
  {
    name: 'POIR: Szybka Ścieżka - innowacje MedTech',
    program: 'POIR - Program Operacyjny Inteligentny Rozwój',
    category: 'Innowacje',
    status: 'Aktywny',
    amount_min: 500000,
    amount_max: 2000000,
    currency: 'PLN',
    deadline: '2025-06-30',
    success_rate: 75,
    description: 'Wsparcie dla startupów i MŚP rozwijających innowacyjne produkty MedTech.',
    requirements: [
      'Status MŚP',
      'Innowacyjny produkt w fazie prototypu',
      'Współfinansowanie min. 15%',
      'Plan komercjalizacji',
    ],
    apply_link: 'https://www.parp.gov.pl/component/grants/grants/szybka-sciezka',
  },
  {
    name: 'POIR: Badania przemysłowe i prace rozwojowe',
    program: 'POIR - Program Operacyjny Inteligentny Rozwój',
    category: 'Badania',
    status: 'Aktywny',
    amount_min: 1000000,
    amount_max: 5000000,
    currency: 'PLN',
    deadline: '2025-08-15',
    success_rate: 68,
    description: 'Finansowanie projektów B+R w sektorze medycznym i biotechnologicznym.',
    requirements: [
      'Przedsiębiorstwo lub konsorcjum',
      'Projekt B+R o wysokim TRL',
      'Wkład własny 25-50%',
      'Potencjał komercjalizacji',
    ],
    apply_link: 'https://www.parp.gov.pl/component/grants/grants/prace-br',
  },
  {
    name: 'POIR: Ochrona własności przemysłowej',
    program: 'POIR - Program Operacyjny Inteligentny Rozwój',
    category: 'Innowacje',
    status: 'Aktywny',
    amount_min: 50000,
    amount_max: 300000,
    currency: 'PLN',
    deadline: '2025-12-31',
    success_rate: 82,
    description: 'Wsparcie dla patentowania rozwiązań medycznych na rynkach międzynarodowych.',
    requirements: [
      'Zgłoszony wynalazek',
      'Status MŚP',
      'Strategia komercjalizacji',
      'Analiza rynku docelowego',
    ],
    apply_link: 'https://www.parp.gov.pl/component/grants/grants/wlasnosc-przemyslowa',
  },

  // Narodowe Centra Badań (10 grants)
  {
    name: 'NCBiR: Strategmed - medycyna spersonalizowana',
    program: 'Narodowe Centrum Badań i Rozwoju',
    category: 'Badania',
    status: 'Aktywny',
    amount_min: 2000000,
    amount_max: 8000000,
    currency: 'PLN',
    deadline: '2025-09-30',
    success_rate: 45,
    description: 'Program badań nad medycyną spersonalizowaną i terapiami celowanymi.',
    requirements: [
      'Konsorcjum naukowe',
      'Współpraca z jednostką kliniczną',
      'Publikacje w czasopismach JCR',
      'Infrastruktura badawcza',
    ],
    apply_link: 'https://www.ncbr.gov.pl/programy/programy-strategiczne/strategmed/',
  },
  {
    name: 'NCN: Opus - badania podstawowe w biomedycynie',
    program: 'Narodowe Centrum Nauki',
    category: 'Badania',
    status: 'Aktywny',
    amount_min: 500000,
    amount_max: 2000000,
    currency: 'PLN',
    deadline: '2025-03-15',
    success_rate: 52,
    description: 'Finansowanie badań podstawowych w naukach biomedycznych.',
    requirements: [
      'Tytuł doktora',
      'Dorobek naukowy',
      'Afiliacja przy jednostce naukowej',
      'Oryginalność badań',
    ],
    apply_link: 'https://www.ncn.gov.pl/ogloszenia/konkursy/opus',
  },

  // Additional grants to reach 50 total
  ...generateAdditionalGrants(30),
];

function generateAdditionalGrants(count: number) {
  const templates = [
    {
      nameTemplate: 'Interreg: Transgraniczne projekty zdrowotne {n}',
      program: 'Interreg Europa',
      category: 'Infrastruktura',
      status: 'Aktywny',
      amount_min: 500000,
      amount_max: 2000000,
    },
    {
      nameTemplate: 'EIT Health: Innowacje zdrowotne {n}',
      program: 'EIT Health',
      category: 'Innowacje',
      status: 'Aktywny',
      amount_min: 1000000,
      amount_max: 3000000,
    },
    {
      nameTemplate: 'Life Programme: Profilaktyka zdrowotna {n}',
      program: 'EU4Health',
      category: 'Edukacja',
      status: 'Aktywny',
      amount_min: 300000,
      amount_max: 1500000,
    },
  ];

  const grants = [];
  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length];
    const deadline = new Date(2025, 3 + (i % 9), 15 + (i % 15));

    grants.push({
      name: template.nameTemplate.replace('{n}', String(i + 1)),
      program: template.program,
      category: template.category as any,
      status: i % 5 === 0 ? 'Planowany' : 'Aktywny',
      amount_min: template.amount_min,
      amount_max: template.amount_max,
      currency: 'EUR',
      deadline: deadline.toISOString().split('T')[0],
      success_rate: 50 + Math.floor(Math.random() * 30),
      description: `Projekt badawczy lub innowacyjny w obszarze ${template.category}.`,
      requirements: [
        'Doświadczenie w projektach międzynarodowych',
        'Zespół multidyscyplinarny',
        'Infrastruktura badawcza',
      ],
      apply_link: 'https://ec.europa.eu/funding-tenders',
    });
  }

  return grants;
}

export const mockPartners = [
  // Polish partners
  {
    name: 'Warszawski Uniwersytet Medyczny',
    country: 'PL',
    type: 'Uniwersytet',
    specializations: ['Kardiologia', 'Onkologia', 'Neurologia'],
    contact_info: {
      email: 'cooperation@wum.edu.pl',
      phone: '+48 22 628 05 00',
      website: 'https://www.wum.edu.pl',
    },
  },
  {
    name: 'Instytut Biologii Doświadczalnej PAN',
    country: 'PL',
    type: 'Instytut badawczy',
    specializations: ['Biologia molekularna', 'Genetyka', 'Biotechnologia'],
    contact_info: {
      email: 'contact@ibd.pan.pl',
      website: 'https://www.ibd.pan.pl',
    },
  },
  {
    name: 'MedTech Solutions Sp. z o.o.',
    country: 'PL',
    type: 'Przedsiębiorstwo',
    specializations: ['Urządzenia medyczne', 'Diagnostyka', 'AI w medycynie'],
    contact_info: {
      email: 'partnership@medtechsolutions.pl',
      phone: '+48 12 345 67 89',
      website: 'https://www.medtechsolutions.pl',
    },
  },
  // German partners
  {
    name: 'Charité - Universitätsmedizin Berlin',
    country: 'DE',
    type: 'Uniwersytet',
    specializations: ['Badania kliniczne', 'Neurologia', 'Immunologia'],
    contact_info: {
      email: 'international@charite.de',
      website: 'https://www.charite.de',
    },
  },
  {
    name: 'Fraunhofer Institute for Biomedical Engineering',
    country: 'DE',
    type: 'Instytut badawczy',
    specializations: ['Inżynieria biomedyczna', 'Nanotechnologia', 'Materiały biokompatybilne'],
    contact_info: {
      email: 'info@ibmt.fraunhofer.de',
      website: 'https://www.ibmt.fraunhofer.de',
    },
  },
  // French partners
  {
    name: 'Institut Pasteur',
    country: 'FR',
    type: 'Instytut badawczy',
    specializations: ['Mikrobiologia', 'Wirusologia', 'Immunologia'],
    contact_info: {
      email: 'partnership@pasteur.fr',
      website: 'https://www.pasteur.fr',
    },
  },
  // Spanish partners
  {
    name: 'Hospital Clínic de Barcelona',
    country: 'ES',
    type: 'Uniwersytet',
    specializations: ['Badania kliniczne', 'Transplantologia', 'Kardiochirurgia'],
    contact_info: {
      email: 'research@clinic.cat',
      website: 'https://www.clinicbarcelona.org',
    },
  },
  // Italian partners
  {
    name: 'Istituto Superiore di Sanità',
    country: 'IT',
    type: 'Instytut badawczy',
    specializations: ['Zdrowie publiczne', 'Epidemiologia', 'Toksykologia'],
    contact_info: {
      email: 'collaborations@iss.it',
      website: 'https://www.iss.it',
    },
  },
  // Additional partners
  ...generateAdditionalPartners(22),
];

function generateAdditionalPartners(count: number) {
  const countries = ['PL', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'BE'];
  const types: Array<'Przedsiębiorstwo' | 'Instytut badawczy' | 'Uniwersytet' | 'Konsorcjum'> = [
    'Przedsiębiorstwo',
    'Instytut badawczy',
    'Uniwersytet',
    'Konsorcjum',
  ];
  const specializations = [
    'Diagnostyka',
    'Terapie genowe',
    'Urządzenia medyczne',
    'Farmakologia',
    'Bioinformatyka',
    'Medycyna regeneracyjna',
  ];

  const partners = [];
  for (let i = 0; i < count; i++) {
    const country = countries[i % countries.length];
    const type = types[i % types.length];

    partners.push({
      name: `${type} ${country} ${i + 1}`,
      country,
      type,
      specializations: [
        specializations[i % specializations.length],
        specializations[(i + 1) % specializations.length],
      ],
      contact_info: {
        email: `contact${i}@partner.eu`,
        website: `https://partner${i}.eu`,
      },
    });
  }

  return partners;
}

// Export function to seed database
export async function seedDatabase(pool: any) {
  console.log('🌱 Seeding database with mock data...');

  try {
    // Get category and status IDs
    const categoriesResult = await pool.query('SELECT id, name FROM categories');
    const statusesResult = await pool.query('SELECT id, name FROM statuses');

    const categories = Object.fromEntries(categoriesResult.rows.map((r: any) => [r.name, r.id]));
    const statuses = Object.fromEntries(statusesResult.rows.map((r: any) => [r.name, r.id]));

    // Insert users
    for (const user of mockUsers) {
      await pool.query(
        `INSERT INTO users (id, name, email, organization, roles)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (email) DO NOTHING`,
        [user.id, user.name, user.email, user.organization, JSON.stringify(user.roles)]
      );
    }

    // Insert grants
    for (const grant of mockGrants) {
      await pool.query(
        `INSERT INTO grants (
          name, status_id, category_id, amount_min, amount_max,
          currency, deadline, success_rate, description, requirements, apply_link
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          grant.name,
          statuses[grant.status],
          categories[grant.category],
          grant.amount_min,
          grant.amount_max,
          grant.currency,
          grant.deadline,
          grant.success_rate,
          grant.description,
          JSON.stringify(grant.requirements),
          grant.apply_link,
        ]
      );
    }

    // Insert partners
    for (const partner of mockPartners) {
      await pool.query(
        `INSERT INTO partners (name, country, type, specializations, contact_info)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          partner.name,
          partner.country,
          partner.type,
          JSON.stringify(partner.specializations),
          JSON.stringify(partner.contact_info),
        ]
      );
    }

    console.log('✓ Database seeded successfully');
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    throw error;
  }
}
