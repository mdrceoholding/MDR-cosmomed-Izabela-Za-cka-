// ============================================
// MDR EDUCATION™ - MOCK DATA
// ============================================

import {
  TeamMember,
  BlogArticle,
  Webinar,
  MentorshipProgram,
  PracticalExample,
  CommunityStats,
  LegalDocument
} from '../../types/mdrEducation';

// ============================================
// ZESPÓŁ EKSPERTÓW
// ============================================
export const teamMembers: TeamMember[] = [
  {
    id: 'dak',
    name: 'Dr Anna Kowalska',
    initials: 'DAK',
    role: 'Dyrektor ds. Medycznych',
    specialization: 'Medycyna estetyczna, Dermatologia',
    bio: '15 lat doświadczenia w medycynie estetycznej. Specjalistka w zakresie laserów medycznych i wypełniaczy. Ekspert MDR 2017/745.',
    qualifications: [
      'Certyfikat Train-the-Trainer™',
      'Audytor MDR 2017/745',
      'Autor 50+ publikacji naukowych',
      'Wykładowca Uniwersytetu Medycznego'
    ],
    experience: '15 lat',
    email: 'a.kowalska@mdr.edu.pl',
    phone: '+48 501 234 567',
    linkedin: 'https://linkedin.com/in/anna-kowalska'
  },
  {
    id: 'pmn',
    name: 'Prof. Marek Nowak',
    initials: 'PMN',
    role: 'Główny Konsultant Techniczny',
    specialization: 'HIFU, RF, Technologie medyczne',
    bio: 'Pionier technologii HIFU w Polsce. Twórca standardów szkoleniowych dla urządzeń wysokiej częstotliwości. Konsultant ds. bezpieczeństwa.',
    qualifications: [
      'Certyfikat CM-Score™',
      'Ekspert HIFU Technology',
      'Konsultant FDA/CE',
      'Instruktor międzynarodowy'
    ],
    experience: '20 lat',
    email: 'm.nowak@mdr.edu.pl',
    phone: '+48 501 234 568',
    linkedin: 'https://linkedin.com/in/marek-nowak'
  },
  {
    id: 'akz',
    name: 'Adw. Katarzyna Zielińska',
    initials: 'AKZ',
    role: 'Dyrektor Prawny',
    specialization: 'Prawo medyczne, Ubezpieczenia OC',
    bio: 'Specjalistka prawa medycznego z 12-letnim doświadczeniem. Ekspert w zakresie odpowiedzialności cywilnej w medycynie estetycznej.',
    qualifications: [
      'Radca prawny od 2012r.',
      'Specjalizacja prawo medyczne',
      'Ekspert ubezpieczeń OC',
      'Autor poradników prawnych'
    ],
    experience: '12 lat',
    email: 'k.zielinska@mdr.edu.pl',
    phone: '+48 501 234 569',
    linkedin: 'https://linkedin.com/in/katarzyna-zielinska'
  },
  {
    id: 'dpw',
    name: 'Dr Piotr Wiśniewski',
    initials: 'DPW',
    role: 'Specjalista ds. Certyfikacji',
    specialization: 'LED, PDT, Fotobiologia',
    bio: 'Ekspert w dziedzinie fototerapii i technologii LED. Odpowiedzialny za proces certyfikacji urządzeń medycznych zgodnie z MDR.',
    qualifications: [
      'Certyfikacja ISO 13485',
      'Ekspert fotobiologii',
      'Audytor techniczny MDR',
      'Konsultant CE Marking'
    ],
    experience: '10 lat',
    email: 'p.wisniewski@mdr.edu.pl',
    phone: '+48 501 234 570',
    linkedin: 'https://linkedin.com/in/piotr-wisniewski'
  },
  {
    id: 'mad',
    name: 'Mgr Agnieszka Dąbrowska',
    initials: 'MAD',
    role: 'Kierownik PR Shield™',
    specialization: 'PR, Zarządzanie kryzysowe',
    bio: 'Specjalistka public relations z doświadczeniem w branży medycznej. Odpowiedzialna za PR Shield™ - ochronę wizerunku klientów.',
    qualifications: [
      'PR Manager certyfikowany',
      'Ekspert crisis management',
      'Strategia komunikacji',
      'Social media medical'
    ],
    experience: '8 lat',
    email: 'a.dabrowska@mdr.edu.pl',
    phone: '+48 501 234 571',
    linkedin: 'https://linkedin.com/in/agnieszka-dabrowska'
  },
  {
    id: 'itk',
    name: 'Ing. Tomasz Kaczmarek',
    initials: 'ITK',
    role: 'CTO & Blockchain Expert',
    specialization: 'SaMD, Blockchain, Cybersecurity',
    bio: 'Inżynier informatyki specjalizujący się w technologiach blockchain i Software as Medical Device. Odpowiedzialny za bezpieczeństwo cyfrowe.',
    qualifications: [
      'Blockchain Developer',
      'SaMD Certification Expert',
      'Cybersecurity Specialist',
      'Smart Contracts Auditor'
    ],
    experience: '12 lat',
    email: 't.kaczmarek@mdr.edu.pl',
    phone: '+48 501 234 572',
    linkedin: 'https://linkedin.com/in/tomasz-kaczmarek'
  }
];

