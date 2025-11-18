import { CompanyData, Shareholder } from '../types';

export const companyData: CompanyData = {
  name: 'TechStart PSA',
  krs: '0000123456',
  nip: '1234567890',
  address: 'ul. Startupowa 15, 00-001 Warszawa',
  logoUrl: ''
};

export const shareholders: Shareholder[] = [
  {
    id: '1',
    name: 'Jan Kowalski',
    shares: 500,
    percentage: 50,
    type: 'physical',
    address: 'ul. Akcyjna 10, 00-002 Warszawa',
    pesel: '85010112345'
  },
  {
    id: '2',
    name: 'Anna Nowak',
    shares: 300,
    percentage: 30,
    type: 'physical',
    address: 'ul. Inwestycyjna 20, 00-003 Warszawa',
    pesel: '90020298765'
  },
  {
    id: '3',
    name: 'Investment Fund Sp. z o.o.',
    shares: 200,
    percentage: 20,
    type: 'legal',
    address: 'ul. Kapitałowa 5, 00-004 Warszawa',
    nip: '9876543210'
  }
];
