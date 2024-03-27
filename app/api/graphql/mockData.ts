import { Contact, Company } from './types';

// Define mock contacts
export const mockContacts: Contact[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '0987654321',
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '5678901234',
  },
  {
    id: '4',
    name: 'Emily Brown',
    email: 'emily@example.com',
    phone: '6789012345',
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david@example.com',
    phone: '3456789012',
  },
  {
    id: '6',
    name: 'Sarah Taylor',
    email: 'sarah@example.com',
    phone: '9012345678',
  },
];

// Define mock companies
export const mockCompanies: Company[] = [
  {
    id: '7',
    name: 'ABC Company',
    industry: 'Technology',
    contactEmail: 'contact@abc.com',
  },
  {
    id: '8',
    name: 'XYZ Corporation',
    industry: 'Finance',
    contactEmail: 'contact@xyz.com',
  },
  {
    id: '9',
    name: 'LMN Enterprises',
    industry: 'Retail',
    contactEmail: 'contact@lmn.com',
  },
  {
    id: '10',
    name: 'PQR Industries',
    industry: 'Manufacturing',
    contactEmail: 'contact@pqr.com',
  },
  {
    id: '11',
    name: 'GHI Group',
    industry: 'Hospitality',
    contactEmail: 'contact@ghi.com',
  },
  {
    id: '12',
    name: 'STU Solutions',
    industry: 'Consulting',
    contactEmail: 'contact@stu.com',
  },
];