// ============================================
// ARTYKUŁY BLOGOWE
// ============================================
export const blogArticles: BlogArticle[] = [
  {
    id: 'blog-001',
    title: 'Kompletny przewodnik: Bezpieczeństwo laserów w medycynie estetycznej',
    category: 'Bezpieczeństwo',
    readTime: 25,
    excerpt: 'Szczegółowy przewodnik po protokołach bezpieczeństwa, klasyfikacji laserów, wymaganiach MDR 2017/745 oraz praktycznych aspektach pracy z urządzeniami laserowymi.',
    content: 'Obszerne omówienie wszystkich aspektów bezpieczeństwa laserowego: od klasyfikacji urządzeń według norm IEC 60825, przez...',
    practicalExamples: [
      'Procedury kalibracji laserów CO2',
      'Protokoły bezpieczeństwa dla pacjentów'
    ],
    author: teamMembers[0],
    date: '2024-01-15',
    slug: 'bezpieczenstwo-laserow-medycyna-estetyczna'
  },
  {
    id: 'blog-002',
    title: 'HIFU Technology: Kompleksowy program szkoleniowy Train-the-Trainer™',
    category: 'Szkolenia',
    readTime: 35,
    excerpt: 'Pełny program certyfikacji instruktorów technologii HIFU. Wymagania CM-Score™, metodyka szkolenia, praktyczne warsztaty i certyfikacja międzynarodowa.',
    content: 'Kompletny kurs obejmujący fizykę ultradźwięków, parametry zabiegowe, przeciwskazania, powikłania oraz metodykę nauczania...',
    practicalExamples: [
      'Protokoły zabiegowe HIFU',
      'Symulatory do nauki'
    ],
    author: teamMembers[1],
    date: '2024-01-12',
    slug: 'hifu-technology-train-the-trainer'
  },
  {
    id: 'blog-003',
    title: 'Mikronakłuwanie RF - kompleksowa analiza prawno-ubezpieczeniowa',
    category: 'Prawo',
    readTime: 18,
    excerpt: 'Szczegółowa analiza wymogów MDR 2017/745 dla urządzeń mikronakłuwania RF, certyfikacja CE, dokumentacja techniczna oraz pełny zakres ochrony OC Syndicate™.',
    content: 'Analiza klasyfikacji urządzeń według Załącznika VIII MDR, procedury oceny zgodności, wymagania dotyczące dokumentacji te...',
    practicalExamples: [
      'Interpretacja Rozporządzenia MDR 2017/745',
      'Dokumentacja zgodności CE'
    ],
    author: teamMembers[2],
    date: '2024-01-10',
    slug: 'mikronakłuwanie-rf-analiza-prawna'
  },
  {
    id: 'blog-004',
    title: 'Terapia LED w medycynie estetycznej - protokoły i standardy certyfikacji',
    category: 'Technologie',
    readTime: 22,
    excerpt: 'Kompletny przewodnik po terapii fotobiomodulacyjnej LED: mechanizmy działania, parametry techniczne, protokoły zabiegowe oraz wymagania certyfikacyjne zgodnie z normami IEC.',
    content: 'Szczegółowe omówienie spektrum światła LED (400-1000nm), mechanizmów fotobiomodulacji, przeciwwskazań, parametrów zabieg...',
    practicalExamples: [
      'Protokoły terapii LED 630nm/850nm',
      'Kalkulatory dawki energii'
    ],
    author: teamMembers[3],
    date: '2024-01-08',
    slug: 'terapia-led-protokoly-certyfikacja'
  },
  {
    id: 'blog-005',
    title: 'SaMD (Software as Medical Device) w medycynie estetycznej - regulacje i implementacja',
    category: 'Technologie',
    readTime: 28,
    excerpt: 'Kompleksowe omówienie regulacji dotyczących oprogramowania medycznego: klasyfikacja SaMD według FDA/MDR, wymagania cyberbezpieczeństwa, walidacja algorytmów AI.',
    content: 'Szczegółowa analiza wytycznych FDA Guidance for Industry and FDA Staff, klasyfikacja ryzyka SaMD, wymagania dotyczące wa...',
    practicalExamples: [
      'Klasyfikacja ryzyka SaMD (I-IV)',
      'Protokoły walidacji algorytmów AI'
    ],
    author: teamMembers[5],
    date: '2024-01-05',
    slug: 'samd-software-medical-device-regulacje'
  },
  {
    id: 'blog-006',
    title: 'PR Shield™ - strategiczne zarządzanie reputacją w medycynie estetycznej',
    category: 'Marketing',
    readTime: 16,
    excerpt: 'Profesjonalny system zarządzania reputacją dla praktyków medycyny estetycznej: monitoring mediów, crisis management, protokoły komunikacji kryzysowej.',
    content: 'Kompletny system obejmujący monitoring 24/7 mediów społecznościowych, automatyczne alerty reputacyjne, procedury crisis...',
    practicalExamples: [
      'Algorytmy monitoringu sentiment analysis',
      'Procedury crisis management'
    ],
    author: teamMembers[4],
    date: '2024-01-03',
    slug: 'pr-shield-zarzadzanie-reputacja'
  }
];

