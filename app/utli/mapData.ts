interface MappedContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
}

interface MappedCompany {
  id: string;
  name: string;
  industry: string;
  contactEmail: string;
  type: string;
}

type MappedData = MappedContact | MappedCompany;

const mapData = (data: any[]): MappedData[] => {
  return data
    ?.map((entity) => {
      if (entity.__typename === 'Contact') {
        const contact = entity as any;
        return {
          id: contact.id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          type: 'Contact',
        };
      } else if (entity.__typename === 'Company') {
        const company = entity as any;
        return {
          id: company.id,
          name: company.name,
          industry: company.industry,
          contactEmail: company.contactEmail,
          type: 'Company',
        };
      }
      return null;
    })
    .filter(Boolean) as MappedData[];
};

export default mapData;
