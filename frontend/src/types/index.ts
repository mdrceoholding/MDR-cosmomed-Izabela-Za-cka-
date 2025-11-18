export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'participant' | 'facilitator' | 'admin';
  phone?: string;
  emergencyContact?: EmergencyContact;
  language: 'pl' | 'en';
  preferences: UserPreferences;
  certificationNumber?: string;
  certificationExpiry?: string;
  isVerified: boolean;
  lastLogin?: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface UserPreferences {
  darkMode: boolean;
  notifications: boolean;
  voiceGuidance: boolean;
  defaultSessionDuration: number;
}

export interface Session {
  id: string;
  userId: string;
  facilitatorId?: string;
  groupSessionId?: string;
  sessionType: 'individual' | 'group' | 'remote';
  intensity: 'gentle' | 'medium' | 'deep';
  duration: number;
  actualDuration?: number;
  startTime: string;
  endTime?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'interrupted' | 'cancelled';
  audioTrack?: string;
  voiceGuidance: boolean;
  language: 'pl' | 'en';
  biometricData?: BiometricData;
  emergencyStopUsed: boolean;
  emergencyStopTime?: string;
  emergencyStopReason?: string;
  location?: Location;
  notes?: string;
}

export interface BiometricData {
  averageHeartRate?: number;
  maxHeartRate?: number;
  minHeartRate?: number;
  hrv?: number;
  oxygenSaturation?: number;
  alerts: BiometricAlert[];
}

export interface BiometricAlert {
  type: 'heart_rate_high' | 'heart_rate_low' | 'oxygen_low';
  value: number;
  threshold: number;
  timestamp: string;
}

export interface Location {
  latitude?: number;
  longitude?: number;
  address?: string;
}

export interface Journal {
  id: string;
  userId: string;
  sessionId?: string;
  entryType: 'text' | 'voice' | 'mixed';
  content?: string;
  voiceRecordingUrl?: string;
  voiceRecordingDuration?: number;
  emotions: string[];
  emotionIntensity: Record<string, number>;
  symbols: string[];
  themes: string[];
  insights?: string;
  bodyExperiences?: string;
  visualExperiences?: string;
  sessionRating?: number;
  wouldRecommend?: boolean;
  isPrivate: boolean;
  sharedWithFacilitator: boolean;
  entryDate: string;
}

export interface MedicalConsent {
  id: string;
  userId: string;
  medicalHistory?: string;
  contraindications: Contraindications;
  hasContraindications: boolean;
  medications?: string;
  consentToParticipate: boolean;
  consentToDataProcessing: boolean;
  consentToEmergencyContact: boolean;
  acknowledgedRisks: boolean;
  signatureData?: string;
  ipAddress?: string;
  consentDate: string;
  expiryDate?: string;
  pdfUrl?: string;
  isValid: boolean;
}

export interface Contraindications {
  pregnancy: boolean;
  epilepsy: boolean;
  cardiovascularDisease: boolean;
  highBloodPressure: boolean;
  psychoticDisorders: boolean;
  recentSurgery: boolean;
  glaucoma: boolean;
  severeAsthma: boolean;
  other?: string;
}

export interface GroupSession {
  id: string;
  facilitatorId: string;
  name: string;
  description?: string;
  sessionType: 'in_person' | 'remote' | 'hybrid';
  scheduledDate: string;
  duration: number;
  intensity: 'gentle' | 'medium' | 'deep';
  maxParticipants: number;
  currentParticipants: number;
  status: 'scheduled' | 'open_for_registration' | 'full' | 'in_progress' | 'completed' | 'cancelled';
  location?: GroupSessionLocation;
  playlist?: AudioTrack[];
  voiceGuidanceEnabled: boolean;
  language: 'pl' | 'en' | 'both';
  webrtcRoomId?: string;
  requiresMedicalConsent: boolean;
  requiresPreSessionQuestionnaire: boolean;
  price?: number;
  currency: string;
  preSessionMessage?: string;
  postSessionMessage?: string;
  integrationPeriodDays: number;
}

export interface GroupSessionLocation {
  address?: string;
  city?: string;
  country: string;
  virtualRoomUrl?: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  artist?: string;
  duration: number;
  url: string;
  phase: 'active' | 'peak' | 'integration';
}

export interface BreathingPattern {
  name: string;
  intensity: 'gentle' | 'medium' | 'deep';
  inhale: number;
  hold: number;
  exhale: number;
  cycles: number;
  description: string;
}

export const BREATHING_PATTERNS: Record<string, BreathingPattern> = {
  gentle: {
    name: 'Łagodny oddech',
    intensity: 'gentle',
    inhale: 4,
    hold: 2,
    exhale: 6,
    cycles: 10,
    description: 'Delikatny wzorzec dla początkujących, skupiony na relaksacji'
  },
  medium: {
    name: 'Średni oddech',
    intensity: 'medium',
    inhale: 5,
    hold: 3,
    exhale: 7,
    cycles: 15,
    description: 'Zrównoważony wzorzec dla regularnych praktyków'
  },
  deep: {
    name: 'Głęboki oddech',
    intensity: 'deep',
    inhale: 6,
    hold: 4,
    exhale: 8,
    cycles: 20,
    description: 'Intensywny wzorzec dla doświadczonych uczestników'
  }
};

export const EMOTION_OPTIONS = [
  'radość', 'smutek', 'gniew', 'strach', 'spokój',
  'ekscytacja', 'wdzięczność', 'żal', 'miłość', 'zdziwienie',
  'wstydt', 'wina', 'ulgę', 'frustrację', 'nadzieja'
];

export const THEME_OPTIONS = [
  'uzdrowienie', 'trauma', 'relacje', 'rodzina', 'dzieciństwo',
  'śmierć', 'narodziny', 'natura', 'duchowość', 'transformacja',
  'tożsamość', 'kontrola', 'wolność', 'akceptacja', 'przebaczenie'
];