// ============================================
// WEBINARY
// ============================================
export const webinars: Webinar[] = [
  {
    id: 'webinar-001',
    title: 'MDR 2017/745: Najnowsze interpretacje UE',
    type: 'Live Webinar',
    date: '2025-02-15',
    time: '18:00 - 19:30',
    instructor: teamMembers[0],
    registrations: 247,
    maxParticipants: 300,
    description: 'Najnowsze interpretacje i aktualizacje rozporządzenia MDR 2017/745. Praktyczne wskazówki dla producentów wyrobów medycznych.',
    topics: ['MDR 2017/745', 'Certyfikacja CE', 'Dokumentacja techniczna', 'EUDAMED']
  },
  {
    id: 'webinar-002',
    title: 'Blockchain w Certyfikacji Medycznej',
    type: 'Workshop',
    date: '2025-02-22',
    time: '17:00 - 18:00',
    instructor: teamMembers[5],
    registrations: 156,
    maxParticipants: 100,
    description: 'Praktyczne zastosowania technologii blockchain w weryfikacji certyfikatów medycznych i dokumentacji zabiegowej.',
    topics: ['Blockchain', 'Smart Contracts', 'Certyfikacja', 'Weryfikacja dokumentów']
  },
  {
    id: 'webinar-003',
    title: 'HIFU Technology: Safety Protocols',
    type: 'Masterclass',
    date: '2025-03-01',
    time: '19:00 - 20:30',
    instructor: teamMembers[1],
    registrations: 89,
    maxParticipants: 50,
    description: 'Zaawansowane protokoły bezpieczeństwa dla technologii HIFU. Case studies, praktyczne demonstracje, Q&A.',
    topics: ['HIFU', 'Bezpieczeństwo', 'Protokoły zabiegowe', 'Powikłania']
  }
];

