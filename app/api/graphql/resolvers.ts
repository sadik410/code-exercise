import { mockContacts, mockCompanies } from './mockData';
// import { Resolvers } from './types';
import {
  Contact,
  Company,
  CreateContactInput,
  CreateCompanyInput,
  EntityType,
} from './types';

const resolvers = {
  Query: {
    getEntities: () => [...mockContacts, ...mockCompanies],
    getEntity: (_: any, { id }: { id: string }) => {
      const entity = [...mockContacts, ...mockCompanies].find(
        (item) => item.id === id
      );
      return entity || null;
    },
  },
  Mutation: {
    createEntity: (
      _: any,
      { input }: { input: CreateContactInput | CreateCompanyInput }
    ) => {
      const { entityType, name } = input;
      switch (entityType) {
        case EntityType.CONTACT:
          const { email, phone } = input;
          const newContact: Contact = {
            id: `contact_${Date.now()}`,
            name,
            email,
            phone,
          };
          mockContacts.push(newContact);
          return newContact;
        case EntityType.COMPANY:
          const { industry, contactEmail } = input;

          const newCompany: Company = {
            id: `contact_${Date.now()}`,
            name,
            industry,
            contactEmail,
          };
          // mockCompanies.push(newCompany);
          return newCompany;
        default:
          throw new Error('Invalid entityType provided');
      }
    },

    updateEntity: (
      _: any,
      {
        input,
      }: {
        input:
          | (CreateContactInput & { id: string })
          | (CreateCompanyInput & { id: string });
      }
    ) => {
      const { id, entityType, ...updates } = input;
      let entityToUpdate;

      switch (entityType) {
        case 'CONTACT':
          entityToUpdate = mockContacts.find((contact) => contact.id === id);

          break;

        case 'COMPANY':
          entityToUpdate = mockCompanies.find((company) => company.id === id);

          break;
        default:
          throw new Error('Invalid entityType provided');
      }

      if (!entityToUpdate) {
        throw new Error('Entity not found');
      }

      // Update the entity fields
      Object.assign(entityToUpdate, updates);

      return entityToUpdate;
    },
  },
  Entity: {
    __resolveType(entity: Contact | Company, context: any, info: any) {
      if ('email' in entity) {
        return 'Contact';
      } else if ('industry' in entity) {
        return 'Company';
      } else {
        throw new Error('Unable to resolve type for Entity');
      }
    },
  },
};

export default resolvers;
