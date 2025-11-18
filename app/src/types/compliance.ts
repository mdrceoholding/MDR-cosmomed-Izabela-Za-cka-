export type ChecklistStatus = 'TAK' | 'NIE' | 'ND';

export interface CompanyData {
  nazwa: string;
  adres: string;
  kierownik: string;
  logoUrl?: string;
  numerWersji: string;
  dataWejsciaWZycie: string;
  podpisKierownika?: string;
}

export interface HistoriaZmian {
  id: string;
  numerWersji: string;
  data: string;
  opisZmian: string;
  podpis: string;
}

export interface DefinicjaSkrot {
  id: string;
  skrot: string;
  definicja: string;
}

export interface PunktChecklisty {
  id: string;
  numer: string;
  tytul: string;
  status: ChecklistStatus;
  uwagi: string;
  zalacznik?: string;
  dataWeryfikacji: string;
  odpowiedzialny: string;
}

export interface OblastChecklist {
  id: string;
  numer: string;
  tytul: string;
  punkty: PunktChecklisty[];
}

export interface ChecklistaMDR {
  id: string;
  companyData: CompanyData;
  spisTresci: string[];
  historiaZmian: HistoriaZmian[];
  podstawyPrawne: string;
  definicje: DefinicjaSkrot[];
  oblasti: OblastChecklist[];
  createdAt: string;
  updatedAt: string;
}

export interface Audit {
  id: string;
  data: string;
  audytor: string;
  wynikProcentowy: number;
  liczbaZgodnosci: {
    tak: number;
    nie: number;
    nd: number;
  };
  zalecenia: string;
  status: 'Otwarty' | 'Zamknięty';
}

export type CAPARodzaj = 'Corrective' | 'Preventive';
export type CAPAPriorytet = 'Low' | 'Medium' | 'High' | 'Critical';
export type CAPageStatus = 'Open' | 'In Progress' | 'Verification' | 'Closed';

export interface CAPA {
  id: string;
  dataZgloszenia: string;
  opisNiezgodnosci: string;
  obszar: string;
  rodzaj: CAPARodzaj;
  priorytet: CAPAPriorytet;
  odpowiedzialny: string;
  targetDate: string;
  status: CAPageStatus;
  pozycjaWChecklistie?: string;
  dzialaniaKorygujace?: string;
  weryfikacja?: string;
  dataZamkniecia?: string;
}

export interface SzablonDokumentu {
  id: string;
  nazwa: string;
  opis: string;
  fileUrl: string;
  kategoria: string;
  ostatniaAktualizacja: string;
}

export interface ComplianceStats {
  ogolnyStanZgodnosci: number;
  liczbaPunktow: {
    tak: number;
    nie: number;
    nd: number;
    razem: number;
  };
  statusObszarow: Array<{
    obszar: string;
    zgodnosc: number;
  }>;
  ostatniAudyt?: {
    data: string;
    wynik: number;
  };
}