// ============================================
// PROGRAMY MENTORSKIE
// ============================================
export const mentorshipPrograms: MentorshipProgram[] = [
  {
    id: 'mentor-beginner',
    name: 'MDR Mentor Program',
    level: 'Początkujący',
    price: 2400,
    duration: '3 miesiące',
    maxParticipants: 10,
    features: [
      'Cotygodniowe sesje 1:1',
      'Dostęp do ekspertów',
      'Praktyczne case studies',
      'Certyfikat ukończenia'
    ],
    description: 'Intensywny program mentorski dla specjalistów rozpoczynających pracę z MDR 2017/745'
  },
  {
    id: 'mentor-advanced',
    name: 'Advanced Compliance Track',
    level: 'Zaawansowany',
    price: 4800,
    duration: '6 miesięcy',
    maxParticipants: 5,
    features: [
      'Dwutygodniowe deep-dive sessions',
      'Direct access do regulatorów',
      'Współpraca przy real cases',
      'Train-the-trainer certification'
    ],
    description: 'Ekskluzywny program dla doświadczonych profesjonalistów rozwijających expertise'
  }
];

// ============================================
// PRZYKŁADY PRAKTYCZNE
// ============================================
export const practicalExamples: PracticalExample[] = [
  {
    id: 'example-001',
    title: 'Studia Przypadków',
    category: 'case-studies',
    icon: 'book',
    description: 'Rzeczywiste examples z praktyki medycznej',
    examples: [
      'Komplikacje po laserach',
      'Reakcje alergiczne',
      'Błędy proceduralne',
      'Roszczenia pacjentów'
    ],
    ctaText: 'Zobacz przykłady',
    ctaAction: '/case-studies'
  },
  {
    id: 'example-002',
    title: 'Protokoły Step-by-Step',
    category: 'protocols',
    icon: 'list-check',
    description: 'Szczegółowe instrukcje krok po kroku',
    examples: [
      'Przygotowanie pacjenta',
      'Kalibracja urządzeń',
      'Procedury bezpieczeństwa',
      'Dokumentacja zabiegów'
    ],
    ctaText: 'Zobacz przykłady',
    ctaAction: '/protocols'
  },
  {
    id: 'example-003',
    title: 'Szablony Dokumentacji',
    category: 'templates',
    icon: 'file-text',
    description: 'Gotowe wzory dokumentów MDR',
    examples: [
      'Zgody świadome',
      'Protokoły zabiegów',
      'Karty ryzyka',
      'Raporty incydentów'
    ],
    ctaText: 'Zobacz przykłady',
    ctaAction: '/templates'
  },
  {
    id: 'example-004',
    title: 'Checklisty Bezpieczeństwa',
    category: 'checklists',
    icon: 'clipboard-check',
    description: 'Praktyczne listy kontrolne',
    examples: [
      'Pre-procedure safety',
      'Equipment checks',
      'Patient assessment',
      'Post-procedure care'
    ],
    ctaText: 'Zobacz przykłady',
    ctaAction: '/checklists'
  }
];

// ============================================
// STATYSTYKI SPOŁECZNOŚCI
// ============================================
export const communityStats: CommunityStats = {
  totalMembers: 2847,
  activeThisMonth: 1234,
  expertsOnline: 47,
  questionsAnswered: 15678
};

// ============================================
// PODSTAWY PRAWNE
// ============================================
export const legalDocuments: LegalDocument[] = [
  {
    title: 'Ustawa o działalności ubezpieczeniowej',
    regulation: 'z dnia 11 września 2015 r. (Dz.U. 2015 poz. 1844)',
    description: 'Podstawa prawna działalności ubezpieczeniowej w Polsce'
  },
  {
    title: 'Dyrektywa Solvency II',
    regulation: '2009/138/WE - standardy wypłacalności',
    description: 'Europejskie standardy wypłacalności zakładów ubezpieczeń'
  },
  {
    title: 'Rozporządzenie MDR 2017/745',
    regulation: 'Regulacje dotyczące wyrobów medycznych',
    description: 'Wymagania UE dla wyrobów medycznych'
  },
  {
    title: 'Ustawa o zawodach lekarza i lekarza dentysty',
    regulation: 'z dnia 5 grudnia 1996 r. (art. 67a)',
    description: 'Obowiązek ubezpieczenia OC dla lekarzy'
  }
];
