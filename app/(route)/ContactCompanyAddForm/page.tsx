'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import {
  CreateCompanyInput,
  CreateContactInput,
  EntityType,
} from '../../api/graphql/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CREATE_ENTITY } from '../../graphql/queries';
import { useMutation } from '@apollo/client';
import ContactCompanyForm from '../../_components/ContactCompanyForm';
import MyDialog from '../../_components/Dialog';
import MyListbox from '@/app/_components/MyListbox';

const myListboxItems = [
  { value: EntityType.CONTACT, name: 'Contact' },
  { value: EntityType.COMPANY, name: 'Company' },
];
export default function ContactCompanyEditForm({ params }: { params: any }) {
  const router = useRouter();

  let [isOpen, setIsOpen] = React.useState(false);
  const [entityTypeSelected, setEntityTypeSelected] = React.useState(
    myListboxItems[0]
  );

  let [modalTitle, setModalTitle] = React.useState('Operation succeeded!');

  const [updateEntity] = useMutation(CREATE_ENTITY);
  //   const entityType = data?.getEntity?.__typename?.toUpperCase();

  const onSubmit = async (
    formData: CreateContactInput | CreateCompanyInput
  ) => {
    try {
      const updatedData = {
        ...formData,
        entityType: entityTypeSelected.value,
      };

      await updateEntity({
        variables: {
          input: {
            ...updatedData,
          },
        },
      });
      setIsOpen(true);
      setModalTitle('Operation succeeded!');
    } catch (error) {
      console.log('error', error);
      setModalTitle('Operation failed. Please try again.');
    } finally {
      setIsOpen(true);
    }
  };
  console.log('selected', entityTypeSelected);

  return (
    <div className="max-w-md mx-auto p-8">
      <MyDialog
        title={modalTitle}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={() => {
          router.push('/');
        }}
      />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Modify Information</CardTitle>
          <CardDescription>
            Enter the details below to add a new{' '}
            <span className="font-bold blue-500">
              {entityTypeSelected.value === EntityType.CONTACT
                ? 'contact'
                : 'company'}
            </span>{' '}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MyListbox
            title="Select entity type"
            items={myListboxItems}
            selected={entityTypeSelected}
            setSelected={setEntityTypeSelected}
          />
          <ContactCompanyForm
            defaultValues={{}}
            entityType={entityTypeSelected.value}
            onSubmit={onSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
}
