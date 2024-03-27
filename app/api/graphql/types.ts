// Define an enum for the types of entities

export enum EntityType {
  CONTACT = 'CONTACT',
  COMPANY = 'COMPANY',
}
// Interface representing a contact entity

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

// Interface representing a company entity
export interface Company {
  id: string;
  name: string;
  industry: string;
  contactEmail?: string;
}

// Interface representing input for creating a new contact
export interface CreateContactInput {
  entityType: EntityType.CONTACT;
  name: string;
  email: string;
  phone?: string;
}

// Interface representing input for creating a new company
export interface CreateCompanyInput {
  entityType: EntityType.COMPANY;
  name: string;
  industry: string;
  contactEmail?: string;
}
